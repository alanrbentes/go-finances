import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    stateUserLogged: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [stateUserLogged, setStateUserLogged] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userStorageKey = "@gofinances:user";

    async function signInWithGoogle() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "add_aqui_a_chave_gerada_pelo_google_cloud_platform",
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                }
                setStateUserLogged(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        setStateUserLogged({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserAsyncStorage() {
            const dataUserStorage = await AsyncStorage.getItem(userStorageKey);
            
            if (dataUserStorage) {
                const userLogged = JSON.parse(dataUserStorage) as User;
                setStateUserLogged(userLogged);
            }

            setUserStorageLoading(false);

        }
        loadUserAsyncStorage();
    }, [])

    return (
        <AuthContext.Provider value={{
            stateUserLogged,
            signInWithGoogle,
            signOut,
            userStorageLoading
        }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth() {
    // RETORNANDO O CONTEXTO DE AUTENTICAÇÃO
    const contextAuth = useContext(AuthContext);
    return contextAuth;
}

export { AuthProvider, useAuth }