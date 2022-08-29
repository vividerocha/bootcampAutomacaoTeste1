/// <reference types="cypress" />
const faker = require('faker-br');


describe('US0002 - Funcionalidade: Cadastro', () => {
    const emailExistente = faker.internet.email();
    beforeEach(() => {
        cy.visit('cadastrar')
    })

    it('Deve fazer cadastro com sucesso', () => {
        const password = faker.internet.password();
        cy.cadastro(faker.name.firstName(), emailExistente, password)
        cy.get('[data-test="dashboard-createProfile"]').should('be.visible', 'true')
        
    })

    it('Deve dar erro de senha diferente', () => {
        const password = faker.internet.password();
        
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.name.firstName())
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email())
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password + '1')
        cy.get('[data-test="register-submit"]').click()

        cy.get('.MuiFormHelperText-root').should('be.visible', 'true')

    })

    it('Deve dar erro usuário já cadastrado anteriormente', () => {
        const password = faker.internet.password();

        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.name.firstName())
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(emailExistente)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')

    })

    
});