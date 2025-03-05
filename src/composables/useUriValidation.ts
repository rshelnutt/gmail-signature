import { ref } from 'vue'
import { parseGDriveUri } from '@/utils/parseGDriveUri'

export type ValidationStatus = 'default' | 'success' | 'error'

export function useUriValidation() {
  const uriValidationStatuses = ref<Map<string, ValidationStatus>>(new Map())

  function debounce(fn: Function, delay: number) {
    let timeout: number | null = null

    return function(...args: any[]) {
      if (timeout) window.clearTimeout(timeout)

      return new Promise((resolve) => {
        timeout = window.setTimeout(() => {
          resolve(fn(...args))
        }, delay)
      })
    }
  }

  const validateUri = async (uri: string, key: string) => {
    if (!uri) {
      uriValidationStatuses.value.set(key, 'default')
      return false
    }
    
    try {
      const finalUri = uri.includes('drive.google.com') ? parseGDriveUri(uri) : uri
      
      const response = await fetch(finalUri, { method: 'HEAD' })
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.startsWith('image/')) {
          uriValidationStatuses.value.set(key, 'success')
          return true
        } else {
          uriValidationStatuses.value.set(key, 'error')
          return false
        }
      } else {
        uriValidationStatuses.value.set(key, 'error')
        return false
      }
    } catch (error) {
      uriValidationStatuses.value.set(key, 'error')
      return false
    }
  }

  const debouncedValidateUri = debounce((uri: string, key: string) => validateUri(uri, key), 200)

  // Validate multiple URIs concurrently without debouncing
  const validateAllUris = async (uriMap: Record<string, string>) => {
    const validationPromises = Object.entries(uriMap)
      .filter(([_, uri]) => uri) // Only validate non-empty URIs
      .map(([key, uri]) => validateUri(uri, key))
    
    return Promise.all(validationPromises)
  }

  return {
    uriValidationStatuses,
    validateUri,
    debouncedValidateUri,
    validateAllUris
  }
}