/* eslint-disable no-undef */
describe('Booking an event', () => {

  it('Get \'success\' message from Back-End', () => {
      // Visit homepage
      cy.visit('/');
      cy.get('[data-testid="emptyDiv"]').should('exist');
      // Fill in Form and click submit button - ~/cypress/support/commands
      cy.fillInForm();
      // should have modal with successful message
      cy.get('[data-testid="message"').should('exist').should('have.text', 'Event booked');
      // All inputs should be empty
      cy.get('[data-testid="firstName"]').should('have.value', '');
      cy.get('[data-testid="lastName"]').should('have.value', '');
      cy.get('[data-testid="email"]').should('have.value', '');
      cy.get('.datePicker>div>div>input').should('have.value', '');
  });
  it('Get \'failure\' message from Back-End', () => {
    // Visit homepage
    cy.visit('/');
    cy.get('[data-testid="emptyDiv"]').should('exist');
    // Fill in Form and click submit button - ~/cypress/support/commands
    cy.fillInFormWrong();
    // All inputs should be empty
    // cy.get('[data-testid="firstName"]').should('have.value', '');
    // cy.get('[data-testid="lastName"]').should('have.value', '');
    // cy.get('[data-testid="email"]').should('have.value', '');
    // cy.get('[data-test="date"]').type(new Date()).should('have.value', '');
    cy.get('[data-testid="message"]').should('exist').should('have.text', 'Couldn\'t book the event. Please try again later!Errors: Please provide correct email address!');
})
})