import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, deleteDoc,where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  const [area, setArea] = useState([]);
  
  useEffect(() => {
    const getareas = async () => {
      try {
        const areaDocRef = query(collection(db, "areas"));
        const areaDocSnap = await getDocs(areaDocRef);
        
          const areas = [];
          areaDocSnap.forEach((doc) => {
            areas.push({ id: doc.id, ...doc.data() });
          });
          setArea(areas);
      } 
       catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getareas();

}, [])
   return(  
     <SafeAreaView>
       <View>
              <Button title="criar area" onPress={() => navigation.navigate("AdmAreaUpdate")}/>
           </View>
           <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
              {area.map((area, index) => (
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
                      <Button title="mude a area" onPress={() => navigation.navigate("AdmAreaUpdate", {areaID:area.id, adm: adm})}/>
                    </View>
      
      
                    <View>
                      <Button title="Ver conteúdos relacionados a área" onPress={() => navigation.navigate("AdmConteudo", {areaID:area.id, adm: adm})}/>
                    </View>
      
      
                    <View>
                      <Button title="deleta a area" onPress={() =>deletearea(area.id)}/>
                    </View>
                  </View>
                ) 
                )}
          </View>
          
      <View>
        <Button title="Desafios" onPress={() => navigation.navigate("AdmDesafio", {adm:adm})}/>
        <Button title="Conteudos" onPress={() => navigation.navigate("AdmConteudo", {adm:adm})}/>
      </View>
      <View>
        <Button title="Voltar" onPress={() => navigation.navigate('LoginSignUp')}/>
      </View>
    </SafeAreaView>
   )
}



export default AdmHomeScreen;