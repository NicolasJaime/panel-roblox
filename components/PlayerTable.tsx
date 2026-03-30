import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import type { ReporteMision } from '../lib/supabase'
import Button from './Button'

type Props = {
  playerName: string
  misiones: ReporteMision[]
  isAdmin: boolean
  onKick: () => Promise<void>
  onBan: () => Promise<void>
  onDiamantes: (cantidad: number) => Promise<void>
}

export default function PlayerTable({ playerName, misiones, isAdmin, onKick, onBan, onDiamantes }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [diamantes, setDiamantes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAction = async (fn: () => Promise<void>, msg: string) => {
    setLoading(true)
    try { await fn(); Alert.alert('✅', msg) }
    catch { Alert.alert('Error', 'No se pudo completar') }
    finally { setLoading(false) }
  }

  return (
    <View className="bg-gray-100 dark:bg-gray-900 rounded-2xl mb-4 overflow-hidden border border-gray-200 dark:border-gray-800">
      <TouchableOpacity 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
        className={`p-4 flex-row justify-between items-center ${isOpen ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center">
            <Text className="text-white font-bold">{playerName.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View>
            <Text className="text-gray-900 dark:text-white font-bold text-lg">{playerName}</Text>
            <Text className="text-gray-500 dark:text-gray-500 text-xs">{misiones.length} misiones registradas</Text>
          </View>
        </View>
        <Text className="text-indigo-600 dark:text-indigo-400 font-bold">{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View className="p-4 bg-white/50 dark:bg-gray-950/50 border-t border-gray-200 dark:border-gray-800">
          <View className="flex-row border-b border-gray-200 dark:border-gray-800 pb-2 mb-2">
            <Text className="flex-1 text-gray-500 text-xs font-bold">MISIÓN</Text>
            <Text className="flex-1 text-gray-500 text-xs font-bold text-right">TIEMPO</Text>
          </View>
          
          {misiones.map((m) => (
            <View key={m.id} className="flex-row py-2 border-b border-gray-50 dark:border-gray-900">
              <Text className="flex-1 text-gray-700 dark:text-gray-300">Misión {m.numero_mision}</Text>
              <Text className="flex-1 text-indigo-600 dark:text-indigo-400 text-right font-mono">{m.tiempo_formateado}</Text>
            </View>
          ))}

          {isAdmin && (
            <View className="mt-6 gap-3">
              <Text className="text-gray-500 text-xs font-bold uppercase">Moderación</Text>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Button label="Kick" variant="outline" onPress={() => handleAction(onKick, 'Jugador expulsado')} />
                </View>
                <View className="flex-1">
                  <Button label="Ban" variant="danger" onPress={() => handleAction(onBan, 'Jugador baneado')} />
                </View>
              </View>

              <View className="flex-row gap-2 items-center mt-2">
                <TextInput
                  className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2"
                  placeholder="Cant. Diamantes"
                  placeholderTextColor="#6b7280"
                  keyboardType="numeric"
                  value={diamantes}
                  onChangeText={setDiamantes}
                />
                <Button label="Dar 💎" variant="success" 
                  onPress={() => handleAction(() => onDiamantes(Number(diamantes)), 'Diamantes enviados')} 
                />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}