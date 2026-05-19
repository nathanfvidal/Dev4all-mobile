import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, services, steps, testimonials, projects, brands } from '../data/mockData';

const C = COLORS;

export default function HomeScreen({ navigation }) {
  const destaques = projects.filter((p) => p.destaque).slice(0, 3);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <View style={s.hero}>
          <Text style={s.heroLabel}>Dev Web & Mobile de Alta Performance</Text>
          <Text style={s.heroTitle}>Transforme sua{'\n'}ideia em realidade{'\n'}digital</Text>
          <Text style={s.heroSubtitle}>
            Automatize seu negócio com tecnologia de ponta.{'\n'}
            Criamos sites, sistemas e apps com facilidade,{'\n'}
            acessibilidade e máxima performance.
          </Text>
          <View style={s.heroActions}>
            <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Contato')}>
              <Text style={s.btnPrimaryText}>Solicite seu projeto →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnOutline} onPress={() => navigation.navigate('Portfólio')}>
              <Text style={s.btnOutlineText}>Ver portfólio</Text>
            </TouchableOpacity>
          </View>

          {/* Stats bar */}
          <View style={s.statsRow}>
            {[['50+', 'Projetos'], ['98%', 'Satisfação'], ['24/7', 'Suporte']].map(([v, l], i) => (
              <React.Fragment key={l}>
                {i > 0 && <View style={s.statDiv} />}
                <View style={s.statItem}>
                  <Text style={s.statVal}>{v}</Text>
                  <Text style={s.statLabel}>{l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Dashboard card */}
          <View style={s.dashCard}>
            <View style={s.macBar}>
              <View style={[s.macDot, { backgroundColor: '#ef4444' }]} />
              <View style={[s.macDot, { backgroundColor: '#f59e0b' }]} />
              <View style={[s.macDot, { backgroundColor: '#22c55e' }]} />
            </View>
            <View style={s.dashInner}>
              <View style={s.dashStats}>
                {[['47', 'Projetos'], ['98%', 'Satisfação'], ['99.9%', 'Uptime']].map(([v, l]) => (
                  <View key={l} style={s.dashStat}>
                    <Text style={s.dashStatNum}>{v}</Text>
                    <Text style={s.dashStatLabel}>{l}</Text>
                  </View>
                ))}
              </View>
              <Text style={s.dashCaption}>Crescimento de projetos por mês</Text>
              <View style={s.barChart}>
                {[40, 55, 45, 70, 60, 100].map((h, i) => (
                  <View
                    key={i}
                    style={[s.bar, { height: h * 0.6, backgroundColor: i === 5 ? C.blue : 'rgba(37,99,235,0.35)' }]}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ── BRANDS ───────────────────────────────────────── */}
        <View style={s.brandsStrip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.brandsContent}>
            {[...brands, ...brands].map((b, i) => (
              <Text key={i} style={s.brandText}>{b}</Text>
            ))}
          </ScrollView>
        </View>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>NOSSOS SERVIÇOS</Text>
          <Text style={s.sectionTitle}>Tudo que você precisa{'\n'}num só lugar</Text>
          <Text style={s.sectionSubtitle}>Soluções digitais completas para transformar seu negócio</Text>
          <View style={s.servicesGrid}>
            {services.map((sv) => (
              <TouchableOpacity key={sv.id} style={s.serviceCard} onPress={() => navigation.navigate('Contato')}>
                <View style={[s.serviceIcon, { backgroundColor: sv.bg }]}>
                  <Feather name={sv.icon} size={22} color={sv.color} />
                </View>
                <Text style={s.serviceTitle}>{sv.titulo}</Text>
                <Text style={s.serviceDesc}>{sv.desc}</Text>
                <View style={s.serviceArrow}>
                  <Feather name="arrow-right" size={14} color={C.blue} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <View style={[s.section, { backgroundColor: C.bgLight }]}>
          <Text style={s.sectionLabel}>COMO FUNCIONA</Text>
          <Text style={s.sectionTitle}>Do briefing ao lançamento{'\n'}em 4 etapas simples</Text>
          {steps.map((step, i) => (
            <View key={step.num} style={s.stepRow}>
              <View style={s.stepNumBox}>
                <Text style={s.stepNum}>{step.num}</Text>
              </View>
              <View style={s.stepBody}>
                <Text style={s.stepTitle}>{step.titulo}</Text>
                <Text style={s.stepDesc}>{step.desc}</Text>
              </View>
              {i < steps.length - 1 && <View style={s.stepConnector} />}
            </View>
          ))}
        </View>

        {/* ── PORTFOLIO PREVIEW ─────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>NOSSO PORTFÓLIO</Text>
          <Text style={s.sectionTitle}>Projetos que entregam{'\n'}resultados reais</Text>
          {destaques.map((proj) => (
            <TouchableOpacity
              key={proj.id}
              style={s.projCard}
              onPress={() => navigation.navigate('Portfólio', { screen: 'ProjectDetail', params: { project: proj } })}
              activeOpacity={0.85}
            >
              <Image source={{ uri: proj.imagemUrl }} style={s.projImg} />
              <View style={s.projInfo}>
                <View style={s.projCats}>
                  {proj.categorias.map((c) => (
                    <View key={c} style={s.catBadge}>
                      <Text style={s.catText}>{c}</Text>
                    </View>
                  ))}
                </View>
                <Text style={s.projTitle}>{proj.titulo}</Text>
                <Text style={s.projDesc} numberOfLines={2}>{proj.descricao}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={s.btnOutlineDark} onPress={() => navigation.navigate('Portfólio')}>
            <Text style={s.btnOutlineDarkText}>Ver mais projetos →</Text>
          </TouchableOpacity>
        </View>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <View style={[s.section, { backgroundColor: C.bgLight }]}>
          <Text style={s.sectionLabel}>DEPOIMENTOS</Text>
          <Text style={s.sectionTitle}>O que nossos clientes dizem</Text>
          {testimonials.map((t) => (
            <View key={t.id} style={s.testimonialCard}>
              <View style={s.stars}>
                {[1,2,3,4,5].map((i) => <Feather key={i} name="star" size={14} color="#f59e0b" />)}
              </View>
              <Text style={s.testimonialText}>{t.texto}</Text>
              <View style={s.testimonialAuthor}>
                <View style={[s.testimonialAvatar, { backgroundColor: t.cor }]}>
                  <Text style={s.testimonialAvatarText}>{t.initials}</Text>
                </View>
                <View>
                  <Text style={s.testimonialNome}>{t.nome}</Text>
                  <Text style={s.testimonialCargo}>{t.cargo}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── CTA ──────────────────────────────────────────── */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Pronto para transformar{'\n'}seu negócio digital?</Text>
          <Text style={s.ctaSubtitle}>
            Fale com nossa equipe hoje e receba um orçamento gratuito em menos de 24 horas.
          </Text>
          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Contato')}>
            <Text style={s.btnPrimaryText}>Solicite seu projeto grátis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnWhatsapp} onPress={() => {}}>
            <Feather name="message-circle" size={16} color="#fff" />
            <Text style={s.btnWhatsappText}>Falar no WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <View style={s.footer}>
          <Text style={s.footerLogo}>Dev4all</Text>
          <Text style={s.footerTagline}>Criamos experiências digitais{'\n'}que transformam negócios.</Text>
          <Text style={s.footerCopy}>© 2026 Dev4all. Todos os direitos reservados.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.navyDark },

  /* HERO */
  hero: { backgroundColor: C.navyDark, padding: 24, paddingTop: 20, paddingBottom: 32 },
  heroLabel: { color: C.blue, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  heroTitle: { color: '#fff', fontSize: 34, fontWeight: '800', lineHeight: 42, marginBottom: 14 },
  heroSubtitle: { color: C.textMuted, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  heroActions: { flexDirection: 'row', gap: 10, marginBottom: 28, flexWrap: 'wrap' },
  btnPrimary: { backgroundColor: C.blue, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnOutline: { borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)' },
  btnOutlineText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  statItem: { flex: 1, alignItems: 'center' },
  statDiv: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.15)' },
  statVal: { color: '#fff', fontSize: 22, fontWeight: '800' },
  statLabel: { color: C.textMuted, fontSize: 12, marginTop: 2 },
  dashCard: { backgroundColor: '#0d1327', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  macBar: { flexDirection: 'row', gap: 6, padding: 12, paddingBottom: 8, backgroundColor: '#0a0f1e' },
  macDot: { width: 10, height: 10, borderRadius: 5 },
  dashInner: { padding: 16 },
  dashStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  dashStat: { alignItems: 'center' },
  dashStatNum: { color: '#fff', fontSize: 20, fontWeight: '800' },
  dashStatLabel: { color: C.textMuted, fontSize: 11, marginTop: 2 },
  dashCaption: { color: C.textMuted, fontSize: 11, marginBottom: 10 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 70 },
  bar: { flex: 1, borderRadius: 4 },

  /* BRANDS */
  brandsStrip: { backgroundColor: C.navyMid, paddingVertical: 14, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  brandsContent: { alignItems: 'center', paddingHorizontal: 16, gap: 28 },
  brandText: { color: C.textMuted, fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },

  /* SECTION */
  section: { backgroundColor: C.white, padding: 24 },
  sectionLabel: { color: C.blue, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 26, fontWeight: '800', color: C.textDark, textAlign: 'center', lineHeight: 33, marginBottom: 10 },
  sectionSubtitle: { fontSize: 14, color: C.textMid, textAlign: 'center', lineHeight: 21, marginBottom: 24 },

  /* SERVICES */
  servicesGrid: { gap: 12 },
  serviceCard: { backgroundColor: C.bgLight, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: C.border },
  serviceIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  serviceTitle: { fontSize: 16, fontWeight: '700', color: C.textDark, marginBottom: 6 },
  serviceDesc: { fontSize: 13, color: C.textMid, lineHeight: 19, marginBottom: 12 },
  serviceArrow: { alignSelf: 'flex-start' },

  /* STEPS */
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, position: 'relative' },
  stepNumBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(37,99,235,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 14, flexShrink: 0 },
  stepNum: { fontSize: 16, fontWeight: '800', color: C.blue },
  stepBody: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: '700', color: C.textDark, marginBottom: 4 },
  stepDesc: { fontSize: 13, color: C.textMid, lineHeight: 19 },
  stepConnector: {},

  /* PORTFOLIO */
  projCard: { backgroundColor: C.bgLight, borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  projImg: { width: '100%', height: 180 },
  projInfo: { padding: 14 },
  projCats: { flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  catBadge: { backgroundColor: 'rgba(37,99,235,0.1)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  catText: { fontSize: 11, color: C.blue, fontWeight: '600' },
  projTitle: { fontSize: 16, fontWeight: '700', color: C.textDark, marginBottom: 4 },
  projDesc: { fontSize: 13, color: C.textMid, lineHeight: 18 },
  btnOutlineDark: { borderWidth: 1.5, borderColor: C.textDark, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  btnOutlineDarkText: { color: C.textDark, fontWeight: '700', fontSize: 14 },

  /* TESTIMONIALS */
  testimonialCard: { backgroundColor: C.white, borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: C.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  stars: { flexDirection: 'row', gap: 3, marginBottom: 10 },
  testimonialText: { fontSize: 14, color: C.textMid, lineHeight: 21, marginBottom: 14, fontStyle: 'italic' },
  testimonialAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  testimonialAvatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  testimonialAvatarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  testimonialNome: { fontSize: 14, fontWeight: '700', color: C.textDark },
  testimonialCargo: { fontSize: 12, color: C.textMuted },

  /* CTA */
  ctaSection: { backgroundColor: C.navyDark, padding: 32, alignItems: 'center' },
  ctaTitle: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center', lineHeight: 33, marginBottom: 12 },
  ctaSubtitle: { color: C.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  btnWhatsapp: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#22c55e', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12, marginTop: 10 },
  btnWhatsappText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  /* FOOTER */
  footer: { backgroundColor: C.navyMid, padding: 24, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  footerLogo: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  footerTagline: { color: C.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  footerCopy: { color: C.textMuted, fontSize: 12 },
});
