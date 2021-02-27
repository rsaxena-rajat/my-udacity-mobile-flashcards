import React from 'react'
import {
    View,
    Text, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Keyboard, 
    TextInput, 
    Platform
} from 'react-native'

import {saveDeckTitle} from '../utils/helper'

const styles = StyleSheet.create({
    addDeck: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 30
    },
    titleInput: {
        textAlign: 'center',
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        height: 50
    },
    submitButton: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'black',
        height: 50,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12
    }
})

export default function AddDeck({navigation}) {

    const [value, setValue] = React.useState('');

    const handleNewDeckAddition = async () => {
        if (!value) {
            alert('Please add a name for deck!')
            return
        }
        await saveDeckTitle(value)
        setValue('')
        navigation.navigate('DeckDetails', {title: value})
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.addDeck}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={styles.titleText}>What is the title of your new deck?</Text>
                    <TextInput 
                        placeholder="Deck title" 
                        style={styles.titleInput} 
                        maxLength={40}
                        multiline={false}
                        editable={true}
                        value={value}
                        onChangeText={text => setValue(text)}
                    />
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleNewDeckAddition}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
