describe("Kunjungan Pasien", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToKunjunganPasien = () => {
    cy.get("#menu_12").click();
    cy.get("#menu_13").click();
    cy.url().should("include", "/kunjungan");
    cy.get("h1").should(
      "have.text",
      "\n                            Kunjungan Pasien"
    );
  };

  context("Menambah Kunjungan Pasien", () => {
    beforeEach(() => {
      navigateToKunjunganPasien();
    });

    it("Menambah Kunjungan Pasien Tanpa Mengisi General Consent dan Satu Sehat", () => {
      cy.get(".btn-info").click();
      cy.get("#caripasien");
      cy.get('[data-key="0"] > [style="width: 5px;"] > .btn > .glyphicon');
      cy.get(
        ":nth-child(1) > :nth-child(1) > :nth-child(1) > .col-md-9 > .form-group > .col-sm-12 > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-search__field").type("POLI UMUM");
      cy.get("#select2-kunjungan-polid-result-t31o-113").click();

      cy.get(
        ":nth-child(2) > :nth-child(1) > .col-md-9 > .form-group > .col-sm-12 > .select2 > .selection > .select2-selection"
      ).click();
      cy.get("#select2-kunjungan-dokid-result-myx0-379").click();

      cy.get("#select2-kunjungan-dokid-result-myx0-379").click;
    });
  });
});
