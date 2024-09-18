// cypress/support/index.js

// Event listener untuk menangani uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ambil screenshot ketika ada uncaught exception
  cy.screenshot("uncaught-exception");
  // Return false untuk mencegah Cypress gagal pada uncaught exception
  return false;
});

// Event listener untuk menangani tes yang gagal
Cypress.on("fail", (error, runnable) => {
  // Ambil screenshot ketika tes gagal
  cy.screenshot("test-failure");
  // Throw error untuk memastikan tes tetap gagal
  throw error;
});

// cypress/support/index.js

// Event listener untuk menangani uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ambil screenshot ketika ada uncaught exception
  cy.screenshot("uncaught-exception");
  // Return false untuk mencegah Cypress gagal pada uncaught exception
  return false;
});

// Event listener untuk menangani tes yang gagal
Cypress.on("fail", (error, runnable) => {
  // Ambil screenshot ketika tes gagal
  cy.screenshot("test-failure");
  // Throw error untuk memastikan tes tetap gagal
  throw error;
});
