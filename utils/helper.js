import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEY = 'my-udacity-nd-mob-flash-storage'

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
