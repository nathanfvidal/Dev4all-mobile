import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../data/mockData';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';

const C = COLORS;
const CHIPS = ['Consultoria', 'Desenvolvimento', 'Design', 'Marketing', 'Outro'];

export default function ContactScreen({ navigation }) {
  const { token } = useAuth();
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', descricao: '' });
  const [chips, setChips] = useState([]);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [modal, setModal] = useState({ visible: false, message: '' });
  const [copiado, setCopiado] = useState(false);

  function toggleChip(c) {
    setChips((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
    setErros((p) => ({ ...p, chips: '' }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim())         e.nome = 'Nome é obrigatório';
    if (!form.email.includes('@')) e.email = 'E-mail inválido';
    if (!form.telefone.trim())     e.telefone = 'Telefone é obrigatório';
    if (!form.descricao.trim())    e.descricao = 'Descrição é obrigatória';
    if (chips.length === 0)        e.chips = 'Selecione ao menos um tipo de serviço';
    return e;
  }

  async function handleEnviar() {
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setErros({});
    setLoading(true);
    try {
      const res = await api.createQuote({
        nomeCompleto: form.nome,
        email: form.email,
        telefone: form.telefone,
        tipoServico: chips,
        descricao: form.descricao,
      }, token);
      setCodigoRastreio(res.codigoRastreio || '');
      setEnviado(true);
    } catch (err) {
      setModal({ visible: true, message: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleCopiar() {
    await Clipboard.setStringAsync(codigoRastreio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  function handleLimpar() {
    setForm({ nome: '', email: '', telefone: '', descricao: '' });
    setChips([]);
    setErros({});
    setEnviado(false);
    setCodigoRastreio('');
  }

  if (enviado) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.pageHero}>
          <Text style={s.pageLabel}>CONTATO</Text>
          <Text style={s.pageTitle}>Formulário de Orçamento</Text>
        </View>
        <View style={s.successBox}>
          <View style={s.successIcon}><Feather name="check-circle" size={52} color="#22c55e" /></View>
          <Text style={s.successTitle}>Orçamento Enviado!</Text>
          <Text style={s.successMsg}>
            Obrigado, {form.nome.split(' ')[0]}!{'\n'}Responderemos em até 24 horas no e-mail{'\n'}{form.email}.
          </Text>
          {codigoRastreio ? (
            <View style={s.codigoBox}>
              <Text style={s.codigoLabel}>Código de rastreio</Text>
              <Text style={s.codigoCodigo}>{codigoRastreio}</Text>
              <TouchableOpacity style={[s.btnCopiar, copiado && s.btnCopiadoAtivo]} onPress={handleCopiar}>
                <Feather name={copiado ? 'check' : 'copy'} size={14} color={copiado ? '#fff' : C.blue} />
                <Text style={[s.btnCopiarText, copiado && s.btnCopiarTextAtivo]}>
                  {copiado ? 'Copiado!' : 'Copiar código'}
                </Text>
              </TouchableOpacity>
              <Text style={s.codigoHint}>Guarde este código para acompanhar seu orçamento.</Text>
            </View>
          ) : null}
          <TouchableOpacity style={s.btnPrimary} onPress={handleLimpar}>
            <Text style={s.btnPrimaryText}>Enviar novo orçamento</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <FeedbackModal
        visible={modal.visible}
        type="error"
        title="Erro ao enviar orçamento"
        message={modal.message}
        onClose={() => setModal({ visible: false, message: '' })}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={s.pageHero}>
            <Text style={s.pageLabel}>CONTATO</Text>
            <Text style={s.pageTitle}>Formulário de Orçamento</Text>
            <Text style={s.pageSubtitle}>Por favor, forneça as informações necessárias para que possamos processar seu orçamento.</Text>
          </View>

          <View style={s.formCard}>
            <Text style={s.formTitle}>Solicite seu Orçamento</Text>
            <Text style={s.formSubtitle}>Preencha os campos abaixo e responderemos em até 24 horas</Text>

            <View style={s.campo}>
              <Text style={s.label}>Nome Completo</Text>
              <TextInput
                style={[s.input, erros.nome && s.inputErro]}
                placeholder="Digite seu nome completo"
                placeholderTextColor={C.textMuted}
                value={form.nome}
                onChangeText={(v) => { setForm({ ...form, nome: v }); setErros((p) => ({ ...p, nome: '' })); }}
              />
              {erros.nome ? <Text style={s.erroText}>{erros.nome}</Text> : null}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Email</Text>
              <TextInput
                style={[s.input, erros.email && s.inputErro]}
                placeholder="Digite seu email"
                placeholderTextColor={C.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => { setForm({ ...form, email: v }); setErros((p) => ({ ...p, email: '' })); }}
              />
              {erros.email ? <Text style={s.erroText}>{erros.email}</Text> : null}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Telefone</Text>
              <TextInput
                style={[s.input, erros.telefone && s.inputErro]}
                placeholder="(00) 00000-0000"
                placeholderTextColor={C.textMuted}
                keyboardType="phone-pad"
                value={form.telefone}
                onChangeText={(v) => { setForm({ ...form, telefone: v }); setErros((p) => ({ ...p, telefone: '' })); }}
              />
              {erros.telefone ? <Text style={s.erroText}>{erros.telefone}</Text> : null}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Tipo de Serviço</Text>
              <View style={s.chipsRow}>
                {CHIPS.map((c) => {
                  const ativo = chips.includes(c);
                  return (
                    <TouchableOpacity
                      key={c}
                      style={[s.chip, ativo && s.chipAtivo]}
                      onPress={() => toggleChip(c)}
                    >
                      <Text style={[s.chipText, ativo && s.chipTextAtivo]}>{c}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {erros.chips ? <Text style={s.erroText}>{erros.chips}</Text> : null}
            </View>

            <View style={s.campo}>
              <Text style={s.label}>Descrição do Projeto</Text>
              <TextInput
                style={[s.input, s.textarea, erros.descricao && s.inputErro]}
                placeholder="Informe detalhes do seu projeto, prazo desejado, referências..."
                placeholderTextColor={C.textMuted}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={form.descricao}
                onChangeText={(v) => { setForm({ ...form, descricao: v }); setErros((p) => ({ ...p, descricao: '' })); }}
              />
              {erros.descricao ? <Text style={s.erroText}>{erros.descricao}</Text> : null}
            </View>

            <View style={s.formActions}>
              <TouchableOpacity style={s.btnOutline} onPress={handleLimpar}>
                <Text style={s.btnOutlineText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.btnPrimary, loading && s.btnDisabled]} onPress={handleEnviar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnPrimaryText}>Enviar Orçamento →</Text>}
              </TouchableOpacity>
            </View>
            <Text style={s.formNote}>Responderemos em até 24 horas pelo e-mail informado no formulário.</Text>

            <View style={s.contactInfoGrid}>
              {[
                { icon: 'message-circle', bg: '#dcfce7', color: '#22c55e', titulo: 'WhatsApp',    sub: '+55 83 9999-9999',    note: 'Atendimento rápido' },
                { icon: 'mail',           bg: '#dbeafe', color: '#2563eb', titulo: 'E-mail',      sub: 'suporte@dev4all.com', note: 'Resposta em 24h' },
                { icon: 'map-pin',        bg: '#ede9fe', color: '#8b5cf6', titulo: 'Localização', sub: 'Campina Grande, PB',  note: 'Brasil' },
              ].map((item) => (
                <View key={item.titulo} style={s.contactInfoCard}>
                  <View style={[s.contactInfoIcon, { backgroundColor: item.bg }]}>
                    <Feather name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.contactInfoTitle}>{item.titulo}</Text>
                    <Text style={s.contactInfoSub}>{item.sub}</Text>
                    <Text style={s.contactInfoNote}>{item.note}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.navyDark },
  pageHero: { backgroundColor: C.navyDark, padding: 24, paddingTop: 20, paddingBottom: 28 },
  pageLabel: { color: C.blue, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  pageTitle: { color: '#fff', fontSize: 26, fontWeight: '800', lineHeight: 33, marginBottom: 8 },
  pageSubtitle: { color: C.textMuted, fontSize: 14, lineHeight: 20 },
  formCard: { backgroundColor: C.white, margin: 16, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3, marginBottom: 32 },
  formTitle: { fontSize: 20, fontWeight: '800', color: C.textDark, marginBottom: 6 },
  formSubtitle: { fontSize: 13, color: C.textMuted, marginBottom: 20 },
  campo: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: C.textDark, marginBottom: 6 },
  input: { backgroundColor: C.bgLight, borderRadius: 8, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: C.textDark },
  inputErro: { borderColor: '#ef4444' },
  textarea: { height: 120, paddingTop: 12 },
  erroText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: C.bgLight, borderWidth: 1.5, borderColor: C.border },
  chipAtivo: { backgroundColor: C.blue, borderColor: C.blue },
  chipText: { fontSize: 13, color: C.textMid, fontWeight: '600' },
  chipTextAtivo: { color: '#fff' },
  formActions: { flexDirection: 'row', gap: 10, marginTop: 8, marginBottom: 10 },
  btnPrimary: { flex: 1, backgroundColor: C.blue, borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnOutline: { borderWidth: 1.5, borderColor: C.textDark, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 13, alignItems: 'center' },
  btnOutlineText: { color: C.textDark, fontWeight: '700', fontSize: 14 },
  formNote: { fontSize: 12, color: C.textMuted, textAlign: 'center', marginBottom: 24 },
  contactInfoGrid: { gap: 10 },
  contactInfoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.bgLight, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  contactInfoIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  contactInfoTitle: { fontSize: 14, fontWeight: '700', color: C.textDark },
  contactInfoSub: { fontSize: 13, color: C.textMid },
  contactInfoNote: { fontSize: 11, color: C.textMuted },
  successBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  successIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '800', color: C.textDark, marginBottom: 12 },
  successMsg: { fontSize: 15, color: C.textMid, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  codigoBox: { backgroundColor: C.bgLight, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: C.border, alignItems: 'center', marginBottom: 24, width: '100%' },
  codigoLabel: { fontSize: 12, color: C.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  codigoCodigo: { fontSize: 28, fontWeight: '800', color: C.blue, letterSpacing: 4, marginBottom: 6 },
  codigoHint: { fontSize: 12, color: C.textMuted, textAlign: 'center' },
  btnCopiar: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: C.blue, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8, marginVertical: 10 },
  btnCopiadoAtivo: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  btnCopiarText: { fontSize: 13, fontWeight: '700', color: C.blue },
  btnCopiarTextAtivo: { color: '#fff' },
});
