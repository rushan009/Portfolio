import { motion } from 'framer-motion'
import Hero3D from './Hero3D.jsx'

function Hero() {
	return (
		<section className="relative isolate min-h-[calc(100svh-77px)] bg-navbar-bg">
			<div className="relative mx-auto grid min-h-[calc(100svh-77px)] w-full max-w-portfolio grid-cols-1 gap-0 px-2 py-16 font-mono sm:grid-cols-2 sm:py-20">
				<div
					className="flex flex-col justify-center pointer-events-none z-10 sm:justify-self-start"
				>
				<motion.h1
					className="m-0 max-w-[760px] text-[52px] font-medium leading-[0.98] tracking-[-0.06em] [word-spacing:-0.3em] text-hero-heading sm:text-[84px]"
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
				>
					HI, I'M <span className="text-navbar-accent">R</span>USHA<span className="text-navbar-accent">N</span>.
				</motion.h1>

				<motion.p
					className="mt-8 max-w-[570px] text-[18px] leading-[1.55] tracking-[-0.02em] text-hero-copy sm:mt-10 sm:text-[20px]"
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
				>
					I enjoy working on ideas that challenge me, especially when they push me to learn something new or approach a problem from a different perspective. From developing web applications to experimenting with new tools and technologies, I like taking an idea from a rough concept and gradually turning it into something real, functional, and meaningful.
					</motion.p>

				<div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-8 text-sm tracking-[0.04em] sm:mt-12">
					<motion.a
						className="group relative inline-block text-navbar-muted no-underline outline-offset-5 focus-visible:outline-2 focus-visible:outline-navbar-accent"
						href="#projects"
						whileHover={{ scale: 1.08 }}
						whileFocus={{ scale: 1.08 }}
						transition={{ duration: 0.16, ease: 'easeOut' }}
					>
						SEE WORKS <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-y-1 group-focus-within:translate-y-1">↓</span>
						<span className="absolute inset-x-0 -bottom-1 h-px bg-navbar-muted" />
					</motion.a>

					<motion.a
						className="group relative inline-block text-navbar-accent no-underline outline-offset-5 focus-visible:outline-2 focus-visible:outline-navbar-accent"
						href="#contact"
						whileHover={{ scale: 1.08 }}
						whileFocus={{ scale: 1.08 }}
						transition={{ duration: 0.16, ease: 'easeOut' }}
					>
						GET IN TOUCH <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-within:translate-x-1">→</span>
						<span className="absolute inset-x-0 -bottom-1 h-px bg-navbar-accent" />
					</motion.a>
				</div>
				</div>

				{/* Right column — the 3D atom canvas fills this */}
				<div className="relative min-h-[420px] pointer-events-auto z-20">
					<Hero3D />
				</div>
			</div>
		</section>
	)
}

export default Hero
