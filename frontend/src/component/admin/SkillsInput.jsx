import { useState } from 'react'
import { setSkillService } from '../../service/skillService.js'

const initialFormData = {
	name: '',
	level: 'Intermediate',
	domain: 'Frontend',
}

const SkillsInput = () => {
	const [formData, setFormData] = useState(initialFormData)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [feedback, setFeedback] = useState({ type: '', message: '' })

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({ ...currentData, [name]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setFeedback({ type: '', message: '' })
		setIsSubmitting(true)

		try {
			await setSkillService(formData)
			setFormData(initialFormData)
			setFeedback({ type: 'success', message: 'Skill saved successfully.' })
		} catch (error) {
			setFeedback({
				type: 'error',
				message: error?.response?.data?.message || 'Unable to save this skill.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form className="max-w-2xl" onSubmit={handleSubmit}>
			<div className="grid gap-8 sm:grid-cols-2">
				<label className="block">
					<span className="flex items-center justify-between text-xs tracking-[0.12em] text-navbar-muted">
						Skill name <span className="text-navbar-accent">REQUIRED</span>
					</span>
					<input
						className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-lg text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="e.g. React"
						required
					/>
				</label>

				<label className="block">
					<span className="text-xs tracking-[0.12em] text-navbar-muted">Domain</span>
					<select
						className="mt-3 w-full border-b border-white/20 bg-navbar-bg px-0 py-3 text-sm text-hero-heading outline-none transition-colors focus:border-navbar-accent"
						name="domain"
						value={formData.domain}
						onChange={handleChange}
						required
					>
						<option>Frontend</option>
						<option>Backend</option>
						<option>Languages</option>
						<option>Tools &amp; Technologies</option>
						<option>Database</option>
						<option>Other</option>
					</select>
				</label>

				<label className="block">
					<span className="text-xs tracking-[0.12em] text-navbar-muted">Level</span>
					<select
						className="mt-3 w-full border-b border-white/20 bg-navbar-bg px-0 py-3 text-sm text-hero-heading outline-none transition-colors focus:border-navbar-accent"
						name="level"
						value={formData.level}
						onChange={handleChange}
						required
					>
						<option>Beginner</option>
						<option>Intermediate</option>
						<option>Advanced</option>
						<option>Expert</option>
					</select>
				</label>
			</div>

			{feedback.message && (
				<p className={`mt-6 text-sm ${feedback.type === 'error' ? 'text-red-400' : 'text-navbar-accent'}`}>
					{feedback.message}
				</p>
			)}

			<div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-xs text-navbar-muted">Add one skill at a time.</p>
				<button
					className="border border-navbar-accent px-6 py-3 text-xs tracking-[0.12em] text-navbar-accent transition-colors hover:bg-navbar-accent hover:text-navbar-bg focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'SAVING...' : 'SAVE SKILL'}
				</button>
			</div>
		</form>
	)
}

export default SkillsInput