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

  // it('front page can be opened', function () {
  //   cy.contains('Blogs')
  //   cy.contains('login')
  // })

  // it('fails with wrong creds', function () {
  //   cy.contains('login').click()
  //   cy.get('#username').type('jotervon')
  //   cy.get('#password').type('testi')
  //   cy.get('#login-button').click()

  //   cy.get('.error')
  //     .should('contain', 'wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)')
  //     .and('have.css', 'border-style', 'solid')

  //   cy.get('html').should('not.contain', 'Joonas Tervonen')
  // })

  // it('user jotervon can login', function () {
  //   cy.get('#login-button').click()
  //   cy.get('#username').type('jotervon')
  //   cy.get('#password').type('test')
  //   cy.get('#login-button').click()

  //   cy.contains('Joonas Tervonen has logged in')
  // })

  describe('Logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'jotervon',
        password: 'test',
      })
    })

    it('blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title-input').type('Cypress title')
      cy.get('#author-input').type('Cypress author')
      cy.get('#url-input').type('http://cypress.com')
      cy.get('#saveblog-button').click()

      cy.get('.task').contains('Cypress title')
      cy.get('#list-blogs').contains('Cypress title')
    })

    it('Like button pushed', function () {
      cy.createNewBlog({
        title: 'Cypress like test',
        author: 'Cypress tester',
        url: 'http://bloglikes.com',
      })

      cy.get('#viewblog-button').click()
      cy.contains('http://bloglikes.com')
      cy.get('.likes').contains('Likes: 0')
      cy.get('#like-button').click()
      cy.get('.likes').contains('Likes: 1')
    })
  })
})
