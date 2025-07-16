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
      {area.map((a, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{a.titulo}</Text>
            <Text style={styles.cardSubtitle}>{a.titulo}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => alert("pressed")}>
                <Text style={[styles.btnText, styles.btnPrimaryText]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => alert("pressed")}>
                <Text style={[styles.btnText, styles.btnDangerText]}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={() => alert("pressed")}>
                <Text style={[styles.btnText, styles.btnSuccessText]}>Ver Conteúdos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
   )
}



export default AdmHomeScreen;
