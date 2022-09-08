/// <reference types="cypress" />

describe('Testes de criação de postagens', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[POST] - Criar uma postagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                "text": "postagem api swagger"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    

    
});

describe('Testes de consultas de postagens', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[GET] - Consultar todas as postagens', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] - Consultar postagem por id', () => {
        cy.criarPostagem(token, 'teste criar postagem vivi').then((response) => {
            let id = response._id;

            cy.request({
                method: 'GET',
                url: `/api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            });
        })

        
    });
});

describe('Teste de exclusão de postagem', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[DELETE] - Excluir uma postagem por id', () => {
        cy.criarPostagem(token, 'teste criar postagem vivi').then((response) => {
            let id = response._id;

            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            });
        })

        
    });
});

describe('Teste de alteração de postagem', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    })

    it('[PUT] - Curtir uma postagem por id', () => {
        cy.criarPostagem(token, 'teste criar postagem vivi').then((response) => {
            let id = response._id;

            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                console.log(response.body)
            });
        })

        
    });
});