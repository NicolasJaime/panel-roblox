import { View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import Button from '../../components/Button'
import SocialFooter from '../../components/SocialFooter'
import { Newspaper, Gamepad2 } from 'lucide-react-native' // <--- Íconos para los botones

export default function Home() {
  const { user, isAdmin } = useAuth()
  const { isDark } = useTheme()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-brand-black">
      <View className="px-6 pt-14 pb-6 gap-6">
        <View>
          {/* Quitamos el emoji de la mano, se ve más elegante solo el texto */}
          <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">¡Hola!</Text>
          <Text className="text-gray-500 dark:text-brand-sky text-sm mt-1">{user?.email}</Text>
          {isAdmin && (
            <View className="mt-3 self-start bg-brand-blue/10 dark:bg-brand-cyan/20 px-4 py-1.5 rounded-full border border-brand-blue/20 dark:border-brand-cyan/30">
              <Text className="text-brand-blue dark:text-brand-cyan text-xs font-black uppercase tracking-wider">Admin</Text>
            </View>
          )}
        </View>

        <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-900">
          <Text className="text-gray-900 dark:text-brand-cyan font-black text-xl mb-3">¿Quiénes somos?</Text>
          <Text className="text-gray-600 dark:text-gray-300 text-sm leading-6">
            Somos un equipo apasionado por Roblox. Este panel de administración
            permite gestionar misiones completadas, entregar diamantes y moderar
            jugadores de forma fácil y rápida desde cualquier dispositivo.
          </Text>
        </View>

        <View className="gap-4 mt-2">
          <Button
            label="Noticias del juego"
            icon={<Newspaper size={20} color={isDark ? '#28D6F7' : '#2650F0'} />}
            onPress={() => router.push('/(main)/panel' as any)}
            variant="outline"
          />
          <Button
            label="Panel de jugadores"
            icon={<Gamepad2 size={20} color="#ffffff" />}
            onPress={() => router.push('/(main)/panel' as any)}
          />
        </View>
      </View>
      <SocialFooter />
    </ScrollView>
  )
}