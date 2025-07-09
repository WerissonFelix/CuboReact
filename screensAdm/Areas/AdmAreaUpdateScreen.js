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


function AdmAreaUpdateScreen({navigation, route}) {
  const { areaID } = route.params || {};
  const [titulo, setTitulo] = useState('');
  const [icon, setIcon] = useState('');
  const [cor, setCor] = useState('');

  useEffect(() => { 
    const getArea = async () =>{
      try{ 
        if(areaID){
          const docRef = doc(db, "areas", areaID);
          const queryArea = await getDoc(docRef);
          console.log("ID da área:", areaID);
          console.log("Documento existe?", queryArea.exists());
          if(queryArea.exists()){        
            setCor(queryArea.data().cor);
            setIcon(queryArea.data().icon);
            setTitulo(queryArea.data().titulo);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getArea();
  }, [areaID]);

  const EditSaveArea = async () =>{
      try{ 
        if(areaID){
         await updateDoc(doc(db, "areas", areaID), {cor,icon,titulo});
        }
        else {
          const docRef = await addDoc(collection(db, "areas"), {cor,icon,titulo,createdAt: new Date()});
          navigation.goBack();
        }
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
  return(
      
      <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Cor: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: #ffbf00' value={cor} onChangeText={setCor}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Icon: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Ex: +" value={icon} onChangeText={setIcon}/>
        </View>


        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Título: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        </View>


        <View>         
          <Button style={styles.Button} title={areaID ? "Atualizar" : "Cadastrar"} onPress={EditSaveArea}/>
        </View>
       </View>
  </SafeAreaView>
  );
}

export default AdmAreaUpdateScreen;