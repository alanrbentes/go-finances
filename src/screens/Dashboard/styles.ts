import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { DataListPropos } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderApp = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: 70px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const PhotoPerfil = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};;

`;

export const IconPower = styled(Feather)`
    color: ${({ theme }) => theme.colors.secundary};
    font-size: ${RFValue(26)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;


export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin: ${RFValue(20)}px;
    margin-top: ${RFValue(140)}px;
`;

export const ContainerTransactions = styled.View`
    flex: 1;
    padding: 0 24px;
`;
export const TitleTransactions = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.shape};
    margin-top: 50px;
    margin-bottom: 10px;
`;

export const ListTransaction = styled(FlatList as new () => FlatList<DataListPropos>).attrs({
    showsVerticalScrollIndicator: false
})``;

export const LoadingActiveIndication = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;