import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const METAS_KEY = '@app:metas';

export default function ConsultarMetasScreen() {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarMetas = async () => {
      setLoading(true);
      try {
        const storedData = await AsyncStorage.getItem(METAS_KEY);
        const parsed = storedData ? JSON.parse(storedData) : [];
        setMetas(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) carregarMetas();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00c851" />
          <Text style={styles.loadingText}>Carregando metas...</Text>
        </View>
      ) : metas.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Metas Cadastradas</Text>
          <Text style={styles.emptyText}>Nenhuma meta cadastrada.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, { marginTop: 40 }]}>
            Metas Cadastradas
          </Text>
          {metas.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>
                {item.descricao || 'Sem descrição'}
              </Text>
              <Text style={styles.value}>
                Meta: R$ {Number(item.valor || 0).toFixed(2)}
              </Text>
              <Text style={styles.subtext}>
                Prazo: {item.prazo || 0} meses
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#00c851',
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});
