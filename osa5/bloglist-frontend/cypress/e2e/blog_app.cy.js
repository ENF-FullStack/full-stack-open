/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joonas Tervonen',
      username: 'jotervon',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  describe('Login', function () {
    it('user jotervon can login', function () {
      cy.contains('login').click()
      cy.get('#username').type('jotervon')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Joonas Tervonen has logged in')
    })

    it('fails with wrong creds', function () {
      cy.contains('login').click()
      cy.get('#username').type('jotervon')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
    })
  })
})
