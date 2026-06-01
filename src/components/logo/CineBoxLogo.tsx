import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayIcon from './PlayIcon';

export default function CineBoxLogo() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoRow}>
        <View style={styles.iconBadge}>
          <PlayIcon />
        </View>
        <Text style={styles.logoText}>
          CINE<Text style={styles.logoAccent}>BOX</Text>
        </Text>
      </View>
      <Text style={styles.tagline}>Seu universo de filmes e séries.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  iconBadge: {
    width: 50,
    height: 50,
    borderRadius: 11,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 45,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  logoAccent: {
    color: '#8b5cf6',
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
});