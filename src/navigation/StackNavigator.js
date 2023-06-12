import React, {Component, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
// Library ======================================================================================
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// Screens ======================================================================================
import SplashScreen from '../screens/SplashScreen'
import DashboardScreen from '../screens/DashboardScreen'
import SettingScreen from '../screens/SettingScreen'
import RecordSaveScreen from '../screens/RecordSaveScreen'
import ChartScreen from '../screens/ChartScreen'
import TallyScreen from '../screens/TallyScreen'
import AddFarmScreen from '../screens/AddFarmScreen'
import FarmTallyScreen from '../screens/FarmTallyScreen'
import CountPaddockScreen from '../screens/CountPaddockScreen'
import AddPaddockScreen from '../screens/AddPaddockScreen'

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"SplashScreen"}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'SplashScreen'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'DashboardScreen'}
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'SettingScreen'}
        component={SettingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'RecordSaveScreen'}
        component={RecordSaveScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'ChartScreen'}
        component={ChartScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'TallyScreen'}
        component={TallyScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'AddFarmScreen'}
        component={AddFarmScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'FarmTallyScreen'}
        component={FarmTallyScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'CountPaddockScreen'}
        component={CountPaddockScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'AddPaddockScreen'}
        component={AddPaddockScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
