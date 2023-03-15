import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ImagePickerLibrary from '../screens/ImagePickerLibrary';
import ExpoDemo from '../screens/ExpoDemo';
import CameraLibrary from '../screens/CameraLibrary';
import CalenderLibrary from '../screens/CalenderLibrary';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="ExpoDemo" component={ExpoDemo} />
                <Stack.Screen name='ImagePickerLibrary' component={ImagePickerLibrary} />
                <Stack.Screen name='CameraLibrary' component={CameraLibrary} />
                <Stack.Screen name='CalenderLibrary' component={CalenderLibrary} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator