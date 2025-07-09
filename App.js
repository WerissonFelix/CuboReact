import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, deleteDoc,where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';


const firebaseConfig = {
  apiKey: "AIzaSyCAmQ5YiGUE3qaWr7tD38aXyXxgLROJ_sY",
  authDomain: "cubo.firebaseapp.com",
  projectId: "cubo-42758",
  storageBucket: "cubo.appspot.com",
  messagingSenderId: "417447425142",
  appId: "1:417447425142:web:7e8340277f46ca8083db57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUpScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmHome" component={AdmHomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmArea" component={AdmAreaScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmAreaUpdate" component={AdmAreaUpdateScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmConteudo" component={AdmConteudoScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmConteudoUpdate" component={AdmConteudoUpdateScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmDesafio" component={AdmDesafioScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AdmDesafioUpdate" component={AdmDesafioUpdateScreen} options={{ headerShown: false}}/>


        
        
        
        {/*<Stack.Screen name="AdmDesafio" component={AdmDesafioScreen} options={{ headerShown: false}}/>
          */}
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

  const testFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      alert(` Conexão OK! Documentos: ${querySnapshot.size}`);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
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
        <Text style={{ fontFamily: 'Squada', fontSize: 20 }}>Bem-vind@</Text>
        <Button title="Testar Firebase" onPress={testFirebase} />
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

  const saveUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nome,
        escolaridade,
        email,
        senha,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate('Login');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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


  const verifyUser = async () => {
    try {
      const q = query(
        collection(db, "usuarios"),
        where("email", "==", email),
        where("senha", "==", senha)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if (doc.id === 'PS82zLCNaXDlSFnqq76t'){
              navigation.navigate('AdmHome',{user: {id: doc.id, ... doc.data()}});
          } else{
            navigation.navigate('Home', {user: {id: doc.id, ...doc.data()}});
          }

        });
      } else {
        alert("E-mail ou senha incorretos!");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      alert("Houve um erro. Contate o suporte.");
    }
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
  const [areas, setAreas] = useState([]);
  const [desafios, setDesafios] = useState([]);

  useEffect(() => {
    const getdesafios = async () => {
    try {
      const q = query(
        collection(db, "desafios"),
      );

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {
        const listdesafios = [];
        querySnapshot.forEach((doc) => {
          listdesafios.push({id: doc.id, ...doc.data()});
        });
        setDesafios(listdesafios)
      } else {
        alert("Não há desafios cadastrados!");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      alert("Houve um erro. Contate o suporte.");
    }

  }
    getdesafios();
}, [])


  useEffect(() => {
  const getareas = async () => {
    try {
      const q = query(
        collection(db, "areas"),
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const listareas = [];
        querySnapshot.forEach((doc) => {
          listareas.push({id:doc.id, ... doc.data()})
        });
        setAreas(listareas)
      } else {
        alert("Não há areas cadastradas!");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      alert("Houve um erro. Contate o suporte.");
    }
  }
  getareas();

}, [])

  return (
    <SafeAreaView style={{backgroundColor: "#0722b2", width: "100%"}}>
      <View style={{ display: "flex", flexDirection: "column", width: "100%"}}>

        {/* Header Component Starts */}
        <View style={{ display: "flex", flexDirection: "row", gap: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, height: 80, width: "100%", alignContent: "space-evenly", justifyContent: "space-between"}}>

          {/* User Icon and Welcome Message Container */}
          <View style={{ display: "flex", flexDirection: "row"}}>
            {/* User Icon */}
            <TouchableOpacity onPress={() => navigation.navigate("Profile", {user:user})}>
              <View style={[styles.Icon, { backgroundColor: "orange"}]} onPress={() => navigation.navigate("Profile")}>
                <AntDesign name="user" size={40} color="white" rounded/>
              </View>
            </TouchableOpacity>

            {/* Welcome Message */}
            <View style={{ display: "flex", flexDirection: "column"}}>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Bem-vind@, </Text>
              <Text style={{ color: "white" }}>{user.nome.split(" ")[0]}</Text>
            </View>
          </View>

          {/* Bell Icon */}
          <View style={{ display: "flex", flexDirection: "row", gap: 10}}>
            <View style={[styles.Icon]}>
              <AntDesign name="bells" size={40} color="orange" rounded/>
            </View>

            {/* Trophy Icon */}
            <View style={[styles.Icon]}>
              <AntDesign name="Trophy" size={40} color="orange" rounded/>
            </View>
          </View>
        </View>
        {/* Header Component Ends */}

        {/* Main Component Starts */}
        <View style={{ display: "flex", flexDirection: "column", backgroundColor: "white", borderTopLeftRadius: 50, paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20}}>

          {/* Articles Component Starts */}
          <View testID='articlesContainer' style={{ paddingBottom: 20}}>
            <Text style={{ fontSize: 20, paddingBottom: 20, textAlign: "left"}}>O que você quer aprender hoje?</Text>

            {/* Article Container Starts */}
            <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>

              {/* Areas Mapper */}
              {areas.map((area, index) => (
                <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>

                  <View style={{ borderRadius: 60, backgroundColor: area.cor, width: 80, height: 80 }}>
                    <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{area.icon}</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>{area.titulo}</Text>
                  </View>

                </View>
              ))}

            </View>
            {/* Article Container Ends */}

          </View>
          {/* Articles Container Ends */}


          {/* Challenges Component Starts */}
          <View testID='articlesContainer'>
            <Text style={{ fontSize: 20, paddingBottom: 20}}>Desafios: tá achando fácil?</Text>

            {/* Challenge Container Starts */}
            <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>

              {/* Challenges Mapper */}
              {desafios.map((desafio, index) => (
                <View style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center"}} key={index}>
                  <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                     <Image source={{ uri: `https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/${desafio.foto}`}} style={{ width: 100, height: 100, borderRadius: 20 }} />
                  </View>

                  <View style={{ width: "100%"}}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>{desafio.titulo}</Text>
                  </View>
                </View>
              ))}

            </View>
            {/* Challenge Container Ends */}

          </View>
          {/* Challenges Container Ends */}

        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", alignContent: "space-between", alignItems: "center", justifyContent: "space-between", paddingLeft: 20, paddingRight: 20}}>
        <View>
          <FontAwesome6 name="house-chimney" size={40} color="yellow" />
          <Text style={{ color: "white"}}>Home</Text>
        </View>
        <View>
          <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/challenges.jpg"}} style={{ height: 50, width: 50}} />
          <Text style={{ color: "white"}}>Desafios</Text>
        </View>
        <View>
          <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/magnifyingglasses.jpg"}} style={{ height: 50, width: 50}} />
          <Text style={{ color: "white"}}>Pesquisar</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile", {user:user})}>
          <View>
            <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/usericon.jpg"}} style={{ height: 50, width: 50}} />
            <Text style={{ color: "white"}}>Perfil</Text>
          </View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


function ProfileScreen({navigation, route}) {
  const { user } = route.params;
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [escolaridade, setEscolaridade] = useState(user.escolaridade);
  const [senha, setSenha] = useState(user.senha);

  const updateUser = async () => {

    try {
    const userRef =  await doc(db, "usuarios", user.id);
      
    if(!userRef.empty){
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
          <Button style={styles.Button} title="Voltar" onPress={() => navigation.navigate("Home", {user})}/>
        </View>
      </View>
   </SafeAreaView>
)
}

{/*                         FUNÇÕES DO ADM                         */}

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  return(
    <SafeAreaView>
      <View>
        <Button title="Area" onPress={() => navigation.navigate("AdmArea", {user:adm})}/>
        <Button title="Desafios" onPress={() => navigation.navigate("AdmDesafio", {user:adm})}/>
        <Button title="Conteudos" onPress={() => navigation.navigate("AdmConteudo", {user:adm})}/>
      </View>
    </SafeAreaView>
  )
}

function AdmAreaScreen({navigation, route}){
  const [areas, setAreas] = useState([])
  const deletearea = async (areaID) =>{
    try {
      await deleteDoc(doc(db, "areas", areaID));
      
      alert("Usuário excluído com sucesso!");
      const updatedAreas = areas.filter(area => area.id !== areaID);
      setAreas(updatedAreas);
  } catch (e) {
    console.error("Erro ao excluir area: ", e);
    }
  }
  useEffect(() => {
    const getareas = async () => {
      try {
        const q = query(
          collection(db, "areas"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listareas = [];
          querySnapshot.forEach((doc) => {
            listareas.push({id:doc.id, ... doc.data()})
          });
          setAreas(listareas)
        } else {
          alert("Não há areas cadastradas!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getareas();

}, [])
 
  return( 
    <SafeAreaView>
     <View>
        <Button tittle="criar area" onPress={() => navigation.navigate("AdmAreaUpdate")}/>
     </View>
     <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {areas.map((area, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
            

              <View style={{ borderRadius: 60, backgroundColor: area.cor, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{area.icon}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{area.titulo}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{area.cor}</Text>
              </View>

              <View>
                <Button title="mude a area" onPress={() => navigation.navigate("AdmAreaUpdate", {areaID:area.id})}/>
              </View>


              <View>
                <Button title="deleta a area" onPress={() =>deletearea(area.id)}/>
              </View>
            </View>
          ) 
          )}
    </View>
    </SafeAreaView>
    );
}

function AdmAreaUpdateScreen({navigation, route}) {
  const { areaID } = route.params || {};
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
        }
        else {
          const docRef = await addDoc(collection(db, "areas"), {cor,icon,titulo,createdAt: new Date()});
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
          <Text style={styles.Label}>Cor: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder='Ex: #ffbf00' value={cor} onChangeText={setCor}/>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Icon: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Ex: +" value={icon} onChangeText={setIcon}/>
        </View>


        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Título: </Text>
          <Input inputContainerStyle={{ borderBottomWidth: 0 }} containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0}} style={styles.Input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        </View>


        <View>         
          <Button style={styles.Button} title={areaID ? "Atualizar" : "Cadastrar"} onPress={EditSaveArea}/>
        </View>
       </View>
  </SafeAreaView>
  );
}

  {/*                    ADM CONTEUDOS                 */}


function AdmConteudoScreen({navigation, route}){
  const [conteudos, setConteudos] = useState([])
  const deleteConteudo = async (conteudoID) =>{
    try {
      await deleteDoc(doc(db, "conteudos", conteudoID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmConteudo');
  } catch (e) {
    console.error("Erro ao excluir conteudo: ", e);
    }
  }
  useEffect(() => {
    const getConteudos = async () => {
      try {
        const q = query(
          collection(db, "conteudos"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listConteudos = [];
          querySnapshot.forEach((doc) => {
            listConteudos.push({id:doc.id, ... doc.data()})
          });
          setConteudos(listConteudos)
        } else {
          alert("Não há Conteúdos cadastrados!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getConteudos();

}, [])
 
  return( 
    <SafeAreaView>
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
                <Button title="edit" onPress={() => navigation.navigate("AdmConteudoUpdate", {conteudoID: conteudo.id})}/>
              </View>


              <View>
                <Button tittle="delete" onPress={() =>deleteConteudo()}/>
              </View>
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>
  );
    
}

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

{/*         ADM DESAFIOS            */}

function AdmDesafioScreen({navigation, route}){
  const [desafios, setDesafios] = useState([])
  const deleteDesafios = async (desafioID) =>{
    try {
      await deleteDoc(doc(db, "desafios", desafioID));
      
      alert("Usuário excluído com sucesso!");
      navigation.navigate('AdmDesafio');
  } catch (e) {
    console.error("Erro ao excluir conteudo: ", e);
    }
  }
  useEffect(() => {
    const getDesafios = async () => {
      try {
        const q = query(
          collection(db, "desafios"),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const listDesafios = [];
          querySnapshot.forEach((doc) => {
            listDesafios.push({id:doc.id, ... doc.data()})
          });
          setDesafios(listDesafios)
        } else {
          alert("Não há desafios cadastrados!");
        }
      } catch (err) {
        console.log("ERROR: ", err);
        alert("Houve um erro. Contate o suporte.");
      }
    }
    getDesafios();

}, [])
 
  return( 
    <SafeAreaView>
     <View>
        <Button title="adicionar desafio" onPress={() => navigation.navigate("AdmDesafioUpdate")}/>
     </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
        {desafios.map((desafio, index) => (
            <View style={{ display: "flex", width: 100, alignItems: "center", alignContent: "center"}} key={index}>
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.foto}</Text>
              </View>
              
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.nivel}</Text>
              </View>

              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.texto}</Text>
              </View>
              
              <View style={{ borderRadius: 60, width: 80, height: 80 }}>
                <Text style={{ fontSize: 50, fontWeight: "bold" ,color: "white",  textAlign: "center" }}>{desafio.titulo}</Text>
              </View>

              <View>
                <Button title="edit" onPress={() => navigation.navigate("AdmDesafioUpdate", {condesafioID: desafio.id})}/>
              </View>


              <View>
                <Button tittle="delete" onPress={() =>deleteDesafios()}/>
              </View>
            </View>
          ) 
        )}
      </View>
    </SafeAreaView>
  );
    
}

function AdmDesafioUpdateScreen({navigation, route}) {
  const { desafioID } = route.params || {};
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
         await updateDoc(doc(db, "desafios", desafioID), {foto,nivel,texto,titulo});
        }
        else {
          const docRef = await addDoc(collection(db, "desafios"), {foto,nivel,texto,titulo,createdAt: new Date()});
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

        <View>         
          <Button style={styles.Button} title={desafioID ? "Atualizar" : "Cadastrar"} onPress={EditSaveDesafio}/>
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

  Icon: {
    borderRadius: 50,
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },

  Label: {
    width: "100%"
  },
  title: {
    fontSize: 25
  }
});
