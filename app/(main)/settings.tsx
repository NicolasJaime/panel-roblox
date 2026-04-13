import { View, Text, Switch, ScrollView, Platform } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import Button from '../../components/Button'
import SocialFooter from '../../components/SocialFooter'

export default function Settings() {
  const { user, isAdmin, signOut } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-brand-black">
      <View className="px-6 pt-14 pb-6 gap-6">

        <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Ajustes</Text>

        {/* Tarjeta de Cuenta */}
        <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 gap-2 border border-gray-100 dark:border-gray-900 shadow-sm">
          <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">Cuenta</Text>
          <Text className="text-gray-900 dark:text-white text-base font-bold">{user?.email}</Text>
          {isAdmin && (
            <View className="mt-1 self-start bg-brand-blue/10 dark:bg-brand-cyan/20 px-4 py-1.5 rounded-full border border-brand-blue/20 dark:border-brand-cyan/30">
              <Text className="text-brand-blue dark:text-brand-cyan text-xs font-black text-center uppercase tracking-wider">Administrador</Text>
            </View>
          )}
        </View>

        {/* Tarjeta de Apariencia */}
        <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-900 shadow-sm">
          <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Apariencia</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-900 dark:text-white text-base font-bold">Modo oscuro</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">Cambia el aspecto visual de la app</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#e5e7eb', true: '#2650F0' }}
              thumbColor={Platform.OS === 'ios' ? '#fff' : isDark ? '#28D6F7' : '#ffffff'}
            />
          </View>
        </View>

        {/* Botón Salir */}
        <View className="mt-2">
          <Button label="Cerrar sesión" onPress={signOut} variant="danger" />
        </View>

      </View>

      <SocialFooter />
    </ScrollView>
  )
}