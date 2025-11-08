import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RENDAS_KEY = '@app:rendas';
const DESPESAS_KEY = '@app:despesas';
const METAS_KEY = '@app:metas';

export default function CalculoScreen({ navigation }) {
  const [rendaTotal, setRendaTotal] = useState(0);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calcular = async () => {
      try {
        const rendasData = await AsyncStorage.getItem(RENDAS_KEY);
        const despesasData = await AsyncStorage.getItem(DESPESAS_KEY);
        const metasData = await AsyncStorage.getItem(METAS_KEY);

        const rendas = rendasData ? JSON.parse(rendasData) : [];
        const despesas = despesasData ? JSON.parse(despesasData) : [];
        const metas = metasData ? JSON.parse(metasData) : [];

        const totalRenda = rendas.reduce((acc, r) => acc + (r.valor || 0), 0);
        const totalDespesa = despesas.reduce((acc, d) => acc + (d.valor || 0), 0);

        setRendaTotal(totalRenda);
        setDespesaTotal(totalDespesa);
        setMetas(metas);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', calcular);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00C851" />
      </SafeAreaView>
    );
  }

  const rendaLiquida = rendaTotal - despesaTotal;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Cálculo Econômico</Text>

        <View style={styles.card}>
          <Text style={styles.item}>💰 Renda total: R$ {rendaTotal.toFixed(2)}</Text>
          <Text style={styles.item}>💸 Despesas totais: R$ {despesaTotal.toFixed(2)}</Text>
          <Text style={styles.item}>📈 Renda líquida: R$ {rendaLiquida.toFixed(2)}</Text>
        </View>

        {metas.length > 0 ? (
          metas.map((meta, index) => {
            let mesesRestantes = 12;
            try {
              const [mes, ano] = meta.prazo.toString().split('/').map(Number);
              const agora = new Date();
              const futuro = new Date(ano, mes - 1);
              mesesRestantes = (futuro.getFullYear() - agora.getFullYear()) * 12 + (futuro.getMonth() - agora.getMonth());
              if (isNaN(mesesRestantes) || mesesRestantes < 1) mesesRestantes = 12;
            } catch {
              mesesRestantes = 12;
            }

            const valorMeta = parseFloat(meta.valor) || 0;
            const valorPorMes = mesesRestantes > 0 ? valorMeta / mesesRestantes : valorMeta;

            const sobraMensal = rendaLiquida;
            let porcentagemSugerida = 0;
            if (sobraMensal > 0 && valorPorMes > 0) {
              porcentagemSugerida = (valorPorMes / sobraMensal) * 100;
            }

            const viavel = sobraMensal >= valorPorMes && sobraMensal > 0;

            return (
              <View key={index} style={styles.card}>
                <Text style={styles.item}>🎯 Meta: {meta.descricao || 'Sem descrição'}</Text>
                <Text style={styles.item}>Valor desejado: R$ {valorMeta.toFixed(2)}</Text>
                <Text style={styles.item}>Prazo: {meta.prazo}</Text>

                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>💡 Para atingir essa meta:</Text>
                  <Text style={styles.resultHighlight}>
                    Economize cerca de R$ {valorPorMes.toFixed(2)} por mês
                  </Text>
                  <Text style={styles.resultSmall}>
                    (em {mesesRestantes} meses, até {meta.prazo})
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      { color: viavel ? '#007E33' : '#ff4444' },
                    ]}
                  >
                    {viavel
                      ? `✅ Viável! Isso representa ${porcentagemSugerida.toFixed(1)}% da sua renda líquida.`
                      : sobraMensal <= 0
                      ? `⚠️ Sua renda líquida é zero ou negativa. Ajuste suas despesas.`
                      : `⚠️ Difícil! Você precisaria guardar ${porcentagemSugerida.toFixed(1)}% da sua renda líquida.`}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.empty}>Nenhuma meta cadastrada para calcular.</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#e9ffe9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  item: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  resultBox: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#00C851',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007E33',
    marginTop: 5,
  },
  resultSmall: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 40,
  },
  button: {
    width: '100%',
    backgroundColor: '#00C851',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
