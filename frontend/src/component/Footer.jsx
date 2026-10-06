import { motion } from 'framer-motion'

const profiles = [
	{
		name: 'GitHub',
		href: 'https://github.com/rushan009',
		label: 'Visit Rushan Dahal on GitHub',
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
				<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
			</svg>
		),
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/rushan-dahal-a0a0ab3a8/',
		label: 'Visit Rushan Dahal on LinkedIn',
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
				<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V9H3.54v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
			</svg>
		),
	},
]

function Footer() {
	return (
		<footer className="border-t border-white/10 bg-navbar-bg px-2 py-10 font-mono sm:py-14">
			<div className="mx-auto w-full max-w-portfolio">
				<motion.div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }}>
					<nav aria-label="Social profiles" className="flex items-center gap-3">
						{profiles.map((profile) => (
							<motion.a
								key={profile.name}
								className="group flex h-12 w-12 items-center justify-center border border-white/15 text-navbar-muted outline-offset-5 transition-colors hover:border-navbar-accent hover:text-navbar-accent focus-visible:outline-2 focus-visible:outline-navbar-accent"
								href={profile.href}
								aria-label={profile.label}
								target="_blank"
								rel="noreferrer"
								whileHover={{ y: -4 }}
								whileFocus={{ y: -4 }}
								transition={{ duration: 0.16, ease: 'easeOut' }}
							>
								<span className="h-5 w-5">{profile.icon}</span>
							</motion.a>
						))}
					</nav>
					<div className="flex flex-col gap-3 text-[11px] tracking-[0.08em] text-navbar-muted sm:items-end">
						<span>RUSHAN DAHAL / SOFTWARE DEVELOPER</span>
						<span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
					</div>
				</motion.div>
			</div>
		</footer>
	)
}

export default Footer