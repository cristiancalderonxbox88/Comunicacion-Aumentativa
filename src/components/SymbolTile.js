// SymbolTile.js - Componente que muestra cada pictograma
import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const SymbolTile = memo(({ emoji, label, onPress, onSpeak }) => {
  const handlePress = () => {
    onPress(label);
    onSpeak(label);
  };

  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#e8e6ff',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: { fontSize: 44, marginBottom: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#2c3e50', textAlign: 'center' },
});