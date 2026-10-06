import { useMemo, useRef, createRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#ff5a00";
const BRIGHT = "#ff8a00";
const WHITE  = "#fff1d6";
const ATOM_CENTER = [0, 0, 0];

/*
  Each ring is tilted 70° away from the camera, but around a
  DIFFERENT in-screen axis (0°, 45°, 90°, 135°).  We use
  quaternion axis-angle so the rings genuinely cross each other
  like ⚛ instead of stacking like Saturn.
*/
const PI = Math.PI;
const TILT = 1.22;  // ~70° tilt away from the camera plane

const orbitConfigs = [
  {
    label: "LOCATION",
    value: "Dhulikhel, Nepal",
    icon: "◉",
    radius: 1.6,
    screenAngle: 0,               // 0° in screen — horizontal
    speed: 0.07,
    startAngle: 0,                 // → starts at RIGHT
  },
  {
    label: "EMAIL",
    value: "rushan.official1@gmail.com",
    icon: "✉",
    radius: 1.75,
    screenAngle: PI * 0.25,       // 45° in screen — diagonal ↗
    speed: -0.058,
    startAngle: PI * 0.25,         // → starts at UPPER-RIGHT
  },
  {
    label: "EDUCATION",
    value: "B.E. Computer Engineering\nKathmandu University",
    icon: "◈",
    radius: 1.9,
    screenAngle: PI * 0.5,        // 90° in screen — vertical
    speed: 0.052,
    startAngle: PI * 1.5,          // → starts at BOTTOM
  },
  {
    label: "PHONE",
    value: "+977 984-123-4567",
    icon: "☏",
    radius: 1.7,
    screenAngle: PI * 0.75,       // 135° in screen — diagonal ↘
    speed: -0.048,
    startAngle: PI * 0.75,         // → starts at UPPER-LEFT
  },
];

/* minimum distance between two labels before repulsion kicks in */
const LABEL_MIN_DIST = 1.4;

/* -------------------------------------------------------
   DYNAMIC LABEL
------------------------------------------------------- */
function DynamicLabel({ config, nodeRef, index, labelPositions }) {
  const groupRef    = useRef();
  const lineRef     = useRef();
  const initialized = useRef(false);

  const nodeWorld   = useMemo(() => new THREE.Vector3(), []);
  const dir         = useMemo(() => new THREE.Vector3(), []);
  const labelTarget = useMemo(() => new THREE.Vector3(), []);
  const lineEnd     = useMemo(() => new THREE.Vector3(), []);
  const push        = useMemo(() => new THREE.Vector3(), []);
  const linePositions = useMemo(() => new Float32Array(6), []);

  useFrame(() => {
    if (!nodeRef.current || !groupRef.current) return;

    nodeRef.current.getWorldPosition(nodeWorld);
    if (nodeWorld.lengthSq() < 0.001) return;

    /* Push label outward from centre along electron direction */
    dir.copy(nodeWorld).normalize();
    labelTarget.copy(nodeWorld).addScaledVector(dir, 0.9);

    /* Anti-overlap repulsion */
    for (let j = 0; j < labelPositions.length; j++) {
      if (j === index) continue;
      const other = labelPositions[j];
      if (other.lengthSq() < 0.001) continue;
      const d = labelTarget.distanceTo(other);
      if (d < LABEL_MIN_DIST && d > 0.001) {
        push.subVectors(labelTarget, other).normalize();
        labelTarget.addScaledVector(push, (LABEL_MIN_DIST - d) * 0.6);
      }
    }

    /* Soft clamp — tighter on X so labels don't clip off the right edge */
    labelTarget.x = THREE.MathUtils.clamp(labelTarget.x, -2.2, 2.0);
    labelTarget.y = THREE.MathUtils.clamp(labelTarget.y, -1.8, 1.8);

    /* Store position for other labels */
    labelPositions[index].copy(labelTarget);

    /* Smooth position */
    if (!initialized.current) {
      groupRef.current.position.copy(labelTarget);
      initialized.current = true;
    } else {
      groupRef.current.position.lerp(labelTarget, 0.1);
    }

    /* Update connector line */
    groupRef.current.worldToLocal(lineEnd.copy(nodeWorld));
    linePositions[3] = lineEnd.x;
    linePositions[4] = lineEnd.y;
    linePositions[5] = lineEnd.z;
    const attr = lineRef.current?.geometry?.attributes?.position;
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePositions} count={2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={ORANGE} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </line>

      <mesh>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <Html distanceFactor={7} transform={false} occlude={false} zIndexRange={[500, 1000]} style={{ pointerEvents: "none" }}>
        <div
          className="font-mono leading-tight"
          style={{ whiteSpace: "nowrap", userSelect: "none", WebkitUserSelect: "none", transform: "translate(-50%, calc(-100% - 10px))", textAlign: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
            <span style={{ color: ORANGE, fontSize: "13px" }}>{config.icon}</span>
            <span style={{ color: ORANGE, fontSize: "12px", letterSpacing: "0.15em", fontWeight: 700 }}>{config.label}</span>
          </div>
          <div style={{ marginTop: "4px", fontSize: "11px", color: "#ffffff", whiteSpace: "pre", lineHeight: 1.4, textAlign: "center" }}>
            {config.value}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* -------------------------------------------------------
   GLOWING METALLIC SPHERE
------------------------------------------------------- */
function GlowingSphere({ size = 0.11 }) {
  return (
    <group>
      <mesh><sphereGeometry args={[size * 4.5, 16, 16]} /><meshBasicMaterial color={ORANGE} transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      <mesh><sphereGeometry args={[size * 2.4, 16, 16]} /><meshBasicMaterial color={BRIGHT} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      <mesh castShadow><sphereGeometry args={[size, 32, 32]} /><meshStandardMaterial color="#c2c5c9" metalness={0.92} roughness={0.1} envMapIntensity={2} /></mesh>
      <mesh><sphereGeometry args={[size * 1.08, 24, 24]} /><meshBasicMaterial color={BRIGHT} transparent opacity={0.24} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      <mesh><sphereGeometry args={[size * 0.3, 10, 10]} /><meshBasicMaterial color={WHITE} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      <pointLight color={BRIGHT} intensity={0.8} distance={1.2} decay={2} />
    </group>
  );
}

/* -------------------------------------------------------
   ELECTRON NODE
------------------------------------------------------- */
function ElectronNode({ radius, startAngle, speed, nodeRef }) {
  useFrame(({ clock }) => {
    const a = startAngle + clock.elapsedTime * speed;
    nodeRef.current?.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  return (
    <group ref={nodeRef}>
      <GlowingSphere size={0.11} />
    </group>
  );
}

/* -------------------------------------------------------
   ORBITAL RING – uses quaternion for proper axis-angle tilt
------------------------------------------------------- */
function OrbitalRing({ config, nodeRef }) {
  /* Compute quaternion: tilt TILT radians around the in-screen axis at screenAngle */
  const quaternion = useMemo(() => {
    const axis = new THREE.Vector3(
      Math.cos(config.screenAngle),
      Math.sin(config.screenAngle),
      0,
    ).normalize();
    return new THREE.Quaternion().setFromAxisAngle(axis, TILT);
  }, [config.screenAngle]);

  return (
    <group quaternion={quaternion}>
      <mesh>
        <torusGeometry args={[config.radius, 0.007, 12, 96]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[config.radius, 0.022, 10, 96]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <ElectronNode
        radius={config.radius}
        startAngle={config.startAngle}
        speed={config.speed * 1.6}
        nodeRef={nodeRef}
      />
    </group>
  );
}

/* -------------------------------------------------------
   CENTRAL ENERGY CORE
------------------------------------------------------- */
function EnergyCore() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      const p = 1 + Math.sin(t * 2.5) * 0.04;
      ref.current.scale.set(p, p, p);
      ref.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.88, 32, 32]} /><meshPhysicalMaterial color="#101820" transparent opacity={0.28} roughness={0.05} metalness={0.5} transmission={0.82} thickness={0.4} ior={1.45} envMapIntensity={0.6} /></mesh>
      <mesh scale={1.01}><sphereGeometry args={[0.89, 32, 20]} /><meshBasicMaterial color={ORANGE} wireframe transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      <mesh><sphereGeometry args={[1.08, 32, 32]} /><meshBasicMaterial color={ORANGE} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      <mesh><sphereGeometry args={[0.63, 24, 24]} /><meshBasicMaterial color={BRIGHT} transparent opacity={0.44} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      <mesh><sphereGeometry args={[0.34, 24, 24]} /><meshBasicMaterial color="#ffaa44" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      <mesh><sphereGeometry args={[0.14, 32, 32]} /><meshBasicMaterial color={WHITE} toneMapped={false} /></mesh>
      <pointLight color={BRIGHT} intensity={8} distance={6} decay={2} />
    </group>
  );
}

/* -------------------------------------------------------
   PARTICLES
------------------------------------------------------- */
function Particles() {
  const ref = useRef();
  const pos = useMemo(() => {
    const a = [];
    for (let i = 0; i < 140; i++) a.push(((i*37%100)/100-0.5)*10, ((i*67%100)/100-0.5)*8, ((i*97%100)/100-0.5)*4);
    return new Float32Array(a);
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.012; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#ff6600" size={0.02} transparent opacity={0.28} depthWrite={false} />
    </points>
  );
}

/* -------------------------------------------------------
   ATOM
------------------------------------------------------- */
function Atom() {
  const nodeRefs = useMemo(() => orbitConfigs.map(() => createRef()), []);
  const labelPositions = useRef(orbitConfigs.map(() => new THREE.Vector3()));

  return (
    <group position={ATOM_CENTER} scale={1.05}>
      <EnergyCore />
      {orbitConfigs.map((cfg, i) => (
        <OrbitalRing key={cfg.label} config={cfg} nodeRef={nodeRefs[i]} />
      ))}
      {orbitConfigs.map((cfg, i) => (
        <DynamicLabel key={`lbl-${cfg.label}`} config={cfg} nodeRef={nodeRefs[i]} index={i} labelPositions={labelPositions.current} />
      ))}
    </group>
  );
}

/* -------------------------------------------------------
   HERO 3D
------------------------------------------------------- */
export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        frameloop="always"
        style={{ overflow: "visible" }}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
        performance={{ min: 0.65, max: 1, debounce: 200 }}
      >
        <AdaptiveDpr pixelated={false} />
        <ambientLight intensity={0.15} color="#ffffff" />
        <directionalLight position={[5, 3, 5]} color="#ffd4b8" intensity={0.4} />
        <pointLight position={[-4, -2, 3]} color="#334455" intensity={0.2} />
        <Atom />
        <Particles />

        <OrbitControls
          makeDefault
          target={ATOM_CENTER}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}