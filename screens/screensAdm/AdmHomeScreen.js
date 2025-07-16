import { collection, doc, getDocs,  query, deleteDoc  } from 'firebase/firestore';
import { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  const [area, setArea] = useState([]);
  
  
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

}, [])
   return(  
     <SafeAreaView>
      <Button title='criar area' onPress={() => navigation.navigate('AdmAreaUpdate')}></Button>
      {area.map((area, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{area.titulo}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate('AdmAreaUpdate', {areaID:area.id, adm:adm})}>
                <Text style={[styles.btnText, styles.btnPrimaryText]}>Editar Área</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => deletearea(area.id)}>
                <Text style={[styles.btnText, styles.btnDangerText]}>Excluir Área</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={() => navigation.navigate('AdmConteudo', {areaID:area.id, adm:adm})}>
                <Text style={[styles.btnText, styles.btnSuccessText]}>Ver Conteúdos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View>
        <Button title="Voltar" onPress={() => navigation.navigate('LoginSignUp')}/>
      </View>
    </SafeAreaView>
   )
}



export default AdmHomeScreen;
