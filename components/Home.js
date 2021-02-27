import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from 'react-navigation-bottom-tabs-no-warnings';
import {Ionicons} from '@expo/vector-icons'

import Decks from './Decks'
import AddDeck from './AddDeck'


const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Decks') {
              iconName = focused ? 'albums' : 'albums-outline';
            } else if (route.name === 'AddDeck') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Decks" component={Decks} />
        <Tab.Screen name="AddDeck" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}