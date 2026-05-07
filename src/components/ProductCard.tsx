import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - theme.spacing.md * 2 - theme.spacing.md) / 2;

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    original_price?: number | null;
    image: string | null;
    category: string;
    tag?: string | null;
  };
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductProps) {
  const imageUrl = product.image;
  const isDiscounted = product.original_price && product.original_price > product.price;
  const activeBadge = product.tag || (isDiscounted ? 'SALE' : null);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.fallbackContainer}>
             <Text style={styles.fallbackText}>MV</Text>
          </View>
        )}
        {activeBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeBadge}</Text>
          </View>
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.category}>{product.category?.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{product.price}</Text>
          {isDiscounted && (
            <Text style={styles.originalPrice}>₹{product.original_price}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: theme.colors.forest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: CARD_WIDTH * 1.3,
    backgroundColor: theme.colors.cream,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAE6DF',
  },
  fallbackText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: theme.colors.forest,
    opacity: 0.3,
    letterSpacing: 2,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    color: theme.colors.white,
    letterSpacing: 1,
  },
  details: {
    padding: theme.spacing.sm,
  },
  category: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    color: theme.colors.gold,
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: theme.colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: theme.colors.forest,
  },
  originalPrice: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: theme.colors.textMuted,
    textDecorationLine: 'line-through',
  }
});
