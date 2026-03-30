import { useState } from 'react'
import { View, Text, Alert, TextInput } from 'react-native'
import type { ReporteMision } from '../lib/supabase'
import Button from './Button'

type Props = {
  jugador: ReporteMision
  isAdmin: boolean
  onKick: () => Promise<void>
  onBan: () => Promise<void>
  onDiamantes: (cantidad: number) => Promise<void>
}

export default function PlayerCard({ jugador, isAdmin, onKick, onBan, onDiamantes }: Props) {
  const [diamantes, setDiamantes] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (fn: () => Promise<void>, msg: string) => {
    setLoading(true)
    try { await fn(); Alert.alert('✅', msg) }
    catch { Alert.alert('Error', 'No se pudo completar la acción') }
    finally { setLoading(false) }
  }

  return (
    <View className="bg-gray-900 rounded-2xl p-4 gap-3">
      {/* Header */}
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-indigo-800 items-center justify-center">
          <Text className="text-white font-bold text-sm">
            {jugador.player_name ? jugador.player_name.slice(0, 2).toUpperCase() : '??'}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold">{jugador.player_name}</Text>
          {/* AQUÍ ESTÁ EL CAMBIO: Mostramos la misión y el tiempo formateado */}
          <Text className="text-gray-400 text-xs">
            Misión {jugador.numero_mision} • ⏱️ {jugador.tiempo_formateado}
          </Text>
        </View>
      </View>

      {/* Acciones admin */}
      {isAdmin && (
        <>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <Button label="Kick" onPress={() => handle(onKick, 'Kick aplicado')}
                variant="outline" loading={loading} />
            </View>
            <View className="flex-1">
              <Button label="Ban" onPress={() => handle(onBan, 'Ban aplicado')}
                variant="danger" loading={loading} />
            </View>
          </View>

          <View className="flex-row gap-2 items-center">
            <TextInput
              className="flex-1 bg-gray-800 text-white rounded-xl px-3 py-2 text-sm"
              placeholder="💎 Diamantes"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={diamantes}
              onChangeText={setDiamantes}
            />
            <View className="w-24">
              <Button label="Dar" variant="success" loading={loading}
                onPress={() => handle(() => onDiamantes(Number(diamantes)), 'Diamantes enviados')} />
            </View>
          </View>
        </>
      )}
    </View>
  )
}