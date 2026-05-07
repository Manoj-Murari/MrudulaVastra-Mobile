import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Search as SearchIcon, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        searchProducts(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchProducts = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchQuery}%`)
        .limit(20);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={theme.colors.forest} size={24} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <SearchIcon color={theme.colors.textMuted} size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for sarees, materials..."
            placeholderTextColor={theme.colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X color={theme.colors.textMuted} size={18} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.gold} />
        </View>
      ) : query.length > 2 && results.length === 0 ? (
        <View style={styles.center}>
          <SearchIcon color={theme.colors.border} size={48} strokeWidth={1} style={{ marginBottom: 16 }} />
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsSubtitle}>Try searching for "Kanjivaram" or "Silk"</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={() => (navigation as any).navigate('Product', { product: item })} 
            />
          )}
          ListHeaderComponent={
            results.length > 0 ? (
              <Text style={styles.resultsCount}>{results.length} products found</Text>
            ) : null
          }
        />
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  noResultsTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: theme.colors.forest,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  resultsCount: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
