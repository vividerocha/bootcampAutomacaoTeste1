/// <reference types="cypress" />

import profile from '../../fixtures/profile.json'
import userLogado from '../../fixtures/user.json'
import experiencia from '../../fixtures/experienciaApi.json'

describe('[POST] - Testes Criação de Profile', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[POST] - Criar um perfil', () => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: profile
        }).then((response) => {
            expect(response.status).to.eq(200)
            //cy.log(response.body)
        })
    });
});



describe('Teste de inclusão de experiência', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[PUT] - Incluir uma experiência para o', () => {
        cy.incluirExperiencia(token, experiencia).then((response) => {
                expect(response.status).to.eq(200)
                console.log(response.body)
        });
    });
});

describe('Testes de exclusão de experiência', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[DELETE] - Excluir a última experiência adicionada', () => {
        cy.incluirExperiencia(token, experiencia).then((response) => {
            let qtdExperiencias = response.body.experience.length - 1
            let posicao = parseInt(qtdExperiencias)
            
            //buscar a última experiencia//
            let item = response.body.experience[posicao]
            let id = item._id

            cy.request({
                method: 'DELETE',
                url: `/api/profile/experience/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            });
        })

        
    });
});

describe('Testes consultas em Profile', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[GET] - Consultar todos os profiles cadastrados', () => {
        cy.request({
            method: 'GET',
            url: `/api/profile`
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.body)
        })
    });

    it('[GET] - Consultar o profile de um usuário pelo id', () => {
        let id = userLogado.id;
        cy.request({
            method: 'GET',
            url: `/api/profile/user/${id}`
        }).then((response) => {
            expect(response.status).to.eq(200)
            //cy.log(response.body)
        })
    });
});