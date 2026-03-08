import { useState, useCallback } from "react"

const STORAGE_KEY = "humblehalal_saved_businesses"

function getStored(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function useSaved() {
  const [savedIds, setSavedIds] = useState<string[]>(getStored)

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds])

  const toggle = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((x) => x !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { savedIds, isSaved, toggle, remove }
}
