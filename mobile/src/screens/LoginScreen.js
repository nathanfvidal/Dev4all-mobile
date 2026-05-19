import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../data/mockData';

const C = COLORS;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState('');

  function handleLogin() {
    if (!email.trim() || !email.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }
    if (senha.length < 3) {
      setErro('Senha muito curta.');
      return;
    }
    setErro('');
    navigation.getParent()?.navigate('Home');
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

          {/* Circles decoration */}
          <View style={s.circle1} />
          <View style={s.circle2} />

          {/* Logo */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.logoWrap}>
            <Text style={s.logo}>Dev4all</Text>
          </TouchableOpacity>

          <View style={s.card}>
            <Text style={s.cardTitle}>Bem-vindo de volta</Text>
            <Text style={s.cardSubtitle}>Entre na sua conta Dev4all</Text>

            {/* Tab switcher */}
            <View style={s.tabs}>
              <View style={[s.tabBtn, s.tabBtnActive]}>
                <Text style={[s.tabText, s.tabTextActive]}>Login</Text>
              </View>
              <TouchableOpacity style={s.tabBtn} onPress={() => navigation.navigate('Registro')}>
                <Text style={s.tabText}>Registrar-se</Text>
              </TouchableOpacity>
            </View>

            {erro ? <Text style={s.errorMsg}>{erro}</Text> : null}

            <View style={s.campo}>
              <Text style={s.label}>E-mail</Text>
              <TextInput
                style={s.input}
                placeholder="seu@email.com"
                placeholderTextColor={C.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={s.campo}>
              <View style={s.labelRow}>
                <Text style={s.label}>Senha</Text>
                <TouchableOpacity><Text style={s.link}>Esqueceu a senha?</Text></TouchableOpacity>
              </View>
              <View style={s.passwordRow}>
                <TextInput
                  style={[s.input, { flex: 1 }]}
                  placeholder="••••••••"
                  placeholderTextColor={C.textMuted}
                  secureTextEntry={!showSenha}
                  value={senha}
                  onChangeText={setSenha}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowSenha((v) => !v)}>
                  <Feather name={showSenha ? 'eye-off' : 'eye'} size={18} color={C.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={s.btnPrimary} onPress={handleLogin}>
              <Text style={s.btnPrimaryText}>Entrar →</Text>
            </TouchableOpacity>

            <View style={s.dividerRow}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>ou</Text>
              <View style={s.dividerLine} />
            </View>

            <View style={s.socialRow}>
              <TouchableOpacity style={s.socialBtn}>
                <Feather name="globe" size={16} color={C.textMid} />
                <Text style={s.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.socialBtn}>
                <Feather name="github" size={16} color={C.textMid} />
                <Text style={s.socialBtnText}>GitHub</Text>
              </TouchableOpacity>
            </View>

            <Text style={s.footerText}>
              Não tem conta?{' '}
              <Text style={s.link} onPress={() => navigation.navigate('Registro')}>Criar conta grátis</Text>
            </Text>
          </View>

          <Text style={s.copyright}>© 2026 Dev4all. Todos os direitos reservados.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.navyDark },
  scroll: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  circle1: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(37,99,235,0.08)', top: -100, right: -80 },
  circle2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(37,99,235,0.05)', bottom: 60, left: -60 },
  logoWrap: { alignItems: 'center', marginBottom: 28 },
  logo: { color: '#fff', fontSize: 28, fontWeight: '800' },
  card: { backgroundColor: C.white, borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 8 },
  cardTitle: { fontSize: 24, fontWeight: '800', color: C.textDark, textAlign: 'center', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: C.textMuted, textAlign: 'center', marginBottom: 20 },
  tabs: { flexDirection: 'row', backgroundColor: C.bgLight, borderRadius: 10, padding: 4, marginBottom: 20 },
  tabBtn: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  tabBtnActive: { backgroundColor: C.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '600', color: C.textMuted },
  tabTextActive: { color: C.textDark },
  errorMsg: { backgroundColor: '#fef2f2', color: '#ef4444', fontSize: 13, padding: 10, borderRadius: 8, marginBottom: 12, textAlign: 'center' },
  campo: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '600', color: C.textDark },
  link: { fontSize: 13, color: C.blue, fontWeight: '600' },
  input: { backgroundColor: C.bgLight, borderRadius: 8, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: C.textDark },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeBtn: { padding: 4 },
  btnPrimary: { backgroundColor: C.blue, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: C.border },
  dividerText: { color: C.textMuted, fontSize: 13 },
  socialRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  socialBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, borderWidth: 1.5, borderColor: C.border, paddingVertical: 11, backgroundColor: C.bgLight },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: C.textMid },
  footerText: { fontSize: 13, color: C.textMuted, textAlign: 'center' },
  copyright: { color: C.textMuted, fontSize: 11, textAlign: 'center', marginTop: 20 },
});
