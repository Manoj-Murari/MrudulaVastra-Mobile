import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, SafeAreaView, Dimensions } from 'react-native';
import { ShoppingBag, Menu, Search, X, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useCartStore } from '../store/useCartStore';

const { width, height } = Dimensions.get('window');

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cartCount = useCartStore((state) => state.getCartCount());
  const [menuVisible, setMenuVisible] = useState(false);

  const menuLinks = [
    { label: 'Sarees', route: 'ShopTab' },
    { label: 'Dress Materials', route: 'ShopTab' },
    { label: 'Kids Wear', route: 'ShopTab' },
    { label: 'Sale', route: 'ShopTab' },
  ];

  const handleMenuNav = (route: string) => {
    setMenuVisible(false);
    (navigation as any).navigate(route);
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: Math.max(insets.top, Platform.OS === 'web' ? 16 : 0) }]}>
        <View style={styles.inner}>
          {/* Hamburger Menu */}
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setMenuVisible(true)}
          >
            <Menu color={theme.colors.forest} size={22} strokeWidth={1.5} />
          </TouchableOpacity>
        
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.title}>MRUDULA VASTRA</Text>
            <Text style={styles.subtitle}>ELEGANCE WOVEN IN EVERY THREAD</Text>
          </View>

          {/* Right Icons */}
          <View style={styles.rightIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => (navigation as any).navigate('Search')}
            >
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

      {/* Full Screen Menu Modal */}
      <Modal visible={menuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
                <X color={theme.colors.forest} size={28} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.menuList}>
              <TouchableOpacity style={styles.menuLink} onPress={() => handleMenuNav('HomeTab')}>
                <Text style={styles.menuLinkText}>Home</Text>
                <ChevronRight color={theme.colors.gold} size={20} />
              </TouchableOpacity>
              
              {menuLinks.map((link, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.menuLink} 
                  onPress={() => handleMenuNav(link.route)}
                >
                  <Text style={styles.menuLinkText}>{link.label}</Text>
                  <ChevronRight color={theme.colors.gold} size={20} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.authButton} onPress={() => handleMenuNav('ProfileTab')}>
                <Text style={styles.authButtonText}>SIGN IN / REGISTER</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>
      </Modal>
    </>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.cream,
    width: width * 0.85,
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: theme.colors.forest,
  },
  closeButton: {
    padding: 4,
  },
  menuList: {
    paddingVertical: theme.spacing.md,
  },
  menuLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  menuLinkText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  modalFooter: {
    marginTop: 'auto',
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  authButton: {
    backgroundColor: theme.colors.forest,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  authButtonText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.cream,
    fontSize: 12,
    letterSpacing: 1.5,
  }
});
