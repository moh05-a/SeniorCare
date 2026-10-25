import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark, PrimaryButton } from '@/components/SeniorCareUI';
import { useCopy, useSeniorCare } from '@/context/SeniorCareContext';
import { useColors } from '@/hooks/useColors';

export default function SignInScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language } = useSeniorCare();
  const t = useCopy();
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const continueSignIn = () => {
    if (!sent && phone.length > 5) setSent(true);
    else if (sent && code.length >= 4) Alert.alert(t.signIn.welcome, language === 'ar' ? 'تم تسجيل دخولك بأمان.' : 'You are signed in securely.', [{ text: t.signIn.continue, onPress: () => router.replace('/') }]);
  };
  return (
    <View style={[styles.screen, { backgroundColor: colors.background, direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 23), paddingBottom: insets.bottom + 30 }]} keyboardShouldPersistTaps="handled">
        <View style={styles.header}><BrandMark /><Pressable onPress={() => router.back()} hitSlop={12}><Feather name="x" size={24} color={colors.navy} /></Pressable></View>
        <View style={styles.hero}><View style={[styles.heroIcon, { backgroundColor: colors.tealSoft }]}><Feather name="lock" size={28} color={colors.teal} /></View><Text style={[styles.title, { color: colors.navy }]}>{t.signIn.welcome}</Text><Text style={[styles.subtitle, { color: colors.inkSoft }]}>{t.signIn.subtitle}</Text></View>
        {!sent ? <><Text style={[styles.label, { color: colors.navy }]}>{t.signIn.phone}</Text><View style={[styles.inputWrap, { backgroundColor: colors.card, borderColor: colors.input }]}><Text style={[styles.prefix, { color: colors.inkSoft }]}>+962</Text><TextInput testID="phone-input" accessibilityLabel={t.signIn.phone} value={phone} onChangeText={setPhone} placeholder="7X XXX XXXX" placeholderTextColor={colors.mutedForeground} keyboardType="phone-pad" style={[styles.input, { color: colors.navy }]} /></View></> : <><Text style={[styles.label, { color: colors.navy }]}>{t.signIn.verification}</Text><Text style={[styles.codeHint, { color: colors.inkSoft }]}>{t.signIn.sentHint} {phone}</Text><TextInput testID="code-input" accessibilityLabel={t.signIn.verification} value={code} onChangeText={setCode} placeholder="_ _ _ _" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" maxLength={4} style={[styles.codeInput, { color: colors.navy, borderColor: colors.input, backgroundColor: colors.card }]} /></>}
        <PrimaryButton label={sent ? t.signIn.continue : t.signIn.send} icon="arrow-right" onPress={continueSignIn} />
        <Pressable onPress={() => Alert.alert(t.signIn.emailTitle, t.signIn.emailMessage)} style={styles.emailLink}><Text style={[styles.emailText, { color: colors.teal }]}>{t.signIn.email}</Text></Pressable>
        <View style={[styles.divider, { backgroundColor: colors.border }]} /><Pressable onPress={() => Alert.alert(t.signIn.familyTitle, t.signIn.familyMessage)} style={styles.altLogin}><Feather name="users" size={18} color={colors.teal} /><Text style={[styles.altText, { color: colors.navy }]}>{t.signIn.family}</Text></Pressable><Pressable onPress={() => Alert.alert(t.signIn.nurseTitle, t.signIn.nurseMessage)} style={styles.altLogin}><Feather name="briefcase" size={18} color={colors.teal} /><Text style={[styles.altText, { color: colors.navy }]}>{t.signIn.nurse}</Text></Pressable>
        <Text style={[styles.privacy, { color: colors.mutedForeground }]}>{t.signIn.privacy}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 22 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, hero: { alignItems: 'center', marginTop: 59, marginBottom: 42 }, heroIcon: { width: 70, height: 70, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }, title: { fontFamily: 'Inter_700Bold', fontSize: 29, letterSpacing: -1, marginTop: 20 }, subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, textAlign: 'center', lineHeight: 21, marginTop: 8, maxWidth: 280 }, label: { fontFamily: 'Inter_700Bold', fontSize: 14, marginBottom: 10 }, inputWrap: { borderWidth: 1, borderRadius: 17, minHeight: 58, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 20 }, prefix: { fontFamily: 'Inter_600SemiBold', fontSize: 15, paddingRight: 13, borderRightWidth: 1, borderRightColor: '#D7E6E0' }, input: { flex: 1, minHeight: 55, paddingLeft: 13, fontFamily: 'Inter_500Medium', fontSize: 16 }, codeHint: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: -4, marginBottom: 11 }, codeInput: { borderWidth: 1, borderRadius: 17, minHeight: 62, fontFamily: 'Inter_700Bold', fontSize: 22, letterSpacing: 9, textAlign: 'center', marginBottom: 20 }, emailLink: { alignItems: 'center', marginTop: 18 }, emailText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 }, divider: { height: 1, marginVertical: 28 }, altLogin: { minHeight: 55, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }, altText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 }, privacy: { fontFamily: 'Inter_400Regular', textAlign: 'center', fontSize: 11, marginTop: 39 },
});