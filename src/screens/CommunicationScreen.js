// CommunicationScreen.js - Pantalla principal con bienvenida y scroll
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SYMBOLS } from '../utils/symbols';
import { SymbolTile } from '../components/SymbolTile';

export default function CommunicationScreen() {
  const [phrase, setPhrase] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const checkSpeech = async () => {
      try {
        await Speech.isSpeakingAsync();
      } catch (e) {
        console.error(e);
      }
    };
    checkSpeech();
  }, []);

  const addSymbol = (label) => {
    setPhrase([...phrase, label]);
  };

  const speakWord = (word) => {
    Speech.speak(word, {
      language: 'es',
      pitch: 1,
      rate: 0.8,
    });
  };

  const removeLast = () => {
    if (phrase.length > 0) {
      setPhrase(phrase.slice(0, -1));
    }
  };

  const clearPhrase = () => {
    setPhrase([]);
  };

  const speakPhrase = () => {
    const text = phrase.join(' ');
    if (!text.trim()) {
      Alert.alert('Frase vacía', 'Agrega símbolos para hablar.');
      return;
    }
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'es',
      pitch: 1,
      rate: 0.8,
      onDone: () => setIsSpeaking(false),
      onError: () => {
        setIsSpeaking(false);
        Alert.alert('Error', 'No se pudo reproducir el audio.');
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* MENSAJE DE BIENVENIDA */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeEmoji}>👋</Text>
        <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
        <Text style={styles.welcomeText}>
          Toca los símbolos para formar tu mensaje y comunicarte.
        </Text>
      </View>

      {/* Área de la frase */}
      <View style={styles.phraseContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.phraseWrapper}>
            {phrase.length === 0 ? (
              <Text style={styles.placeholder}>👆 Toca símbolos para formar tu mensaje</Text>
            ) : (
              phrase.map((word, index) => (
                <View key={index} style={styles.wordChip}>
                  <Text style={styles.wordText}>{word}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {/* Botones de control */}
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlButton, styles.clearButton]} onPress={clearPhrase} activeOpacity={0.7}>
          <Ionicons name="trash" size={22} color="#FF6B6B" />
          <Text style={[styles.controlButtonText, styles.clearText]}>Limpiar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.deleteButton]} onPress={removeLast} activeOpacity={0.7}>
          <Ionicons name="arrow-undo" size={22} color="#FFD93D" />
          <Text style={[styles.controlButtonText, styles.deleteText]}>Borrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.speakButton]} onPress={speakPhrase} disabled={isSpeaking} activeOpacity={0.7}>
          <Ionicons name={isSpeaking ? 'radio' : 'volume-high'} size={22} color="#fff" />
          <Text style={styles.speakButtonText}>{isSpeaking ? 'Hablando...' : 'Hablar'}</Text>
        </TouchableOpacity>
      </View>

      {/* Cuadrícula con scroll */}
      <View style={styles.scrollContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.grid}>
            {SYMBOLS.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <SymbolTile
                  emoji={item.emoji}
                  label={item.label}
                  onPress={addSymbol}
                  onSpeak={speakWord}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9ff' },

  // Estilos del mensaje de bienvenida
  welcomeContainer: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },

  phraseContainer: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e6ff',
    minHeight: 60,
    maxHeight: 100,
  },
  phraseWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  placeholder: {
    color: '#bdc3c7',
    fontSize: 16,
    fontStyle: 'italic',
  },
  wordChip: {
    backgroundColor: '#e8e6ff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginVertical: 4,
  },
  wordText: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e6ff',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 6,
  },
  deleteButton: {
    backgroundColor: '#fef9e6',
    borderWidth: 1,
    borderColor: '#FFD93D',
  },
  clearButton: {
    backgroundColor: '#fdedec',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  speakButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  clearText: { color: '#FF6B6B' },
  deleteText: { color: '#FFD93D' },
  speakButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
});