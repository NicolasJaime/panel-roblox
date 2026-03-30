import { useState, useEffect } from 'react'
import { useColorScheme as useNativeColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from "nativewind" // Importante para NativeWind

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  useEffect(() => {
    AsyncStorage.getItem('theme').then((saved) => {
      if (saved) {
        const theme = saved as 'light' | 'dark'
        setIsDark(theme === 'dark')
        setColorScheme(theme)
      }
    })
  }, [])

  const toggleTheme = async () => {
    const nextTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    setColorScheme(nextTheme)
    await AsyncStorage.setItem('theme', nextTheme)
  }

  return { isDark, toggleTheme }
}