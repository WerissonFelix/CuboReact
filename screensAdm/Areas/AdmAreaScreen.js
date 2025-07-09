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


function AdmAreaScreen({navigation, route}){
  const [areas, setAreas] = useState([])
  const deletearea = async (areaID) =>{
    try {
      await deleteDoc(doc(db, "areas", areaID));
      
      alert("Usuário excluído com sucesso!");
      const updatedAreas = areas.filter(area => area.id !== areaID);
      setAreas(updatedAreas);
  } catch (e) {
    console.error("Erro ao excluir area: ", e);
    }
  }
  useEffect(() => {
    const getareas = async () => {
      try {
        const q = query(
          collection(db, "areas"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listareas = [];
          querySnapshot.forEach((doc) => {
            listareas.push({id:doc.id, ... doc.data()})
          });
          setAreas(listareas)
        } else {
          alert("Não há areas cadastradas!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getareas();

}, [])
 
  return( 
    <SafeAreaView>
     <View>
        <Button tittle="criar area" onPress={() => navigation.navigate("AdmAreaUpdate")}/>
     </View>
     <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {areas.map((area, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
            

              <View style={{ borderRadius: 60, backgroundColor: area.cor, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{area.icon}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{area.titulo}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{area.cor}</Text>
              </View>

              <View>
                <Button title="mude a area" onPress={() => navigation.navigate("AdmAreaUpdate", {areaID:area.id})}/>
              </View>


              <View>
                <Button title="deleta a area" onPress={() =>deletearea(area.id)}/>
              </View>
            </View>
          ) 
          )}
    </View>
    </SafeAreaView>
    );
}   

export default AdmAreaScreen;