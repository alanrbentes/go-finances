import React, { useState } from 'react';
import {
    Container,
    Header,
    TitleWrapper,
    SignInTitle,
    Title,
    Footer,
    FooterWrapper

} from './styles';
import { Alert, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components'
import { SignInSocialButtom } from '../../components/SignInSocialButtom'
import LogoApp from '../../assets/logo_app.svg';
import GoogleSvg from '../../assets/google.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth'



export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { stateUserLogged, signInWithGoogle } = useAuth();
    const theme = useTheme();
    
    async function handleSingnInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível entrar com sua conta do Google!');
            setIsLoading(false);
        }
    }


    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoApp
                        width={RFValue(60)}
                        height={RFValue(60)}
                    />
                    <Title>Controle de Finanças</Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu Login
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButtom
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSingnInWithGoogle}

                    />
                </FooterWrapper>
                {
                    isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                    />
                }
            </Footer>
        </Container>
    )

}