import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuizStore } from '../store/store';

// Preset categories with icons and descriptions for a rich UI experience
const CATEGORIES = [
  {
    id: 'general-culture',
    name: 'General Culture',
    icon: '🌐',
    description: 'History, geography, science & world knowledge',
    color: '#6C5CE7',
    bgColor: '#F3F0FF',
  },
  {
    id: 'logic',
    name: 'Logic',
    icon: '🧠',
    description: 'Puzzles, sequences & analytical thinking',
    color: '#00CEC9',
    bgColor: '#E6FAF9',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    description: 'Movies, music, pop culture & games',
    color: '#FF7675',
    bgColor: '#FFF0F0',
  },
];

/**
 * CategorySelector Component
 * Allows users to pick a quiz category to start answering questions immediately.
 */
export default function CategorySelector() {
  const fetchQuestions = useQuizStore((state) => state.fetchQuestions);
  const isLoading = useQuizStore((state) => state.isLoading);
  const currentCategory = useQuizStore((state) => state.category);

  const handleSelectCategory = (categoryName) => {
    if (isLoading) return;
    fetchQuestions(categoryName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badgeText}>⚡ Quiz Éclair</Text>
        <Text style={styles.title}>Pick a Category</Text>
        <Text style={styles.subtitle}>Test your knowledge with 5 quick questions</Text>
      </View>

      <View style={styles.categoriesList}>
        {CATEGORIES.map((cat) => {
          const isSelected = currentCategory === cat.name;
          const isCurrentLoading = isLoading && isSelected;

          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                { backgroundColor: cat.bgColor, borderColor: cat.color },
                isSelected && styles.selectedCard,
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelectCategory(cat.name)}
              disabled={isLoading}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: cat.color + '20' }]}>
                  <Text style={styles.icon}>{cat.icon}</Text>
                </View>

                {isCurrentLoading ? (
                  <ActivityIndicator size="small" color={cat.color} />
                ) : (
                  <View style={[styles.badge, { backgroundColor: cat.color }]}>
                    <Text style={styles.badgeLabel}>Start</Text>
                  </View>
                )}
              </View>

              <Text style={styles.categoryTitle}>{cat.name}</Text>
              <Text style={styles.categoryDescription}>{cat.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoriesList: {
    gap: 16,
  },
  card: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
    // Soft shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
});
