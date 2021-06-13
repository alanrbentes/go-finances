import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
// import { TouchableOpacity } from 'react-native'; // Efeito de opacidade

export const ContentButton = styled(RectButton)`
    width: 100%;
    background-color: ${({theme})=>theme.colors.secundary};
    border-radius: 5px;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(18)}px;
    color: ${({theme})=>theme.colors.shape};
    padding: 18px;
    
`;