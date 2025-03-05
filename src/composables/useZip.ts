import JSZip from 'jszip'

export default function useZip() {
  const zip = new JSZip()

  const addFile = (name: string, content: string) => {
    zip.file(name, content)
  }

  const addFolder = (name: string) => {
    zip.folder(name)
  }

  const removeFile = (name: string) => {
    zip.remove(name)
  }

  // Add a binary file from a URL
  const addFileFromUrl = async (name: string, url: string) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
      }
      const blob = await response.blob()
      zip.file(name, blob, { binary: true })
      return true
    } catch (error) {
      console.error(`Error adding file from URL ${url}:`, error)
      return false
    }
  }

  const generate = async () => {
    return await zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = window.URL.createObjectURL(content)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ba-esig-media.zip')
      document.body.appendChild(link)
      link.click()
    })
  }

  return {
    addFile,
    addFolder,
    removeFile,
    addFileFromUrl,
    generate,
  }
}
