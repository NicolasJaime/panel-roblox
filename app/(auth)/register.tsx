import { useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'
import Button from '../../components/Button'
import Input from '../../components/Input'

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
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="flex-grow justify-center px-6 py-12">
      <View className="items-center mb-8">
        <Text className="text-4xl mb-2">🎮</Text>
        <Text className="text-white text-2xl font-bold">Crear cuenta</Text>
        <Text className="text-gray-400 text-sm mt-1">Únete al panel de misiones</Text>
      </View>

      <View className="bg-gray-900 rounded-2xl p-6 gap-4">
        <Input label="Correo" isDark value={email} onChangeText={setEmail}
          placeholder="correo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Contraseña" isDark value={password} onChangeText={setPassword}
          placeholder="••••••••" secureTextEntry />
        <Input label="Confirmar contraseña" isDark value={confirm} onChangeText={setConfirm}
          placeholder="••••••••" secureTextEntry />
        <Button label="Registrarse" onPress={handleRegister} loading={loading} />
      </View>

      <TouchableOpacity className="mt-4 items-center" onPress={() => router.back()}>
        <Text className="text-gray-400 text-sm">
          ¿Ya tienes cuenta? <Text className="text-indigo-400 font-semibold">Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}