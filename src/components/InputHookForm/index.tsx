import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Container, Error } from './styles';
import { InputForm } from '../../components/Forms/Input';


interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}

export function InputHookForm({
    control,
    name,
    error,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputForm
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            // rules={{ required: true }}
            // defaultValue=""
            />
            {error && <Error>{error}</Error>}
        </Container>
    )
}