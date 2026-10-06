import { motion } from 'framer-motion'

const experienceItems = [
	{ period: '01', title: 'Work Experience', copy: 'A space for roles, responsibilities, and the problems solved along the way.' },
	{ period: '02', title: 'Selected Practice', copy: 'Hands-on work across interfaces, APIs, and the tools that bring ideas to life.' },
]

const achievementItems = [
	{ label: '01', title: 'Projects shipped', copy: 'From early concepts to functional digital experiences.' },
	{ label: '02', title: 'Always learning', copy: 'Exploring new technologies through practical, focused builds.' },
	{ label: '03', title: 'Ideas in progress', copy: 'A growing record of experiments, lessons, and useful outcomes.' },
]

function Journey() {
	return (
		<section id="journey" className="border-t border-white/10 bg-navbar-bg px-2 py-16 font-mono sm:py-24">
			<div className="mx-auto w-full max-w-portfolio">
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
					<p className="m-0 text-xs tracking-[0.18em] text-navbar-accent">03 / JOURNEY</p>
					<h2 className="mt-3 text-4xl font-medium tracking-[-0.05em] text-hero-heading sm:text-6xl">Experience &amp; achievements</h2>
				</motion.div>

				<div className="mt-12 grid gap-14 border-t border-white/10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
					<div>
						<p className="mb-6 text-xs tracking-[0.16em] text-navbar-muted">WORK EXPERIENCE</p>
						<div className="grid gap-0">
							{experienceItems.map((item, index) => (
								<motion.article key={item.period} className="grid grid-cols-[42px_1fr] gap-5 border-b border-white/10 py-6 first:pt-0" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
									<span className="pt-1 text-xs text-navbar-accent">{item.period}</span>
									<div>
										<h3 className="m-0 text-xl font-medium text-hero-heading">{item.title}</h3>
										<p className="mt-3 max-w-[560px] text-sm leading-[1.7] text-navbar-muted">{item.copy}</p>
									</div>
								</motion.article>
							))}
						</div>
					</div>

					<div>
						<p className="mb-6 text-xs tracking-[0.16em] text-navbar-muted">ACHIEVEMENTS / HIGHLIGHTS</p>
						<div className="grid gap-3">
							{achievementItems.map((item, index) => (
								<motion.article key={item.label} className="border border-white/10 p-5 transition-colors hover:border-navbar-accent" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
									<div className="flex items-start justify-between gap-4">
										<h3 className="m-0 text-lg font-medium text-hero-heading">{item.title}</h3>
										<span className="text-xs text-navbar-accent">{item.label}</span>
									</div>
									<p className="mt-3 m-0 text-sm leading-[1.7] text-navbar-muted">{item.copy}</p>
								</motion.article>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Journey