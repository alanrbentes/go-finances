import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ContentButton, TextButton } from './styles';
// import { TouchableOpacityProps } from 'react-native';


interface PropsButton extends RectButtonProps {
    txtButton: string;
}

export function ButtonSend({ txtButton, ...rest }: PropsButton) {
    return (
        <ContentButton {...rest}>
            <TextButton>
                {txtButton}
            </TextButton>

        </ContentButton>
    )
}