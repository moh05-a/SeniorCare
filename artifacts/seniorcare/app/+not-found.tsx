import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useSeniorCare } from '@/context/SeniorCareContext';

export default function NotFoundScreen() {
  const colors = useColors();
  const { language } = useSeniorCare();
  const isArabic = language === 'ar';

  return (
    <>
      <Stack.Screen options={{ title: isArabic ? 'عذراً' : 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background, direction: isArabic ? 'rtl' : 'ltr' }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {isArabic ? 'هذه الصفحة غير موجودة.' : 'This screen doesn’t exist.'}
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary }]}>
            {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Go to home screen'}
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
  },
});
