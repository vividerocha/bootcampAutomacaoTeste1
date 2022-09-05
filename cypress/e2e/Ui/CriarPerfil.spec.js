/// <reference types="cypress" />
const faker = require('faker-br');


describe('US0002 - Funcionalidade: Criar Perfil', () => {
    beforeEach(() => {
        cy.visit('cadastrar')
        cy.cadastro(faker.name.firstName(), faker.internet.email(), faker.internet.password())
        cy.get('[data-test="dashboard-createProfile"]').should('be.visible', 'true')
        cy.get('[data-test="dashboard-createProfile"]').click()
    })

    it('Deve fazer criar perfil com sucesso', () => {
        cy.criarPerfil(faker.company.companyName(), 'http://www.google.com', faker.address.city(), 'Teste', 'github', 'minibio')
        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

    
    
});