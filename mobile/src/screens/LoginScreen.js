import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { COLORS } from '../data/mockData';
import FeedbackModal from '../components/FeedbackModal';

const C = COLORS;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, message: '' });
  const { login } = useAuth();

  function validar() {
    const e = {};
    if (!email.trim() || !email.includes('@')) e.email = 'Digite um e-mail válido.';
    if (senha.length < 3) e.senha = 'Senha muito curta.';
    return e;
  }

  async function handleLogin() {
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setErros({});
    setLoading(true);
    try {
      const res = await api.login(email, senha);
      login(res.data.user, res.data.token);
    } catch (err) {
      setModal({ visible: true, message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <FeedbackModal
        visible={modal.visible}
        type="error"
        title="Falha no login"
        message={modal.message}
        onClose={() => setModal({ visible: false, message: '' })}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <View style={s.circle1} />
          <View style={s.circle2} />

          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.logoWrap}>
            <Text style={s.logo}>Dev4all</Text>
          </TouchableOpacity>

          <View style={s.card}>
            <Text style={s.cardTitle}>Bem-vindo de volta</Text>
            <Text style={s.cardSubtitle}>Entre na sua conta Dev4all</Text>

            <View style={s.tabs}>
              <View style={[s.tabBtn, s.tabBtnActive]}>
                <Text style={[s.tabText, s.tabTextActive]}>Login</Text>
              </View>
              <TouchableOpacity style={s.tabBtn} onPress={() => navigation.navigate('Registro')}>
                <Text style={s.tabText}>Registrar-se</Text>
              </TouchableOpacity>
            </View>

            <View style={s.campo}>
              <Text style={s.label}>E-mail</Text>
              <TextInput
                style={[s.input, erros.email && s.inputErro]}
                placeholder="seu@email.com"
                placeholderTextColor={C.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(v) => { setEmail(v); setErros((p) => ({ ...p, email: '' })); }}
              />
              {erros.email ? <Text style={s.erroText}>{erros.email}</Text> : null}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Senha</Text>
              <View style={s.passwordRow}>
                <TextInput
                  style={[s.input, { flex: 1 }, erros.senha && s.inputErro]}
                  placeholder="••••••••"
                  placeholderTextColor={C.textMuted}
                  secureTextEntry={!showSenha}
                  value={senha}
                  onChangeText={(v) => { setSenha(v); setErros((p) => ({ ...p, senha: '' })); }}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowSenha((v) => !v)}>
                  <Feather name={showSenha ? 'eye-off' : 'eye'} size={18} color={C.textMuted} />
                </TouchableOpacity>
              </View>
              {erros.senha ? <Text style={s.erroText}>{erros.senha}</Text> : null}
            </View>

            <TouchableOpacity style={[s.btnPrimary, loading && s.btnDisabled]} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnPrimaryText}>Entrar →</Text>}
            </TouchableOpacity>

            <View style={s.dividerRow}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>ou</Text>
              <View style={s.dividerLine} />
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
  campo: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: C.textDark, marginBottom: 6 },
  link: { fontSize: 13, color: C.blue, fontWeight: '600' },
  input: { backgroundColor: C.bgLight, borderRadius: 8, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: C.textDark },
  inputErro: { borderColor: '#ef4444' },
  erroText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeBtn: { padding: 4 },
  btnPrimary: { backgroundColor: C.blue, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 4, marginBottom: 16 },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: C.border },
  dividerText: { color: C.textMuted, fontSize: 13 },
  footerText: { fontSize: 13, color: C.textMuted, textAlign: 'center' },
  copyright: { color: C.textMuted, fontSize: 11, textAlign: 'center', marginTop: 20 },
});
