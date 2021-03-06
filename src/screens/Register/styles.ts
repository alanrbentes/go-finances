import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ContainerForm = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(113)}px;
background-color: ${({theme})=> theme.colors.primary};

align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
`;

export const Title = styled.Text`
font-family: ${({theme})=> theme.fonts.regular};
color: ${({theme})=> theme.colors.shape};
font-size: ${RFValue(24)}px;
`;

export const Form = styled.View`
flex: 1;
width: 100%;
padding: 24px;
justify-content: space-between;
`;

export const Filds = styled.View``;


export const ContainerButons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;
`;