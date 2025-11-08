import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const RENDAS_KEY = '@app:rendas';

export default function AddRendaScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const salvarRenda = async () => {
    if (!descricao || !valor) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem(RENDAS_KEY);
      const rendas = storedData ? JSON.parse(storedData) : [];
      const novaRenda = { descricao, valor: parseFloat(valor) };
      rendas.push(novaRenda);
      await AsyncStorage.setItem(RENDAS_KEY, JSON.stringify(rendas));

      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        navigation.goBack();
      }, 2500);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a renda.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {showAnimation ? (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../assets/animations/Success.json')}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.sucessoTexto}>Renda adicionada com sucesso!</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Adicionar Renda</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
          <TouchableOpacity style={styles.button} onPress={salvarRenda}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sucessoTexto: {
    marginTop: 10,
    fontSize: 18,
    color: '#00c851', // verde vibrante
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#00c851',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
