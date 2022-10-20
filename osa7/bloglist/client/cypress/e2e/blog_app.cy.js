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
    cy.contains('login')
  })

  it('fails with wrong creds', function () {
    cy.contains('login').click()
    cy.get('#username').type('jotervon')
    cy.get('#password').type('testi')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Joonas Tervonen')
  })

  it('user jotervon can login', function () {
    cy.get('#login-button').click()
    cy.get('#username').type('jotervon')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('Joonas Tervonen has logged in')
  })

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

    it('Blog delete', function () {
      cy.createNewBlog({
        title: 'To be deleted title',
        author: 'To be deleted author',
        url: 'http://tobedeleted.com',
      })

      cy.get('#viewblog-button').click()
      cy.contains('http://tobedeleted.com')
      cy.get('#remove-button').click()
      cy.wait(800)
      cy.get('html').should('not.contain', 'http://tobedeleted.com')
    })
  })

  describe('Sorting test', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      cy.createUser({
        name: 'Markus Tervonen',
        username: 'matervon',
        password: 'test2',
      })

      cy.login({ username: 'matervon', password: 'test2' })

      cy.createNewBlog({
        title: 'Small peepee likes',
        author: 'Sads McGee',
        url: 'http://smallestviolin.com',
        likes: 20,
      })
      cy.createNewBlog({
        title: 'Big peepee likes',
        author: 'Linda Lovelace',
        url: 'http://topoftheworld.com',
        likes: 1000,
      })
    })

    it('testing blog sort', function () {
      cy.wait(800)
      cy.get('.blog-item').eq(0).should('contain', 'Big peepee likes')
      cy.get('.blog-item').eq(1).should('contain', 'Small peepee likes')
    })
  })
})
