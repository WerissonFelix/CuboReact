import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, updateDoc, getDoc, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmConteudoUpdateScreen({navigation, route}) {
  const { conteudoID, adm } = route.params || {};
  const [texto, setTexto] = useState('');
  const [area, setArea] = useState('');
  useEffect(() => { 
    const getConteudo = async () =>{
      try{ 
        if(conteudoID){
          const docRef = doc(db, "conteudos", conteudoID);
          const queryConteudo = await getDoc(docRef);
          console.log("ID do conteúdo:", conteudoID);
          console.log("Documento existe?", queryConteudo.exists());
          if(queryConteudo.exists()){        
            setTexto(queryConteudo.data().texto);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getConteudo();
  }, [conteudoID]);

  const EditSaveConteudo = async () =>{
      try{ 
        if(conteudoID){
         await updateDoc(doc(db, "conteudos", conteudoID), {texto, area:"M6sOHm7NEtslvL3g2rlE"});
        }
        else {
          const docRef = await addDoc(collection(db, "conteudos"), {texto, area:"M6sOHm7NEtslvL3g2rlE", createdAt: new Date()});
          navigation.goBack();
        }
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
  return(
      
      <SafeAreaView style={styles.container}>

      <View style={styles.container}>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>texto: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={texto} onChangeText={setTexto}/>
        </View>

       <View style={styles.InputContainer}>
          <Text style={styles.Label}>area: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={area} onChangeText={setArea}/>
        </View>


        <View>         
          <Button style={styles.Button} title={conteudoID ? "Atualizar" : "Cadastrar"} onPress={EditSaveConteudo}/>
        </View>

        
        <View>         
          <Button style={styles.Button} title={"Voltar"} onPress={() => navigation.navigate('AdmConteudo', {adm:adm})}/>
        </View>

       </View>
  </SafeAreaView>
  );
}

export default AdmConteudoUpdateScreen;