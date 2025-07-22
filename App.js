import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginSignUpScreen from './screens/LoginSignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import StartScreen from './screens/StartScreen';
import AreaScreen from './screens/AreaScreen';
import DesafioScreen from './screens/DesafioScreen';
import ConteudoScreen from './screens/ConteudoScreen';
//import ConteudoScreen from './screens/ConteudoScreen';

{/* ADM */}
import AdmHomeScreen from './screens/screensAdm/AdmHomeScreen';
import AdmAreaScreen from './screens/screensAdm/AdmAreaScreen';
import AdmAreaUpdateScreen from './screens/screensAdm/AdmAreaUpdateScreen';
import AdmConteudoScreen from './screens/screensAdm/AdmConteudoScreen';
import AdmConteudoUpdateScreen from './screens/screensAdm/AdmConteudoUpdateScreen';
import AdmDesafioScreen from './screens/screensAdm/AdmDesafioScreen';
import AdmDesafioUpdateScreen from './screens/screensAdm/AdmDesafioUpdateScreen';



const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }}/>

        {/** Common user screens */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Desafio" component={DesafioScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Area" component={AreaScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Conteudo" component={ConteudoScreen} options={{ headerShown: false }}/>
        {/*<Stack.Screen name="Conteudo" component={ConteudoScreen} options={{ headerShown: false}}/>*/}  
        
        {/** Adm screen */}
        <Stack.Screen name="AdmHome" component={AdmHomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AdmArea" component={AdmAreaScreen} options={{ headerTitle: "Voltar" }}/>
        <Stack.Screen name="AdmDesafio" component={AdmDesafioScreen} options={{ headerTitle: "Voltar" }}/>
        <Stack.Screen name="AdmConteudo" component={AdmConteudoScreen} options={{ headerTitle: "Voltar" }}/>
        <Stack.Screen name="AdmAreaUpdate" component={AdmAreaUpdateScreen} options={{ headerTitle: "Voltar" }}/>
        <Stack.Screen name="AdmDesafioUpdate" component={AdmDesafioUpdateScreen} options={{ headerTitle: "Voltar" }}/>
        <Stack.Screen name="AdmConteudoUpdate" component={AdmConteudoUpdateScreen} options={{ headerTitle: "Voltar" }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;