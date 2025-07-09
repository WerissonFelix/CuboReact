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

import styles from '../../Style/style';

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  return(
    <SafeAreaView>
      <View>
        <Button title="Area" onPress={() => navigation.navigate("AdmArea", {user:adm})}/>
        <Button title="Desafios" onPress={() => navigation.navigate("AdmDesafio", {user:adm})}/>
        <Button title="Conteudos" onPress={() => navigation.navigate("AdmConteudo", {user:adm})}/>
      </View>
    </SafeAreaView>
  )
}



export default AdmHomeScreen;