import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Image, Dimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Star, Instagram, ArrowRight } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [productsRes, categoriesRes, testimonialsRes] = await Promise.all([
        supabase.from('products').select('*').eq('is_trending', true).limit(4),
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('testimonials').select('*').limit(3),
      ]);

      if (productsRes.data) setTrendingProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ━━━ HERO SECTION ━━━ */}
        <View style={styles.heroContainer}>
          <ImageBackground 
            source={require('../../assets/hero-saree.png')} 
            style={styles.heroImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroEyebrow}>THE HERITAGE COLLECTION</Text>
              <Text style={styles.heroTitle}>Timeless{'\n'}Elegance</Text>
              <Text style={styles.heroTagline}>Woven with Love.</Text>
              <TouchableOpacity 
                style={styles.ctaButton} 
                activeOpacity={0.8}
                onPress={() => (navigation as any).navigate('ShopTab')}
              >
                <Text style={styles.ctaText}>SHOP COLLECTION</Text>
                <ArrowRight color={theme.colors.forest} size={14} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* ━━━ CATEGORY SECTION ━━━ */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderCenter}>
            <Text style={styles.sectionEyebrow}>THE CURATIONS</Text>
            <Text style={styles.sectionTitleCenter}>Shop by Category</Text>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerDiamond} />
              <View style={styles.dividerLine} />
            </View>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                style={styles.categoryCard}
                activeOpacity={0.85}
                onPress={() => (navigation as any).navigate('ShopTab')}
              >
                <View style={styles.categoryImageFrame}>
                  {cat.image ? (
                    <Image source={{ uri: cat.image }} style={styles.categoryImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.categoryFallback}>
                      <Text style={styles.categoryFallbackText}>{cat.title?.[0]}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.categoryName}>{cat.title}</Text>
                <Text style={styles.categoryExplore}>EXPLORE</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ━━━ TRENDING SECTION ━━━ */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderCenter}>
            <Text style={styles.sectionEyebrow}>THE VIRAL EDIT</Text>
            <Text style={styles.sectionTitleCenter}>Trending Right Now</Text>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerDiamond} />
              <View style={styles.dividerLine} />
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.gold} style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.productGrid}>
              {trendingProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={() => (navigation as any).navigate('Product', { product })} 
                />
              ))}
            </View>
          )}

          <TouchableOpacity 
            style={styles.exploreAllButton}
            onPress={() => (navigation as any).navigate('ShopTab')}
          >
            <Text style={styles.exploreAllText}>EXPLORE ALL</Text>
            <ArrowRight color={theme.colors.forest} size={14} />
          </TouchableOpacity>
        </View>

        {/* ━━━ TESTIMONIALS SECTION ━━━ */}
        {testimonials.length > 0 && (
          <View style={styles.testimonialsSection}>
            <View style={styles.sectionHeaderCenter}>
              <Text style={[styles.sectionEyebrow, { color: theme.colors.gold }]}>CUSTOMER LOVE</Text>
              <Text style={[styles.sectionTitleCenter, { color: theme.colors.cream }]}>What Our Community Says</Text>
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: 'rgba(184,150,62,0.3)' }]} />
                <View style={[styles.dividerDiamond, { borderColor: 'rgba(184,150,62,0.3)' }]} />
                <View style={[styles.dividerLine, { backgroundColor: 'rgba(184,150,62,0.3)' }]} />
              </View>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.testimonialScroll}>
              {testimonials.map((t, i) => (
                <View key={i} style={styles.testimonialCard}>
                  <Text style={styles.testimonialQuote}>"</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} color={theme.colors.gold} size={12} fill={theme.colors.gold} />
                    ))}
                  </View>
                  <Text style={styles.testimonialText}>{t.text}</Text>
                  <View style={styles.testimonialDivider} />
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialLocation}>{t.location}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* ━━━ INSTAGRAM BANNER ━━━ */}
        <View style={styles.instagramSection}>
          <View style={styles.sectionHeaderCenter}>
            <View style={styles.instaEyebrowRow}>
              <Instagram color={theme.colors.gold} size={14} />
              <Text style={styles.sectionEyebrow}>FOLLOW OUR JOURNEY</Text>
            </View>
            <Text style={styles.sectionTitleCenter}>@mrudulavastra</Text>
          </View>

          <TouchableOpacity 
            style={styles.instagramButton}
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://www.instagram.com/mrudulavastra/')}
          >
            <Instagram color={theme.colors.cream} size={16} />
            <Text style={styles.instagramButtonText}>FOLLOW ON INSTAGRAM</Text>
          </TouchableOpacity>
        </View>

        {/* ━━━ BRAND FOOTER ━━━ */}
        <View style={styles.brandFooter}>
          <Text style={styles.footerLogo}>MRUDULA VASTRA</Text>
          <Text style={styles.footerTagline}>Elegance Woven in Every Thread</Text>
          <View style={styles.footerDivider} />
          <View style={styles.footerPillars}>
            {[['Premium', 'Quality'], ['Handpicked', 'Designs'], ['100%', 'Authentic']].map(([label, sub], idx) => (
              <View key={idx} style={styles.footerPillar}>
                <Text style={styles.footerPillarLabel}>{label}</Text>
                <Text style={styles.footerPillarSub}>{sub}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.footerCopyright}>© 2025 Mrudula Vastra. All rights reserved.</Text>
          <Text style={styles.footerLocation}>Machilipatnam, Andhra Pradesh</Text>
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
    paddingBottom: 20,
  },

  // ━━━ HERO ━━━
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
    backgroundColor: 'rgba(14, 34, 25, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  heroEyebrow: {
    fontFamily: 'DMSans_700Bold',
    color: 'rgba(184,150,62,0.8)',
    letterSpacing: 3,
    fontSize: 9,
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: theme.colors.cream,
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 6,
  },
  heroTagline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: theme.colors.gold,
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: theme.spacing.xl,
  },
  ctaButton: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.forest,
    letterSpacing: 2,
    fontSize: 10,
  },

  // ━━━ SHARED SECTION ━━━
  section: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  sectionHeaderCenter: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  sectionEyebrow: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    color: theme.colors.gold,
    letterSpacing: 3,
    marginBottom: 8,
  },
  sectionTitleCenter: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: theme.colors.forest,
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.5,
  },
  dividerLine: {
    height: 1,
    width: 32,
    backgroundColor: theme.colors.gold,
  },
  dividerDiamond: {
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: theme.colors.gold,
    transform: [{ rotate: '45deg' }],
  },

  // ━━━ CATEGORIES ━━━
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  categoryCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  categoryImageFrame: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderWidth: 1,
    borderColor: 'rgba(184,150,62,0.2)',
    padding: 6,
    backgroundColor: theme.colors.white,
    marginBottom: 12,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0E8',
  },
  categoryFallbackText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: theme.colors.forest,
    opacity: 0.15,
  },
  categoryName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: theme.colors.forest,
    marginBottom: 4,
  },
  categoryExplore: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
    color: theme.colors.textMuted,
    letterSpacing: 2,
  },

  // ━━━ TRENDING ━━━
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  exploreAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: theme.spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(184,150,62,0.3)',
    alignSelf: 'center',
  },
  exploreAllText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    color: theme.colors.forest,
    letterSpacing: 1.5,
  },

  // ━━━ TESTIMONIALS ━━━
  testimonialsSection: {
    backgroundColor: theme.colors.forest,
    paddingVertical: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  testimonialScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: 16,
  },
  testimonialCard: {
    width: width * 0.78,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(184,150,62,0.15)',
    padding: 24,
  },
  testimonialQuote: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    color: 'rgba(184,150,62,0.15)',
    lineHeight: 48,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 16,
    marginTop: 8,
  },
  testimonialText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  testimonialDivider: {
    height: 1,
    backgroundColor: 'rgba(184,150,62,0.1)',
    marginBottom: 16,
  },
  testimonialName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 15,
    color: theme.colors.cream,
    marginBottom: 4,
  },
  testimonialLocation: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    color: theme.colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ━━━ INSTAGRAM ━━━
  instagramSection: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    marginTop: theme.spacing.lg,
  },
  instaEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  instagramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.forest,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: theme.spacing.md,
  },
  instagramButtonText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.cream,
    fontSize: 10,
    letterSpacing: 2,
  },

  // ━━━ BRAND FOOTER ━━━
  brandFooter: {
    backgroundColor: theme.colors.forest,
    paddingVertical: 40,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  footerLogo: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: theme.colors.cream,
    letterSpacing: 2,
    marginBottom: 6,
  },
  footerTagline: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    color: theme.colors.gold,
    letterSpacing: 2,
    marginBottom: 20,
  },
  footerDivider: {
    height: 1,
    width: 60,
    backgroundColor: 'rgba(184,150,62,0.3)',
    marginBottom: 20,
  },
  footerPillars: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 28,
  },
  footerPillar: {
    alignItems: 'center',
  },
  footerPillarLabel: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 14,
    color: theme.colors.cream,
    marginBottom: 2,
  },
  footerPillarSub: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 7,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footerCopyright: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 4,
  },
  footerLocation: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
  },
});
