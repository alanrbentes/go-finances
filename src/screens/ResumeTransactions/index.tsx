import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryTransactionCard } from '../../components/HistoryTransactionCard';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingActiveIndication

} from './styles';
import { arrayObjCategories } from '../../Utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function ResumeTransactions() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { stateUserLogged } = useAuth();

    function handleDateChange(action: 'next' | 'prev') {

        if (action === 'next') {

            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function LoadDataAsyncStorage() {
        setIsLoading(true);
        const datakey = `@gofinances:transactions_user:${stateUserLogged.id}`;
        // const datakey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(datakey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const categoryOutAll = responseFormatted.filter((item: TransactionData) =>
            item.type === 'negative' &&
            new Date(item.date).getMonth() === selectedDate.getMonth() &&
            new Date(item.date).getFullYear() === selectedDate.getFullYear()
        )

        const sumCategoryOutAll = categoryOutAll.reduce((
            accumulator: number,
            categoryOut: TransactionData
        ) => {
            return accumulator + Number(categoryOut.amount);

        }, 0);

        const totalByCategory: CategoryData[] = [];

        arrayObjCategories.forEach(category => {
            let sumValueByCategory = 0;

            categoryOutAll.forEach((categoryOut: TransactionData) => {
                if (categoryOut.category === category.key) {
                    sumValueByCategory = + Number(categoryOut.amount)
                }
            });

            if (sumValueByCategory > 0) {
                const totalFormatted = sumValueByCategory
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                const percent = `${(sumValueByCategory / sumCategoryOutAll * 100).toFixed(2)}%`;
                // const percentFormatted = `${percent.toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: sumValueByCategory,
                    totalFormatted,
                    percent

                })
            }
        });
        setIsLoading(false);
        setTotalByCategories(totalByCategory);


    }

    // useEffect(() => {
    //     LoadDataAsyncStorage()
    // }, [selectedDate])

    useFocusEffect(useCallback(() => {
        LoadDataAsyncStorage();
    }, [selectedDate]))

    return (
        <Container>
            <Header>
                <Title>Despesas</Title>
            </Header>
            {
                isLoading ?
                    <LoadingActiveIndication>
                        <ActivityIndicator color="green" size="large" />
                    </LoadingActiveIndication> :


                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight(),
                        }}
                    >
                        <MonthSelect>
                            <MonthSelectButton
                                onPress={() => handleDateChange('prev')}
                            >
                                <MonthSelectIcon name="chevron-left" />
                            </MonthSelectButton>

                            <Month>
                                {
                                    format(selectedDate, 'MMMM, yyyy', { locale: ptBR })
                                }
                            </Month>

                            <MonthSelectButton onPress={() => handleDateChange('next')}>
                                <MonthSelectIcon name="chevron-right" />
                            </MonthSelectButton>

                        </MonthSelect>

                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: "#FFFFFF"
                                    }
                                }}
                                // labelRadius={50}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>
                        {
                            totalByCategories.map((item) => (
                                <HistoryTransactionCard
                                    key={item.key}
                                    title={item.name}
                                    amount={item.totalFormatted}
                                    color={item.color}
                                />
                            ))
                        }
                    </Content>
            }
        </Container>)
}