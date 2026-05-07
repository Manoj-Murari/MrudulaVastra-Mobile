import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        {/* Placeholder for alignment */}
        <View style={styles.iconPlaceholder} />
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>MRUDULA VASTRA</Text>
          <Text style={styles.subtitle}>ELEGANCE WOVEN IN EVERY THREAD</Text>
        </View>

        {/* Cart Icon */}
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingBag color={theme.colors.forest} size={24} strokeWidth={1.5} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  iconPlaceholder: {
    width: 24,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: theme.colors.forest,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    color: theme.colors.gold,
    letterSpacing: 2,
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.forest,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.cream,
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.white,
    fontSize: 9,
  }
});
