import { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { getJugadores, moderarJugador, entregarDiamantes, type ReporteMision } from '../../lib/supabase'
import PlayerTable from '../../components/PlayerTable' 

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

  const datosAgrupados = reportes.reduce((acc, item) => {
    if (!acc[item.player_name]) acc[item.player_name] = []
    acc[item.player_name].push(item)
    return acc
  }, {} as Record<string, ReporteMision[]>)

  if (loading) {
    return (
      <View className="flex-1 bg-white dark:bg-brand-black items-center justify-center">
        <ActivityIndicator color="#28D6F7" size="large" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-brand-black">
      <View className="px-6 pt-14 pb-6 gap-6">
        <View>
          <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Panel de jugadores</Text>
          <Text className="text-brand-blue dark:text-brand-sky text-sm font-semibold mt-1">
            {Object.keys(datosAgrupados).length} jugadores únicos registrados
          </Text>
        </View>

        <View>
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
      </View>
    </ScrollView>
  )
}