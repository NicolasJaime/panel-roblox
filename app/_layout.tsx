import '../global.css'
import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { useAuth } from '../lib/useAuth'
import { useTheme } from '../lib/useTheme' // Importamos tu hook
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native'

export default function RootLayout() {
  const { session, loading } = useAuth()
  const { isDark } = useTheme() // Obtenemos el estado actual

  useEffect(() => {
    if (loading) return
    if (session) {
      router.replace('/(main)' as any)
    } else {
      router.replace('/(auth)/login' as any)
    }
  }, [session, loading])

  return (
    // ThemeProvider aplica el tema a los componentes de navegación (Tabs, Stacks)
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </ThemeProvider>
  )
}