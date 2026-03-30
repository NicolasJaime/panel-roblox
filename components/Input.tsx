import { View, Text, TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label: string
  error?: string
  isDark?: boolean // Este prop ahora se sincroniza con el tema
}

export default function Input({ label, error, isDark, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </Text>
      <TextInput
        className={`rounded-xl px-4 py-3 text-sm border ${
          error
            ? 'border-red-500'
            : isDark
            ? 'border-gray-600 bg-gray-800 text-white'
            : 'border-gray-300 bg-white text-gray-900'
        }`}
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  )
}