import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../data/mockData';

const C = COLORS;

export default function ProjectDetailScreen({ route, navigation }) {
  const { project } = route.params;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: project.imagemUrl }} style={s.image} />
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color={C.textDark} />
          </TouchableOpacity>
          {project.destaque && (
            <View style={s.destaqueBadge}>
              <Feather name="star" size={11} color="#fff" />
              <Text style={s.destaqueText}>Destaque</Text>
            </View>
          )}
        </View>

        <View style={s.body}>
          <View style={s.cats}>
            {project.categorias.map((c) => (
              <View key={c} style={s.catBadge}><Text style={s.catText}>{c}</Text></View>
            ))}
          </View>
          <Text style={s.titulo}>{project.titulo}</Text>
          <Text style={s.descricao}>{project.descricao}</Text>

          <View style={s.secao}>
            <Text style={s.secaoTitulo}>Tecnologias Utilizadas</Text>
            <View style={s.techsRow}>
              {project.tecnologias.map((t) => (
                <View key={t} style={s.techCard}>
                  <Feather name="code" size={14} color={C.blue} />
                  <Text style={s.techText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={s.secao}>
            <Text style={s.secaoTitulo}>Sobre o Projeto</Text>
            <View style={s.infoCard}>
              {[
                ['check-circle', 'Entregue no prazo acordado'],
                ['smartphone',   'Design responsivo para todos os dispositivos'],
                ['lock',         'Implementação de segurança e autenticação'],
                ['trending-up',  'Otimizado para performance e SEO'],
              ].map(([icon, txt]) => (
                <View key={txt} style={s.infoRow}>
                  <Feather name={icon} size={16} color={C.blue} />
                  <Text style={s.infoText}>{txt}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={s.ctaBtn} onPress={() => navigation.navigate('Contato')}>
            <Text style={s.ctaText}>Solicite um Projeto Assim</Text>
            <Feather name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  image: { width: '100%', height: 260 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: C.white, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  destaqueBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: C.blue, flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, gap: 5 },
  destaqueText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  body: { padding: 20 },
  cats: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  catBadge: { backgroundColor: 'rgba(37,99,235,0.1)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  catText: { fontSize: 12, color: C.blue, fontWeight: '600' },
  titulo: { fontSize: 26, fontWeight: '800', color: C.textDark, marginBottom: 12, lineHeight: 32 },
  descricao: { fontSize: 15, color: C.textMid, lineHeight: 24, marginBottom: 24 },
  secao: { marginBottom: 24 },
  secaoTitulo: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 12 },
  techsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techCard: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(37,99,235,0.08)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  techText: { color: C.blue, fontWeight: '700', fontSize: 13 },
  infoCard: { backgroundColor: C.bgLight, borderRadius: 14, padding: 16, gap: 12, borderWidth: 1, borderColor: C.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { fontSize: 14, color: C.textMid, flex: 1 },
  ctaBtn: { backgroundColor: C.blue, borderRadius: 10, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
