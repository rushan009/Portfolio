import { useState } from 'react'
import ProjectInput from '../component/admin/ProjectInput.jsx'
import SkillsInput from '../component/admin/SkillsInput.jsx'
import ResumeInput from '../component/admin/ResumeInput.jsx'

const sections = [
  { id: 'project', label: 'Projects', eyebrow: '01' },
  { id: 'resume', label: 'Resume', eyebrow: '02' },
  { id: 'experience', label: 'Experience', eyebrow: '03' },
  { id: 'education', label: 'Education', eyebrow: '04' },
  { id: 'skills', label: 'Skills', eyebrow: '05' },
]

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('project')
  const currentSection = sections.find((section) => section.id === activeSection)

  return (
    <main className="min-h-screen bg-navbar-bg font-mono text-hero-heading">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="border-b border-white/10 px-5 py-6 sm:px-8 lg:w-72 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
          <div className="flex items-start justify-between lg:block">
            <div>
              <p className="text-xs tracking-[0.2em] text-navbar-accent">CONTROL ROOM</p>
              <h1 className="mt-4 text-2xl font-medium tracking-[-0.05em]">Admin desk</h1>
            </div>
            <span className="text-xs text-navbar-muted lg:mt-20 lg:block">PORTFOLIO / 2026</span>
          </div>

          <nav className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:mt-24 lg:block lg:space-y-2">
            {sections.map((section) => {
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  className={`flex min-h-14 w-full items-center justify-between border px-3 text-left text-xs transition-colors lg:px-4 ${
                    isActive
                      ? 'border-navbar-accent bg-navbar-accent text-navbar-bg'
                      : 'border-white/10 text-navbar-muted hover:border-white/30 hover:text-hero-heading'
                  }`}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                >
                  <span>{section.label}</span>
                  <span className="text-[10px] opacity-70">{section.eyebrow}</span>
                </button>
              )
            })}
          </nav>

          <p className="mt-8 hidden max-w-48 text-xs leading-6 text-navbar-muted lg:block">
            Shape the small details that make the work feel considered.
          </p>
        </aside>

        <section className="flex-1 px-5 py-8 sm:px-8 lg:px-14 lg:py-12">
          <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs tracking-[0.2em] text-navbar-accent">{currentSection.eyebrow} / EDITOR</p>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.06em] sm:text-5xl">{currentSection.label}</h2>
            </div>
            <p className="max-w-56 text-xs leading-5 text-navbar-muted sm:text-right">Private workspace<br />Changes stay in draft</p>
          </header>

          <div className="pt-8">
            {activeSection === 'project' ? (
              <ProjectInput />
            ) : activeSection === 'resume' ? (
              <ResumeInput />
            ) : activeSection === 'skills' ? (
              <SkillsInput />
            ) : (
              <div className="border border-dashed border-white/15 px-6 py-16 text-center sm:px-10">
                <p className="text-xs tracking-[0.18em] text-navbar-accent">COMING NEXT</p>
                <p className="mt-4 text-sm text-navbar-muted">The {currentSection.label.toLowerCase()} editor is ready for its fields.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard