import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
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
          <ImageBackground 
            source={require('../../assets/hero-saree.png')} 
            style={styles.heroImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroSubtitle}>NEW COLLECTION</Text>
              <Text style={styles.heroTitle}>Kanjivaram{'\n'}Silks</Text>
              <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
                <Text style={styles.ctaText}>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
  heroImage: {
    height: 480,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 34, 25, 0.45)', // Forest green tint
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingBottom: 40,
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
    fontSize: 44,
    textAlign: 'center',
    lineHeight: 52,
    marginBottom: theme.spacing.xl,
  },
  ctaButton: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  ctaText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.forest,
    letterSpacing: 1.5,
    fontSize: 13,
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
