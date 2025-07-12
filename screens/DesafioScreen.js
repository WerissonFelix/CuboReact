import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import styles from './Style/style';

function DesafioScreen({ navigation, route }) {
    const { desafioID, user } = route.params;
    
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [desafio, setDesafio] = useState(null);

    useEffect(() => {
        const getDesafio = async () => {
            try {
                const docRef = doc(db, "desafios", desafioID);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDesafio({ id: docSnap.id, ...docSnap.data() });
                } else {
                    alert("Desafio não encontrado!");
                }
            } catch (err) {
                console.log("ERROR: ", err);
                alert("Houve um erro. Contate o suporte.");
            }
        };
        getDesafio();
    }, [desafioID]);

    const handleAnswer = (selectedAnswer) => {
        if (!desafio) return;
        
        const currentQuizItem = desafio.Quiz[currentQuestion];
        
        if (currentQuizItem.answer === selectedAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < desafio.Quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    if (!desafio) {
        return (
            <View style={styles.container}>
                <Text>Carregando desafio...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Button style={styles.Button} title="Voltar" onPress={() => navigation.navigate('Home', {user:user})}/>
            {showScore ? (
                <View style={styles.scoreContainer}> 
                    <Text style={styles.scoreText}>Você acertou {score} de {desafio.Quiz.length}</Text>
                    <TouchableOpacity style={styles.resetButton} onPress={handleRestart}> 
                        <Text style={styles.resetButtonText}>Reiniciar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={() => navigation.navigate('Start')}> 
                        <Text style={styles.resetButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.questionContainer}> 
                    <Text style={styles.questionText}>
                        {desafio.Quiz[currentQuestion]?.question}
                    </Text>
                    
                    {desafio.Quiz[currentQuestion]?.options.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.optionButton} 
                            onPress={() => handleAnswer(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

export default DesafioScreen;