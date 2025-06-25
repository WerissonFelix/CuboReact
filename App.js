import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Icon , Button , ListItem} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const Stack = createNativeStackNavigator();

function App() {
return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


export function HomeScreen({ navigation, route}) {
  const { user } = route.params;
  
  return (

  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Nome:{user.nome} </Text>
      <Ionicons
              name="add"
              size={24}
              color="black"
              style={{ marginRight: 10 , marginLeft: '50%'}}
              />
    </View>
    </SafeAreaView>
  );
}

function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verifyUser = () =>{axios.get(`http://localhost:3000/usuarios`, {
  params: { 
    email:email, 
    senha:senha }
    })
    .then((response) => {
        const usuario = response.data;
        if(usuario){
          navigation.navigate('Home', {user:usuario[0]})
        }
        else{
          alert("Não conseguiu logar na sua conta!")
        }
    })
    .catch((err) => console.log(err));
  }
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AntDesign 
          name="user" 
          size={30} 
          color="#1890ff" 
          style={{ margin: 10 }}
        />

        <Input style={styles.Input} placeholder='Email' onChangeText={setEmail}/>
        <Input style={styles.Input} placeholder="Senha" secureTextEntry={true} onChangeText={setSenha}/>

        <Button style={styles.Button} title="Logar" onPress={verifyUser}/>
        <Button style={styles.Button} title="Cadastrar" onPress={() => navigation.navigate('Cadastro')}/>

        <Text>esqueci a senha</Text>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>

  );
}


function CadastroScreen({navigation}){
  const [nome, setNome] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

const saveUser = () => {
    axios.post('http://localhost:3000/usuarios', {
      nome, escolaridade, email, senha
    })
    .then(() => navigation.navigate('Login'))
    .catch((err) => console.log(err));
  };

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastro</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='Nome' value={nome} onChangeText={setNome}/>
      <Input style={styles.Input} placeholder='Escolaridade' value={escolaridade} onChangeText={setEscolaridade}/>
      <Input style={styles.Input} placeholder='Email' value={email} onChangeText={setEmail}/>
      <Input style={styles.Input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} />
      <Button style={styles.Button} title="Cadastrar" onPress={saveUser}/>
    </View>
  </SafeAreaView>
  );
}




export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  
  containerheader: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    width: '100%',
    flexDirection: 'row',
  },
  Button: {
    padding : 10,
    width: 200
  },
  Input: {
    marginTop: 10
  },
  title: {
    fontSize: 25
  }
});