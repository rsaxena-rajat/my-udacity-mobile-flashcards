import React, {useState, useEffect} from 'react'
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

import {addCardToDeck} from '../utils/helper'

const styles = StyleSheet.create({
    addCard: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    fieldInput: {
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
        justifyContent: 'center'
    },
    submitButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
})

export default function AddCard({navigation, title, parentNav}) {

    const [ques, setQues] = React.useState('')
    const [ans, setAns] = React.useState('')

    const handleNewCardAddition = async () => {
        if (!ques || !ans) {
            alert('Please add a question and the answer!')
            return
        }
        await addCardToDeck(title, {question: ques, answer: ans})
        setQues('')
        setAns('')
        navigation.goBack()
    }

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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.addCard}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.addCard}>
                <View>
                    <TextInput 
                        placeholder="Add Question" 
                        style={styles.fieldInput} 
                        maxLength={500}
                        multiline={false}
                        editable={true}
                        value={ques}
                        onChangeText={text => setQues(text)}
                    />
                    <TextInput 
                        placeholder="Add Answer" 
                        style={styles.fieldInput} 
                        maxLength={500}
                        multiline={false}
                        editable={true}
                        value={ans}
                        onChangeText={text => setAns(text)}
                    />
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleNewCardAddition}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
