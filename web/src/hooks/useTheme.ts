'use client'

import { useEffect, useState } from 'react'

/** Açık/koyu tema — localStorage + sistem tercihi. Navbar ve DashboardSidebar paylaşır. */
export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    } else if (stored === 'light') {
      setDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
      if (prefersDark) document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return { dark, toggle }
}
