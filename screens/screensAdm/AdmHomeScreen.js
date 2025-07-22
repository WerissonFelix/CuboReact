import { collection, doc, getDocs,  query, deleteDoc  } from 'firebase/firestore';
import { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView, ScrollView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  const resources = {"Áreas": "AdmArea"}
  {/*      Alterações
    
    - Na const resources: apaguei os Desafios e os Games interativos.   
      Desafios foi apagado porque ele precisa de um conteudoID, o que não tem na home.

  */}
  
  /*const [area, setArea] = useState([]);
  
  
  const deletearea = async (areaID) =>{
    try {
      await deleteDoc(doc(db, "areas", areaID));
      
      alert("Usuário excluído com sucesso!");
      const updatedAreas = area.filter(area => area.id !== areaID);
      setArea(updatedAreas);
  } catch (e) {
    console.error("Erro ao excluir area: ", e);
    }
  }
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

}, [])*/
   return(  
     <SafeAreaView style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: '#f8f9fa' }}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {Object.entries(resources).map(([resource, page], index) => (
          <TouchableOpacity key={index} style={{ width: "50%"}}>
            <View>
              <View style={styles.cardBody}>
                <Image
                source={{ uri: 'https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg' }}
                style={styles.image}
              />
                <Text style={styles.cardTitle}>Gerenciamento de {resource} </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate(page, { adm:adm })}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Gerenciar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
   )
}



export default AdmHomeScreen;
