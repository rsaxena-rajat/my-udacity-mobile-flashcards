import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEY = 'my-udacity-nd-mob-flash-storage'
const ASYNC_NOTIFICATION_KEY = 'my-udacity-nd-mob-flash-storage:notifications'

export async function getDecks() {
    try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        if (value) {
            return JSON.parse(value)
        }
        return {}
    } catch (err) {
        console.error('Error in getting decks', err)
        return {}
    }
}

export async function getDeck(id) {
    try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        if (value) {
            return JSON.parse(value)[id] || {}
        }
        return {}
    } catch (err) {
        console.error('Error in getting deck', err)
        return {}
    }
}

export async function saveDeckTitle(title) {
    try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        const decks = JSON.parse(value || '{}')
        decks[title] = {
            title,
            questions: []
        }
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(decks))
    } catch (err) {
        console.error('Error in saving deck', err)
    }
}

export async function addCardToDeck(title, card) {
    try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        const decks = JSON.parse(value || '{}')
        if (!decks[title]) {
            decks[title] = {
                title,
                questions: []
            }
        }
        decks[title]['questions'].push(card)
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(decks))
    } catch (err) {
        console.error('Error in adding card to deck', err)
    }
}

function createNotification() {
    return {
        title: 'Take a quiz',
        body: "Don't miss out on taking a flash quiz!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export async function setLocalNotification() {
    const data = await AsyncStorage.getItem(ASYNC_NOTIFICATION_KEY).then(JSON.parse)
    if (!data) {
        const status = Permissions.askAsync(Permissions.NOTIFICATIONS)
        if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(21)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                    time: tomorrow,
                    repeat: 'day'
                }
            )

            AsyncStorage.setItem(ASYNC_NOTIFICATION_KEY, JSON.stringify({set: true}))
        }
    }   
}

export async function clearLocalNotification() {
    await AsyncStorage.removeItem(ASYNC_NOTIFICATION_KEY)
    Notifications.cancelAllScheduledNotificationsAsync()
}