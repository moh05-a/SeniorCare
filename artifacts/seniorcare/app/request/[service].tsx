import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '@/components/SeniorCareUI';
import { CareRequest, ServiceKey, useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

const info: Record<ServiceKey, { icon: keyof typeof Feather.glyphMap }> = {
  'blood-work': { icon: 'droplet' },
  'pressure-sugar': { icon: 'activity' },
  'heart-check': { icon: 'heart' },
  medicines: { icon: 'package' },
};

export default function RequestScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ service: ServiceKey }>();
  const selectedService = params.service ?? 'pressure-sugar';
  const service = info[selectedService];
  const { addRequest } = useSeniorCare();
  const { language } = useSeniorCare();
  const t = useCopy();
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('4:30 PM');
  const [saving, setSaving] = useState(false);
  const submit = () => {
    setSaving(true);
    const request: CareRequest = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, service: selectedService, dateLabel: date, timeLabel: time, status: 'Confirmed' };
    addRequest(request);
    setTimeout(() => {
      setSaving(false);
      Alert.alert(t.request.alertTitle, t.request.alertMessage, [{ text: t.request.done, onPress: () => router.replace('/') }]);
    }, 350);
  };
  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 12), paddingBottom: insets.bottom + 38 }]}>
        <Pressable testID="close-request" onPress={() => router.back()} style={styles.back}><Feather name="arrow-left" size={22} color={colors.navy} style={language === 'ar' ? { transform: [{ scaleX: -1 }] } : undefined} /><Text style={[styles.backText, { color: colors.navy }]}>{t.request.back}</Text></Pressable>
        <View style={[styles.heroIcon, { backgroundColor: colors.tealSoft }]}><Feather name={service.icon} size={34} color={colors.teal} /></View>
        <Text style={[styles.title, { color: colors.navy }]}>{t.services[selectedService].title}</Text>
        <Text style={[styles.description, { color: colors.inkSoft }]}>{t.request.description[selectedService]}</Text>
        <View style={[styles.assurance, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="shield" size={19} color={colors.success} /><Text style={[styles.assuranceText, { color: colors.navy }]}>{t.request.assurance}</Text></View>
        <Text style={[styles.label, { color: colors.navy }]}>{t.request.chooseDay}</Text>
        <View style={styles.optionRow}>{['Today', 'Tomorrow'].map((option) => <Pressable key={option} testID={`date-${option.toLowerCase()}`} onPress={() => setDate(option)} style={[styles.option, { borderColor: date === option ? colors.teal : colors.border, backgroundColor: date === option ? colors.tealSoft : colors.card }]}><Text style={[styles.optionText, { color: date === option ? colors.teal : colors.navy }]}>{option === 'Today' ? t.request.today : t.request.tomorrow}</Text></Pressable>)}</View>
        <Text style={[styles.label, { color: colors.navy }]}>{t.request.chooseTime}</Text>
        <View style={styles.optionRow}>{['4:30 PM', '6:00 PM'].map((option) => <Pressable key={option} onPress={() => setTime(option)} style={[styles.option, { borderColor: time === option ? colors.teal : colors.border, backgroundColor: time === option ? colors.tealSoft : colors.card }]}><Text style={[styles.optionText, { color: time === option ? colors.teal : colors.navy }]}>{option.replace('PM', language === 'ar' ? 'م' : 'PM')}</Text></Pressable>)}</View>
        <View style={[styles.estimate, { backgroundColor: colors.coralSoft }]}><Feather name="clock" size={18} color={colors.coral} /><Text style={[styles.estimateText, { color: colors.navy }]}>{t.request.estimate[selectedService]}</Text></View>
        <PrimaryButton label={t.request.request} icon="arrow-right" onPress={submit} loading={saving} />
        <Text style={[styles.footnote, { color: colors.mutedForeground }]}>{t.request.footnote}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20 }, back: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44 }, backText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 }, heroIcon: { width: 76, height: 76, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 29 }, title: { fontFamily: 'Inter_700Bold', fontSize: 31, letterSpacing: -1, marginTop: 18 }, description: { fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, marginTop: 8, maxWidth: 340 }, assurance: { borderWidth: 1, borderRadius: 17, minHeight: 61, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 24, marginBottom: 31 }, assuranceText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 18 }, label: { fontFamily: 'Inter_700Bold', fontSize: 15, marginBottom: 11 }, optionRow: { flexDirection: 'row', gap: 10, marginBottom: 25 }, option: { borderWidth: 1, borderRadius: 15, minHeight: 49, paddingHorizontal: 17, justifyContent: 'center' }, optionText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 }, estimate: { minHeight: 58, borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 25 }, estimateText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12 }, footnote: { fontFamily: 'Inter_400Regular', textAlign: 'center', fontSize: 11, lineHeight: 17, marginTop: 15 },
});