import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ButtonSend } from '../../components/Forms/Button'
import { arrayObjCategories } from '../../Utils/categories';
import {
    Container,
    Header,
    Title,
    CategoryList,
    Icon,
    Name,
    Separator,
    Footer
} from './styles';

interface Category {
    key: string;
    name: string
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategoryItems({ category, setCategory, closeSelectCategory }: Props) {

    function handleCategorySelect(item: Category) {
        setCategory(item)
    }

    return (
        <Container>
            <Header>
                <Title>
                    Categorias
                </Title>
            </Header>

            <FlatList
                data={arrayObjCategories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <CategoryList
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </CategoryList>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <ButtonSend
                    txtButton="Selecionar"
                    onPress={closeSelectCategory}
                />
            </Footer>

        </Container>

    )

}