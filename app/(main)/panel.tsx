import { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { getJugadores, moderarJugador, entregarDiamantes, type ReporteMision } from '../../lib/supabase'
import PlayerTable from '../../components/PlayerTable' // Importamos el nuevo componente

export default function Panel() {
  const { isAdmin } = useAuth()
  const [reportes, setReportes] = useState<ReporteMision[]>([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try {
      const data = await getJugadores()
      setReportes(data ?? [])
    } catch {
      Alert.alert('Error', 'No se pudieron cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  // LÓGICA DE AGRUPACIÓN:
  // Convertimos la lista plana en un objeto: { "antony8752": [mision1, mision2], ... }
  const datosAgrupados = reportes.reduce((acc, item) => {
    if (!acc[item.player_name]) acc[item.player_name] = []
    acc[item.player_name].push(item)
    return acc
  }, {} as Record<string, ReporteMision[]>)

  if (loading) {
    return (
      <View className="flex-1 bg-gray-950 items-center justify-center">
        <ActivityIndicator color="#818cf8" size="large" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <View className="px-4 pt-14 pb-6 gap-4">
        <Text className="text-white text-2xl font-bold">Panel de jugadores</Text>
        <Text className="text-gray-400 text-sm">
          {Object.keys(datosAgrupados).length} jugadores únicos registrados
        </Text>

        {/* Renderizamos una TABLA por cada nombre de jugador único */}
        {Object.keys(datosAgrupados).map((playerName) => (
          <PlayerTable
            key={playerName}
            playerName={playerName}
            misiones={datosAgrupados[playerName]}
            isAdmin={isAdmin}
            onKick={() => moderarJugador(playerName, 'kick', 'Expulsado desde el Panel')}
            onBan={() => moderarJugador(playerName, 'ban', 'Baneado desde el Panel')}
            onDiamantes={(cantidad) => entregarDiamantes(playerName, cantidad)}
          />
        ))}
      </View>
    </ScrollView>
  )
}