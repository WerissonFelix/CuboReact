import { addDoc, collection, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { db } from './firebase';
import styles from './Style/style';


function AreaScreen({navigation, route}){
  const { areaID, user } = route.params;
  const [area, setArea] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  
 useEffect(() => {
    const getareas = async () => {
      try {
        // 1. Buscar os dados da área
        const areaDocRef = doc(db, "areas", areaID);
        const areaDocSnap = await getDoc(areaDocRef);
        
        if (areaDocSnap.exists()) {
          setArea({ id: areaDocSnap.id, ...areaDocSnap.data() });
          
          // 2. Buscar os conteúdos relacionados (subcoleção)
          const conteudosQuery = query(
            collection(db, "conteudos"),
            where("area", "==", areaID)  // Filtra por referência
          );
          const conteudosSnapshot = await getDocs(conteudosQuery);
          
          const conteudosList = [];
          conteudosSnapshot.forEach((doc) => {
            conteudosList.push({ id: doc.id, ...doc.data() });
          });
          setConteudos(conteudosList);
          console.log(conteudos);
        } else {
          alert("Área não encontrada!");
        }
      } 
       catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getareas();

}, [])
  return (
    <View style={styles.container}>
      <Button style={styles.Button} title="Voltar" onPress={() => navigation.navigate('Home', {user:user})}/>
      
      <Text style={styles.title}>{area.titulo}</Text>
      
      {/* Lista de conteúdos */}
      {conteudos.map((conteudo, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.conteudoItem}
          onPress={() => navigation.navigate('Conteudo', { conteudoID: conteudo.id, user:user })}
        >
          <Text style={styles.title}>{conteudo.texto}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}



export default AreaScreen;