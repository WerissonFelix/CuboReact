import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import styles from './Style/style';
import { StatusBar } from 'expo-status-bar'
import { db } from './firebase';

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

export default LoginSignUpScreen;