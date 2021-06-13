import React from 'react';

import {
    ContainerCard,
    HeaderCard,
    Title,
    IconArrow,
    FooterCard,
    AmountCard,
    LastTransaction,
} from './styles';

interface Props {
    type: 'up' | 'down' | 'total'
    title: string;
    amount: string;
    lestTransaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function HighlightCard({ type, title, amount, lestTransaction }: Props) {
    return (
        <ContainerCard type={type}>
            <HeaderCard>
                <Title type={type}>{title}</Title>
                <IconArrow name={icon[type]} type={type} />
            </HeaderCard>
            <FooterCard>
                <AmountCard type={type}>
                    {amount}
                </AmountCard>
                <LastTransaction type={type}>{lestTransaction}</LastTransaction>
            </FooterCard>
        </ContainerCard>
    )
}