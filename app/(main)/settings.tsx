import { View, Text, Switch, ScrollView, Platform, TouchableOpacity } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { useTheme } from '../../lib/useTheme'
import { User, Palette, LogOut, ShieldCheck } from 'lucide-react-native'

export default function Settings() {
  const { user, isAdmin, signOut } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-brand-black">
      <View className="px-6 pt-14 pb-10 gap-8">
        <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Ajustes</Text>

        <View className="gap-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest ml-2">Perfil</Text>
          
          {/* Tarjeta de Cuenta */}
          <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-5 flex-row items-center gap-4 border border-gray-100 dark:border-gray-900 shadow-sm">
            <View className="w-12 h-12 bg-brand-blue/10 dark:bg-brand-cyan/10 rounded-full items-center justify-center">
              <User size={24} color={isDark ? '#28D6F7' : '#2650F0'} />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 dark:text-white text-base font-bold">{user?.email}</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Cuenta de administrador</Text>
            </View>
            {isAdmin && <ShieldCheck size={24} color="#10b981" />}
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest ml-2">Preferencias</Text>
          
          {/* Tarjeta de Apariencia */}
          <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-5 flex-row items-center justify-between border border-gray-100 dark:border-gray-900 shadow-sm">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 bg-purple-500/10 rounded-full items-center justify-center">
                <Palette size={20} color={isDark ? '#c084fc' : '#a855f7'} />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-bold">Modo oscuro</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#e5e7eb', true: '#2650F0' }}
              thumbColor={Platform.OS === 'ios' ? '#fff' : isDark ? '#28D6F7' : '#ffffff'}
            />
          </View>
        </View>

        <View className="gap-4 mt-4">
          {/* Botón Salir Estilizado como Tarjeta */}
          <TouchableOpacity 
            onPress={signOut}
            activeOpacity={0.7}
            className="bg-red-50 dark:bg-red-500/10 rounded-3xl p-5 flex-row items-center gap-4 border border-red-100 dark:border-red-500/20"
          >
            <View className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-full items-center justify-center">
              <LogOut size={20} color={isDark ? '#f87171' : '#dc2626'} />
            </View>
            <Text className="text-red-600 dark:text-red-400 text-base font-bold">Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}