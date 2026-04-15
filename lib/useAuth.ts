import { useEffect, useState } from 'react'
import { supabase, checkIsAdmin } from './supabase'
import type { Session } from '@supabase/supabase-js'

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Verificación inicial al abrir la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user?.email) {
        checkIsAdmin(session.user.email).then((adminStatus) => {
          setIsAdmin(adminStatus)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    // 2. Escucha de cambios (cuando el usuario inicia o cierra sesión)
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      
      if (session?.user?.email) {
        const admin = await checkIsAdmin(session.user.email)
        setIsAdmin(admin)
      } else {
        setIsAdmin(false)
      }
      
      // Detenemos la carga SOLO cuando ya tenemos el estado final (admin o no)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    session,
    user: session?.user ?? null,
    isAdmin,
    loading,
    signOut,
  }
}