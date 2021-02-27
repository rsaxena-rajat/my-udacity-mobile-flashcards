import React, { useEffect, useState } from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import AddCard from './AddCard'
import Quiz from './Quiz'

import {getDeck} from '../utils/helper'

const styles = StyleSheet.create({
    deckContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 50,
        textAlign: 'center',
        paddingBottom: 10
    },
    deckCountText: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 50,
        color: 'gray'
    },
    addCardButton: {
        marginTop: 30,
        height: 50,
        width: 250,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center'
    },
    startQuizButton: {
        marginTop: 30,
        height: 50,
        width: 250,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    addCardText: {
        textAlign: 'center'
    },
    startQuizText: {
        textAlign: 'center',
        color: 'white'
    }
})

function DeckDetails({navigation, title, parentNav}) {
    const [deck, setDeck] = useState({})

    useEffect(() => {
        let isCancelled = false

        if (!isCancelled) {
            parentNav.setOptions({headerShown: false})
            navigation.setOptions({headerShown: true})
            getDeck(title)
                .then((resp) => !isCancelled && setDeck(resp))
        }
        return () => {
            parentNav.setOptions({headerShown: true})
            navigation.setOptions({headerShown: false})
            isCancelled = true
        }
    })

    const handleAddCard = () => {
        navigation.navigate('AddCard')
    }
    
    const handleStartQuiz = () => {
        if (!(deck.questions || []).length) {
            alert('Please add cards - you may then play the quiz !')
            return
        }
        navigation.navigate('StartQuiz', {cards: deck.questions})
    }

    return (
        <View style={styles.deckContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.deckCountText}>{(deck.questions || []).length} cards</Text>
            <TouchableOpacity 
                style={styles.addCardButton}
                onPress={handleAddCard}
            >
                <Text style={styles.addCardText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.startQuizButton}
                onPress={handleStartQuiz}
            >
                <Text style={styles.startQuizText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    )
}

const DeckDetailsStack = createStackNavigator()

export default function DeckDetailsStackScreen({navigation, route}) {
    const {title} = route.params

    return (
        <DeckDetailsStack.Navigator>
            <DeckDetailsStack.Screen 
                name="DeckOverview" 
                options={() => ({title, headerShown: false})}
            >
                {(props) => <DeckDetails title={title} parentNav={navigation} {...props} />}
            </DeckDetailsStack.Screen>
            <DeckDetailsStack.Screen 
                name="AddCard" 
                options={() => ({title: 'Add Card', headerShown: false})} 
            >
                {(props) => <AddCard title={title} parentNav={navigation} {...props} />}
            </DeckDetailsStack.Screen>
            <DeckDetailsStack.Screen 
                name="StartQuiz" 
                options={() => ({title: 'Quiz', headerShown: false})} 
            >
                {(props) => <Quiz title={title} parentNav={navigation} {...props} />}
            </DeckDetailsStack.Screen>
        </DeckDetailsStack.Navigator>
    )
}