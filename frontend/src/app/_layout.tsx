import React from 'react';
import { Stack } from 'expo-router';

/**
 * Root Layout for Expo Router
 * Configured with headerShown: false to hide default navigation headers.
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
