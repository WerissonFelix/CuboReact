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

function AdmConteudoUpdateScreen({navigation, route}) {
  const { conteudoID } = route.params || {};
  const [texto, setTexto] = useState('');
  useEffect(() => { 
    const getConteudo = async () =>{
      try{ 
        if(conteudoID){
          const docRef = doc(db, "conteudos", conteudoID);
          const queryConteudo = await getDoc(docRef);
          console.log("ID do conteúdo:", conteudoID);
          console.log("Documento existe?", queryConteudo.exists());
          if(queryConteudo.exists()){        
            setTexto(queryConteudo.data().texto);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getConteudo();
  }, [conteudoID]);

  const EditSaveConteudo = async () =>{
      try{ 
        if(conteudoID){
         await updateDoc(doc(db, "conteudos", conteudoID), {texto});
        }
        else {
          const docRef = await addDoc(collection(db, "conteudos"), {texto,createdAt: new Date()});
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
          <Text style={styles.Label}>texto: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={texto} onChangeText={setTexto}/>
        </View>

        <View>         
          <Button style={styles.Button} title={conteudoID ? "Atualizar" : "Cadastrar"} onPress={EditSaveConteudo}/>
        </View>

       </View>
  </SafeAreaView>
  );
}

export default AdmConteudoUpdateScreen;