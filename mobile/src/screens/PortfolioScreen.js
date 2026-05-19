import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, projects } from '../data/mockData';

const C = COLORS;
const CATS = ['Todos', 'Desenvolvimento', 'Design', 'Mobile', 'Web', 'Dashboard'];

export default function PortfolioScreen({ navigation }) {
  const [catAtiva, setCatAtiva] = useState('Todos');

  const filtrados = projects.filter(
    (p) => catAtiva === 'Todos' || p.categorias.includes(catAtiva)
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* PAGE HERO */}
      <View style={s.pageHero}>
        <Text style={s.pageLabel}>NOSSO PORTFÓLIO</Text>
        <Text style={s.pageTitle}>Projetos que entregam resultados reais</Text>
        <Text style={s.pageSubtitle}>Confira algumas aplicações web que já criamos para nossos clientes.</Text>
      </View>

      {/* FILTROS */}
      <View style={s.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersContent}>
          {CATS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[s.filterBtn, catAtiva === cat && s.filterBtnActive]}
              onPress={() => setCatAtiva(cat)}
            >
              <Text style={[s.filterText, catAtiva === cat && s.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.lista}>
        {filtrados.map((proj) => (
          <TouchableOpacity
            key={proj.id}
            style={s.card}
            onPress={() => navigation.navigate('ProjectDetail', { project: proj })}
            activeOpacity={0.85}
          >
            <Image source={{ uri: proj.imagemUrl }} style={s.cardImg} />
            {proj.destaque && (
              <View style={s.destaqueBadge}>
                <Feather name="star" size={10} color="#fff" />
                <Text style={s.destaqueText}>Destaque</Text>
              </View>
            )}
            <View style={s.cardBody}>
              <View style={s.cats}>
                {proj.categorias.map((c) => (
                  <View key={c} style={s.catBadge}><Text style={s.catText}>{c}</Text></View>
                ))}
              </View>
              <Text style={s.cardTitle}>{proj.titulo}</Text>
              <Text style={s.cardDesc} numberOfLines={2}>{proj.descricao}</Text>
              <View style={s.techs}>
                {proj.tecnologias.map((t) => (
                  <Text key={t} style={s.techTag}>{t}</Text>
                ))}
              </View>
              <View style={s.cardFooter}>
                <Text style={s.verMais}>Ver detalhes</Text>
                <Feather name="arrow-right" size={14} color={C.blue} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Pronto para transformar{'\n'}seu negócio digital?</Text>
          <Text style={s.ctaSubtitle}>Fale com nossa equipe hoje e receba um orçamento gratuito em menos de 24 horas.</Text>
          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Contato')}>
            <Text style={s.btnPrimaryText}>Solicite seu projeto grátis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgLight },
  pageHero: { backgroundColor: C.navyDark, padding: 24, paddingTop: 20, paddingBottom: 28 },
  pageLabel: { color: C.blue, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  pageTitle: { color: '#fff', fontSize: 26, fontWeight: '800', lineHeight: 33, marginBottom: 8 },
  pageSubtitle: { color: C.textMuted, fontSize: 14, lineHeight: 20 },
  filtersWrapper: { backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  filtersContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterBtn: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, backgroundColor: C.bgLight, borderWidth: 1, borderColor: C.border },
  filterBtnActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterText: { fontSize: 13, color: C.textMid, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  lista: { padding: 16, gap: 16 },
  card: { backgroundColor: C.white, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  cardImg: { width: '100%', height: 200 },
  destaqueBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: C.blue, flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, gap: 4 },
  destaqueText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 16 },
  cats: { flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  catBadge: { backgroundColor: 'rgba(37,99,235,0.1)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  catText: { fontSize: 11, color: C.blue, fontWeight: '600' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: C.textDark, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: C.textMid, lineHeight: 19, marginBottom: 12 },
  techs: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  techTag: { backgroundColor: C.bgLight, color: C.blue, fontSize: 11, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: C.border },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verMais: { color: C.blue, fontSize: 13, fontWeight: '700' },
  ctaSection: { backgroundColor: C.navyDark, borderRadius: 20, padding: 28, alignItems: 'center', marginTop: 8 },
  ctaTitle: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center', lineHeight: 29, marginBottom: 10 },
  ctaSubtitle: { color: C.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  btnPrimary: { backgroundColor: C.blue, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
