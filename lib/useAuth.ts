import { useEffect, useState } from 'react'
import { supabase, checkIsAdmin } from './supabase'
import type { Session } from '@supabase/supabase-js'

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user?.email) {
        checkIsAdmin(session.user.email).then(setIsAdmin)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user?.email) {
        const admin = await checkIsAdmin(session.user.email)
        setIsAdmin(admin)
      } else {
        setIsAdmin(false)
      }
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