import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, deleteDoc,where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';


import StartScreen from './screens/StartScreen';
import LoginSignUpScreen from './screens/LoginSignUpScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import AdmAreaScreen from './screensAdm/Areas/AdmAreaScreen';
import AdmAreaUpdateScreen from './screensAdm/Areas/AdmAreaUpdateScreen';
import AdmHomeScreen from './screensAdm/AdmHomeScreen';
import AdmConteudoScreen from './screensAdm/Conteudos/AdmConteudoScreen';
import AdmConteudoUpdateScreen from './screensAdm/Conteudos/AdmConteudoUpdateScreen';
import AdmDesafioScreen from './screensAdm/Desafios/AdmDesafioScreen';
import AdmDesafioUpdateScreen from './screensAdm/Desafios/AdmDesafioUpdateScreen';

const firebaseConfig = {
  apiKey: "AIzaSyCAmQ5YiGUE3qaWr7tD38aXyXxgLROJ_sY",
  authDomain: "cubo.firebaseapp.com",
  projectId: "cubo-42758",
  storageBucket: "cubo.appspot.com",
  messagingSenderId: "417447425142",
  appId: "1:417447425142:web:7e8340277f46ca8083db57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUpScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmHome" component={AdmHomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmArea" component={AdmAreaScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmAreaUpdate" component={AdmAreaUpdateScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmConteudo" component={AdmConteudoScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmConteudoUpdate" component={AdmConteudoUpdateScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmDesafio" component={AdmDesafioScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmDesafioUpdate" component={AdmDesafioUpdateScreen} options={{ headerShown: false}}/>


        
        
        
        {/*<Stack.Screen name="AdmDesafio" component={AdmDesafioScreen} options={{ headerShown: false}}/>
          */}
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;