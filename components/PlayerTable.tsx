import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import type { ReporteMision } from '../lib/supabase'
import Button from './Button'
import { ChevronDown, ChevronUp, Gem } from 'lucide-react-native' // <--- Reemplazos para ▲, ▼ y 💎

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
    <View className="bg-white dark:bg-brand-dark rounded-2xl mb-4 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
      <TouchableOpacity 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
        className={`p-4 flex-row justify-between items-center ${isOpen ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full bg-brand-blue dark:bg-brand-azure items-center justify-center shadow-sm">
            <Text className="text-white font-black text-lg">{playerName.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View>
            <Text className="text-gray-900 dark:text-white font-black text-lg">{playerName}</Text>
            <Text className="text-brand-blue dark:text-brand-sky text-xs font-semibold">{misiones.length} misiones registradas</Text>
          </View>
        </View>
        
        {/* Aquí reemplazamos las flechas feas por íconos SVG */}
        {isOpen 
          ? <ChevronUp size={24} color="#76B6F0" /> 
          : <ChevronDown size={24} color="#76B6F0" />
        }
      </TouchableOpacity>

      {isOpen && (
        <View className="p-4 bg-gray-50/50 dark:bg-brand-black/50 border-t border-gray-100 dark:border-gray-800">
          <View className="flex-row border-b border-gray-200 dark:border-gray-800 pb-2 mb-2">
            <Text className="flex-1 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Misión</Text>
            <Text className="flex-1 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase text-right">Tiempo</Text>
          </View>
          
          {misiones.map((m) => (
            <View key={m.id} className="flex-row py-2 border-b border-gray-100 dark:border-gray-900">
              <Text className="flex-1 text-gray-700 dark:text-gray-300 font-medium">Misión {m.numero_mision}</Text>
              <Text className="flex-1 text-brand-blue dark:text-brand-cyan text-right font-mono font-medium">{m.tiempo_formateado}</Text>
            </View>
          ))}

          {isAdmin && (
            <View className="mt-6 gap-3">
              <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">Moderación & Recompensas</Text>
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
                  className="flex-1 bg-white dark:bg-brand-black text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-800"
                  placeholder="Cant. Diamantes"
                  placeholderTextColor="#6b7280"
                  keyboardType="numeric"
                  value={diamantes}
                  onChangeText={setDiamantes}
                />
                <Button 
                  label="Dar" 
                  variant="success" 
                  icon={<Gem size={16} color="#ffffff" />} // <--- Ícono de diamante real
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