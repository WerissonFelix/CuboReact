import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, deleteDoc,where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';

import {db} from '../firebase';

function AdmHomeScreen({navigation, route}) {
  const { adm } = route.params;
  return(
    <SafeAreaView>
      <View>
        <Button title="Area" onPress={() => navigation.navigate("AdmArea", {adm:adm})}/>
        <Button title="Desafios" onPress={() => navigation.navigate("AdmDesafio", {adm:adm})}/>
        <Button title="Conteudos" onPress={() => navigation.navigate("AdmConteudo", {adm:adm})}/>
      </View>
      <View>
        <Button title="Voltar" onPress={() => navigation.navigate('LoginSignUp')}/>
      </View>
    </SafeAreaView>
  )
}



export default AdmHomeScreen;