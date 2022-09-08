/// <reference types="cypress" />

import auth from '../../fixtures/auth.json'

it('[POST] - Teste de autenticação', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: auth
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.empty
            expect(response.body).to.have.property("jwt")
            cy.getCookies('conexaoqa.herokuapp.com').should('exist')
            //console.log(response.body)
            //cy.log(response.body)
        })
});

it('[POST] - Teste de autenticação com usuário inválido', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        failOnStatusCode: false,
        body: {
            "email":"viviteste2@botcamp.com",
            "password":"123457"
        }
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
});
