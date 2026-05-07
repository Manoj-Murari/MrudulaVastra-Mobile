import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ShoppingBag, Menu, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useCartStore } from '../store/useCartStore';

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cartCount = useCartStore((state) => state.getCartCount());

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, Platform.OS === 'web' ? 16 : 0) }]}>
      <View style={styles.inner}>
        {/* Hamburger Menu */}
        <TouchableOpacity style={styles.iconButton}>
          <Menu color={theme.colors.forest} size={22} strokeWidth={1.5} />
        </TouchableOpacity>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>MRUDULA VASTRA</Text>
          <Text style={styles.subtitle}>ELEGANCE WOVEN IN EVERY THREAD</Text>
        </View>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search color={theme.colors.forest} size={20} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => (navigation as any).navigate('Cart')}
          >
            <ShoppingBag color={theme.colors.forest} size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    zIndex: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: theme.colors.forest,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    color: theme.colors.gold,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: theme.colors.gold,
    borderRadius: 10,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.white,
    fontSize: 8,
  }
});
