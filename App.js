// App.js file
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from './src/camera';
import Files from './src/recordings'
import Video from './src/video';
import { Ionicons } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
    
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Camera" component={Camera} 
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="My Recordings" component={Files}
                        options={{
                            headerStyle: {
                                backgroundColor: '#1a1a1a',
                            },
                            headerTintColor: 'white',
                            headerBackTitleVisible: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};