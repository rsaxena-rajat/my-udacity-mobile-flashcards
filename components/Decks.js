import React, { useEffect, useState } from 'react'
import {Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import DeckDetails from './DeckDetails'

import {getDecks} from '../utils/helper'

const styles = StyleSheet.create({
    decklist: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'stretch'
    },
    deck: {
        minHeight: 150,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#d2d5d9',
        marginBottom: 10
    },
    deckTitle: {
        textAlign: 'center',
        fontSize: 30
    },
    deckCount: {
        textAlign: 'center',
        fontSize: 15
    }
})


function DeckList({navigation}) {

    const [decks, setDecks] = useState([])

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            getDecks()
            .then((decks) => !isCancelled && setDecks(Object.keys(decks).map((key) => decks[key])))
        }
        return () => {
            isCancelled = true
        }
    })

    const renderDeck = ({item}) => (
        <TouchableOpacity 
            key={item.title} 
            style={styles.deck}
            onPress={() => navigation.navigate('DeckDetails', {title: item.title})}
        >
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Text style={styles.deckCount}>{item.questions.length} cards</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.decklist}>
            <FlatList
                data={decks}
                renderItem={renderDeck}
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    )
}

const DeckStack = createStackNavigator()

export default function DeckStackScreen() {
    return (
        <DeckStack.Navigator>
            <DeckStack.Screen name="Decks" component={DeckList} />
            <DeckStack.Screen name="DeckDetails" component={DeckDetails} options={({ route }) => ({title: route.params.title})} />
        </DeckStack.Navigator>
    )
}