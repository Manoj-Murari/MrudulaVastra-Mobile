import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, User } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.forest,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'System', // Will use custom font later
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={20} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={CategoriesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={20} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={20} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
