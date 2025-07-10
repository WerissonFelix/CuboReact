import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc,  updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmDesafioUpdateScreen({navigation, route}) {
  const { desafioID } = route.params || {};
  const [area, setArea] = useState('');
  const [texto, setTexto] = useState('');
  const [foto, setFoto] = useState('');
  const [nivel, setNivel] = useState('');
  const [titulo, setTitulo] = useState('');
  useEffect(() => { 
    const getDesafio = async () =>{
      try{ 
        if(desafioID){
          const docRef = doc(db, "desafios", desafioID);
          const queryDesafio = await getDoc(docRef);
          console.log("ID do desafio:", desafioID);
          console.log("Documento existe?", queryDesafio.exists());
          if(queryDesafio.exists()){
            setArea(queryDesafio.data().area)        
            setTexto(queryDesafio.data().texto);
            setFoto(queryDesafio.data().foto);
            setNivel(queryDesafio.data().nivel);
            setTitulo(queryDesafio.data().titulo);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getDesafio();
  }, [desafioID]);

  const EditSaveDesafio = async () =>{
      try{ 
        if(desafioID){
         await updateDoc(doc(db, "desafios", desafioID), {foto,nivel,texto,titulo, area});
        }
        else {
          const docRef = await addDoc(collection(db, "desafios"), {foto,nivel,texto,titulo,area,createdAt: new Date()});
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
          <Text style={styles.Label}>foto: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={foto} onChangeText={setFoto}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>nivel: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={nivel} onChangeText={setNivel}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>texto: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={texto} onChangeText={setTexto}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>titulo: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={titulo} onChangeText={setTitulo}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>area: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={area} onChangeText={setArea}/>
        </View>

        <View>         
          <Button style={styles.Button} title={desafioID ? "Atualizar" : "Cadastrar"} onPress={EditSaveDesafio}/>
        </View>

       </View>
  </SafeAreaView>
  );
}

export default AdmDesafioUpdateScreen;