import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function DespesaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesa</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddDespesa')}
      >
        <Text style={styles.buttonText}>Definir Despesas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ConsultDespesasScreen')}
      >
        <Text style={styles.buttonText}>Consultar Despesas</Text>
      </TouchableOpacity>
    </View>
  );
}


const Cores = {
 fundo: '#fff',
  texto: '#000',
  botao: '#0cbd38ff',
  botaoTexto: '#000',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.texto,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Cores.botao,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: Cores.botaoTexto,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

