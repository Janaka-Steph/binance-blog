// TODO Mock database

beforeEach(() => {
  cy.visit('/')
})

describe('Home', () => {
  it('Display list of posts', () => {
    cy.get('header').find('img')
      .should('be.visible')
    cy.get('.content').find('ul')
      .children()
      .its('length')
      .should('be.above', 0)
  })
})

describe('Admin', () => {
  it('Display form', () => {
    cy.get('h2').contains('Admin').click()
    cy.get('header').find('img')
      .should('be.visible')
    cy.get('form').children()
      .should('have.length', 4)
  })
})
