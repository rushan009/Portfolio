import { AdaptiveDpr, Html, Line, Ring } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { getSkillsService } from '../service/skillService.js'

const domains = ['Frontend', 'Backend', 'Languages', 'Tools & Technologies', 'Database', 'Other']
const colors = { ember: '#ed6741', emberSoft: '#ffad72', steel: '#a9a9aa', dim: '#343a3f', graphite: '#1a1b1f' }
const getDomain = (skill) => domains.includes(skill.domain) ? skill.domain : 'Other'
const getShortName = (name) => name.split(/[^a-z0-9]+/i).filter(Boolean).map((word) => word[0]).join('').slice(0, 3).toUpperCase()
const seededRandom = (seed) => {
	const value = Math.sin(seed * 12.9898) * 43758.5453
	return value - Math.floor(value)
}
const createSceneGraph = (grouped) => {
	const nodes = []

	grouped.forEach((item, nodeIndex) => {
		let position = null
		let attempt = 0

		while (!position && attempt < 80) {
			const seed = nodeIndex * 67 + item.domainIndex * 113 + attempt * 19
			const candidate = [
				-3.25 + seededRandom(seed + 1) * 6.5,
				-2.15 + seededRandom(seed + 2) * 4.3,
				-0.8 + seededRandom(seed + 3) * 1.6,
			]
			const isClear = nodes.every((node) => Math.hypot(node.position[0] - candidate[0], node.position[1] - candidate[1]) > 0.82)
			if (isClear) position = candidate
			attempt += 1
		}

		nodes.push({ ...item, position: position || [-3 + (nodeIndex % 5) * 1.5, -1.8 + Math.floor(nodeIndex / 5) * 1.2, 0] })
	})

	const connectionKeys = new Set()
	const relationships = []
	nodes.forEach((node) => {
		const nearestNodes = nodes
			.filter((candidate) => candidate !== node)
			.sort((first, second) => Math.hypot(first.position[0] - node.position[0], first.position[1] - node.position[1]) - Math.hypot(second.position[0] - node.position[0], second.position[1] - node.position[1]))
			.slice(0, 2)

		nearestNodes.forEach((target) => {
			const key = [node.skill._id, target.skill._id].sort().join('-')
			if (!connectionKeys.has(key)) {
				connectionKeys.add(key)
				relationships.push({ key, from: node, to: target })
			}
		})
	})

	return { nodes, relationships }
}

function Node({ skill, index, position, activeId, activeDomain, reducedMotion, onActive }) {
	const group = useRef(null)
	const phase = useMemo(() => skill.name.split('').reduce((sum, character) => sum + character.charCodeAt(0), 0) * 0.05, [skill.name])
	const isActive = activeId === skill._id
	const isCategory = getDomain(skill) === activeDomain
	const faded = Boolean(activeId) && !isActive

	useFrame(({ clock }, delta) => {
		if (!group.current) return
		const target = isActive ? 1.2 : isCategory ? 1.03 : 0.9
		const nextScale = THREE.MathUtils.damp(group.current.scale.x, target, 8, delta)
		group.current.scale.set(nextScale, nextScale, nextScale)
		if (!reducedMotion) group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.45 + phase) * 0.09
	})

	return (
		<group ref={group} position={position}>
			<mesh onPointerOver={(event) => { event.stopPropagation(); onActive(skill._id, getDomain(skill)) }} onPointerOut={() => onActive(null)} onClick={(event) => { event.stopPropagation(); onActive(isActive ? null : skill._id, getDomain(skill)) }}>
				<icosahedronGeometry args={[0.34 + (index % 3) * 0.09, 1]} />
				<meshStandardMaterial color={isActive || isCategory ? colors.ember : faded ? colors.dim : colors.steel} roughness={0.42} metalness={0.62} emissive={isActive ? colors.ember : colors.graphite} emissiveIntensity={isActive ? 0.9 : 0.08} transparent opacity={faded && !isCategory ? 0.3 : 1} />
			</mesh>
			<Html center distanceFactor={8.5} style={{ pointerEvents: 'none' }}>
				<span className={`skill-scene-label ${isActive ? 'skill-scene-label-active' : ''} ${faded && !isCategory ? 'skill-scene-label-dim' : ''}`}>{skill.name}</span>
			</Html>
		</group>
	)
}

function TechScene({ skills, activeId, activeDomain, reducedMotion, scrollProgress, onActive }) {
	const root = useRef(null)
	const grouped = useMemo(() => domains.flatMap((domain, domainIndex) => skills.filter((skill) => getDomain(skill) === domain).map((skill, index, group) => ({ skill, index, total: group.length, domainIndex }))), [skills])
	const { nodes, relationships } = useMemo(() => createSceneGraph(grouped), [grouped])

	useFrame(({ pointer, camera }, rawDelta) => {
		if (!root.current) return
		const delta = Math.min(rawDelta, 0.05)
		const targetY = reducedMotion ? 0 : scrollProgress.current * Math.PI * 0.16
		root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY + pointer.x * 0.08, 3.5, delta)
		root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, reducedMotion ? 0.04 : pointer.y * 0.06 - 0.03, 3.5, delta)
		camera.position.x = THREE.MathUtils.damp(camera.position.x, reducedMotion ? 0 : pointer.x * 0.3, 3, delta)
		camera.position.y = THREE.MathUtils.damp(camera.position.y, reducedMotion ? 0 : pointer.y * 0.2, 3, delta)
		camera.lookAt(0, 0, 0)
	})

	return (
		<group ref={root}>
			{[2.05, 3.35, 4.65].map((radius, index) => (
				<Ring key={radius} args={[radius, radius + 0.008, 128]} rotation={[Math.PI / 2.25 + index * 0.12, index * 0.24, 0]}>
					<meshBasicMaterial color={index === 1 ? colors.ember : colors.steel} transparent opacity={index === 1 ? 0.18 : 0.1} side={THREE.DoubleSide} />
				</Ring>
			))}
			{relationships.map(({ key, from, to }) => {
				const isHighlighted = activeId === from.skill._id || activeId === to.skill._id || getDomain(from.skill) === activeDomain
				return <Line key={key} points={[from.position, to.position]} color={isHighlighted ? colors.emberSoft : colors.steel} transparent opacity={isHighlighted ? 0.85 : 0.16} lineWidth={isHighlighted ? 1.25 : 0.45} />
			})}
			{nodes.map((item) => <Node key={item.skill._id || `${item.skill.name}-${item.domainIndex}`} {...item} activeId={activeId} activeDomain={activeDomain} reducedMotion={reducedMotion} onActive={onActive} />)}
		</group>
	)
}

function DetailPanel({ activeSkill, skills }) {
	return (
		<motion.div className="skills-detail-panel" animate={{ opacity: activeSkill ? 1 : 0.72, y: activeSkill ? 0 : 4 }} aria-live="polite">
			<div className="skills-detail-index">{activeSkill ? getShortName(activeSkill.name) : 'SYS'}</div>
			<div>
				<p className="skills-detail-eyebrow">{activeSkill ? `${getDomain(activeSkill)} / ${activeSkill.level}` : 'INTERACTIVE SYSTEM'}</p>
				<h3>{activeSkill ? activeSkill.name : 'Explore the ecosystem'}</h3>
				<p>{activeSkill ? `${activeSkill.name} is part of the ${getDomain(activeSkill).toLowerCase()} toolkit.` : 'Move across a node to inspect its role and connected technologies.'}</p>
				<span>{activeSkill ? `${skills.length} TECHNOLOGIES / 3 DOMAINS` : `${skills.length} TECHNOLOGIES / 3 DOMAINS`}</span>
			</div>
		</motion.div>
	)
}

function Skill() {
	const sectionRef = useRef(null)
	const scrollProgressRef = useRef(0)
	const reducedMotion = Boolean(useReducedMotion())
	const [skills, setSkills] = useState([])
	const [activeId, setActiveId] = useState(null)
	const [activeDomain, setActiveDomain] = useState('Frontend')
	const [hasError, setHasError] = useState(false)
	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

	useEffect(() => {
		const unsubscribe = scrollYProgress.on('change', (value) => { scrollProgressRef.current = value })
		getSkillsService().then(setSkills).catch(() => setHasError(true))
		return unsubscribe
	}, [scrollYProgress])

	const groupedDomains = domains.map((domain) => ({ domain, skills: skills.filter((skill) => getDomain(skill) === domain) })).filter((group) => group.skills.length)
	const activeSkill = skills.find((skill) => skill._id === activeId)
	const activate = (id, domain) => {
		setActiveId(id)
		if (domain) setActiveDomain(domain)
	}

	return (
		<main className="skills-page">
			<section ref={sectionRef} className="skills-observatory" id="skills">
				<div className="technical-grid" aria-hidden="true" />
				<header className="skills-intro">
					<motion.p className="section-kicker" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>02 / CAPABILITIES</motion.p>
					<motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Skills</motion.h2>
					<motion.p className="skills-intro-copy" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The tools and technologies I use to build digital experiences.</motion.p>
					<div className="scroll-cue"><span /> SCROLL TO TRACE THE STACK</div>
				</header>

				{hasError ? <p className="skills-status">Skills are unavailable right now.</p> : !skills.length ? <p className="skills-status">No skills have been added yet.</p> : (
					<div className="observatory-layout">
						<div className="category-story">
							{groupedDomains.map(({ domain, skills: categorySkills }, chapterIndex) => (
								<motion.article key={domain} className={`category-chapter ${activeDomain === domain ? 'is-current' : ''}`} onViewportEnter={() => setActiveDomain(domain)} viewport={{ amount: 0.55 }} initial={{ opacity: 0.2, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
									<div className="chapter-number">0{chapterIndex + 1}</div>
									<div>
										<p className="chapter-label">DOMAIN / {domain.toUpperCase()}</p>
										<h3>{domain}</h3>
										<div className="chapter-skills">
											{categorySkills.map((skill, index) => <motion.button key={skill._id} type="button" className={`skill-row ${activeId === skill._id ? 'is-active' : ''}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} onMouseEnter={() => activate(skill._id, domain)} onMouseLeave={() => activate(null)} onFocus={() => activate(skill._id, domain)} onBlur={() => activate(null)}><span className="skill-row-signal" /><span>{skill.name}</span><span className="skill-row-level">{skill.level}</span></motion.button>)}
										</div>
									</div>
								</motion.article>
							))}
						</div>

						<aside className="ecosystem-stage">
							<div className="stage-meta"><span>ECOSYSTEM / LIVE</span><span>{activeDomain.toUpperCase()}</span></div>
							<div className="desktop-scene">
								<Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 9.5], fov: 50 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} performance={{ min: 0.65, max: 1, debounce: 200 }} onPointerMissed={() => setActiveId(null)}>
									<AdaptiveDpr pixelated={false} />
									<ambientLight intensity={0.7} /><pointLight position={[2, 3, 6]} intensity={28} color={colors.emberSoft} /><pointLight position={[-4, -2, 4]} intensity={12} color={colors.steel} />
									<TechScene skills={skills} activeId={activeId} activeDomain={activeDomain} reducedMotion={reducedMotion} scrollProgress={scrollProgressRef} onActive={activate} />
								</Canvas>
							</div>
							<DetailPanel activeSkill={activeSkill} skills={skills} />
						</aside>
					</div>
				)}

			</section>
		</main>
	)
}

export default Skill
