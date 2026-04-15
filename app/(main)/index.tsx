import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import Button from '../../components/Button'
import { Newspaper, Instagram, Gamepad2, Sparkles } from 'lucide-react-native'

export default function Home() {
  const { user, isAdmin } = useAuth()
  const { isDark } = useTheme()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-brand-black">
      <View className="px-6 pt-14 pb-6 gap-6">
        <View>
          <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">¡Bienvenido!</Text>
          <Text className="text-gray-500 dark:text-brand-sky text-sm mt-1">{user?.email}</Text>
          {isAdmin && (
            <View className="mt-3 self-start bg-brand-blue/10 dark:bg-brand-cyan/20 px-4 py-1.5 rounded-full border border-brand-blue/20 dark:border-brand-cyan/30">
              <Text className="text-brand-blue dark:text-brand-cyan text-xs font-black uppercase tracking-wider">Admin</Text>
            </View>
          )}
        </View>

        {/* Tarjeta: Quiénes somos + Redes */}
        <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-900 shadow-sm">
          <Text className="text-gray-900 dark:text-brand-cyan font-black text-xl mb-3">¿Quiénes somos?</Text>
          <Text className="text-gray-600 dark:text-gray-300 text-sm leading-6 mb-6">
            Somos C∞dex, un equipo apasionado por el desarrollo en Roblox. Este panel de administración permite gestionar misiones completadas, entregar diamantes y moderar jugadores de forma rápida desde cualquier dispositivo.
          </Text>
          
          {/* Enlaces a Redes Sociales integrados */}
          <View className="flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://www.roblox.com/es/games/TU_JUEGO_ID')}
              className="flex-row items-center gap-2 bg-red-500/10 dark:bg-red-500/20 px-3 py-2 rounded-xl"
            >
              <Gamepad2 size={18} color={isDark ? '#f87171' : '#ef4444'} />
              <Text className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Roblox</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Linking.openURL('https://instagram.com/TU_USUARIO')}
              className="flex-row items-center gap-2 bg-pink-500/10 dark:bg-pink-500/20 px-3 py-2 rounded-xl"
            >
              <Instagram size={18} color={isDark ? '#f472b6' : '#ec4899'} />
              <Text className="text-pink-500 dark:text-pink-400 text-xs font-bold uppercase tracking-wider">Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nueva Tarjeta de Relleno (Amague) */}
        <View className="bg-brand-blue/5 dark:bg-brand-cyan/5 rounded-3xl p-6 border border-brand-blue/10 dark:border-brand-cyan/10">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkles size={20} color={isDark ? '#28D6F7' : '#2650F0'} />
            <Text className="text-brand-blue dark:text-brand-cyan font-black text-lg">Nuevas Funciones</Text>
          </View>
          <Text className="text-gray-600 dark:text-gray-400 text-sm leading-6">
            Pronto añadiremos estadísticas detalladas de las misiones globales y un registro de auditoría para ver el historial de diamantes entregados por los administradores.
          </Text>
        </View>

        {/* Solo dejamos el botón de Noticias */}
        <View className="mt-2">
          <Button
            label="Actualizaciones del Juego"
            icon={<Newspaper size={20} color={isDark ? '#28D6F7' : '#2650F0'} />}
            onPress={() => Alert.alert('Noticias', 'Pronto se cargarán las noticias desde el servidor.')}
            variant="outline"
          />
        </View>
      </View>
    </ScrollView>
  )
}