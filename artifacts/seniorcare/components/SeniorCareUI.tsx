import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const colors = useColors();
  return (
    <View style={styles.brandRow}>
      <View style={[styles.brandMark, { backgroundColor: colors.teal }]}>
        <Feather name="heart" size={compact ? 16 : 20} color={colors.primaryForeground} />
      </View>
      <Text style={[styles.brandText, { color: colors.navy, fontSize: compact ? 18 : 22 }]}>SeniorCare</Text>
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  label,
}: {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  label: string;
}) {
  const colors = useColors();
  return (
    <Pressable
      accessibilityLabel={label}
      testID={`icon-button-${label.toLowerCase().replaceAll(' ', '-')}`}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
    >
      <Feather name={icon} size={21} color={colors.navy} />
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  loading = false,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Feather.glyphMap;
  loading?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable
      testID={`button-${label.toLowerCase().replaceAll(' ', '-')}`}
      accessibilityRole="button"
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.teal }, pressed && styles.pressed, loading && styles.disabled]}
    >
      {loading ? <ActivityIndicator color={colors.primaryForeground} /> : null}
      <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>{label}</Text>
      {icon ? <Feather name={icon} size={19} color={colors.primaryForeground} /> : null}
    </Pressable>
  );
}

export function ServiceCard({
  icon,
  title,
  subtitle,
  tone,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  tone: 'teal' | 'coral' | 'amber' | 'navy';
  onPress: () => void;
}) {
  const colors = useColors();
  const toneMap = {
    teal: { backgroundColor: colors.tealSoft, iconColor: colors.teal },
    coral: { backgroundColor: colors.coralSoft, iconColor: colors.coral },
    amber: { backgroundColor: '#FFF3D9', iconColor: colors.amber },
    navy: { backgroundColor: '#E1EEF0', iconColor: colors.navy },
  };
  const palette = toneMap[tone];
  return (
    <Pressable
      testID={`service-${title.toLowerCase().replaceAll(' ', '-')}`}
      onPress={onPress}
      style={({ pressed }) => [styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
    >
      <View style={[styles.serviceIcon, { backgroundColor: palette.backgroundColor }]}>
        <Feather name={icon} size={26} color={palette.iconColor} />
      </View>
      <Text style={[styles.serviceTitle, { color: colors.navy }]}>{title}</Text>
      <Text style={[styles.serviceSubtitle, { color: colors.inkSoft }]}>{subtitle}</Text>
      <View style={styles.serviceArrow}>
        <Feather name="arrow-up-right" size={17} color={colors.teal} />
      </View>
    </Pressable>
  );
}

export function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionHeading}>
      <Text style={[styles.sectionTitle, { color: colors.navy }]}>{title}</Text>
      {action && onAction ? (
        <Pressable onPress={onAction} hitSlop={12}>
          <Text style={[styles.sectionAction, { color: colors.teal }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  brandText: { fontFamily: 'Inter_700Bold', letterSpacing: -0.6 },
  iconButton: { width: 44, height: 44, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  primaryButton: { minHeight: 56, borderRadius: 18, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  primaryButtonText: { fontFamily: 'Inter_700Bold', fontSize: 16 },
  disabled: { opacity: 0.7 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  serviceCard: { width: '48%', minHeight: 170, borderRadius: 22, padding: 16, borderWidth: 1, marginBottom: 12 },
  serviceIcon: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  serviceTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: -0.2 },
  serviceSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17, marginTop: 5, maxWidth: 125 },
  serviceArrow: { position: 'absolute', right: 15, bottom: 15, width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF8F4' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 19, letterSpacing: -0.4 },
  sectionAction: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
});