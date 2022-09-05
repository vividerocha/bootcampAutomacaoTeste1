/// <reference types="cypress" />

import usuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Deve fazer login com sucesso', () =>{
        cy.login('vivianeteste@bootcamp.com', '123654');
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    })

    it('Deve fazer login com erro', () =>{
        cy.login('vivianeteste@bootcamp.com', '012345');
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    })

    it('Deve fazer login com sucesso - Usando dados de importação', () =>{
        cy.login(usuarios[0].login, usuarios[0].senha);
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    })

    it('Deve fazer login com sucesso - Usando fixture', () =>{
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].login, user[0].senha);
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    })
})