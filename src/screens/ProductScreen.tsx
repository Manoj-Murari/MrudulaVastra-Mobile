import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ShoppingBag } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const product = route.params?.product;

  if (!product) return null;

  const isDiscounted = product.original_price && product.original_price > product.price;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={theme.colors.forest} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>MV</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product.category?.toUpperCase()}</Text>
          <Text style={styles.title}>{product.name}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            {isDiscounted && (
              <Text style={styles.originalPrice}>₹{product.original_price}</Text>
            )}
            {product.tag && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.tag}</Text>
              </View>
            )}
          </View>

          {/* Description / Details Mock */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || "An exquisite piece crafted with precision, bringing together traditional weaving techniques and modern aesthetics. Perfect for your special occasions."}
            </Text>
          </View>
          
          {/* Care Instructions Mock */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Care Instructions</Text>
            <Text style={styles.description}>Dry clean only. Do not bleach. Store in a cool, dry place away from direct sunlight to preserve the rich colors and fabric integrity.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingBag color={theme.colors.cream} size={20} />
          <Text style={styles.addToCartText}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: theme.colors.forest,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: width,
    height: width * 1.3,
    backgroundColor: '#EAE6DF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    color: theme.colors.forest,
    opacity: 0.2,
  },
  infoContainer: {
    padding: theme.spacing.lg,
  },
  category: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: theme.colors.gold,
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: theme.colors.forest,
    lineHeight: 34,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  price: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    color: theme.colors.forest,
  },
  originalPrice: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: theme.colors.textMuted,
    textDecorationLine: 'line-through',
  },
  badge: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    color: theme.colors.white,
    letterSpacing: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: theme.colors.forest,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 16,
  },
  addToCartButton: {
    backgroundColor: theme.colors.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 30,
  },
  addToCartText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.cream,
    fontSize: 14,
    letterSpacing: 1.5,
  }
});
