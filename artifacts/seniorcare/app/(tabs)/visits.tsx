import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BrandMark, SectionHeading } from '@/components/SeniorCareUI';
import { useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

export default function VisitsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { requests, cancelRequest, language } = useSeniorCare();
  const t = useCopy();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 18), paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.header}><BrandMark compact /><Feather name="calendar" size={22} color={colors.teal} /></View>
        <Text style={[styles.title, { color: colors.navy }]}>{t.visits.title}</Text>
        <Text style={[styles.subtitle, { color: colors.inkSoft }]}>{t.visits.subtitle}</Text>
        <SectionHeading title={t.visits.upcoming} />
        {requests.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.tealSoft }]}><Feather name="calendar" size={24} color={colors.teal} /></View>
            <Text style={[styles.emptyTitle, { color: colors.navy }]}>{t.visits.noVisits}</Text>
            <Text style={[styles.emptyText, { color: colors.inkSoft }]}>{t.visits.noVisitsText}</Text>
            <Pressable onPress={() => router.push('/')}><Text style={[styles.link, { color: colors.teal }]}>{t.visits.goHome}</Text></Pressable>
          </View>
        ) : requests.map((request) => (
          <View key={request.id} style={[styles.visitCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.dateTile, { backgroundColor: colors.tealSoft }]}><Text style={[styles.dateDay, { color: colors.teal }]}>{request.dateLabel === 'Today' ? t.request.today.toUpperCase() : t.request.tomorrow.toUpperCase()}</Text><Text style={[styles.dateTime, { color: colors.navy }]}>{request.timeLabel.replace('PM', language === 'ar' ? 'م' : 'PM').replace('AM', language === 'ar' ? 'ص' : 'AM')}</Text></View>
            <View style={styles.visitCopy}><Text style={[styles.visitService, { color: colors.navy }]}>{t.services[request.service].title}</Text><Text style={[styles.visitNurse, { color: colors.inkSoft }]}>{t.visits.nurseSarah} · {t.visits.homeVisit}</Text><View style={styles.status}><View style={[styles.dot, { backgroundColor: colors.success }]} /><Text style={[styles.statusText, { color: colors.success }]}>{t.visits.confirmed}</Text></View></View>
            <Pressable testID={`cancel-${request.id}`} accessibilityLabel="Cancel visit" onPress={() => cancelRequest(request.id)} hitSlop={10}><Feather name="x-circle" size={21} color={colors.mutedForeground} /></Pressable>
          </View>
        ))}
        <View style={[styles.note, { backgroundColor: colors.coralSoft }]}><Feather name="info" size={18} color={colors.coral} /><Text style={[styles.noteText, { color: colors.navy }]}>{t.visits.note}</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -1, marginTop: 34 }, subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 22, marginTop: 7, marginBottom: 31 }, visitCard: { borderWidth: 1, borderRadius: 21, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, dateTile: { width: 74, height: 74, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, dateDay: { fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 }, dateTime: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 7 }, visitCopy: { flex: 1, marginLeft: 13 }, visitService: { fontFamily: 'Inter_700Bold', fontSize: 15 }, visitNurse: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 }, status: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }, dot: { width: 6, height: 6, borderRadius: 3 }, statusText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 }, note: { borderRadius: 18, padding: 15, flexDirection: 'row', gap: 10, marginTop: 13 }, noteText: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 }, emptyCard: { borderWidth: 1, borderRadius: 22, alignItems: 'center', padding: 28 }, emptyIcon: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 15 }, emptyText: { fontFamily: 'Inter_400Regular', textAlign: 'center', fontSize: 13, lineHeight: 19, marginTop: 6 }, link: { fontFamily: 'Inter_700Bold', fontSize: 13, marginTop: 17 },
});