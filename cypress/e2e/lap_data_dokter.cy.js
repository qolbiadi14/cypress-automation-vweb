const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

describe("Fungsionalitas Laporan Data Dokter", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToLaporanDataDokter = () => {
    cy.get("#menu_599").click();
    cy.get("#menu_248").click();
    cy.url().should("include", "/laporan-data-dokter");
  };

  context("Export Data Dokter ke Excel", () => {
    beforeEach(() => {
      navigateToLaporanDataDokter();
    });

    it("Export data dokter ke excel", () => {
      const fileName = "laporan_data_dokter.xlsx";
      const filePath = path.join("cypress/downloads", fileName);

      cy.get("#btnExportExcel").click();
      cy.wait(5000);
      cy.readFile(filePath).should("exist");
      fs.unlinkSync(filePath);
    });

    it("Export data dokter ke excel dengan data", () => {
      const fileName = "laporan_data_dokter.xlsx";
      const filePath = path.join("cypress/downloads", fileName);

      cy.get("#btnExportExcel").click();
      cy.wait(5000);
      cy.readFile(filePath).should("exist");

      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      expect(data).to.have.length.greaterThan(0);
      fs.unlinkSync(filePath);
    });
  });
});
