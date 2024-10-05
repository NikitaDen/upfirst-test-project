import { useCallback, useEffect, useState } from 'react'

export function useUrlState(key: string, defaultValue: number): [number, (value: number) => void] {
  const [state, setState] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search)
    const urlValue = params.get(key)
    return urlValue ? parseInt(urlValue, 10) : defaultValue
  })

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const urlValue = params.get(key)
      setState(urlValue ? parseInt(urlValue, 10) : defaultValue)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [key, defaultValue])

  const setValue = useCallback(
    (value: number) => {
      setState(value)

      const params = new URLSearchParams(window.location.search)

      params.set(key, value.toString())
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    },
    [key]
  )

  return [state, setValue]
}
