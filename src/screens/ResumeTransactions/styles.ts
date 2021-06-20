import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(113)}px;
background-color: ${({ theme }) => theme.colors.primary};

align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
color: ${({ theme }) => theme.colors.shape};
font-size: ${RFValue(24)}px;
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: { flax: 1, padding: 24 }
})``;

export const ChartContainer = styled.View`
width: 100%;
align-items: center;

`;