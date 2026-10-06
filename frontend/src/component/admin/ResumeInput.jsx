import { useEffect, useState } from 'react'
import {
  getResumeService,
  resumeDownloadUrl,
  uploadResumeService,
} from '../../service/resumeService.js'

const formatFileSize = (size) => {
  if (!size) return 'Unknown size'
  return `${(size / 1024 / 1024).toFixed(2)} MB`
}

function ResumeInput() {
  const [file, setFile] = useState(null)
  const [resume, setResume] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getResumeService()
      .then(setResume)
      .catch((requestError) => {
        if (requestError.response?.status !== 404) {
          setError('Could not load the current resume.')
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    setMessage('')
    setError('')

    if (!selectedFile) {
      setFile(null)
      return
    }

    if (selectedFile.type !== 'application/pdf') {
      setFile(null)
      setError('Please select a PDF file.')
      event.target.value = ''
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null)
      setError('The resume must be smaller than 5 MB.')
      event.target.value = ''
      return
    }

    setFile(selectedFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) {
      setError('Choose a PDF resume before uploading.')
      return
    }

    setIsUploading(true)
    setMessage('')
    setError('')

    try {
      const uploadedResume = await uploadResumeService(file)
      setResume(uploadedResume)
      setFile(null)
      event.target.reset()
      setMessage('Resume uploaded successfully.')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Resume upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.55fr)]">
      <form className="border border-white/10 p-5 sm:p-8" onSubmit={handleSubmit}>
        <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs tracking-[0.18em] text-navbar-accent">UPLOAD FILE</p>
            <h3 className="mt-3 text-xl font-medium tracking-[-0.04em]">Replace your resume</h3>
          </div>
          <span className="text-xs text-navbar-muted">PDF / 5 MB MAX</span>
        </div>

        <label className="mt-8 flex min-h-44 cursor-pointer flex-col items-center justify-center border border-dashed border-white/20 px-6 text-center transition-colors hover:border-navbar-accent">
          <span className="text-sm text-hero-heading">{file ? file.name : 'Choose a PDF file'}</span>
          <span className="mt-3 text-xs text-navbar-muted">The new file becomes the public download immediately.</span>
          <input className="sr-only" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} />
        </label>

        <button
          className="mt-6 w-full border border-navbar-accent bg-navbar-accent px-5 py-3 text-xs font-medium tracking-[0.08em] text-navbar-bg transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={isUploading || !file}
        >
          {isUploading ? 'UPLOADING...' : 'UPLOAD RESUME'}
        </button>

        {message && <p className="mt-4 text-xs text-navbar-accent">{message}</p>}
        {error && <p className="mt-4 text-xs text-red-300">{error}</p>}
      </form>

      <aside className="border border-white/10 p-5 sm:p-8">
        <p className="text-xs tracking-[0.18em] text-navbar-accent">CURRENT FILE</p>
        {isLoading ? (
          <p className="mt-6 text-sm text-navbar-muted">Checking storage...</p>
        ) : resume ? (
          <>
            <p className="mt-6 break-words text-sm text-hero-heading">{resume.originalName}</p>
            <p className="mt-2 text-xs text-navbar-muted">{formatFileSize(resume.size)}</p>
            <a
              className="mt-8 inline-block border border-white/20 px-4 py-3 text-xs text-navbar-muted transition-colors hover:border-navbar-accent hover:text-navbar-accent"
              href={resumeDownloadUrl}
              target="_blank"
              rel="noreferrer"
            >
              DOWNLOAD CURRENT
            </a>
          </>
        ) : (
          <p className="mt-6 text-sm leading-6 text-navbar-muted">No resume has been uploaded yet.</p>
        )}
      </aside>
    </div>
  )
}

export default ResumeInput