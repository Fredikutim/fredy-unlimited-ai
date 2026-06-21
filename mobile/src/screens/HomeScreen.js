import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Fredy Unlimited AI</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upload')}>
        <Text style={styles.buttonText}>📸 Upload Document</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Letters')}>
        <Text style={styles.buttonText}>📄 My Letters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#007AFF', padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  button: { backgroundColor: '#007AFF', padding: 15, margin: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
