// AllocatedScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllocatedScreen = () => (
  <View style={styles.container}>
    <Text>Allocated Screen</Text>
    {/* Display cards with name, address, and age */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllocatedScreen;
