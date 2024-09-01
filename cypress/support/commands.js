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
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://demoapotekklinik.vmedismart.com");
  cy.get("#loginform-username").type(email);
  cy.get("#loginform-password").type(password);
  cy.get("#g-recaptcha-response").then(($captcha) => {
    // Ubah tampilan elemen agar dapat diakses
    cy.wrap($captcha).invoke("css", "display", "block");

    // Masukkan nilai 'PASSED' ke dalam field reCAPTCHA
    cy.wrap($captcha).type("PASSED", { force: true });

    // Simulasikan menekan tombol TAB
    cy.wrap($captcha).trigger("keydown", { force: true }, { keyCode: 9 });
  });

  cy.get("#btnlogin").click();
  cy.get("#kembali1").click();
  cy.contains("Logout (fadil123)");
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
