import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, query, deleteDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmConteudoScreen({navigation, route}){
  const { adm, areaID } = route.params
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
          where("area", "==", areaID)
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
                <Button title="edit" onPress={() => navigation.navigate("AdmConteudoUpdate", {conteudoID: conteudo.id, adm:adm})}/>
              </View>


              <View>
                <Button title="delete" onPress={() =>deleteConteudo()}/>
              </View>
            </View>
          ) 
        )}
      </View>
      <View>         
        <Button style={styles.Button} title={"Voltar"} onPress={() => navigation.navigate('AdmHome', {adm:adm})}/>
      </View>
    </SafeAreaView>
  );
    
}

export default AdmConteudoScreen;