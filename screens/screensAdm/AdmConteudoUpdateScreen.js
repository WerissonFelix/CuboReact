import { initializeApp } from 'firebase/app';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, doc, updateDoc, getDoc, query,getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmConteudoUpdateScreen({navigation, route}) {
  const { conteudoID, adm } = route.params || {};
  const [texto, setTexto] = useState('');
  const [titulo, setTitulo] = useState('');
  const [area, setArea] = useState([]);
  const [areaConteudo, setAreaConteudo] = useState('');
  
  useEffect(() => { 
    const getArea = async () =>{
      const q = query(collection(db, "areas"));
      const areaSnap = await getDocs(q);
      try{
        if(areaSnap){
          const areas = [];
          areaSnap.forEach((doc) => {
            areas.push({ id: doc.id, ...doc.data() });
          });
          setArea(areas);
      } else {
         alert('fudeu');
      } 
         
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getArea();
  }, []);
  
  
  useEffect(() => {
    const getConteudo = async () => {
      try {
        if (conteudoID) {
          const docRef = doc(db, "conteudos", conteudoID);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTexto(data.texto || '');
            setAreaConteudo(data.area || ''); // ATENÇÃO: Verifique se o campo no Firestore é "area" ou "areaConteudo"
            setTitulo(data.titulo || '');
          }
        }
      } catch (e) {
        console.error("Erro ao buscar conteúdo:", e);
      }
    };
    getConteudo();
  }, [conteudoID]);

const EditSaveConteudo = async () => {
    try {
      const conteudoData = {
        texto,
        titulo,
        area: areaConteudo // ATENÇÃO: Mantenha consistência com o nome do campo no Firestore
      };

      if (conteudoID) {
        await updateDoc(doc(db, "conteudos", conteudoID), conteudoData);
      } else {
        await addDoc(collection(db, "conteudos"), {
          ...conteudoData,
          createdAt: new Date()
        });
      }
      navigation.goBack();
    } catch (e) {
      console.error("Erro ao salvar conteúdo:", e);
      alert('Erro ao salvar: ' + e.message);
    }
  };
  return(
      
      <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Título: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: título' value={titulo} onChangeText={setTitulo}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>texto: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: texto' value={texto} onChangeText={setTexto}/>
        </View>

        <View style={styles.InputContainer}>
            <Text style={styles.Label}>Qual é a área nova do Conteúdo? </Text>
            
            <Picker selectedValue={areaConteudo} onValueChange={setAreaConteudo} dropdownIconColor="#999" style={styles.Picker}>
              <Picker.Item label="Selecione a Área" value="#"/>
              {area.map((a, index) =>(  
                <Picker.Item label={a.titulo} value={a.id} key={index} />
              ))}
              </Picker>       
          </View>


        <View>         
          <Button style={styles.Button} title={conteudoID ? "Atualizar" : "Cadastrar"} onPress={EditSaveConteudo}/>
        </View>
       </View>
  </SafeAreaView>
  );
}

export default AdmConteudoUpdateScreen;