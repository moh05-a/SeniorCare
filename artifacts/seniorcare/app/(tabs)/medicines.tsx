import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark, PrimaryButton, SectionHeading } from '@/components/SeniorCareUI';
import { useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

type Medicine = { name: string; dose: string; time: string; taken: boolean };

export default function MedicinesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { language } = useSeniorCare();
  const t = useCopy();
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: 'Amlodipine', dose: '5 mg · 1 tablet', time: 'Morning · 8:00 AM', taken: true },
    { name: 'Metformin', dose: '500 mg · 1 tablet', time: 'With dinner · 7:00 PM', taken: false },
  ]);
  const medicineLabels: Record<string, { name: string; dose: string; time: string }> = language === 'ar'
    ? {
        Amlodipine: { name: 'أملوديبين', dose: '5 ملغ · قرص واحد', time: 'الصباح · 8:00 ص' },
        Metformin: { name: 'ميتفورمين', dose: '500 ملغ · قرص واحد', time: 'مع العشاء · 7:00 م' },
      }
    : {
        Amlodipine: { name: 'Amlodipine', dose: '5 mg · 1 tablet', time: 'Morning · 8:00 AM' },
        Metformin: { name: 'Metformin', dose: '500 mg · 1 tablet', time: 'With dinner · 7:00 PM' },
      };
  const toggle = (name: string) => setMedicines((items) => items.map((item) => item.name === name ? { ...item, taken: !item.taken } : item));
  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 18), paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.header}><BrandMark compact /><View style={[styles.roundIcon, { backgroundColor: colors.coralSoft }]}><Feather name="bell" size={19} color={colors.coral} /></View></View>
        <Text style={[styles.title, { color: colors.navy }]}>{t.medicines.title}</Text>
        <Text style={[styles.subtitle, { color: colors.inkSoft }]}>{t.medicines.subtitle}</Text>
        <View style={[styles.progressCard, { backgroundColor: colors.navy }]}>
          <View style={styles.progressCopy}><Text style={[styles.progressOverline, { color: colors.seafoam }]}>{t.medicines.progressOverline}</Text><Text style={[styles.progressTitle, { color: colors.primaryForeground }]}>{t.medicines.progressTitle}</Text><Text style={[styles.progressText, { color: colors.seafoam }]}>{t.medicines.progressText}</Text></View>
          <View style={[styles.progressRing, { borderColor: colors.coral }]}><Text style={[styles.progressNumber, { color: colors.primaryForeground }]}>50%</Text></View>
        </View>
        <SectionHeading title={t.medicines.today} />
        {medicines.map((medicine) => (
          <Pressable key={medicine.name} testID={`medicine-${medicine.name}`} onPress={() => toggle(medicine.name)} style={[styles.medicineCard, { backgroundColor: colors.card, borderColor: medicine.taken ? colors.teal : colors.border }]}>
            <View style={[styles.medicineIcon, { backgroundColor: medicine.taken ? colors.tealSoft : colors.accent }]}><Feather name="package" size={21} color={medicine.taken ? colors.teal : colors.accentForeground} /></View>
            <View style={styles.medicineCopy}><Text style={[styles.medicineName, { color: colors.navy }]}>{medicineLabels[medicine.name].name}</Text><Text style={[styles.medicineDose, { color: colors.inkSoft }]}>{medicineLabels[medicine.name].dose}</Text><Text style={[styles.medicineTime, { color: medicine.taken ? colors.success : colors.coral }]}>{medicine.taken ? t.medicines.taken : medicineLabels[medicine.name].time}</Text></View>
            <View style={[styles.check, { backgroundColor: medicine.taken ? colors.success : colors.background, borderColor: medicine.taken ? colors.success : colors.input }]}>{medicine.taken ? <Feather name="check" size={17} color={colors.primaryForeground} /> : null}</View>
          </Pressable>
        ))}
        <View style={[styles.refillCard, { backgroundColor: colors.tealSoft }]}><View style={styles.refillIcon}><Feather name="refresh-cw" size={19} color={colors.teal} /></View><View style={styles.refillCopy}><Text style={[styles.refillTitle, { color: colors.navy }]}>{t.medicines.runningLow}</Text><Text style={[styles.refillText, { color: colors.inkSoft }]}>{t.medicines.refillText}</Text></View><Feather name="chevron-right" size={19} color={colors.teal} /></View>
        <PrimaryButton label={t.medicines.add} icon="plus" onPress={() => undefined} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, roundIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, title: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -1, marginTop: 34 }, subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 22, marginTop: 7, marginBottom: 27 }, progressCard: { minHeight: 143, borderRadius: 23, padding: 19, flexDirection: 'row', alignItems: 'center', marginBottom: 28 }, progressCopy: { flex: 1 }, progressOverline: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2 }, progressTitle: { fontFamily: 'Inter_700Bold', fontSize: 19, marginTop: 10 }, progressText: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 }, progressRing: { width: 72, height: 72, borderWidth: 7, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginLeft: 9 }, progressNumber: { fontFamily: 'Inter_700Bold', fontSize: 14 }, medicineCard: { borderWidth: 1, minHeight: 87, borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 11 }, medicineIcon: { width: 49, height: 49, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }, medicineCopy: { flex: 1, marginLeft: 12 }, medicineName: { fontFamily: 'Inter_700Bold', fontSize: 15 }, medicineDose: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 3 }, medicineTime: { fontFamily: 'Inter_600SemiBold', fontSize: 11, marginTop: 5 }, check: { width: 28, height: 28, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, refillCard: { borderRadius: 20, minHeight: 80, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 13, marginBottom: 20 }, refillIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, refillCopy: { flex: 1 }, refillTitle: { fontFamily: 'Inter_700Bold', fontSize: 14 }, refillText: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 3 },
});