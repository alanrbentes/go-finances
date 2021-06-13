import React, { useState, useEffect, useCallback } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransectionCards, TransectionCardsProps } from '../../components/TransactionCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'

import {
    Container,
    HeaderApp,
    UserWrapper,
    UserInfo,
    PhotoPerfil,
    User,
    UserGreeting,
    UserName,
    IconPower,
    HighlightCards,
    ContainerTransactions,
    TitleTransactions,
    ListTransaction,
    LogoutButton
} from './styles'

export interface DataListPropos extends TransectionCardsProps {
    id: string;
}

export function Dashboard() {

    const [data, setData] = useState<DataListPropos[]>([]);
    
    async function loadTransaction() {
        const datakey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(datakey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListPropos[] = transactions.map((item: DataListPropos) => {

            const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        });
        setData(transactionsFormatted);
        // console.log('UNDERFINE', transactionsFormatted)
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []))

    return (

        <Container>
            <HeaderApp>
                <UserWrapper>
                    <UserInfo>
                        <PhotoPerfil source={{ uri: 'https://avatars.githubusercontent.com/u/3473776?v=4' }} />
                        <User>
                            <UserGreeting>
                                Olá!
                            </UserGreeting>
                            <UserName>Alan</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => { }}>
                        <IconPower name="power" />
                    </LogoutButton>
                </UserWrapper>
            </HeaderApp>
            <HighlightCards>

                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lestTransaction="Utima transação realizada dia 13 de Abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lestTransaction="Utima saída dia 13 de Abril"
                />
                <HighlightCard
                    type="total"
                    title="Entradas"
                    amount="R$ 16.141,00"
                    lestTransaction="Peŕiodo - 01 à 16 de junho 2021"
                />
            </HighlightCards>

            <ContainerTransactions>
                <TitleTransactions>Lista de transações</TitleTransactions>

                <ListTransaction
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransectionCards data={item} />}
                />
            </ContainerTransactions>

        </Container>
    )
}