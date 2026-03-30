import { useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import Button from '../../components/Button'
import Input from '../../components/Input'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) Alert.alert('Error', error.message)
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    const redirectTo = Linking.createURL('/(auth)/login')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo,
          skipBrowserRedirect: Platform.OS !== 'web' 
        },
      })

      if (error) throw error

      if (Platform.OS !== 'web' && data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)
        
        if (result.type === 'success' && result.url) {
          // EXTRACCIÓN MANUAL: Corrige el error de redirección al login
          const urlParts = result.url.split('#')
          const params = new URLSearchParams(urlParts[1] || urlParts[0].split('?')[1])
          
          const access_token = params.get('access_token')
          const refresh_token = params.get('refresh_token')

          if (access_token && refresh_token) {
            await supabase.auth.setSession({ access_token, refresh_token })
          }
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error en autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView 
      className="flex-1 bg-gray-950" 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
    >
      <View className="items-center mb-8">
        <Text style={{ fontSize: 40 }} className="mb-2">🎮</Text>
        <Text className="text-white text-2xl font-bold">Panel Roblox</Text>
      </View>

      <View className="bg-gray-900 rounded-2xl p-6">
        <View className="gap-4">
          <Input label="Correo" isDark value={email} onChangeText={setEmail} placeholder="correo@ejemplo.com" />
          <Input label="Contraseña" isDark value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <Button label="Iniciar sesión" onPress={handleEmailLogin} loading={loading} />
        </View>

        <View className="flex-row items-center gap-2 my-6">
          <View className="flex-1 h-px bg-gray-700" /><Text className="text-gray-500 text-xs">o</Text><View className="flex-1 h-px bg-gray-700" />
        </View>

        <Button label="Continuar con Google" onPress={handleGoogleLogin} loading={loading} variant="outline" />
      </View>

      <TouchableOpacity className="mt-6 items-center" onPress={() => router.push('/(auth)/register' as any)}>
        <Text className="text-gray-400 text-sm">¿No tienes cuenta? <Text className="text-indigo-400 font-semibold">Regístrate</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  )
}