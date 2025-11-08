import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const RENDAS_KEY = '@app:rendas';
const DESPESAS_KEY = '@app:despesas';

export default function ConsultScreen() {
  const [totalRendas, setTotalRendas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const carregarDadosFinanceiros = async () => {
    setIsLoading(true);
    try {
      const dadosRendas = await AsyncStorage.getItem(RENDAS_KEY);
      const listaRendas = dadosRendas ? JSON.parse(dadosRendas) : [];
      const totalR = listaRendas.reduce((acc, item) => acc + item.valor, 0);
      setTotalRendas(totalR);

      const dadosDespesas = await AsyncStorage.getItem(DESPESAS_KEY);
      const listaDespesas = dadosDespesas ? JSON.parse(dadosDespesas) : [];
      const totalD = listaDespesas.reduce((acc, item) => acc + item.valor, 0);
      setTotalDespesas(totalD);

      setSaldo(totalR - totalD);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar o balanço financeiro.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      carregarDadosFinanceiros();
    }
  }, [isFocused]);

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const saldoColor = saldo >= 0 ? styles.valorPositivo : styles.valorNegativo;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { marginTop: 40 }]}>Consulta Renda</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#00c851" />
        ) : (
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de Rendas</Text>
              <Text style={[styles.cardValor, styles.valorPositivo]}>
                {formatCurrency(totalRendas)}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de Despesas</Text>
              <Text style={[styles.cardValor, styles.valorNegativo]}>
                {formatCurrency(totalDespesas)}
              </Text>
            </View>

            <View style={[styles.card, styles.cardSaldo]}>
              <Text style={[styles.cardTitle, styles.cardTitleSaldo]}>
                Saldo Atual
              </Text>
              <Text style={[styles.cardValor, saldoColor]}>
                {formatCurrency(saldo)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const Cores = {
  fundo: '#fff',
  texto: '#000',
  botao: '#0cbd38ff',
  botaoTexto: '#fff',
  fundoDashboard: '#f5f5f5',
  valorNegativo: '#dc3545',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundoDashboard,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: Cores.texto,
  },
  cardsContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: Cores.fundo,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  cardValor: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  valorPositivo: {
    color: Cores.botao,
  },
  valorNegativo: {
    color: Cores.valorNegativo,
  },
  cardSaldo: {
    backgroundColor: '#f0f8ff',
    borderColor: '#007bff',
    borderWidth: 1,
  },
  cardTitleSaldo: {
    color: '#007bff',
    fontSize: 20,
  },
});
