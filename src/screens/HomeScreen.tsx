import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_trending', true)
        .limit(4);

      if (error) throw error;
      setTrendingProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {['Sarees', 'Dress Materials', 'Kids Wear', 'Lehengas'].map((item) => (
              <TouchableOpacity key={item} style={styles.categoryPill}>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.gold} style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.productGrid}>
              {trendingProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={() => console.log('Navigate to product', product.id)} 
                />
              ))}
            </View>
          )}
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
    height: 400,
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
    paddingTop: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: theme.colors.forest,
  },
  viewAll: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: theme.colors.gold,
  },
  categoryScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: 12,
  },
  categoryPill: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: theme.colors.forest,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  }
});
