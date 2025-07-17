import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-web';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { collection, doc, getDocs, query, deleteDoc} from 'firebase/firestore';

import { db } from '../firebase';
import styles from '../Style/style';


function AdmAreaScreen({navigation, route}){
  const { adm } = route.params
  
  const [areas, setAreas] = useState([])
  const deleteArea = async (areaID) =>{
    try {
      await deleteDoc(doc(db, "areas", areaID));
      
      alert("Área excluída com sucesso!");
      const updatedAreas = areas.filter(area => area.id !== areaID);
      setAreas(updatedAreas);
  } catch (e) {
    alert("Houve um erro ao tentar excluir essa área. Tente novamente. Se persistir o erro, contate o suporte.")
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
 
  return ( 
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: '#f8f9fa' }}>
      <TouchableOpacity onPress={() => navigation.navigate("AdmAreaUpdate", { adm: adm })}>
        <Text style={{ color: "blue", textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Cique aqui para adicionar áreas</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {areas.map((area, index) => (
          <TouchableOpacity key={index} style={{ minWidth: "50%", maxWidth: "90%"}}>
            <View>
              <View style={styles.cardBody}>
                <Image 
                source={{ uri: 'https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg' }}
                style={styles.image}
                />
                <Text style={styles.cardTitle}>{area.titulo}</Text>
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                  <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate("AdmAreaUpdate", { adm: adm, areaID: area.id })}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => deleteArea(area.id)}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Excluir</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={() => navigation.navigate("AdmConteudo", { adm: adm, areaID: area.id, area: area.titulo })}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Conteúdos Relacionados</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}   

export default AdmAreaScreen;