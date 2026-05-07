import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>MRUDULA VASTRA</Text>
          <Text style={styles.brandSubtitle}>ELEGANCE WOVEN IN EVERY THREAD</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroText}>NEW ARRIVALS</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Grid (Mock) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.grid}>
            {['Sarees', 'Dress Materials', 'Kids Wear'].map((item) => (
              <View key={item} style={styles.gridItem}>
                <View style={styles.gridImagePlaceholder} />
                <Text style={styles.gridText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  brandTitle: {
    ...theme.typography.header,
    marginBottom: theme.spacing.xs,
  },
  brandSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.gold,
    letterSpacing: 2,
  },
  heroContainer: {
    padding: theme.spacing.md,
  },
  heroPlaceholder: {
    height: 400,
    backgroundColor: theme.colors.forest,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  heroText: {
    color: theme.colors.cream,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: theme.spacing.lg,
  },
  ctaButton: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 30,
  },
  ctaText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.subhead,
    marginBottom: theme.spacing.md,
    color: theme.colors.forest,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  gridImagePlaceholder: {
    height: 200,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: theme.spacing.sm,
  },
  gridText: {
    ...theme.typography.body,
    textAlign: 'center',
    fontWeight: '500',
  }
});
