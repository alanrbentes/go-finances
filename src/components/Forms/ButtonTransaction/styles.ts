import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';


interface IconProps {
    type: "up" | "down"
}

interface ContainerProps {
    isSelected: boolean;
    type: "up" | "down"
}

export const Container = styled.View <ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width: ${({ isSelected }) => isSelected ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    ${({ isSelected, type }) => isSelected && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}

    ${({ isSelected, type }) => isSelected && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;

`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(30)}px;
    margin-right: 12px;
    color: ${({ theme, type }) => type === "up" ? theme.colors.success : theme.colors.attention_light};

`;
