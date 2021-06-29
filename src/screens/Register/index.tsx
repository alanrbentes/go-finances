import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import {
    ContainerForm,
    Header,
    Title,
    Form,
    Filds,
    ContainerButons
} from './styles';
import { InputHookForm } from '../../components/InputHookForm'
import { ButtonSend } from '../../components/Forms/Button';
import { ButtonTransaction } from '../../components/Forms/ButtonTransaction';
import { SelectItem } from '../../components/Forms/SelectItem';
import { CategoryItems } from '../CategoryItems'



interface FormData {
    name: string;
    amount: string
}

const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório!'),
    amount: Yup.number()
        .typeError('Informe um valor numérico!')
        .positive('O valor não pode ser negativo!')
        .required('O valor é obrigatório!')
});



export function RegisterForm() {
    const [stateBtnUpDown, setStateBtnUpDown] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const { stateUserLogged } = useAuth();

    const [categoryState, setCategoryState] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })


    function handleBtnSelected(type: 'positive' | 'negative') {
        setStateBtnUpDown(type)
    }

    function handleOpenSelectModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectModal() {
        setCategoryModalOpen(false);
    }


    async function handleRegister(valuesForm: FormData) {

        if (!stateBtnUpDown) {
            return Alert.alert("Selecione o tipo de transação!")
        }

        if (categoryState.key === "category") {
            return Alert.alert("Selecione uma categoria!")
        }

        const objNewTransaction = {
            id: String(uuid.v4()),
            name: valuesForm.name,
            amount: valuesForm.amount,
            category: categoryState.key,
            type: stateBtnUpDown,
            date: new Date()
        }

        try {
            const collectionKey = `@gofinances:transactions_user:${stateUserLogged.id}`;
            // const collectionKey = "@gofinances:transactions";
            const responseFullData = await AsyncStorage.getItem(collectionKey);
            const currentData = responseFullData ? JSON.parse(responseFullData) : [];

            const newListData = [
                ...currentData,
                objNewTransaction
            ];

            await AsyncStorage.setItem(collectionKey, JSON.stringify(newListData));

            reset();
            setStateBtnUpDown('');
            setCategoryState({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Categorias');

        } catch (error) {
            Alert.alert("Não foi possível salvar!")
        }
    }

    // useEffect(() => {
    //     // async function loadData() {
    //     //     const response = await AsyncStorage.getItem(collectionKey);
    //     //     console.log('USEEFFECT', JSON.parse(response!));
    //     // }
    //     // loadData();
    //     async function removeAll() {
    //         const collectionKey = "@gofinances:transactions";
    //         await AsyncStorage.removeItem(collectionKey);
    //    }
    //    removeAll()

    // }, []);


    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <ContainerForm>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Filds>

                        <InputHookForm
                            name="name"
                            control={control}
                            placeholder="Descrição"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputHookForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />

                        <ContainerButons>
                            <ButtonTransaction
                                type="up"
                                title="Entrada"
                                onPress={() => handleBtnSelected('positive')}
                                isSelected={stateBtnUpDown === 'positive'}
                            />
                            <ButtonTransaction
                                type="down"
                                title="Saída"
                                onPress={() => handleBtnSelected('negative')}
                                isSelected={stateBtnUpDown === 'negative'}
                            />
                        </ContainerButons>
                        <SelectItem
                            txtSelect={categoryState.name}
                            onPress={handleOpenSelectModal}
                        />
                    </Filds>

                    <ButtonSend
                        txtButton="Enviar"
                        onPress={handleSubmit(handleRegister)}

                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategoryItems
                        category={categoryState}
                        setCategory={setCategoryState}
                        closeSelectCategory={handleCloseSelectModal}
                    />
                </Modal>
            </ContainerForm>
        </TouchableWithoutFeedback>
    )
}