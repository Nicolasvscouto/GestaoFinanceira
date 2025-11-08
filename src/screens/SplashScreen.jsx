import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';


export default function SplashScreen({ navigation }) {
 useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Hub');
    }, 2000); 


    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP Financias</Text>
      <Image
        source={require('../../assets/images/logo.png')} 
        style={styles.logo}
      />
      <LottieView
        source={require('../../assets/animations/Loading_Circle_Animation.json')}
        style={styles.lottie}
        autoPlay
        loop
      />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
}

const Cores = {
  fundo: '#fff',
  texto: '#000', 
  botao: '#0cbd38ff',
  botaoTexto: '#fff', 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.texto, 
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    color: Cores.texto, 
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },

  lottie: {
    width: 120,
    height: 120,
  }
});