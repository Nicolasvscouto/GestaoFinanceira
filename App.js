import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as duas telas que vamos testar
// O app vai procurar esses arquivos em 'src/screens/'
import SplashScreen from './src/screens/SplashScreen';
import HubScreen from './src/screens/HubScreen';
import RendaScreen from './src/screens/RendaScreen';
import DespesaScreen from './src/screens/DespesaScreen';
import MetaScreen from './src/screens/MetaScreen';
import CalculoScreen from './src/screens/CalculoScreen';
import AddRendaScreen from './src/screens/AddRendaScreen';
import ConsultRendaScreen from './src/screens/ConsultRendaScreen';
import AddMetaScreen from './src/screens/AddMetaScreen';
import ConsultarMetasScreen from './src/screens/ConsultMetaScreen';
import AddDespesaScreen from './src/screens/AddDespesaScreen';
import ConsultarDespesaScreen from './src/screens/ConsultDespesasScreen';


// Cria o "controlador" de navegação
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // O NavigationContainer é o "container" que gerencia a navegação
    <NavigationContainer>
      {/* Stack.Navigator é o componente que empilha as telas */}
      <Stack.Navigator 
        // Define a tela inicial
        initialRouteName="Splash"
        // Esconde o cabeçalho (nome da tela) em todas as telas
        screenOptions={{ headerShown: false }}
      >
        {/* Registra nossas telas */}
        {/* Damos um 'name' (apelido) e dizemos qual 'component' (arquivo) usar */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Hub" component={HubScreen} />
        <Stack.Screen name="Renda" component={RendaScreen} />
        <Stack.Screen name="Despesa" component={DespesaScreen} />
        <Stack.Screen name="Metas" component={MetaScreen} />
        <Stack.Screen name="Calculo" component={CalculoScreen} />


        <Stack.Screen name="AddRenda" component={AddRendaScreen} />
        <Stack.Screen name="ConsultRendaScreen" component={ConsultRendaScreen} />

        <Stack.Screen name="AddDespesa" component={AddDespesaScreen} />
        <Stack.Screen name="ConsultDespesasScreen" component={ConsultarDespesaScreen} />

        <Stack.Screen name="AddMeta" component={AddMetaScreen} />
        <Stack.Screen name="ConsultMetaScreen" component={ConsultarMetasScreen} />
        
        
        
        {}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

