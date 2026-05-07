import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Collections</Text>
        <Text style={styles.subtitle}>Explore our curated ethnic wear</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.header,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
  }
});
