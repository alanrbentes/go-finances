import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { RegisterForm } from '../screens/Register/';
import { Platform } from 'react-native';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secundary,
                inactiveTintColor: theme.colors.text,
                // labelPosition: "beside-icon"
                style:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 60
                }
            }}
        >
            <Screen
                name="Categorias"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color })=>(
                    <MaterialIcons 
                       name="format-list-bulleted"
                       size={size}
                       color={color}
                    />))
                }}
            />
            <Screen
                name="Cadastro"
                component={RegisterForm}
                options={{
                    tabBarIcon: (({ size, color })=>(
                    <MaterialIcons 
                       name="attach-money"
                       size={size}
                       color={color}
                    />))
                }}
            />
            <Screen
                name="Resumo"
                component={RegisterForm}
                options={{
                    tabBarIcon: (({ size, color })=>(
                    <MaterialIcons 
                       name="pie-chart"
                       size={size}
                       color={color}
                    />))
                }}
            />
        </Navigator>
    )
}