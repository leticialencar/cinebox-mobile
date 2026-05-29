import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function BrandLogo() {
  return (
    <View style={styles.logoRow}>
      <View style={styles.iconBadge}>
        <View style={styles.playIcon} />
      </View>
      <Text style={styles.logoText}>
        CINE<Text style={styles.logoAccent}>BOX</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
    marginLeft: 2,
  },
  logoText: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 1.5 },
  logoAccent: { color: '#8b5cf6' },
});