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

  const getAllDokterData = () => {
    const dokterData = [];

    const getPageData = () => {
      return cy.get("tbody tr").then((rows) => {
        rows.each((index, row) => {
          const rowData = [];
          Cypress.$(row)
            .find("td")
            .each((i, cell) => {
              rowData.push(Cypress.$(cell).text().trim());
            });
          dokterData.push(rowData);
        });

        // Cek apakah ada tombol "Next" untuk pagination
        return cy.get("body").then(($body) => {
          if (
            $body.find(".pagination .next").length > 0 &&
            !$body.find(".pagination .next").hasClass("disabled")
          ) {
            // Klik tombol "Next" dan ambil data dari halaman berikutnya
            cy.get(".pagination .next a").click();
            return getPageData();
          }
        });
      });
    };

    return getPageData().then(() => dokterData);
  };

  context("Filter Data Dokter", () => {
    beforeEach(() => {
      navigateToLapDataPoli();
    });

    it("Filter Data Dokter", () => {
      navigateToLapDataDokter();
      cy.get(":nth-child(2) > .form-control").type("A{enter}");
      cy.get(":nth-child(3) > .form-control").type("A{enter}");
      cy.get("#w2").should(
        "contain",
        "Menampilkan 1 - 1 data dari total 1 data"
      );
    });
  });

  context("Cetak data dokter", () => {
    beforeEach(() => {
      navigateToLapDataDokter();
    });

    it("Memastikan data pada tabel sesuai dengan data yang dicetak tanpa filter", () => {
      // Ambil semua data dari semua halaman tabel
      getAllDokterData().then((dokterData) => {
        // Klik tombol cetak
        cy.get("#cetak").invoke("removeAttr", "target").click();
        cy.get("b").should("have.text", "LAPORAN REKAP DATA POLI");

        // Tunggu hingga halaman cetak muncul dan ambil data yang dicetak
        let printedTableData = [];
        cy.get("tbody tr")
          .each(($row) => {
            let rowData = [];
            cy.wrap($row)
              .find("td")
              .each(($cell) => {
                rowData.push($cell.text().trim());
              });
            printedTableData.push(rowData);
          })
          .then(() => {
            // Hapus beberapa baris di awal dan beberapa baris di akhir
            const rowsToRemoveStart = 3; // Jumlah baris yang ingin dihapus di awal
            const rowsToRemoveEnd = 6; // Jumlah baris yang ingin dihapus di akhir
            const filteredPrintedData = printedTableData.slice(
              rowsToRemoveStart,
              printedTableData.length - rowsToRemoveEnd
            );

            // Bandingkan data dari kedua tabel
            expect(filteredPrintedData).to.deep.equal(dokterData);
          });
      });
    });

    it.only("Memastikan data pada tabel sesuai dengan data yang dicetak (dengan filter)", () => {
      cy.get(":nth-child(2) > .form-control").type("Poli Umum{enter}");
      cy.get(":nth-child(3) > .form-control").type("Dokter Umum{enter}");
      getAllDokterData().then((dokterData) => {
        // Klik tombol cetak
        cy.get("#cetak").invoke("removeAttr", "target").click();
        cy.get("b").should("have.text", "LAPORAN REKAP DATA POLI");

        // Tunggu hingga halaman cetak muncul dan ambil data yang dicetak
        let printedTableData = [];
        cy.get("tbody tr")
          .each(($row) => {
            let rowData = [];
            cy.wrap($row)
              .find("td")
              .each(($cell) => {
                rowData.push($cell.text().trim());
              });
            printedTableData.push(rowData);
          })
          .then(() => {
            // Hapus beberapa baris di awal dan beberapa baris di akhir
            const rowsToRemoveStart = 3; // Jumlah baris yang ingin dihapus di awal
            const rowsToRemoveEnd = 6; // Jumlah baris yang ingin dihapus di akhir
            const filteredPrintedData = printedTableData.slice(
              rowsToRemoveStart,
              printedTableData.length - rowsToRemoveEnd
            );

            // Bandingkan data dari kedua tabel
            expect(filteredPrintedData).to.deep.equal(dokterData);
          });
      });
    });
  });

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

  context("Sorting A-Z dan Z-A Laporan Data dokter", () => {
    beforeEach(() => {
      navigateToLapDatadokter();
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      const getdokterNamesFromFirstPage = () => {
        const dokterNames = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const dokterName = Cypress.$(row).find("td").eq(2).text().trim();
            dokterNames.push(dokterName);
          });
          return dokterNames;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getdokterNamesFromFirstPage().then((dokterNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(2) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getdokterNamesFromFirstPage().then((dokterNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(dokterNamesBeforeSort).to.not.deep.equal(
            dokterNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(2) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getdokterNamesFromFirstPage().then((dokterNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(dokterNamesAfterSortAZ).to.not.deep.equal(
              dokterNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Keterangan", () => {
      const getdokterKeterangansFromFirstPage = () => {
        const dokterKeterangans = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const dokterKeterangan = Cypress.$(row)
              .find("td")
              .eq(2)
              .text()
              .trim();
            dokterKeterangans.push(dokterKeterangan);
          });
          return dokterKeterangans;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getdokterKeterangansFromFirstPage().then(
        (dokterKeterangansBeforeSort) => {
          // Klik header tabel untuk mengurutkan data A-Z
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
          getdokterKeterangansFromFirstPage().then(
            (dokterKeterangansAfterSortAZ) => {
              // Validasi bahwa data berubah setelah pengurutan A-Z
              expect(dokterKeterangansBeforeSort).to.not.deep.equal(
                dokterKeterangansAfterSortAZ
              );

              // Klik header tabel lagi untuk mengurutkan data Z-A
              cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

              // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
              getdokterKeterangansFromFirstPage().then(
                (dokterKeterangansAfterSortZA) => {
                  // Validasi bahwa data berubah setelah pengurutan Z-A
                  expect(dokterKeterangansAfterSortAZ).to.not.deep.equal(
                    dokterKeterangansAfterSortZA
                  );
                }
              );
            }
          );
        }
      );
    });
  });

  context("Pagination Laporan Data Dokter", () => {
    beforeEach(() => {
      navigateToLapDataDokter();
    });
    it("Memastikan data berubah setelah mengklik halaman pagination", () => {
      const getDataFromCurrentPage = () => {
        const datas = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const data = Cypress.$(row).find("td").eq(2).text().trim();
            datas.push(data);
          });
          return datas;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum mengklik halaman pagination
      getDataFromCurrentPage().then((DataBeforeClick) => {
        // Klik halaman pagination ke-2
        cy.get(".next > a").click();

        // Tunggu hingga data diambil dan ambil kembali semua data dari halaman kedua tabel
        getDataFromCurrentPage().then((DataAfterClickNext) => {
          // Validasi bahwa data berubah setelah mengklik tombol "Next"
          expect(DataBeforeClick).to.not.deep.equal(DataAfterClickNext);

          // Klik halaman pagination ke-1 (kembali ke halaman sebelumnya)
          cy.get(".prev > a").click();

          // Tunggu hingga data diambil dan ambil kembali semua data dari halaman pertama tabel
          getDataFromCurrentPage().then((DataAfterClickPrev) => {
            // Validasi bahwa data berubah setelah mengklik tombol "Prev"
            expect(DataAfterClickNext).to.not.deep.equal(DataAfterClickPrev);
          });
        });
      });
    });
  });
});
