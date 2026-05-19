import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, teamMembers, values } from '../data/mockData';

const C = COLORS;

const whyCards = [
  { titulo: 'Em ambientes profissionais', desc: 'Usuários podem monitorar em tempo real sua própria aplicação, melhorando a produtividade.' },
  { titulo: 'Em casa',                    desc: 'Utilize nosso site com conforto e flexibilidade, tarefas simplificadas para o dia a dia.' },
  { titulo: 'Para qualquer dispositivo',  desc: 'Soluções responsivas e otimizadas para funcionar perfeitamente em qualquer tela.' },
];

export default function SobreScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* PAGE HERO */}
        <View style={s.pageHero}>
          <Text style={s.pageLabel}>SOBRE NÓS</Text>
          <Text style={s.pageTitle}>Conheça a equipe{'\n'}Dev4all</Text>
          <Text style={s.pageSubtitle}>Uma equipe apaixonada por criar soluções digitais de qualidade.</Text>
        </View>

        {/* MISSÃO */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>NOSSA MISSÃO</Text>
          <Text style={s.sectionTitle}>A Dev4all é uma equipe apaixonada{'\n'}por criar soluções digitais</Text>
          <Text style={s.missionText}>
            Somos especializados em criar soluções digitais para pequenos e médios negócios. Nossa missão é democratizar o acesso à tecnologia de qualidade, oferecendo serviços de desenvolvimento web e mobile com excelência, inovação e preços acessíveis.
          </Text>
          <View style={s.valuesGrid}>
            {values.map((v) => (
              <View key={v.titulo} style={s.valueCard}>
                <View style={[s.valueIcon, { backgroundColor: v.bg }]}>
                  <Feather name={v.icon} size={20} color={v.color} />
                </View>
                <Text style={s.valueTitle}>{v.titulo}</Text>
                <Text style={s.valueDesc}>{v.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* POR QUE A DEV4ALL */}
        <View style={[s.section, { backgroundColor: C.bgLight }]}>
          <Text style={s.sectionLabel}>CONTEXTO</Text>
          <Text style={s.sectionTitle}>Por que escolher a Dev4all?</Text>
          {whyCards.map((w) => (
            <View key={w.titulo} style={s.whyCard}>
              <Text style={s.whyTitle}>{w.titulo}</Text>
              <Text style={s.whyDesc}>{w.desc}</Text>
            </View>
          ))}
        </View>

        {/* EQUIPE */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>A EQUIPE</Text>
          <Text style={s.sectionTitle}>Integrantes</Text>
          <View style={s.teamGrid}>
            {teamMembers.map((m) => (
              <View key={m.id} style={s.teamCard}>
                <View style={[s.teamAvatar, { backgroundColor: m.cor }]}>
                  <Text style={s.teamAvatarText}>{m.initials}</Text>
                </View>
                <Text style={s.teamNome}>{m.nome}</Text>
                <Text style={s.teamCargo}>{m.cargo}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Pronto para transformar{'\n'}seu negócio digital?</Text>
          <Text style={s.ctaSubtitle}>Fale com nossa equipe hoje e receba um orçamento gratuito em menos de 24 horas.</Text>
          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Contato')}>
            <Text style={s.btnPrimaryText}>Solicite seu projeto grátis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnWhatsapp}>
            <Feather name="message-circle" size={16} color="#fff" />
            <Text style={s.btnWhatsappText}>Falar no WhatsApp</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  pageHero: { backgroundColor: C.navyDark, padding: 24, paddingTop: 20, paddingBottom: 28 },
  pageLabel: { color: C.blue, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  pageTitle: { color: '#fff', fontSize: 26, fontWeight: '800', lineHeight: 33, marginBottom: 8 },
  pageSubtitle: { color: C.textMuted, fontSize: 14, lineHeight: 20 },
  section: { backgroundColor: C.white, padding: 24 },
  sectionLabel: { color: C.blue, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: C.textDark, textAlign: 'center', lineHeight: 29, marginBottom: 14 },
  missionText: { fontSize: 14, color: C.textMid, lineHeight: 22, textAlign: 'center', marginBottom: 24 },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  valueCard: { width: '47%', backgroundColor: C.bgLight, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.border },
  valueIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  valueTitle: { fontSize: 14, fontWeight: '700', color: C.textDark, marginBottom: 4 },
  valueDesc: { fontSize: 12, color: C.textMid, lineHeight: 17 },
  whyCard: { backgroundColor: C.white, borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: C.border },
  whyTitle: { fontSize: 15, fontWeight: '700', color: C.textDark, marginBottom: 6 },
  whyDesc: { fontSize: 13, color: C.textMid, lineHeight: 19 },
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  teamCard: { width: '44%', backgroundColor: C.bgLight, borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  teamAvatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  teamAvatarText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  teamNome: { fontSize: 14, fontWeight: '700', color: C.textDark, textAlign: 'center', marginBottom: 4 },
  teamCargo: { fontSize: 11, color: C.textMuted, textAlign: 'center', lineHeight: 15 },
  ctaSection: { backgroundColor: C.navyDark, padding: 32, alignItems: 'center' },
  ctaTitle: { color: '#fff', fontSize: 24, fontWeight: '800', textAlign: 'center', lineHeight: 31, marginBottom: 12 },
  ctaSubtitle: { color: C.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  btnPrimary: { backgroundColor: C.blue, borderRadius: 8, paddingHorizontal: 24, paddingVertical: 13 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnWhatsapp: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#22c55e', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 13, marginTop: 10 },
  btnWhatsappText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
