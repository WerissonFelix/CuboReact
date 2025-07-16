import { Picker } from '@react-native-picker/picker';
import { updateDoc, getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import styles from './Style/style';

import { db } from './firebase';


function ProfileScreen({navigation, route}) {
  const { user } = route.params;
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [escolaridade, setEscolaridade] = useState(user.escolaridade);
  const [senha, setSenha] = useState(user.senha);

  const updateUser = async () => {

    try {
    const userRef =  await doc(db, "usuarios", user.id);
      
    if(userRef){
        await updateDoc(userRef, {nome,email,escolaridade,senha});
       
        const newuser = await getDoc(userRef);

        const actualuser = {
        id: newuser.id,
        ...newuser.data()
      };

        alert('Alterações feitas!');
        navigation.navigate('Home', {user:actualuser});
      }
    
    } catch(e) {
      console.log('Erro:', e);
      alert("Deu ruim");

    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.container}>

          <View style={styles.InputContainer}>
            <Text style={styles.Label}>Nome Completo: </Text>
            <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: Vicente Dias Gomes' value={nome} onChangeText={setNome}/>
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.Label}>E-mail: </Text>
            <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="nome@exemplo.com" value={email} onChangeText={setEmail}/>
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.Label}>Escolaridade: </Text>
            <Picker selectedValue={escolaridade} onValueChange={setEscolaridade} dropdownIconColor="#999" style={styles.Picker}>
              <Picker.Item label="Selecionar Escolaridade" value="#"/>
              <Picker.Item label="Infantil" value="Infantil"/>
              <Picker.Item label="Fundamental 1" value="Fundamental 1"/>
              <Picker.Item label="Fundamental 2" value="Fundamental 2"/>
              <Picker.Item label="Ensino Médio" value="Ensino Médio"/>
            </Picker>
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.Label}>Senha: </Text>
            <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="********" value={senha} onChangeText={setSenha} secureTextEntry={true} />
          </View>

          <Button style={styles.Button} title="Salvar Alterações" onPress={updateUser}/>
          <Button style={styles.Button} title="Voltar" onPress={() => navigation.navigate('Home', {user:user})}/>
        </View>
      </View>
   </SafeAreaView>
)
}

export default ProfileScreen;