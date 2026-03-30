import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Admin = {
  id: string
  email: string
  nombre: string
  activo: boolean
  created_at: string
}

export type ReporteMision = {
  id: string
  player_name: string
  numero_mision: number
  tiempo_formateado: string
  tiempo_segundos: number
  created_at: string
}

export type ListaNegra = {
  id: string
  username: string
  tipo: 'kick' | 'ban'
  razon: string
  activo: boolean
  created_at: string
}

export type EntregarDiamante = {
  id: string
  username: string
  cantidad: number
  razon?: string
  entregado: boolean
  updated_at: string
}

export const checkIsAdmin = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admins')
    .select('id, activo')
    .eq('email', email)
    .eq('activo', true)
    .single()
  if (error || !data) return false
  return true
}

export const getJugadores = async () => {
  const { data, error } = await supabase
    .from('reportes_misiones')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const entregarDiamantes = async (username: string, cantidad: number, razon?: string) => {
  const { error } = await supabase
    .from('entregar_diamantes')
    .insert({ username, cantidad, razon: razon ?? '', entregado: false })
  if (error) throw error
}

export const moderarJugador = async (username: string, tipo: 'kick' | 'ban', razon: string) => {
  const { error } = await supabase
    .from('lista_negra')
    .insert({ username, tipo, razon, activo: true })
  if (error) throw error
}

export const levantarBan = async (id: string) => {
  const { error } = await supabase
    .from('lista_negra')
    .update({ activo: false })
    .eq('id', id)
  if (error) throw error
}