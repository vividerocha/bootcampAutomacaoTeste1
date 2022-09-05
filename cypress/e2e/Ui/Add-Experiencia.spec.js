/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/experiencia-pages')

describe('Funcionalidade: Adicionar experiência', () => {
    
    before(() => {
        cy.visit('login');
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].login, user[0].senha);
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')

    });

    beforeEach(() => {
        

        cy.visit('adicionar-experiencia');
    });

    

    it('deve adicionar uma experiência com sucesso', () =>{
        cy.fixture("experiencias").then((experiencia) => {
            experienciaPage.addExperiencia(experiencia[0].posicao, experiencia[0].empresa, experiencia[0].local, experiencia[0].dataInicio, experiencia[0].dataFim, experiencia[0].descricao)
        })
        cy.get('[data-test="experience-delete"]').should('exist')
        
    });

    it.only('deve excluir uma experiência com sucesso', () =>{
        cy.fixture("experiencias").then((experiencia) => {
            experienciaPage.addExperiencia(experiencia[0].posicao, experiencia[0].empresa, experiencia[0].local, experiencia[0].dataInicio, experiencia[0].dataFim, experiencia[0].descricao)
        })
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('be.visible')
        
    });
})