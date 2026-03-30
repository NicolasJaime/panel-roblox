import { Tabs } from 'expo-router'
import { Text } from 'react-native'
import { useTheme } from '../../lib/useTheme'

export default function MainLayout() {
  const { isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: isDark ? '#111827' : '#ffffff', 
          borderTopColor: isDark ? '#1f2937' : '#e5e7eb' 
        },
        tabBarActiveTintColor: '#818cf8',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="panel"
        options={{
          title: 'Panel',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🎮</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙️</Text>,
        }}
      />
    </Tabs>
  )
}