import React from 'react';
import { TextInputProps } from 'react-native';
import { ContainerInput } from './styles';



export function InputForm({ ...rest }: TextInputProps) {
    return (
        <ContainerInput {...rest} />
    )

}
