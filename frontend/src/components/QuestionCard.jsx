import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionCard() {
  return (
    <View style={styles.container}>
      <Text>Question Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
