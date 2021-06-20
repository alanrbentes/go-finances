import React, { useState, useEffect, useCallback } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransectionCards, TransectionCardsProps } from '../../components/TransactionCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native';

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
    LogoutButton,
    LoadingActiveIndication
} from './styles'
import { SelectItem } from '../../components/Forms/SelectItem';

export interface DataListPropos extends TransectionCardsProps {
    id: string;
    
}

interface TotalProps {
    total: string;
    lastTransaction: string;
}

interface TotalDataProps {
    inputSum: TotalProps;
    outputSum: TotalProps;
    totalFull: TotalProps;
}

export function Dashboard() {

    function getLastTransactionDate(
        collection: DataListPropos[],
        type: 'positive' | 'negative'
    ) {
        // transactions é o retorno em json do AsyncStorage
        const dateEntries = collection
            .filter((item: DataListPropos) => item.type === 'positive')
            .map((item: DataListPropos) => new Date(item.date).getTime());

        const higthDate = Math.max.apply(Math, dateEntries);

        const dateFormatted = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(higthDate));

        return dateFormatted;

        // const dateFormatted = new Date(Intl.DateTimeFormat('pt-BR', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: '2-digit'
        // }).format(new Date(higthDate)));

        // return `${dateFormatted.getDate()} de ${dateFormatted.toLocaleString('pt-BR', {month: 'long'})}`;
    }

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<DataListPropos[]>([]);
    const [totalAmount, setTotalAmount] = useState<TotalDataProps>({} as TotalDataProps);

    async function loadTransaction() {
        const datakey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(datakey);
        const transactions = response ? JSON.parse(response) : [];

        let inputSumTransaction = 0;
        let outputSumTransactions = 0;

        const transactionsFormatted: DataListPropos[] = transactions
            .map((item: DataListPropos) => {

                if (item.type === 'positive') {
                    inputSumTransaction += Number(item.amount);
                } else {
                    outputSumTransactions += Number(item.amount);
                }

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

        const lastDateEntries = getLastTransactionDate(transactions, 'positive');
        const lastDateOut = getLastTransactionDate(transactions, 'negative');


        const totalFull = inputSumTransaction - outputSumTransactions;

        setTotalAmount({
            inputSum: {
                total: inputSumTransaction.toLocaleString(
                    'pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastDateEntries
            },
            outputSum: {
                total: outputSumTransactions.toLocaleString(
                    'pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastDateOut
            },
            totalFull: {
                total: totalFull.toLocaleString(
                    'pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastDateOut
            },

        })

        setLoading(false);
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []))

    return (
        <Container>
            {
                loading ?
                    <LoadingActiveIndication>
                        <ActivityIndicator color="green" size="large" />
                    </LoadingActiveIndication> :
                    <>
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
                                amount={totalAmount.inputSum.total}
                                lestTransaction={totalAmount.inputSum.lastTransaction}
                            />
                            <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={totalAmount.outputSum.total}
                                lestTransaction={totalAmount.outputSum.lastTransaction}
                            />
                            <HighlightCard
                                type="total"
                                title="Entradas"
                                amount={totalAmount.totalFull.total}
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

                    </>
            }
        </Container>
    )
}