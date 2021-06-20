import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryTransactionCard } from '../../components/HistoryTransactionCard';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer

} from './styles';
import { arrayObjCategories } from '../../Utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

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
    // percentFormatted: string;
}

export function ResumeTransactions() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    async function LoadDataAsyncStorage() {
        const datakey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(datakey);
        const responseFormatted = response ? JSON.parse(response) : [];

        // filtro das despesas
        // expensives é o meu sumOut 
        const categoryOutAll = responseFormatted.filter((item: TransactionData) => item.type === 'negative');

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
        setTotalByCategories(totalByCategory);

    }

    useEffect(() => {
        LoadDataAsyncStorage()
    }, [])

    return (
        <Container>
            <Header>
                <Title></Title>
            </Header>

            <Content>
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
        </Container>)
}