import React from 'react';
import { arrayObjCategories } from '../../Utils/categories';
import {
    ContainerTransactions,
    TitleTransactions,
    AmountTransaction,
    FooterTransactions,
    Category,
    IconCardTransaction,
    CategoryName,
    DateTransaction,

} from './styles'


// interface CategoryTransaction {
//     name: string,
//     icon: string
// }

export interface TransectionCardsProps {
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string,
}

interface Props {
    data: TransectionCardsProps
}

export function TransectionCards({ data }: Props) {
    
    const objCategory = arrayObjCategories.filter(
        item => (item.key === data.category)
    )[0];
   
    
    return (
        <ContainerTransactions>
            <TitleTransactions>
                {data.name}
            </TitleTransactions>

            <AmountTransaction type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </AmountTransaction>

            <FooterTransactions>

                <Category>
                    <IconCardTransaction name={objCategory.icon} />
                    <CategoryName>{objCategory.name}</CategoryName>
                </Category>

                <DateTransaction>{data.date}</DateTransaction>

            </FooterTransactions>
        </ContainerTransactions>
    )

}