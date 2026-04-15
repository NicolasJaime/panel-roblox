import { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native'
import { useAuth } from '../../lib/useAuth'
import { getJugadores, moderarJugador, entregarDiamantes, type ReporteMision } from '../../lib/supabase'
import PlayerTable from '../../components/PlayerTable' 
import { Search } from 'lucide-react-native'

export default function Panel() {
  const { isAdmin } = useAuth()
  const [reportes, setReportes] = useState<ReporteMision[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

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

  // 1. Agrupamos todos los datos primero
  const datosAgrupados = reportes.reduce((acc, item) => {
    if (!acc[item.player_name]) acc[item.player_name] = []
    acc[item.player_name].push(item)
    return acc
  }, {} as Record<string, ReporteMision[]>)

  // 2. Filtramos la lista de nombres según el buscador
  const jugadoresFiltrados = Object.keys(datosAgrupados).filter((playerName) => 
    playerName.toLowerCase().includes(searchText.toLowerCase())
  )

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
          <Text className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Jugadores</Text>
          <Text className="text-brand-blue dark:text-brand-sky text-sm font-semibold mt-1">
            {Object.keys(datosAgrupados).length} registrados en total
          </Text>
        </View>

        {/* Buscador */}
        <View className="flex-row items-center bg-gray-50 dark:bg-brand-dark rounded-2xl px-4 py-3 border border-gray-100 dark:border-gray-900 shadow-sm">
          <Search size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-sm text-gray-900 dark:text-white"
            placeholder="Buscar por nombre..."
            placeholderTextColor="#6b7280"
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View>
          {jugadoresFiltrados.length === 0 ? (
            <Text className="text-center text-gray-400 mt-10">No se encontraron jugadores.</Text>
          ) : (
            jugadoresFiltrados.map((playerName) => (
              <PlayerTable
                key={playerName}
                playerName={playerName}
                misiones={datosAgrupados[playerName]}
                isAdmin={isAdmin}
                onKick={() => moderarJugador(playerName, 'kick', 'Expulsado desde el Panel')}
                onBan={() => moderarJugador(playerName, 'ban', 'Baneado desde el Panel')}
                onDiamantes={(cantidad) => entregarDiamantes(playerName, cantidad)}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  )
}