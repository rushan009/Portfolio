import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

export const getResumeService = async () => {
  const response = await api.get('/api/resume')
  return response.data.resume
}

export const uploadResumeService = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.post('/api/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data.resume
}

export const resumeDownloadUrl = `${api.defaults.baseURL}/api/resume/download`