import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

type Props = {
  label: string
  onPress: () => void
  loading?: boolean
  variant?: 'primary' | 'danger' | 'outline' | 'success'
  disabled?: boolean
}

const variants = {
  primary: 'bg-indigo-600 active:bg-indigo-700',
  danger:  'bg-red-500 active:bg-red-600',
  outline: 'border border-indigo-500 bg-transparent',
  success: 'bg-emerald-500 active:bg-emerald-600',
}

const textVariants = {
  primary: 'text-white',
  danger:  'text-white',
  outline: 'text-indigo-500',
  success: 'text-white',
}

export default function Button({ label, onPress, loading, variant = 'primary', disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl px-4 py-3 items-center justify-center flex-row gap-2 ${variants[variant]} ${disabled ? 'opacity-50' : ''}`}
    >
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <Text className={`font-semibold text-sm ${textVariants[variant]}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}