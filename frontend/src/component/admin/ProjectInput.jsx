import { uploadProjectService } from "../../service/projectService"
import { useState } from "react"

const ProjectInput = () => {
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        description: "",
        skills: "",
        github: "",
		live: "",
        image: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage("")

        if (!formData.image) {
            setErrorMessage("Please select a cover image before submitting.")
            return
        }
        if (!formData.description) {
            setErrorMessage("Description is required.")
            return
        }

        setIsSubmitting(true)
        try {
            await uploadProjectService(formData)
            setFormData({
                title: "",
                summary: "",
                description: "",
                skills: "",
                github: "",
				live: "",
                image: null
            })
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message || "Something went wrong while uploading. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

	return (
		<form className="max-w-4xl" onSubmit={handleSubmit}>
			<div className="grid gap-8 xl:grid-cols-[1fr_0.7fr]">
				<div className="space-y-8">
					<label className="block">
						<span className="flex items-center justify-between text-xs tracking-[0.12em] text-navbar-muted">
							Project name <span className="text-navbar-accent">REQUIRED</span>
						</span>
						<input
							className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-lg text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							type="text"
							name="title"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							placeholder="e.g. Arc Objects"
						/>
					</label>

					<label className="block">
						<span className="text-xs tracking-[0.12em] text-navbar-muted">Summary</span>
						<input
							className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							type="text"
							name="summary"
							value={formData.summary}
							onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
							placeholder="A concise introduction to the project"
						/>
					</label>

					<label className="block">
						<span className="text-xs tracking-[0.12em] text-navbar-muted">Short description</span>
						<textarea
							className="mt-3 min-h-36 w-full resize-y border border-white/15 bg-white/2 p-4 text-sm leading-6 text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							name="description"
                            value={formData.description}
                            onChange={(e)=>setFormData({...formData, description:e.target.value})}
							placeholder="What was made, and why does it matter?"
						/>
					</label>

					<label className="block">
						<span className="text-xs tracking-[0.12em] text-navbar-muted">Skills</span>
						<input
							className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							type="text"
							name="skills"
                            value={formData.skills}
                            onChange={(e)=>setFormData({...formData, skills:e.target.value})}
							placeholder="React, Node.js, MongoDB"
						/>
						<span className="mt-2 block text-xs text-navbar-muted">Separate each skill with a comma.</span>
					</label>
				</div>

				<div className="space-y-8">
					<label className="group flex min-h-64 cursor-pointer flex-col justify-between border border-dashed border-white/20 bg-white/2 p-5 transition-colors hover:border-navbar-accent">
						<span className="flex items-center justify-between text-xs tracking-[0.12em] text-navbar-muted">
							Cover image <span className="text-navbar-accent">01</span>
						</span>
						<span>
							<span className="block text-3xl text-navbar-accent transition-transform group-hover:translate-x-1">+</span>
							<span className="mt-3 block text-sm text-hero-heading">
								{formData.image ? formData.image.name : "Choose an image"}
							</span>
							<span className="mt-1 block text-xs leading-5 text-navbar-muted">
								{formData.image
									? `${(formData.image.size / 1024).toFixed(0)} KB`
									: <>JPG, PNG or WebP<br />Recommended 1600 x 1000</>}
							</span>
						</span>
						<input
							className="sr-only"
							type="file"
							name="image"
							accept="image/png,image/jpeg,image/webp"
							onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
						/>
					</label>

					<label className="block">
						<span className="text-xs tracking-[0.12em] text-navbar-muted">GitHub URL</span>
						<input
							className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							type="url"
							name="github"
							value={formData.github}
							onChange={(e)=>setFormData({...formData, github:e.target.value})}
							placeholder="https://github.com/username/project"
						/>
					</label>

					<label className="block">
						<span className="flex items-center justify-between text-xs tracking-[0.12em] text-navbar-muted">
							Live website <span className="text-navbar-muted">OPTIONAL</span>
						</span>
						<input
							className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-hero-heading outline-none transition-colors placeholder:text-white/25 focus:border-navbar-accent"
							type="url"
							name="live"
							value={formData.live}
							onChange={(e) => setFormData({ ...formData, live: e.target.value })}
							placeholder="https://your-live-site.com"
						/>
					</label>

					<div className="border-l border-navbar-accent/70 pl-4 text-xs leading-6 text-navbar-muted">
						<p className="text-hero-heading">A quiet detail</p>
						<p className="mt-1">The cover image becomes the first signal of this project in your work list.</p>
					</div>
				</div>
			</div>

			{errorMessage && (
				<p className="mt-6 text-sm text-red-400">{errorMessage}</p>
			)}

			<div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-xs text-navbar-muted">All fields can be edited later.</p>
				<button
					className="border border-navbar-accent px-6 py-3 text-xs tracking-[0.12em] text-navbar-accent transition-colors hover:bg-navbar-accent hover:text-navbar-bg focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "SAVING..." : "SAVE PROJECT"}
				</button>
			</div>
		</form>
	)
}

export default ProjectInput