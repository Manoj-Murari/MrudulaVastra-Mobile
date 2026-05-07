import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - theme.spacing.md * 2 - theme.spacing.md) / 2;

interface ProductProps {
  product: {
    id: string;
    title: string;
    price: number;
    original_price?: number | null;
    images: string[];
    category: string;
  };
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductProps) {
  const imageUrl = product.images?.[0] || 'https://via.placeholder.com/200';
  const isDiscounted = product.original_price && product.original_price > product.price;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        {isDiscounted && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SALE</Text>
          </View>
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.category}>{product.category?.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
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
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    color: theme.colors.white,
    letterSpacing: 0.5,
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
