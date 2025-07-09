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

function AdmConteudoScreen({navigation, route}){
  const [conteudos, setConteudos] = useState([])
  const deleteConteudo = async (conteudoID) =>{
    try {
      await deleteDoc(doc(db, "conteudos", conteudoID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmConteudo');
  } catch (e) {
    console.error("Erro ao excluir conteudo: ", e);
    }
  }
  useEffect(() => {
    const getConteudos = async () => {
      try {
        const q = query(
          collection(db, "conteudos"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listConteudos = [];
          querySnapshot.forEach((doc) => {
            listConteudos.push({id:doc.id, ... doc.data()})
          });
          setConteudos(listConteudos)
        } else {
          alert("Não há Conteúdos cadastrados!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getConteudos();

}, [])
 
  return( 
    <SafeAreaView>
     <View>
        <Button title="adicionar conteúdo" onPress={() => navigation.navigate("AdmConteudoUpdate")}/>
     </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {conteudos.map((conteudo, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{conteudo.texto}</Text>
              </View>
        
              <View>
                <Button title="edit" onPress={() => navigation.navigate("AdmConteudoUpdate", {conteudoID: conteudo.id})}/>
              </View>


              <View>
                <Button tittle="delete" onPress={() =>deleteConteudo()}/>
              </View>
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>
  );
    
}

export default AdmConteudoScreen;