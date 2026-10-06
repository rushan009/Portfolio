import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getProjectsService } from '../service/projectService.js'

function Work() {
	const [projects, setProjects] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		getProjectsService()
			.then(setProjects)
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<section id="projects" className="bg-navbar-bg px-2 py-16 font-mono sm:py-20">
			<div className="mx-auto w-full max-w-portfolio">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					<p className="m-0 text-xs tracking-[0.18em] text-navbar-muted">SELECTED WORK</p>
					<h2 className="mt-3 text-4xl font-medium tracking-tighter text-hero-heading sm:text-6xl">Projects</h2>
				</motion.div>

				<div className="mt-10 grid grid-cols-1 gap-12 border-t border-white/10 pt-10">
					{isLoading && <p className="text-sm text-navbar-muted">Loading projects...</p>}
					{hasError && <p className="text-sm text-navbar-muted">Projects are unavailable right now.</p>}
					{!isLoading && !hasError && projects.length === 0 && (
						<p className="text-sm text-navbar-muted">No projects have been added yet.</p>
					)}
					{projects.map((project, index) => (
						<motion.article
							key={project._id || project.title}
							className="w-full"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className={project.image ? 'grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12' : ''}>
								{project.image && (
									<div className={`flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-white/3 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
										<img
											className="h-full w-full object-contain"
											src={project.image}
											alt={`${project.title} preview`}
										/>
									</div>
								)}
								<div className={project.image && index % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
									<h3 className="m-0 text-3xl font-medium tracking-[-0.04em] text-navbar-accent sm:text-5xl">{project.title}</h3>
									<p className="mt-3 m-0 text-sm tracking-[0.02em] text-navbar-muted sm:text-base">{project.summary}</p>
									<p className="mt-4 m-0 max-w-none text-base leading-[1.7] text-hero-heading sm:text-lg">{project.description}</p>
									<div className="mt-6 flex flex-wrap gap-3" aria-label="Technologies used">
										{(Array.isArray(project.skills) ? project.skills : [project.skills])
											.flatMap((skill) => String(skill).split(','))
											.map((skill) => skill.trim())
											.filter(Boolean)
											.map((skill) => (
											<span key={skill} className="border border-white/15 px-4 py-2 text-sm tracking-[0.04em] text-hero-copy">{skill}</span>
										))}
									</div>
									<a className="group relative mt-6 inline-block text-sm tracking-[0.04em] text-navbar-accent no-underline outline-offset-5 focus-visible:outline-2 focus-visible:outline-navbar-accent" href={project.github} target="_blank" rel="noreferrer">
										GITHUB <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
										<span className="absolute inset-x-0 -bottom-1 h-px bg-navbar-accent" />
									</a>
									{project.live && (
										<a className="group relative ml-6 mt-6 inline-block text-sm tracking-[0.04em] text-navbar-accent no-underline outline-offset-5 focus-visible:outline-2 focus-visible:outline-navbar-accent" href={project.live} target="_blank" rel="noreferrer">
											LIVE SITE <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
											<span className="absolute inset-x-0 -bottom-1 h-px bg-navbar-accent" />
										</a>
									)}
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Work
