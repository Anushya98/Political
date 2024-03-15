// TabNavigator.js
import React from 'react';
import AllocatedScreen from '../Screens/AllocatedScreens';
import UnallocatedScreen from '../Screens/UnallocatedScreen';
import OwnPartyScreen from '../Screens/OwnPartyScreen';
import OppositePartyScreen from '../Screens/OppositePartyScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Allocated" component={AllocatedScreen} />
      <Tab.Screen name="Unallocated" component={UnallocatedScreen} />
      <Tab.Screen name="Own Party" component={OwnPartyScreen} />
      <Tab.Screen name="Opposite Party" component={OppositePartyScreen} />
      {/* <Tab.Screen name="Neutral" component={NeutralScreen} />
      <Tab.Screen name="Not Available" component={NotAvailableScreen} />
      <Tab.Screen name="Details Not Known" component={DetailsNotKnownScreen} />
      <Tab.Screen name="Completed" component={CompletedScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
