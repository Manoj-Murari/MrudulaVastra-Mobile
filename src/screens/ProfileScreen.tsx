import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Package, MapPin, Heart, Headset, LogOut, ChevronRight } from 'lucide-react-native';
import { theme } from '../theme/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: 'orders', title: 'My Orders', icon: Package, subtitle: 'Track, return, or buy things again' },
    { id: 'addresses', title: 'Saved Addresses', icon: MapPin, subtitle: 'Manage delivery locations' },
    { id: 'wishlist', title: 'Wishlist', icon: Heart, subtitle: 'Your curated collection' },
    { id: 'support', title: 'Help & Support', icon: Headset, subtitle: 'Reach out to our luxury concierges' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>MV</Text>
          </View>
          <Text style={styles.name}>Guest User</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Sign In / Register</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuIconBox}>
                  <Icon color={theme.colors.forest} size={20} strokeWidth={1.5} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight color={theme.colors.textMuted} size={20} strokeWidth={1.5} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Support Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut color={'#D32F2F'} size={18} strokeWidth={1.5} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Mrudula Vastra App v1.0.0</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.forest,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: theme.colors.gold,
    letterSpacing: 2,
  },
  name: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: theme.colors.forest,
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.gold,
    borderRadius: 24,
  },
  loginText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: theme.colors.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  menuContainer: {
    paddingVertical: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: '#D32F2F',
    letterSpacing: 0.5,
  },
  versionText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: theme.colors.textMuted,
  }
});
