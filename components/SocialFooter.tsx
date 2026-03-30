import { View, Text, TouchableOpacity, Linking } from 'react-native'

const SOCIALS = [
  {
    label: 'Roblox',
    url: 'https://www.roblox.com/es/games/TU_JUEGO_ID',
    color: 'text-red-400',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/TU_USUARIO',
    color: 'text-pink-400',
  },
]

type Props = { isDark?: boolean }

export default function SocialFooter({ isDark }: Props) {
  return (
    <View className={`py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} items-center gap-2`}>
      <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Síguenos en
      </Text>
      <View className="flex-row gap-4">
        {SOCIALS.map((s) => (
          <TouchableOpacity key={s.label} onPress={() => Linking.openURL(s.url)}>
            <Text className={`text-sm font-semibold ${s.color}`}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}