import { motion } from 'framer-motion'

function Contact() {
	return (
		<section id="contact" className="border-t border-white/10 bg-navbar-bg px-2 py-16 font-mono sm:py-24">
			<div className="mx-auto grid w-full max-w-portfolio gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(420px,1fr)] md:gap-20">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
				>
					<p className="m-0 text-xs tracking-[0.18em] text-navbar-accent">04 / CONTACT</p>
					<h2 className="mt-4 max-w-[620px] text-4xl font-medium leading-[1.05] tracking-[-0.05em] text-hero-heading sm:text-6xl">
						Have an idea worth building?
					</h2>
					<p className="mt-6 max-w-[500px] text-sm leading-[1.7] text-navbar-muted sm:text-base">
						Let&apos;s connect, exchange ideas, and make something useful.
					</p>
				</motion.div>

				<motion.form
					className="grid gap-5"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
					onSubmit={(event) => event.preventDefault()}
				>
					<label className="grid gap-2 text-xs tracking-[0.1em] text-navbar-muted" htmlFor="contact-name">
						NAME <span className="text-navbar-accent">*</span>
						<input id="contact-name" name="name" type="text" required placeholder="Your name" className="border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-normal text-hero-heading outline-none placeholder:text-white/35 focus:border-navbar-accent" />
					</label>

					<label className="grid gap-2 text-xs tracking-[0.1em] text-navbar-muted" htmlFor="contact-email">
						EMAIL <span className="text-navbar-accent">*</span>
						<input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-normal text-hero-heading outline-none placeholder:text-white/35 focus:border-navbar-accent" />
					</label>

					<label className="grid gap-2 text-xs tracking-[0.1em] text-navbar-muted" htmlFor="contact-message">
						MESSAGE <span className="text-navbar-accent">*</span>
						<textarea id="contact-message" name="message" required rows="4" placeholder="Tell me about your idea" className="resize-y border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-normal text-hero-heading outline-none placeholder:text-white/35 focus:border-navbar-accent" />
					</label>

					<button type="submit" className="mt-2 w-max border border-navbar-accent px-5 py-3 text-xs tracking-[0.08em] text-navbar-accent transition-colors hover:bg-navbar-accent hover:text-navbar-bg focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-5">
						SEND MESSAGE <span aria-hidden="true" className="ml-2">→</span>
					</button>
				</motion.form>
			</div>
		</section>
	)
}

export default Contact