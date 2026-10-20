import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (aviso) => {
      const lista = window.matchMedia(query)
      lista.addEventListener('change', aviso)
      return () => lista.removeEventListener('change', aviso)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
