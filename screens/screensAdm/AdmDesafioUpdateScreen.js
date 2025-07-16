import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import styles from '../Style/style';
import { db } from '../firebase';

function AdmDesafioUpdateScreen({ navigation, route }) {
  const { conteudoID, desafioID, adm } = route.params || {};
  

  const [conteudo, setConteudo] = useState(conteudoID);
  const [nivel, setNivel] = useState('');
  const [titulo, setTitulo] = useState('');
  const [questoes, setQuestoes] = useState([
    {
      pergunta: '',
      resposta: '',
      alternativas: ['', '', '', '']
    }
  ]);

  const EditSaveDesafio = async () => {
    try {
      if (desafioID) {
        await updateDoc(doc(db, "desafios", desafioID), {
          nivel,
          questoes,
          titulo,
          conteudo
        });
      } else {
         await addDoc(collection(db, "desafios"), {
          nivel,
          questoes,
          titulo,
          conteudo,
          createdAt: new Date()
        });
      }
      navigation.goBack();
    } catch (e) {
      console.log("ocorreu um erro", e)
    }
  }

  const adicionarQuestao = () => {
    setQuestoes([
      ...questoes,
      {
        pergunta: '',
        resposta: '',
        alternativas: ['', '', '', '']
      }
    ]);
  };

  const removerQuestao = (index) => {
    if (questoes.length <= 1) return;
    const novasQuestoes = [...questoes];
    novasQuestoes.splice(index, 1);
    setQuestoes(novasQuestoes);
  };

  const atualizarPergunta = (index, texto) => {
    const novasQuestoes = [...questoes];
    novasQuestoes[index].pergunta = texto;
    setQuestoes(novasQuestoes);
  };

  const atualizarResposta = (index, texto) => {
    const novasQuestoes = [...questoes];
    novasQuestoes[index].resposta = texto;
    setQuestoes(novasQuestoes);
  };

  const atualizarAlternativa = (questaoIndex, altIndex, texto) => {
    const novasQuestoes = [...questoes];
    novasQuestoes[questaoIndex].alternativas[altIndex] = texto;
    setQuestoes(novasQuestoes);
  };

  useEffect(() => {
    const getDesafio = async () => {
      try {
        if (desafioID) {
          const docRef = doc(db, "desafios", desafioID);
          const queryDesafio = await getDoc(docRef);
          
          if (queryDesafio.exists()) {
            const data = queryDesafio.data();
            setNivel(data.nivel || '');
            
            if (data.questoes && data.questoes.length > 0) {
              setQuestoes(data.questoes);
            } else {
              setQuestoes([{
                pergunta: '',
                resposta: '',
                alternativas: ['', '', '', '']
              }]);
            }
          }
        }
      } catch (e) {
        console.log("ocorreu um erro", e)
      }
    }
    getDesafio();
  }, [desafioID]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.container}>
            <Text style={styles.Label}>Título: </Text>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }}
              style={styles.Input}
              placeholder='Ex: Desafio sobre Frações '
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.Label}>Nivel: </Text>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }}
              style={styles.Input}
              placeholder='Ex: Nível fácil'
              value={nivel}
              onChangeText={setNivel}
            />
          </View>

          {questoes.map((questao, questaoIndex) => (
            <View key={questaoIndex}>
              <View style={styles.container}>
                <Text style={styles.Label}>Questão {questaoIndex + 1}:</Text>
                <Input
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }}
                  style={styles.Input}
                  placeholder='Digite a pergunta'
                  value={questao.pergunta}
                  onChangeText={(texto) => atualizarPergunta(questaoIndex, texto)}
                />
              </View>

              <View style={styles.container}>
                <Text style={styles.Label}>Resposta Correta:</Text>
                <Input
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }}
                  style={styles.Input}
                  placeholder='Letra da alternativa correta (A, B, C ou D)'
                  value={questao.resposta}
                  onChangeText={(texto) => atualizarResposta(questaoIndex, texto)}
                />
              </View>

              {['A', 'B', 'C', 'D'].map((letra, altIndex) => (
                <View key={altIndex} style={styles.conteiner}>
                  <Text style={styles.Label}>Alternativa {letra}:</Text>
                  <Input
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    containerStyle={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }}
                    style={styles.Input}
                    placeholder={`Texto da alternativa ${letra}`}
                    value={questao.alternativas[altIndex]}
                    onChangeText={(texto) => atualizarAlternativa(questaoIndex, altIndex, texto)}
                  />
                </View>
              ))}

              <View style={styles.container}>
                <Button 
                  title="Remover Questão" 
                  onPress={() => removerQuestao(questaoIndex)}
                  disabled={questoes.length <= 1}
                />
              </View>
              <View style={styles.container} />
            </View>
          ))}

          <View style={styles.container}>
            <Button 
              title="+" 
              onPress={adicionarQuestao}
            />
          </View>

          <View style={styles.container}>
            <Button
              title={desafioID ? "Atualizar" : "Cadastrar"}
              onPress={EditSaveDesafio}
            />
            <Button
              title="Voltar"
              onPress={() => navigation.navigate('AdmDesafio', { adm: adm, conteudoID:conteudoID })}   
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdmDesafioUpdateScreen;