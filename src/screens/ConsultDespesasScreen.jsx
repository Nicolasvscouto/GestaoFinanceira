import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const DESPESAS_KEY = '@app:despesas';

export default function ConsultarDespesasScreen() {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarDespesas = async () => {
      setLoading(true);
      try {
        const storedData = await AsyncStorage.getItem(DESPESAS_KEY);
        const parsed = storedData ? JSON.parse(storedData) : [];
        setDespesas(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) carregarDespesas();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00c851" />
          <Text style={styles.loadingText}>Carregando despesas...</Text>
        </View>
      ) : despesas.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Despesas Cadastradas</Text>
          <Text style={styles.empty}>Nenhuma despesa cadastrada.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, { marginTop: 40 }]}>Despesas Cadastradas</Text>
          {despesas.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>{item.descricao || 'Sem descrição'}</Text>
              <Text style={styles.value}>
                R$ {Number(item.valor || 0).toFixed(2)}
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
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
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
});
