import { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { collection, doc, getDocs, query, deleteDoc, where } from 'firebase/firestore';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmConteudoScreen({navigation, route}){
  const { adm, areaID, area } = route.params
  const [conteudos, setConteudos] = useState([])

  const deleteConteudo = async (conteudoID) =>{
    try {
      await deleteDoc(doc(db, "conteudos", conteudoID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmConteudo', {adm:adm});
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
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getConteudos();

}, [])
 
  return( 
    <>
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: '#f8f9fa' }}>
      <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>Conteúdos de {area}</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {conteudos.length > 0 ? conteudos.map((conteudo, index) => (
          <TouchableOpacity key={index} style={{ minWidth: "50%", maxWidth: "90%"}}>
            <View>
              <View style={styles.cardBody}>
                <Image
                source={{ uri: 'https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg' }}
                style={styles.image}
              />
                <Text style={styles.cardTitle}>Em tese, nome do conteúdo/artigo</Text>
                <Text style={styles.cardText}>{conteudo.texto}</Text>
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                  <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate("AdmConteudoUpdate", { adm: adm, areaID: area.id})}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => deleteConteudo(conteudo.id)}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Excluir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={() => navigation.navigate("AdmDesafio", { adm: adm, conteudoID: conteudo.id})}>
                    <Text style={[styles.btnText, styles.btnPrimaryText]}>Ver Desafios Relacionados</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center", flexDirection: "column" }}>
            <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>Não há conteúdos para a área de {area}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AdmConteudoUpdate", { adm: adm })}>
              <Text style={{ color: "blue", textAlign: "center", fontSize: 20 }}>Clique aqui para adicionar conteúdos nessa área</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    
    {/*<SafeAreaView>
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
                <Button title="ver desafios" onPress={() => navigation.navigate("AdmDesafio", {conteudoID: conteudo.id, adm:adm})}/>
              </View>


              <View>
                <Button title="delete" onPress={() =>deleteConteudo(conteudo.id)}/>
              </View>
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>*/}
    </>
  );
    
}

export default AdmConteudoScreen;