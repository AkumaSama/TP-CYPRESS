describe('Form test #3 and #4', () => {
  beforeEach(() => {
    cy.server()

    cy.route({
      url: '/api/user',
      method: 'POST',
      status: 201,
      response: {}
    }).as('addUser')
    cy.visit('/')
  })

  it('Enter and read data #3', () => {
    const data = {
      firstName: "Théo",
      lastName: "Thierry",
      email: "theo.thierry76lf@gmail.com",
      password: "kestacru",
      confirmPassword: "kestacru"
    }
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#password').type(data.password)
    cy.get('#confirmPassword').type(data.confirmPassword)

    cy.get('.btn').click()

    cy.get('#informationTaper')
        .should(
            "have.text",
            data.firstName + " " + data.lastName + " " + data.email + " " + data.password + " " + data.confirmPassword
        )
  })

  it('Enter and read data with users.json #4', () => {
    cy.fixture("users.json").then((userFixture) => {
      userFixture["users"].forEach((user) => {
        cy.get('#firstName').type(user.firstName)
        cy.get('#lastName').type(user.lastName)
        cy.get('#email').type(user.email)
        cy.get('#password').type(user.password)
        cy.get('#confirmPassword').type(user.password)

        cy.get('.btn').click()

        cy.get('#informationTaper')
            .should(
                "have.text",
                user.firstName + " " + user.lastName + " " + user.email + " " + user.password + " " + user.password
            )
      })
    })
  })

  it('Enter and save data #5', () => {
    const data = {
      firstName: "Théo",
      lastName: "Thierry",
      email: "theo.thierry76lf@gmail.com",
      password: "kestacru",
      confirmPassword: "kestacru"
    }

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#password').type(data.password)
    cy.get('#confirmPassword').type(data.confirmPassword)

    cy.get('.btn').click()

    cy.wait("@addUser").then(() => {
      cy.fixture("fakeUser.json").then((userFixture) => {
        userFixture.push(data)
        cy.writeFile('cypress/fixtures/fakeUser.json', JSON.stringify(userFixture))
      })
    })
  })
})
