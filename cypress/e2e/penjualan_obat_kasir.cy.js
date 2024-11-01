// cypress/support/commands.js
import "cypress-iframe";

describe("Fungsionalitas Menu Penjualan Obat Kasir", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToPenjualanObatKasir = () => {
    cy.get("#menu_599").click();
    cy.get("#menu_247").click();
    cy.url().should("include", "/penjualan-obat-v6");
  };

  context("Pencarian Data Obat", () => {
    beforeEach(() => {
      navigateToPenjualanObatKasir();
    });
    it.only("Mencari data obat menggunakan tombol cari", () => {
      cy.iframe("#iframe_599").find("#btn_cari").click();
      cy.iframe("#iframe_599").find("#btn_cari").should("be.visible");
    });

    it("Mencari data obat menggunakan input pencarian", () => {
      cy.iframe("#iframe_599").find("#txt_cari").type("paracetamol");
      cy.iframe("#iframe_599").find("#btn_cari").click();
      cy.iframe("#iframe_599").find("#btn_cari").should("be.visible");
    });
  });
});
