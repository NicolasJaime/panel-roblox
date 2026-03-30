import { View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import Button from '../../components/Button'
import SocialFooter from '../../components/SocialFooter'

export default function Home() {
  const { user, isAdmin } = useAuth()
  const { isDark } = useTheme()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="px-6 pt-14 pb-6 gap-6">
        <View>
          <Text className="text-gray-900 dark:text-white text-2xl font-bold">¡Hola 👋</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email}</Text>
          {isAdmin && (
            <View className="mt-2 self-start bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
              <Text className="text-indigo-600 dark:text-indigo-300 text-xs font-semibold">Admin</Text>
            </View>
          )}
        </View>

        <View className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-5 gap-2">
          <Text className="text-gray-900 dark:text-white font-bold text-lg">¿Quiénes somos?</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm leading-6">
            Somos un equipo apasionado por Roblox. Este panel de administración
            permite gestionar misiones completadas, entregar diamantes y moderar
            jugadores de forma fácil y rápida desde cualquier dispositivo.
          </Text>
        </View>

        <View className="gap-3">
          <Button
            label="📰   Noticias del juego"
            onPress={() => router.push('/(main)/panel' as any)}
            variant="outline"
          />
          <Button
            label="🎮   Panel de jugadores"
            onPress={() => router.push('/(main)/panel' as any)}
          />
        </View>
      </View>
      <SocialFooter isDark={isDark} />
    </ScrollView>
  )
}