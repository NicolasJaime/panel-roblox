import { Tabs } from 'expo-router'
import { useTheme } from '../../lib/useTheme'
import { Home, Gamepad2, Settings } from 'lucide-react-native' // <--- Importamos los íconos

export default function MainLayout() {
  const { isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: isDark ? '#000000' : '#ffffff', 
          borderTopColor: isDark ? '#111111' : '#f3f4f6',
          elevation: 0,
          shadowOpacity: 0
        },
        tabBarActiveTintColor: isDark ? '#28D6F7' : '#2650F0',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="panel"
        options={{
          title: 'Panel',
          tabBarIcon: ({ color }) => <Gamepad2 color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tabs>
  )
}