import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HubScreen({ navigation }) {
  return (
   
    <ScrollView style={styles.containerScrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Agenda Financeira</Text>
        <Text style={styles.text}>Caixa financeiro do Mês(X)</Text>
        <Text style={styles.text}>Hoje é {new Date().toLocaleDateString('pt-BR')}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Renda')}
          >
            <Text style={styles.buttonText}>Renda</Text>
          </TouchableOpacity>       
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Despesa')}
          >
            <Text style={styles.buttonText}>Despesas</Text>
          </TouchableOpacity>         
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Metas')}
          >
            <Text style={styles.buttonText}>Metas</Text>
          </TouchableOpacity>         
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Calculo')}
          >
            <Text style={styles.buttonText}>Cálculo de Economia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={limparTudo} style={styles.button}>
            <Text style={styles.buttonText}>Apagar Tudo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const limparTudo = async () => {
  try {
    await AsyncStorage.clear();
    alert('Todos os dados foram apagados!');
  } catch (error) {
    alert('Erro ao limpar dados');
    console.error(error);
  }
};

const Cores = {
  fundo: '#fff',
  texto: '#000',
  botao: '#0cbd38ff', 
  botaoTexto: '#000',
};

const styles = StyleSheet.create({
  containerScrollView: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.texto,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Cores.botao,
    paddingVertical: 19,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Cores.botaoTexto,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: Cores.texto,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30, 
  },
});

