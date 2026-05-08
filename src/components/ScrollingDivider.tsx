import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function ScrollingDivider() {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [scrollX]);

  const text = "MRUDULA VASTRA ✨ HANDPICKED DESIGNS ✨ PREMIUM SAREES ✨ EXQUISITE QUALITY ✨ ";

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scrollRow, { transform: [{ translateX: scrollX }] }]}>
        <Text style={styles.text}>{text}{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.forest,
    height: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(184,150,62,0.3)',
  },
  scrollRow: {
    flexDirection: 'row',
    width: width * 3,
  },
  text: {
    fontFamily: 'DMSans_700Bold',
    color: theme.colors.gold,
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
  }
});
