import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../data/mockData';

const C = COLORS;

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const initials = user?.nome
    ? user.nome.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'AD';

  const menuItems = [
    { icon: 'file-text', label: 'Meus Orçamentos', onPress: () => {} },
    { icon: 'bell',      label: 'Notificações',    onPress: () => {} },
    { icon: 'settings',  label: 'Configurações',   onPress: () => {} },
    { icon: 'help-circle', label: 'Suporte',       onPress: () => {} },
  ];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Animated.View entering={FadeInDown.duration(450)} style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{initials}</Text>
          </View>
          <Text style={s.name}>{user?.nome || 'Admin'}</Text>
          <Text style={s.email}>{user?.email || ''}</Text>
          <View style={s.badge}>
            <Feather name="shield" size={11} color="#2563eb" />
            <Text style={s.badgeText}>{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(120)} style={s.card}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[s.menuItem, i < menuItems.length - 1 && s.menuItemBorder]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={s.menuIcon}>
                <Feather name={item.icon} size={18} color={C.blue} />
              </View>
              <Text style={s.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={16} color={C.textMuted} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(220)}>
          <TouchableOpacity
            style={s.logoutBtn}
            onPress={logout}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={16} color="#ef4444" />
            <Text style={s.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgLight },

  header: {
    backgroundColor: C.navyDark,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  name: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  email: { color: C.textMuted, fontSize: 13, marginBottom: 12 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(37,99,235,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: { color: '#2563eb', fontSize: 12, fontWeight: '700' },

  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(37,99,235,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: C.textDark },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: { color: '#ef4444', fontWeight: '700', fontSize: 15 },
});
