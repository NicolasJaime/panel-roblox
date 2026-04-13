import { View, Text, TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label: string
  error?: string
}

export default function Input({ label, error, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </Text>
      <TextInput
        className={`rounded-xl px-4 py-3 text-sm border focus:border-brand-blue dark:focus:border-brand-cyan ${
          error
            ? 'border-red-500'
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-dark text-gray-900 dark:text-white'
        }`}
        placeholderTextColor="#6b7280"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  )
}