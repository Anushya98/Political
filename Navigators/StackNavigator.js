import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Mainpage from '../Pages/Mainpage';
import AllocatedScreen from '../Screens/AllocatedScreens';
import UnallotedScreen from '../Screens/UnallotedScreen';
import OwnPartyScreen from '../Screens/OwnPartyScreen';
import OppositePartyScreen from '../Screens/OppositePartyScreen';
import NeutralScreen from '../Screens/NeutralScreen';
import NotAvailableScreen from '../Screens/NotAvailableScreen';
import DetailsNotKnown from '../Screens/DetailsNotKnown';
import CompletedScreen from '../Screens/CompletedScreen';
import HomePage from '../Pages/HomePage';
import DetailsScreen from '../Screens/DetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS, // Use a slide-from-right transition
            }} >
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="MainPage" component={Mainpage} />
            <Stack.Screen name="Allocated" component={AllocatedScreen} />
            <Stack.Screen name="Unalloted" component={UnallotedScreen} />
            <Stack.Screen name="OwnParty" component={OwnPartyScreen} />
            <Stack.Screen name="OppositeParty" component={OppositePartyScreen} />
            <Stack.Screen name="Neutral" component={NeutralScreen} />
            <Stack.Screen name="Not Available" component={NotAvailableScreen} />
            <Stack.Screen name="Details Not Known" component={DetailsNotKnown} />
            <Stack.Screen name="Completed" component={CompletedScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />


        </Stack.Navigator>
    );
};

export default StackNavigator