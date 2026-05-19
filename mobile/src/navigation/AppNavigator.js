import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import HomeScreen          from '../screens/HomeScreen';
import PortfolioScreen     from '../screens/PortfolioScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import SobreScreen         from '../screens/SobreScreen';
import ContactScreen       from '../screens/ContactScreen';
import LoginScreen         from '../screens/LoginScreen';
import RegistroScreen      from '../screens/RegistroScreen';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const BLUE = '#2563eb';
const MUTED = '#9ca3af';

function PortfolioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PortfolioList"  component={PortfolioScreen} />
      <Stack.Screen name="ProjectDetail"  component={ProjectDetailScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"    component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home:      'home',
            'Portfólio': 'briefcase',
            'Sobre nós': 'users',
            Contato:   'mail',
            Login:     'user',
          };
          return <Feather name={icons[route.name] || 'circle'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"       component={HomeScreen} />
      <Tab.Screen name="Portfólio"  component={PortfolioStack} />
      <Tab.Screen name="Sobre nós"  component={SobreScreen} />
      <Tab.Screen name="Contato"    component={ContactScreen} />
      <Tab.Screen name="Login"      component={AuthStack} />
    </Tab.Navigator>
  );
}
