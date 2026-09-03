import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <Nav />
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
