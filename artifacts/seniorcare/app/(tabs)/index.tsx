import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark, IconButton, SectionHeading, ServiceCard } from '@/components/SeniorCareUI';
import { ServiceKey, useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

const services: Array<{ key: ServiceKey; icon: keyof typeof Feather.glyphMap; tone: 'teal' | 'coral' | 'amber' | 'navy' }> = [
  { key: 'blood-work', icon: 'droplet', tone: 'coral' },
  { key: 'pressure-sugar', icon: 'activity', tone: 'teal' },
  { key: 'heart-check', icon: 'heart', tone: 'amber' },
  { key: 'medicines', icon: 'package', tone: 'navy' },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, setLanguage, requests } = useSeniorCare();
  const t = useCopy();
  const isArabic = language === 'ar';
  const nextVisit = requests[0];
  const nextVisitTime = (nextVisit?.timeLabel ?? '4:30 PM').replace('PM', isArabic ? 'م' : 'PM').replace('AM', isArabic ? 'ص' : 'AM');

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: isArabic ? 'rtl' : 'ltr' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 18), paddingBottom: insets.bottom + (Platform.OS === 'web' ? 110 : 95) },
        ]}
      >
        <View style={styles.topRow}>
          <BrandMark compact />
          <View style={styles.topActions}>
            <Pressable
              testID="language-toggle"
              onPress={() => setLanguage(isArabic ? 'en' : 'ar')}
              style={[styles.languageToggle, { backgroundColor: colors.tealSoft }]}
            >
              <Feather name="globe" size={16} color={colors.teal} />
              <Text style={[styles.languageText, { color: colors.teal }]}>{isArabic ? 'EN' : 'العربية'}</Text>
            </Pressable>
            <IconButton icon="bell" label={t.home.notifications} onPress={() => undefined} />
          </View>
        </View>

        <View style={styles.welcomeBlock}>
          <Text style={[styles.eyebrow, { color: colors.teal }]}>{t.home.morning}</Text>
          <Text style={[styles.greeting, { color: colors.navy }]}>{t.home.greeting}</Text>
          <Text style={[styles.question, { color: colors.inkSoft }]}>{t.home.question}</Text>
        </View>

        <View style={[styles.safetyPill, { backgroundColor: colors.navy }]}>
          <View style={[styles.safetyIcon, { backgroundColor: colors.coral }]}>
            <Feather name="shield" size={18} color={colors.primaryForeground} />
          </View>
          <View style={styles.safetyCopy}>
            <Text style={[styles.safetyTitle, { color: colors.primaryForeground }]}>{t.home.careTitle}</Text>
            <Text style={[styles.safetyText, { color: colors.seafoam }]}>{t.home.careText}</Text>
          </View>
          <Feather name="chevron-right" size={19} color={colors.seafoam} />
        </View>

        <SectionHeading title={t.home.whatNeed} />
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              title={t.services[service.key].title}
              subtitle={t.services[service.key].subtitle}
              tone={service.tone}
              onPress={() => router.push({ pathname: '/request/[service]', params: { service: service.key } })}
            />
          ))}
        </View>

        <SectionHeading title={t.home.nextVisit} action={t.home.seeAll} onAction={() => router.push('/visits')} />
        <Pressable
          testID="next-visit-card"
          onPress={() => router.push('/visits')}
          style={[styles.visitCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={[styles.nurseAvatar, { backgroundColor: colors.coralSoft }]}>
            <Feather name="user" size={22} color={colors.coral} />
          </View>
          <View style={styles.visitDetails}>
            <Text style={[styles.visitType, { color: colors.teal }]}>{t.home.pressureSugar}</Text>
            <Text style={[styles.nurseName, { color: colors.navy }]}>{t.home.nurseSarah}</Text>
            <Text style={[styles.visitTime, { color: colors.inkSoft }]}>{nextVisit?.dateLabel === 'Tomorrow' ? t.request.tomorrow : t.request.today} · {nextVisitTime}</Text>
          </View>
          <View style={[styles.confirmedBadge, { backgroundColor: colors.tealSoft }]}>
            <View style={[styles.badgeDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.confirmedText, { color: colors.success }]}>{t.home.confirmed}</Text>
          </View>
        </Pressable>

        <View style={styles.helpRow}>
          <Feather name="phone-call" size={19} color={colors.teal} />
          <Text style={[styles.helpText, { color: colors.inkSoft }]}>{t.home.help}</Text>
          <Feather name="arrow-up-right" size={17} color={colors.teal} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  languageToggle: { minHeight: 38, paddingHorizontal: 11, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 6 },
  languageText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  welcomeBlock: { marginTop: 34, marginBottom: 21 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 11, letterSpacing: 1.5, marginBottom: 8 },
  greeting: { fontFamily: 'Inter_700Bold', fontSize: 29, letterSpacing: -1 },
  question: { fontFamily: 'Inter_400Regular', fontSize: 16, marginTop: 7 },
  safetyPill: { borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 29 },
  safetyIcon: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  safetyCopy: { flex: 1, marginHorizontal: 12 },
  safetyTitle: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  safetyText: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 21 },
  visitCard: { borderWidth: 1, minHeight: 100, borderRadius: 21, padding: 15, flexDirection: 'row', alignItems: 'center' },
  nurseAvatar: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  visitDetails: { flex: 1, marginLeft: 13 },
  visitType: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1 },
  nurseName: { fontFamily: 'Inter_700Bold', fontSize: 16, marginTop: 4 },
  visitTime: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 3 },
  confirmedBadge: { borderRadius: 11, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  confirmedText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  helpRow: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 24 },
  helpText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12 },
});
