import React from 'react';
import {
    Container,
    TitleSelect,
    Icon
} from './styles';


interface Props {
    txtSelect: string;
    onPress: () => void;
}

export function SelectItem({ txtSelect, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <TitleSelect>{txtSelect}</TitleSelect>
            <Icon name="chevron-down" />

        </Container>
    )

}