/// <reference types="cypress" />

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
})