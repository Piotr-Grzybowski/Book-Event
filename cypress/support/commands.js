/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('fillInForm', () => {
  cy.get('[data-testid="firstName"]').type('John');
  cy.get('[data-testid="lastName"]').type('Doe');
  cy.get('[data-testid="email"]').type('example@example.com');
  cy.get('.datePicker>div>div>input').type('2019-08-07');;
  cy.get('[data-testid="submit"]').click();
});
Cypress.Commands.add('fillInFormWrong', () => {
  cy.get('[data-testid="firstName"]').type('John');
  cy.get('[data-testid="lastName"]').type('Doe');
  cy.get('[data-testid="email"]').type('example@example');
  cy.get('.datePicker>div>div>input').type('2019-08-07');
  cy.get('[data-testid="submit"]').click();
})