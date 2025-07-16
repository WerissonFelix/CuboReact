import { collection, getDoc, query} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function ConteudoScreen({navigation, route}){
  const { conteudoID, user } = route.params
  const [conteudo, setConteudo] = useState([])

 
  useEffect(() => {
    const getConteudo = async () => {
      try {
        const q = query(
          collection(db, "conteudos", conteudoID)
        );

        const querySnapshot = await getDoc(q);

        if (!querySnapshot.empty) {
          const listConteudo = [];
          querySnapshot.forEach((doc) => {
            listConteudo.push({id:doc.id, ... doc.data()})
          });
          setConteudo(listConteudo)
        } else {
          alert("Não há Conteúdos cadastrados!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getConteudo();

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
        
                        
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>
  );
    
}

export default ConteudoScreen;