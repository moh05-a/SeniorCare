import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark, PrimaryButton } from '@/components/SeniorCareUI';
import { useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

const rows: Array<{ icon: keyof typeof Feather.glyphMap; label: string; detail?: string }> = [
  { icon: 'user', label: 'Personal information', detail: 'Ahmad Al-Khatib' },
  { icon: 'map-pin', label: 'Home address', detail: 'Amman, Jordan' },
  { icon: 'users', label: 'Family & caregivers', detail: '2 connected' },
  { icon: 'shield', label: 'Privacy & safety' },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, setLanguage } = useSeniorCare();
  const t = useCopy();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 18), paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.header}><BrandMark compact /><Feather name="settings" size={22} color={colors.teal} /></View>
        <View style={styles.profileHero}><View style={[styles.avatar, { backgroundColor: colors.coralSoft }]}><Text style={[styles.avatarText, { color: colors.coral }]}>{language === 'ar' ? 'أ' : 'A'}</Text></View><Text style={[styles.name, { color: colors.navy }]}>{language === 'ar' ? 'أحمد الخطيب' : 'Ahmad Al-Khatib'}</Text><Text style={[styles.member, { color: colors.inkSoft }]}>{t.profile.member}</Text></View>
        <View style={[styles.emergency, { backgroundColor: colors.coral }]}><View style={styles.emergencyIcon}><Feather name="phone" size={20} color={colors.coral} /></View><View style={styles.emergencyCopy}><Text style={[styles.emergencyTitle, { color: colors.primaryForeground }]}>{t.profile.emergencyTitle}</Text><Text style={[styles.emergencyText, { color: colors.primaryForeground }]}>{t.profile.emergencyText}</Text></View><Feather name="arrow-up-right" size={19} color={colors.primaryForeground} /></View>
        <Text style={[styles.sectionTitle, { color: colors.navy }]}>{t.profile.account}</Text>
        <View style={[styles.rows, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {rows.map((row, index) => <Pressable key={row.label} style={[styles.row, index < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]} onPress={() => undefined}><View style={[styles.rowIcon, { backgroundColor: colors.tealSoft }]}><Feather name={row.icon} size={18} color={colors.teal} /></View><View style={styles.rowCopy}><Text style={[styles.rowLabel, { color: colors.navy }]}>{t.profile.rows[index].label}</Text>{row.detail ? <Text style={[styles.rowDetail, { color: colors.inkSoft }]}>{t.profile.rows[index].detail}</Text> : null}</View><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></Pressable>)}
        </View>
        <Text style={[styles.sectionTitle, { color: colors.navy }]}>{t.profile.language}</Text>
        <View style={[styles.languageBox, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.rowLabel, { color: colors.navy }]}>{t.profile.appLanguage}</Text><Pressable testID="profile-language-toggle" onPress={() => setLanguage(language === 'en' ? 'ar' : 'en')} style={[styles.languageChoice, { backgroundColor: colors.tealSoft }]}><Text style={[styles.choiceText, { color: colors.teal }]}>{language === 'en' ? 'English' : 'العربية'}</Text><Feather name="chevron-down" size={15} color={colors.teal} /></Pressable></View>
        <PrimaryButton label={t.profile.signInFamily} icon="users" onPress={() => router.push('/sign-in')} />
        <Text style={[styles.version, { color: colors.mutedForeground }]}>{t.profile.version}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, profileHero: { alignItems: 'center', marginTop: 31, marginBottom: 27 }, avatar: { width: 77, height: 77, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }, avatarText: { fontFamily: 'Inter_700Bold', fontSize: 30 }, name: { fontFamily: 'Inter_700Bold', fontSize: 21, marginTop: 13 }, member: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 }, emergency: { borderRadius: 21, minHeight: 82, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 29 }, emergencyIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, emergencyCopy: { flex: 1, marginLeft: 12 }, emergencyTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 }, emergencyText: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 }, sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginBottom: 12, marginTop: 4 }, rows: { borderWidth: 1, borderRadius: 21, overflow: 'hidden', marginBottom: 26 }, row: { minHeight: 73, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center' }, rowIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, rowCopy: { flex: 1, marginLeft: 12 }, rowLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14 }, rowDetail: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 }, languageBox: { borderWidth: 1, borderRadius: 19, minHeight: 66, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 21 }, languageChoice: { borderRadius: 12, paddingVertical: 8, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 5 }, choiceText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 }, version: { fontFamily: 'Inter_400Regular', fontSize: 11, textAlign: 'center', marginTop: 20 },
});