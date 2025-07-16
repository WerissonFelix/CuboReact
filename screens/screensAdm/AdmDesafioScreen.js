import { collection, doc, getDocs, query, deleteDoc, where} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmDesafioScreen({navigation, route}){
  const { conteudoID, adm } = route.params;
  const [desafios, setDesafios] = useState([]);
  
  const deleteDesafios = async (desafioID) =>{
    try {
      await deleteDoc(doc(db, "desafios", desafioID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmDesafio', {conteudoID:conteudoID});
  } catch (e) {
    console.error("Erro ao excluir conteudo: ", e);
    }
  }
  useEffect(() => {
    const getDesafios = async () => {
      try {
        
        const q = query(
          collection(db, "desafios"),
          where("conteudo","==", conteudoID)
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
        <Button title="adicionar desafio" onPress={() => navigation.navigate("AdmDesafioUpdate", {conteudoID:conteudoID})}/>
     </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {desafios.map((desafio, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
              
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.titulo}</Text>
              </View>

              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.nivel}</Text>
              </View>
              
              <View>
                <Button title="edit" onPress={() => navigation.navigate("AdmDesafioUpdate", {conteudoID:conteudoID, desafioID: desafio.id, adm:adm})}/>
              </View>


              <View>
                <Button title="delete" onPress={() =>deleteDesafios(desafio.id)}/>
              </View>


            </View>
          ) 
        )}
      </View>
      
      <View>
        <Button title="Voltar" onPress={() => navigation.navigate('AdmHome', {adm:adm})}/>
      </View>
    </SafeAreaView>
  );
    
}

export default AdmDesafioScreen;