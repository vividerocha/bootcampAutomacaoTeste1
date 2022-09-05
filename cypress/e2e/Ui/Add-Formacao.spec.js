/// <reference types="cypress" />

const formacaoPage = require('../../support/Formacoes/formacao-pages')

describe('Funcionalidade: Adicionar Formação', () => {
    before(() => {
        cy.visit('login');
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].login, user[0].senha);
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')

    });

    beforeEach(() => {
        

        cy.visit('adicionar-formacao');
    });

    it('deve adicionar uma formação com sucesso', () =>{
        cy.fixture("formacoes").then((formacao) => {
            formacaoPage.addFormacao(formacao[0].escola, formacao[0].grau, formacao[0].curso, formacao[0].inicio, formacao[0].fim, formacao[0].descricao)
        })
        cy.get('[data-test="education-delete"]').should('exist')
        
    });

    it.only('deve excluir uma formação com sucesso', () =>{
        cy.fixture("formacoes").then((formacao) => {
            formacaoPage.addFormacao(formacao[0].escola, formacao[0].grau, formacao[0].curso, formacao[0].inicio, formacao[0].fim, formacao[0].descricao)
        })
        cy.get('[data-test="education-delete"]').first().click()
        cy.contains('Formação Removida').should('be.visible')
        
    });
})