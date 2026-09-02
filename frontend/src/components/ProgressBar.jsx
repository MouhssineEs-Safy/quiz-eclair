import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar() {
  return (
    <View style={styles.container}>
      <Text>Progress Bar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
