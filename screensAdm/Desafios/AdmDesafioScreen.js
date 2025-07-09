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

function AdmDesafioScreen({navigation, route}){
  const [desafios, setDesafios] = useState([])
  const deleteDesafios = async (desafioID) =>{
    try {
      await deleteDoc(doc(db, "desafios", desafioID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmDesafio');
  } catch (e) {
    console.error("Erro ao excluir conteudo: ", e);
    }
  }
  useEffect(() => {
    const getDesafios = async () => {
      try {
        const q = query(
          collection(db, "desafios"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listDesafios = [];
          querySnapshot.forEach((doc) => {
            listDesafios.push({id:doc.id, ... doc.data()})
          });
          setDesafios(listDesafios)
        } else {
          alert("Não há desafios cadastrados!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getDesafios();

}, [])
 
  return( 
    <SafeAreaView>
     <View>
        <Button title="adicionar desafio" onPress={() => navigation.navigate("AdmDesafioUpdate")}/>
     </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {desafios.map((desafio, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.foto}</Text>
              </View>
              
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.nivel}</Text>
              </View>

              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.texto}</Text>
              </View>
              
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.titulo}</Text>
              </View>

              <View>
                <Button title="edit" onPress={() => navigation.navigate("AdmDesafioUpdate", {condesafioID: desafio.id})}/>
              </View>


              <View>
                <Button tittle="delete" onPress={() =>deleteDesafios()}/>
              </View>
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>
  );
    
}

export default AdmDesafioScreen;