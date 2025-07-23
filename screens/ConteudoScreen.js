import { collection, getDoc, query, doc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from './Style/style';

import {db} from './firebase';

function ConteudoScreen({navigation, route}){
  const { conteudoID, user, areaID } = route.params
  const [conteudo, setConteudo] = useState([])

 
  useEffect(() => {
    const getConteudo = async () => {
      try {
        const q = doc(db, "conteudos", conteudoID);
        const querySnapshot = await getDoc(q);

        if (!querySnapshot.empty) {
          setConteudo({ id: querySnapshot.id, ...querySnapshot.data() });
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
      <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}> 
        <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}}>
          <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{conteudo.titulo}</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{conteudo.texto}</Text>  
        </View> 
      </View>
    <Button style={styles.Button} title="Voltar" onPress={() => navigation.navigate('Area', {user:user, areaID:areaID})}/>  
    </SafeAreaView>
  );
    
}

export default ConteudoScreen;