import * as Linking from 'expo-linking'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Gamepad2 } from 'lucide-react-native'
import { useState } from 'react'
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { supabase } from '../../lib/supabase'

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
    
    // AQUÍ ESTÁ EL CAMBIO CLAVE: Obligamos a Expo a usar tu esquema nativo
    const redirectTo = Linking.createURL('/(auth)/login', { scheme: 'panelroblox' })

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
          const parsedUrl = Linking.parse(result.url)
          const params = parsedUrl.queryParams || {}

          if (params.code) {
            const { error: sessionError } = await supabase.auth.exchangeCodeForSession(String(params.code))
            if (sessionError) throw sessionError
          } 
          else if (params.access_token && params.refresh_token) {
            await supabase.auth.setSession({ 
              access_token: String(params.access_token), 
              refresh_token: String(params.refresh_token) 
            })
          } else {
            throw new Error('La redirección de Google no incluyó credenciales válidas.')
          }
        }
      }
    } catch (error: any) {
      Alert.alert('Error en Google Login', error.message || 'Error desconocido al autenticar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView 
      className="flex-1 bg-white dark:bg-brand-black" 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
    >
      <View className="items-center mb-8">
        <View className="bg-brand-blue dark:bg-brand-azure p-4 rounded-3xl mb-4 shadow-sm">
          <Gamepad2 size={40} color="#ffffff" />
        </View>
        <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Panel Roblox</Text>
      </View>

      <View className="bg-gray-50 dark:bg-brand-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-900 shadow-sm">
        <View className="gap-2">
          <Input label="Correo" value={email} onChangeText={setEmail} placeholder="correo@ejemplo.com" autoCapitalize="none" />
          <Input label="Contraseña" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <View className="mt-2">
            <Button label="Iniciar sesión" onPress={handleEmailLogin} loading={loading} />
          </View>
        </View>

        <View className="flex-row items-center gap-4 my-6">
          <View className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">o continuar con</Text>
          <View className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </View>

        <Button label="Google" onPress={handleGoogleLogin} loading={loading} variant="outline" />
      </View>

      <TouchableOpacity className="mt-8 items-center" onPress={() => router.push('/(auth)/register' as any)}>
        <Text className="text-gray-500 dark:text-gray-400 text-sm">
          ¿No tienes cuenta? <Text className="text-brand-blue dark:text-brand-cyan font-bold">Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}