import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, getDocs,  query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image,  Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import styles from './Style/style';
import { Button } from 'react-native-elements';
import { db } from './firebase'

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

                  <TouchableOpacity onPress={() => navigation.navigate("Area", {areaID:area.id, user:user})}>
                    <Button onPress={() => navigation.navigate("Area", {areaID:area.id, user:user})}>
                    </Button>
                  </TouchableOpacity>

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
                  <Button title={desafio.titulo} onPress={() => {navigation.navigate('Desafio', { desafioID: desafio.id, user: user })}}/>
                  <View style={{ width: "100%"}}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>{desafio.nivel}</Text>
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

          <Button style={styles.Button} title="Logout" onPress={() => navigation.navigate('LoginSignUp')}/>
        </View>
        <View>
          <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/challenges.jpg"}} style={{ height: 50, width: 50}} />
          <Text style={{ color: "white"}}>Desafios</Text>
        </View>
        <View>
          <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/magnifyingglasses.jpg"}} style={{ height: 50, width: 50}} />
          <Text style={{ color: "white"}}>Pesquisar</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("AdmHome", {adm:user})}>
          <View>
            <Image source={{ uri: "https://raw.githubusercontent.com/Idinaldo/images-holder/refs/heads/main/assets/images/usericon.jpg"}} style={{ height: 50, width: 50}} />
            <Text style={{ color: "white"}}>Perfil</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


export default HomeScreen;