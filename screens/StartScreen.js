import { useFonts } from "expo-font";
import { collection, getDocs,  } from 'firebase/firestore';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import styles from './Style/style';

import { db } from './firebase';

function StartScreen({navigation}) {
  const [fontsLoaded] = useFonts({
    "Squada": require("../assets/fonts/SquadaOne-Regular.ttf")
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


export default StartScreen;