import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmConteudoUpdateScreen({navigation, route}) {
  const { conteudoID } = route.params || {};
  const [texto, setTexto] = useState('');
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
         await updateDoc(doc(db, "conteudos", conteudoID), {texto});
        }
        else {
          const docRef = await addDoc(collection(db, "conteudos"), {texto,createdAt: new Date()});
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

        <View>         
          <Button style={styles.Button} title={conteudoID ? "Atualizar" : "Cadastrar"} onPress={EditSaveConteudo}/>
        </View>

       </View>
  </SafeAreaView>
  );
}

export default AdmConteudoUpdateScreen;