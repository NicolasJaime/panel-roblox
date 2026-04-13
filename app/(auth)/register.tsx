import { useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Gamepad2 } from 'lucide-react-native'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      Alert.alert('Error', error.message)
    } else {
      Alert.alert('¡Listo!', 'Revisa tu correo para confirmar tu cuenta')
      router.replace('/(auth)/login' as any)
    }
    setLoading(false)
  }

  return (
    <ScrollView 
      className="flex-1 bg-white dark:bg-brand-black" 
      contentContainerClassName="flex-grow justify-center px-6 py-12"
    >
      <View className="items-center mb-8">
      <View className="items-center mb-8">
        <View className="bg-brand-blue dark:bg-brand-azure p-4 rounded-3xl mb-4 shadow-sm">
          <Gamepad2 size={40} color="#ffffff" />
        </View>
        <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Panel Roblox</Text>
      </View>
        <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Crear cuenta</Text>
        <Text className="text-gray-500 dark:text-brand-sky text-sm mt-1 font-medium">Únete al panel de misiones</Text>
      </View>

      <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 gap-2 border border-gray-100 dark:border-gray-900 shadow-sm">
        <Input label="Correo" value={email} onChangeText={setEmail}
          placeholder="correo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Contraseña" value={password} onChangeText={setPassword}
          placeholder="••••••••" secureTextEntry />
        <Input label="Confirmar contraseña" value={confirm} onChangeText={setConfirm}
          placeholder="••••••••" secureTextEntry />
        
        <View className="mt-2">
          <Button label="Registrarse" onPress={handleRegister} loading={loading} />
        </View>
      </View>

      <TouchableOpacity className="mt-8 items-center" onPress={() => router.back()}>
        <Text className="text-gray-500 dark:text-gray-400 text-sm">
          ¿Ya tienes cuenta? <Text className="text-brand-blue dark:text-brand-cyan font-bold">Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}