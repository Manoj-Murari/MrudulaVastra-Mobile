import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useCartStore } from '../store/useCartStore';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const subtotal = useCartStore((state) => state.getCartTotal());

  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={theme.colors.forest} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <View style={{ width: 24 }} />
      </View>

      {cartItems.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Cart Items */}
          <View style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.imageContainer}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                  ) : (
                    <View style={styles.fallbackContainer}>
                      <Text style={styles.fallbackText}>MV</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                  
                  <View style={styles.quantityRow}>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                        <Text style={styles.qtyBtn}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                        <Text style={styles.qtyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Trash2 color={theme.colors.textMuted} size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Estimated Tax (5%)</Text>
              <Text style={styles.summaryValue}>₹{tax.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryValue}>Complimentary</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your bag is empty.</Text>
          <Text style={styles.emptySubtitle}>Explore our collection and add exquisite pieces to your bag.</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.goBack()}>
            <Text style={styles.shopButtonText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View style={[styles.actionBar, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  cartList: {
    padding: theme.spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  imageContainer: {
    width: 90,
    height: 120,
    backgroundColor: '#EAE6DF',
    borderRadius: 8,
    overflow: 'hidden',
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
    fontSize: 24,
    color: theme.colors.forest,
    opacity: 0.2,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: theme.colors.forest,
    lineHeight: 22,
  },
  itemPrice: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: theme.colors.gold,
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  qtyText: {
    paddingHorizontal: 8,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: theme.colors.forest,
  },
  summaryContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.md,
  },
  summaryTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: theme.colors.forest,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  summaryValue: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  totalRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: theme.colors.forest,
  },
  totalValue: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
    color: theme.colors.gold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: theme.colors.forest,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  shopButtonText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.white,
    letterSpacing: 1,
    fontSize: 12,
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
  checkoutButton: {
    backgroundColor: theme.colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  checkoutText: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.cream,
    fontSize: 14,
    letterSpacing: 1.5,
  }
});
