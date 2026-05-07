import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroSubtitle}>NEW COLLECTION</Text>
            <Text style={styles.heroTitle}>Kanjivaram{'\n'}Silks</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Grid (Mock) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.grid}>
            {['Sarees', 'Dress Materials', 'Kids Wear', 'Lehengas'].map((item) => (
              <TouchableOpacity key={item} style={styles.gridItem}>
                <View style={styles.gridImagePlaceholder} />
                <Text style={styles.gridText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingBottom: theme.spacing.xxl,
  },
  heroContainer: {
    padding: theme.spacing.md,
  },
  heroPlaceholder: {
    height: 450,
    backgroundColor: theme.colors.forest,
    borderRadius: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing.xl,
    overflow: 'hidden',
  },
  heroSubtitle: {
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.gold,
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: theme.colors.cream,
    fontSize: 42,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: theme.spacing.lg,
  },
  ctaButton: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 14,
    borderRadius: 30,
  },
  ctaText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.white,
    letterSpacing: 1,
    fontSize: 14,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: theme.colors.forest,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: theme.spacing.lg,
  },
  gridImagePlaceholder: {
    height: 220,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
  },
  gridText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  }
});
