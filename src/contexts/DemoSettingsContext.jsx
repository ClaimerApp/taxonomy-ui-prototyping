import { createContext, useContext, useState, useCallback } from 'react'

const DemoSettingsContext = createContext()

const STORAGE_KEY = 'atlas-demo-advanced'

export function DemoSettingsProvider({ children }) {
  const [isAdvanced, setIsAdvanced] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  )

  const setAdvanced = useCallback((val) => {
    setIsAdvanced(val)
    localStorage.setItem(STORAGE_KEY, String(val))
  }, [])

  return (
    <DemoSettingsContext.Provider value={{ isAdvanced, setAdvanced }}>
      {children}
    </DemoSettingsContext.Provider>
  )
}

export function useDemoSettings() {
  const ctx = useContext(DemoSettingsContext)
  if (!ctx) throw new Error('useDemoSettings must be used within DemoSettingsProvider')
  return ctx
}
