import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmAreaUpdateScreen({navigation, route}) {
  const { areaID, adm } = route.params || {};
  

  const [titulo, setTitulo] = useState('');
  const [icon, setIcon] = useState('');
  const [cor, setCor] = useState('');

  useEffect(() => { 
    const getArea = async () =>{
      try{ 
        if(areaID){
          const docRef = doc(db, "areas", areaID);
          const queryArea = await getDoc(docRef);
          console.log("ID da área:", areaID);
          console.log("Documento existe?", queryArea.exists());
          if(queryArea.exists()){        
            setCor(queryArea.data().cor);
            setIcon(queryArea.data().icon);
            setTitulo(queryArea.data().titulo);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getArea();
  }, [areaID]);

  const EditSaveArea = async () =>{
      try{ 
        if(areaID){
         await updateDoc(doc(db, "areas", areaID), {cor,icon,titulo});
          navigation.navigate('AdmHome', {adm:adm});
        }
        else {
          await addDoc(collection(db, "areas"), {cor,icon,titulo,createdAt: new Date()});
          navigation.navigate('AdmHome', {adm:adm});
        }
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
  return(
    <SafeAreaView style={styles.container}>
      {areaID ? (
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold"}}>Edição de Áreas</Text>
      ) : (
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold"}}>Cadastro de Áreas</Text>
      )}
      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Título: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Icon: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Ex: +" value={icon} onChangeText={setIcon}/>
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Cor: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: #ffbf00' value={cor} onChangeText={setCor}/>
        </View>
        <View>         
          <Button style={styles.Button} title={areaID ? "Atualizar" : "Cadastrar"} onPress={EditSaveArea}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AdmAreaUpdateScreen;