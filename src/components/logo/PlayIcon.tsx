import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PlayIcon() {
  return <View style={styles.playIcon} />;
}

const styles = StyleSheet.create({
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#ffffff',
    marginLeft: 3,
  },
});