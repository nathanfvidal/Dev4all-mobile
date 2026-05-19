import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../data/mockData';

const C = COLORS;

export default function RegistroScreen({ navigation }) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [showSenha, setShowSenha] = useState(false);
  const [erros, setErros] = useState({});

  function validar() {
    const e = {};
    if (!form.nome.trim())         e.nome = 'Nome é obrigatório';
    if (!form.email.includes('@')) e.email = 'E-mail inválido';
    if (form.senha.length < 8)    e.senha = 'Mínimo 8 caracteres';
    return e;
  }

  function handleRegistrar() {
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setErros({});
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

          <View style={s.circle1} />
          <View style={s.circle2} />

          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.logoWrap}>
            <Text style={s.logo}>Dev4all</Text>
          </TouchableOpacity>

          <View style={s.card}>
            <Text style={s.cardTitle}>Criar conta grátis</Text>
            <Text style={s.cardSubtitle}>Junte-se à Dev4all hoje</Text>

            <View style={s.tabs}>
              <TouchableOpacity style={s.tabBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={s.tabText}>Login</Text>
              </TouchableOpacity>
              <View style={[s.tabBtn, s.tabBtnActive]}>
                <Text style={[s.tabText, s.tabTextActive]}>Registrar-se</Text>
              </View>
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Nome Completo</Text>
              <TextInput
                style={[s.input, erros.nome && s.inputErro]}
                placeholder="Seu nome completo"
                placeholderTextColor={C.textMuted}
                value={form.nome}
                onChangeText={(v) => setForm({ ...form, nome: v })}
              />
              {erros.nome && <Text style={s.erroText}>{erros.nome}</Text>}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>E-mail</Text>
              <TextInput
                style={[s.input, erros.email && s.inputErro]}
                placeholder="seu@email.com"
                placeholderTextColor={C.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
              />
              {erros.email && <Text style={s.erroText}>{erros.email}</Text>}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Senha</Text>
              <View style={s.passwordRow}>
                <TextInput
                  style={[s.input, { flex: 1 }, erros.senha && s.inputErro]}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={C.textMuted}
                  secureTextEntry={!showSenha}
                  value={form.senha}
                  onChangeText={(v) => setForm({ ...form, senha: v })}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowSenha((v) => !v)}>
                  <Feather name={showSenha ? 'eye-off' : 'eye'} size={18} color={C.textMuted} />
                </TouchableOpacity>
              </View>
              {erros.senha && <Text style={s.erroText}>{erros.senha}</Text>}
            </View>

            <TouchableOpacity style={s.btnPrimary} onPress={handleRegistrar}>
              <Text style={s.btnPrimaryText}>Criar Conta →</Text>
            </TouchableOpacity>

            <Text style={s.footerText}>
              Já tem conta?{' '}
              <Text style={s.link} onPress={() => navigation.navigate('Login')}>Fazer login</Text>
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
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  footerText: { fontSize: 13, color: C.textMuted, textAlign: 'center' },
  copyright: { color: C.textMuted, fontSize: 11, textAlign: 'center', marginTop: 20 },
});
