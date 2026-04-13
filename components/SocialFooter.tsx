import { View, Text, TouchableOpacity, Linking } from 'react-native'

const SOCIALS = [
  {
    label: 'Roblox',
    url: 'https://www.roblox.com/es/games/TU_JUEGO_ID',
    // Ajusté los colores para que se vean bien en ambos modos
    color: 'text-red-500 dark:text-red-400',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/TU_USUARIO',
    color: 'text-pink-500 dark:text-pink-400',
  },
]

export default function SocialFooter() {
  return (
    <View className="py-6 border-t border-gray-100 dark:border-gray-900 items-center gap-3">
      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
        Síguenos en
      </Text>
      <View className="flex-row gap-6">
        {SOCIALS.map((s) => (
          <TouchableOpacity key={s.label} onPress={() => Linking.openURL(s.url)}>
            <Text className={`text-sm font-black tracking-wide ${s.color}`}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}