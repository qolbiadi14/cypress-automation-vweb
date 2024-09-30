describe("Fungsionalitas Menu Penjualan Obat Kasir", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToPenjualanObatKasir = () => {
    cy.get("#menu_599").click();
    cy.get("#menu_247").click();
    cy.url().should("include", "/pejualan-obat-v6");
  };

  context("Pencarian Data Obat", () => {
    beforeEach(() => {
      navigateToPenjualanObatKasir();
    });
    it.only("Mencari data obat menggunakan tombol cari", () => {});
  });
});
