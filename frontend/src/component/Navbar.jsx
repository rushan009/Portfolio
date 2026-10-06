import { motion } from 'framer-motion'
import { resumeDownloadUrl } from '../service/resumeService.js'

const navigationItems = ['Home', 'Projects', 'Skills', 'Journey', 'Contact']

const navigationLinkVariants = {
	initial: {
		color: '#a9a9aa',
		scale: 1,
	},
	hover: {
		color: '#ed6741',
		scale: 1.18,
		transition: { duration: 0.16, ease: 'easeOut' },
	},
}

const underlineVariants = {
	initial: { scaleX: 0 },
	hover: {
		scaleX: 1,
		transition: { duration: 0.18, ease: 'easeOut' },
	},
}

function Navbar() {
	const handleNavigation = (event, item) => {
		if (item === 'Home') {
			if (window.location.pathname !== '/') return
			event.preventDefault()
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}

		const target = document.getElementById(item.toLowerCase())
		if (!target) return

		event.preventDefault()
		target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		window.history.replaceState(null, '', `#${item.toLowerCase()}`)
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navbar-bg">
			<nav
				className="mx-auto flex w-full max-w-portfolio flex-wrap items-center justify-between gap-4 px-2 py-4 font-mono sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:py-3"
				aria-label="Primary navigation"
			>
				<motion.a
					className="shrink-0 text-base font-bold tracking-[0.08em] text-hero-heading no-underline outline-offset-5 focus-visible:outline-2 focus-visible:outline-navbar-accent sm:justify-self-start"
					href="/"
					aria-label="Rushan Dahal home"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ color: 'var(--color-navbar-accent)' }}
					transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
				>
					RUSHAN DAHAL
				</motion.a>

				<motion.ul
					className="hidden sm:flex sm:w-auto sm:items-center sm:justify-self-center sm:gap-[clamp(20px,3vw,36px)]"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
				>
					{navigationItems.map((item) => (
						<li key={item}>
							<motion.a
											className="relative inline-block tracking-[0.04em] text-navbar-muted no-underline focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-5 sm:py-1.5"
								href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
								variants={navigationLinkVariants}
								initial="initial"
								whileHover="hover"
								whileFocus="hover"
								onClick={(event) => handleNavigation(event, item)}
							>
								{item}
								<motion.span
									className="absolute inset-x-0 bottom-0 h-px origin-left bg-navbar-accent"
									variants={underlineVariants}
								/>
							</motion.a>
						</li>
					))}
				</motion.ul>

				<motion.a
					className="ml-auto max-w-max shrink-0 border border-navbar-accent px-4 py-2 text-xs tracking-[0.04em] text-navbar-accent no-underline focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-5 sm:justify-self-end"
					href={resumeDownloadUrl}
					download
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{
						backgroundColor: 'var(--color-navbar-accent)',
						color: 'var(--color-navbar-bg)',
					}}
					whileFocus={{ backgroundColor: 'var(--color-navbar-accent)', color: 'var(--color-navbar-bg)' }}
					transition={{ duration: 0.45, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
				>
					Get Resume
				</motion.a>
			</nav>
		</header>
	)
}

export default Navbar
