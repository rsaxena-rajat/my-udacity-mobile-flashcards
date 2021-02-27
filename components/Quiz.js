import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'

import {clearLocalNotification, setLocalNotification} from '../utils/helper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    mainText: {
        fontSize: 50,
        textAlign: 'center',
        paddingBottom: 20
    },
    flipText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        paddingBottom: 50,
        textAlign: 'center'
    },
    correctButton: {
        backgroundColor: 'green',
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center'
    },
    incorrectButton: {
        backgroundColor: 'red',
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center'
    },
    optionText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    scoreText: {
        fontSize: 50,
        textAlign: 'center',
        paddingBottom: 20
    },
    backButtonContainer: {
        backgroundColor: 'black',
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 20
    },
    backButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    remText: {
        paddingLeft: 10,
        paddingBottom: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default function Quiz({navigation, parentNav, route}) {
    const {cards} = route.params
    
    useEffect(() => {
        let isCancelled = false

        if (!isCancelled) {
            parentNav.setOptions({headerShown: false})
            navigation.setOptions({headerShown: true})
        }
        return () => {
            parentNav.setOptions({headerShown: true})
            navigation.setOptions({headerShown: false})
            isCancelled = true
        }
    })

    const modes = Object.freeze({
        QUESTION: true,
        ANSWER: false
    })

    const [mode, setMode] = useState(modes.QUESTION)
    const [counter, setCounter] = useState(0)
    const [score, setScore] = useState(0)

    const resetNotification = async () => {
        await clearLocalNotification()
        setLocalNotification()
    }

    const handleCorrect = () => {
        if (counter + 1 === cards.length) {
            resetNotification()
        }
        setScore(score + 1)
        setCounter(counter + 1)
        setMode(modes.QUESTION)
    }

    const handleIncorrect = () => {
        if (counter + 1 === cards.length) {
            resetNotification()
        }
        setCounter(counter + 1)
        setMode(modes.QUESTION)
    }

    const restartQuiz = () => {
        setMode(modes.QUESTION)
        setCounter(0)
        setScore(0)
    }

    const getContent = () => {
        if (counter < cards.length) {
            const card = cards[counter]
            return (
                <View key={card.title} style={styles.cardContainer}>
                    <Text style={styles.remText}>Question: {counter + 1}/{cards.length}</Text>
                    <Text style={styles.mainText}>{mode === modes.QUESTION ? card.question : card.answer}</Text>
                    <Text 
                        style={styles.flipText}
                        onPress={() => setMode(!mode)}
                    >{mode === modes.QUESTION ? 'Answer' : 'Question'}</Text>
                    <TouchableOpacity 
                        style={styles.correctButton}
                        onPress={handleCorrect}
                    >
                        <Text style={styles.optionText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.incorrectButton}
                        onPress={handleIncorrect}
                    >
                        <Text style={styles.optionText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.scoreText}>You answered {score} out of {cards.length} correctly !!</Text>
                    <TouchableOpacity 
                        style={styles.backButtonContainer}
                        onPress={() => restartQuiz()}
                    >
                        <Text style={styles.backButtonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.backButtonContainer}
                        onPress={() => {navigation.goBack()}}
                    >
                        <Text style={styles.backButtonText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {getContent()}
        </View>
    )
}