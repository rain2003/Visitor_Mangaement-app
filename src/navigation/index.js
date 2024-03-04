import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import landing from '../screens/landing';
import EmployeeSignin from '../screens/EmployeeSignin';
import Employee from '../screens/Employee';
import SecuritySignin from '../screens/SecuritySignin';
import Security from '../screens/Security';
import Visitor from '../screens/Visitor';
import VisitorPage from '../screens/VisitorPage';
import VisitorSignin from '../screens/VisitorSignin';

const Stack = createNativeStackNavigator();

function AppNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Landing" screenOptions={{headerShown: false}} >
                <Stack.Screen name = "Landing" component = {landing} />
                <Stack.Screen name = "EmployeeSignin" component = {EmployeeSignin} />
                <Stack.Screen name = "Employee" component = {Employee} />
                <Stack.Screen name = "SecuritySignin" component = {SecuritySignin} />
                <Stack.Screen name = "Security" component = {Security} />
                <Stack.Screen name = "Visitor" component = {Visitor} />
                <Stack.Screen name = "VisitorPage" component = {VisitorPage} />
                <Stack.Screen name = "VisitorSignin" component = {VisitorSignin} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;