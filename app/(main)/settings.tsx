import { View, Text, Switch, ScrollView, Platform } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import Button from '../../components/Button'
import SocialFooter from '../../components/SocialFooter'

export default function Settings() {
  const { user, isAdmin, signOut } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    // Fondo: Blanco en claro / Gris oscuro en Dark Mode
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="px-6 pt-14 pb-6 gap-6">

        <Text className="text-gray-900 dark:text-white text-3xl font-bold">Ajustes</Text>

        {/* Tarjeta de Cuenta */}
        <View className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-5 gap-2 border border-gray-200 dark:border-gray-800">
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Cuenta</Text>
          <Text className="text-gray-900 dark:text-white text-base font-medium">{user?.email}</Text>
          {isAdmin && (
            <View className="self-start bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              <Text className="text-indigo-600 dark:text-indigo-300 text-xs font-bold text-center">Administrador</Text>
            </View>
          )}
        </View>

        {/* Tarjeta de Apariencia */}
        <View className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-5 border border-gray-200 dark:border-gray-800">
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Apariencia</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-900 dark:text-white text-base font-medium">Modo oscuro</Text>
              <Text className="text-gray-500 text-xs">Cambia el aspecto visual de la app</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
              thumbColor={Platform.OS === 'ios' ? '#fff' : isDark ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Botón Salir */}
        <View className="mt-4">
          <Button label="Cerrar sesión" onPress={signOut} variant="danger" />
        </View>

      </View>

      <SocialFooter isDark={isDark} />
    </ScrollView>
  )
}