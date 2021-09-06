describe('Note App',() => {

  const userCredentials = {
    name: 'Ariel Iván Mariani',
    username: 'amariani',
    password: 'justAFakePassword'
  }

  const fakeBlog = {
    title: 'The art of E2E Testing',
    author: 'Coder Person',
    url: 'www.taoe2et.com'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', userCredentials)
    cy.visit('http://localhost:3000/')
  })


  it('Login form is shown by default', function() {
    cy.get('[data-testid="LoginForm"]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type(userCredentials.username)
      cy.get('input[name="password"]').type(userCredentials.password)
      cy.contains('Login').click()
      cy.contains(`${userCredentials.name} logged in`)
      cy.get('html').should('not.contain', 'Login')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="username"]').type(userCredentials.username)
      cy.get('input[name="password"]').type('wrongPassword')
      cy.contains('Login').click()

      cy.get('[data-testid="NotificationMesage"]')
        .should('contain', 'Wrong Credentials')
        .and('have.class', 'error')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', `${userCredentials.name} logged in`)

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({
        username: userCredentials.username,
        password: userCredentials.password
      })
    })
    describe('and no blog entries exists', function() {
      it('A blog can be created', function() {
        cy.contains('Blog entry').click()
        cy.get('input[name="title"]')
          .type(fakeBlog.title)
        cy.get('input[name="author"]')
          .type(fakeBlog.author)
        cy.get('input[name="url"]')
          .type(fakeBlog.url)
        cy.get('button[type="submit"]')
          .contains('Create')
          .click()

        cy.get('[data-testid="NotificationMesage"]')
          .should('contain', `A new blog ${fakeBlog.title}`)
          .and('have.class', 'success')

        cy.contains(`${fakeBlog.title} ${fakeBlog.author}`)
      })
    })





    describe('and several blog entries exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog #1',
          author: fakeBlog.author,
          url: 'www.fakeblog1.com',
        })
        cy.createBlog({
          title: 'Blog #2',
          author: fakeBlog.author,
          url: 'www.fakeblog2.com',
        })
        cy.createBlog({
          title: 'Blog #3',
          author: fakeBlog.author,
          url: 'www.fakeblog3.com',
        })
      })

      it('A blog can be deleted by its author', function() {
        cy.contains('Blog #1').parent().find('button').contains('view').click()
        cy.contains('hide')
        cy.get('.removeBtn').click()
        cy.get('[data-testid="NotificationMesage"]')
          .should('contain', 'Blog entry Blog #1 was removed successfully.')
          .and('have.class', 'success')
      })

      it('A blog can not be deleted by others than its creator', function() {
        cy.createBlog({
          title: 'Delete me if you can',
          author: fakeBlog.author,
          url: fakeBlog.url,
        })

        const otherUser = {
          name: 'Another User',
          username: 'anotheruser',
          password: 'justAFakePassword'
        }

        // Creates and logs in a new user
        cy.request('POST', 'http://localhost:3001/api/users', otherUser)
        cy.login({
          username: otherUser.username,
          password: otherUser.password
        })

        // The new user tries to delete other's entry
        cy.contains('view').click()
        cy.contains('hide')
        cy.get('.removeBtn').click()
        cy.get('[data-testid="NotificationMesage"]')
          .should('contain', 'You are not allowed to delete someone else\'s blog.')
          .and('have.class', 'error')
      })

      it('can list by likes count in descending order', function() {

        cy.contains('Blog #3').parent().find('button').contains('view').click()
        cy.get('.likeBtn').click()

        // Makes sure Blog #3 is now the first in the list
        cy.get('#blogsList').first().contains('Likes: 1')
      })

    })
  })
})