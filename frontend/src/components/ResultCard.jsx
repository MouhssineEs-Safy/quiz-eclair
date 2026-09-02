import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultCard() {
  return (
    <View style={styles.container}>
      <Text>Result Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
