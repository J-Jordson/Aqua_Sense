import React from 'react';
import { render } from '@testing-library/react-native';
import Cadastro from '../Screen/cadastro'; 

describe('Cadastro Component', () => {
    it('should render the Cadastro screen correctly', () => {
        const navigation = { navigate: jest.fn() }; // Mock da navegação

        const { getByPlaceholderText, getByText } = render(<Cadastro navigation={navigation} />);

        expect(getByPlaceholderText('Digite o seu email')).toBeTruthy();
        expect(getByPlaceholderText('Digite a sua senha')).toBeTruthy();

        expect(getByText('Fazer Cadastro')).toBeTruthy();
    });
});
