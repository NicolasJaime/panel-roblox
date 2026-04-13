import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import { ReactNode } from 'react'

type Props = {
  label: string
  onPress: () => void
  loading?: boolean
  variant?: 'primary' | 'danger' | 'outline' | 'success'
  disabled?: boolean
  icon?: ReactNode // <--- Agregamos esta propiedad para los íconos
}

const variants = {
  primary: 'bg-brand-blue dark:bg-brand-azure active:opacity-80',
  danger:  'bg-red-500 active:bg-red-600',
  outline: 'border border-brand-blue dark:border-brand-cyan bg-transparent',
  success: 'bg-emerald-500 active:bg-emerald-600',
}

const textVariants = {
  primary: 'text-white',
  danger:  'text-white',
  outline: 'text-brand-blue dark:text-brand-cyan font-bold',
  success: 'text-white',
}

export default function Button({ label, onPress, loading, variant = 'primary', disabled, icon }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl px-4 py-3 items-center justify-center flex-row gap-2 ${variants[variant]} ${disabled ? 'opacity-50' : ''}`}
    >
      {loading && <ActivityIndicator size="small" color="#fff" />}
      {/* Si hay un ícono y no está cargando, lo mostramos */}
      {icon && !loading && <View>{icon}</View>}
      <Text className={`font-semibold text-sm ${textVariants[variant]}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}