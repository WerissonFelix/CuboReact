import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Input, Icon , Button , ListItem} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useFonts } from "expo-font";
import { Picker } from '@react-native-picker/picker';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUpScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}


function StartScreen({navigation}) {
  const [fontsLoaded] = useFonts({
    "Squada": require("./assets/fonts/SquadaOne-Regular.ttf")
  });

  useEffect(() => {
    const timer = setTimeout(() => {

      navigation.navigate('LoginSignUp');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={{ fontFamily: 'Squada', fontSize: 100 }}>
          <Text style={{ color: "red" }}>C</Text>
          <Text style={{ color: "blue" }}>U</Text>
          <Text style={{ color: "green" }}>B</Text>
          <Text style={{ color: "red" }}>O</Text>
        </Text>
        <Text style={{ fontFamily: 'Squada', fontSize: 20 }}>Bem-vind@</Text>
      </View>
    </SafeAreaView>
  )
}


function LoginSignUpScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={{ fontFamily: 'Squada', fontSize: 100 }}>
          <Text style={{ color: "red" }}>C</Text>
          <Text style={{ color: "blue" }}>U</Text>
          <Text style={{ color: "green" }}>B</Text>
          <Text style={{ color: "red" }}>O</Text>
        </Text>

        <Button title="Login" onPress={() => navigation.navigate("Login")}/>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{ color: "blue" }}>É novo aqui? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )

}


function CadastroScreen({navigation}){
  const [nome, setNome] = useState('');
  const [escolaridade, setEscolaridade] = useState("Selecionar Escolaridade");
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [selectedValue, setSelectedValue] = useState('java');

  const saveUser = () => {
    axios.post('http://localhost:3000/usuarios', {
      nome, escolaridade, email, senha
    })
    .then(() => navigation.navigate('Login'))
    .catch((err) => console.log(err));
  };

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
      <Text style={{ fontFamily: 'Squada', fontSize: 100 }}>
        <Text style={{ color: "red" }}>C</Text>
        <Text style={{ color: "blue" }}>U</Text>
        <Text style={{ color: "green" }}>B</Text>
        <Text style={{ color: "red" }}>O</Text>
      </Text>
    
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
        
        <Button style={styles.Button} title="Cadastrar" onPress={saveUser}/>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "blue" }}>Já tem conta? Faça Login</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.logoContainer}>
        <Text style={{ fontFamily: 'Squada', fontSize: 100 }}>
          <Text style={{ color: "red" }}>C</Text>
          <Text style={{ color: "blue" }}>U</Text>
          <Text style={{ color: "green" }}>B</Text>
          <Text style={{ color: "red" }}>O</Text>
        </Text>
        <View style={styles.container}>

          <View style={styles.InputContainer}>
            <Text style={styles.Label}>E-mail: </Text>
            <Input inputContainerStyle={{ borderBottomWidth: 0 }} style={styles.Input} placeholder='nome@exemplo.com' onChangeText={setEmail}/>
          </View>
          
          <View style={styles.InputContainer}>
            <Text style={styles.Label}>Senha: </Text>
            <Input inputContainerStyle={{ borderBottomWidth: 0 }} style={styles.Input} placeholder="Senha" secureTextEntry={true} onChangeText={setSenha}/>
          </View>
          <Button style={styles.Button} title="Logar" onPress={verifyUser}/>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={{ color: "blue" }}>Ainda não tem conta? Cadastre-se</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </View>
    </SafeAreaView>
  );
}


function HomeScreen({ navigation, route}) {
  const { user } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", gap: 15}}>
        <View style={{ borderRadius: 50, backgroundColor: "orange" }}>
          <AntDesign name="user" size={40} color="white" rounded/>        
        </View>
        <View style={{ display: "flex", flexDirection: "column"}}>
          <Text>Bem-vind@, </Text>
          <Text>{user.nome.split(" ")[0]}</Text>
        </View>
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
  
  logoContainer: {
    marginTop: 10,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
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
  
  InputContainer: {
    flexDirection: "column",
    width: "100%",
    height: "15%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBlock: 10,
    gap: 10
  },

  Input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, 
    padding: 0,
    fontSize: 16,
    backgroundColor: 'white'
  },

  Picker: {
    height: 40,
    fontSize: 16,
    color: '#000',
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  
  Label: {
    width: "100%"
  }, 
  title: {
    fontSize: 25
  }
});