import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

export const ContainerCard = styled.View<TypeProps>`
    background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secundary : theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 20px;
    padding-bottom: ${RFValue(20)}px;
    margin-right: 16px;
`;

export const HeaderCard = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const IconArrow = styled(Feather) <TypeProps>`

    font-size: ${RFValue(40)}px;

    ${(props) => props.type === 'up' && css`
        color: ${({ theme }) => theme.colors.success};
    `};

    ${(props) => props.type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention_light};
    `};

    ${(props) => props.type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
    `};
`;

export const FooterCard = styled.View``;

export const AmountCard = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    margin-top: 38px;
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
`;