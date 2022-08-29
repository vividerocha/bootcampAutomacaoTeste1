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
        cy.get('#mui-component-select-status').click();
        cy.contains('QA Júnior').click()
        cy.get('[data-test="profile-company"]').type(faker.company.companyName())
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type('http://www.google.com')
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.address.city())
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('Teste')
        cy.get('[data-test="profile-submit"]').click()

        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

    
    
});