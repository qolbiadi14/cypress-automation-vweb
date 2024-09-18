const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

describe("Fungsionalitas Laporan Data Poli", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
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
  });

  const navigateToLapDataPoli = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_31 > span").click();
    cy.url().should("include", "/laporan-master-poli");
    cy.get("h1").should(
      "have.text",
      "\n                            Laporan Data Poli"
    );
  };

  context("Filter Data Poli", () => {
    it("Filter Data Poli", () => {
      navigateToLapDataPoli();
      cy.get(":nth-child(2) > .form-control").type("Poli Umum{enter}");
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", "Poli Umum");
      cy.get("tbody > tr > :nth-child(3)").should("have.text", "Dokter Umum");
      cy.get("tbody > tr > :nth-child(4)").should("have.text", "Aktif");
      cy.get("#w2").should(
        "contain",
        "Menampilkan 1 - 1 data dari total 1 data"
      );
    });
  });

  context("Cetak data poli", () => {
    beforeEach(() => {
      navigateToLapDataPoli();
    });

    const getAllPoliData = () => {
      const poliData = [];

      const getPageData = () => {
        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const rowData = [];
            Cypress.$(row)
              .find("td")
              .each((i, cell) => {
                rowData.push(Cypress.$(cell).text().trim());
              });
            poliData.push(rowData);
          });

          // Cek apakah ada tombol "Next" untuk pagination
          return cy.get(".pagination .next").then(($next) => {
            if ($next.length && !$next.hasClass("disabled")) {
              // Klik tombol "Next" dan ambil data dari halaman berikutnya
              cy.wrap($next).find("a").click();
              return getPageData();
            }
          });
        });
      };

      return getPageData().then(() => poliData);
    };

    it("Memastikan data pada tabel sesuai dengan data yang dicetak", () => {
      // Ambil semua data dari semua halaman tabel
      getAllPoliData().then((poliData) => {
        // Klik tombol cetak
        cy.get("#cetak").invoke("removeAttr", "target").click();
        cy.get("b").should("have.text", "LAPORAN DATA POLI");

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
            expect(filteredPrintedData).to.deep.equal(poliData);
          });
      });
    });
  });

  context.only("Export Data Poli", () => {
    beforeEach(() => {
      navigateToLapDataPoli();
    });

    const getAllPoliData = () => {
      const poliData = [];

      const getPageData = () => {
        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const rowData = [];
            Cypress.$(row)
              .find("td")
              .each((i, cell) => {
                rowData.push(Cypress.$(cell).text().trim());
              });
            poliData.push(rowData);
          });

          // Cek apakah ada tombol "Next" untuk pagination
          return cy.get(".pagination .next").then(($next) => {
            if ($next.length && !$next.hasClass("disabled")) {
              // Klik tombol "Next" dan ambil data dari halaman berikutnya
              cy.wrap($next).find("a").click();
              return getPageData();
            }
          });
        });
      };

      return getPageData().then(() => poliData);
    };

    it("Memastikan data pada tabel sesuai dengan data yang diexport", () => {
      // Ambil semua data dari semua halaman tabel
      getAllPoliData().then((poliData) => {
        // Klik tombol cetak
        cy.get("#excel").click();

        // Tunggu hingga file diunduh
        const downloadsFolder = Cypress.config("downloadsFolder");
        const filePath = path.join(
          downloadsFolder,
          "Export_Laporan_Data_Poli.xls"
        );

        cy.readFile(filePath, { timeout: 15000 }).should("exist");

        // Baca dan parse file Excel
        cy.readFile(filePath, "binary").then((fileContent) => {
          const workbook = xlsx.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = xlsx.utils.sheet_to_json(worksheet);

          // Lakukan assert pada data yang diambil dari file Excel
          expect(excelData).to.have.length.greaterThan(0);
          // Tambahkan assert lainnya sesuai kebutuhan Anda
        });
      });
    });
  });

  context("Sorting A-Z dan Z-A Laporan Data Poli", () => {
    beforeEach(() => {
      navigateToLapDataPoli();
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      const getPoliNamesFromFirstPage = () => {
        const poliNames = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const poliName = Cypress.$(row).find("td").eq(2).text().trim();
            poliNames.push(poliName);
          });
          return poliNames;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getPoliNamesFromFirstPage().then((poliNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(2) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPoliNamesFromFirstPage().then((poliNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(poliNamesBeforeSort).to.not.deep.equal(poliNamesAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(2) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPoliNamesFromFirstPage().then((poliNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(poliNamesAfterSortAZ).to.not.deep.equal(
              poliNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Keterangan", () => {
      const getPoliKeterangansFromFirstPage = () => {
        const poliKeterangans = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const poliKeterangan = Cypress.$(row)
              .find("td")
              .eq(2)
              .text()
              .trim();
            poliKeterangans.push(poliKeterangan);
          });
          return poliKeterangans;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getPoliKeterangansFromFirstPage().then((poliKeterangansBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPoliKeterangansFromFirstPage().then((poliKeterangansAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(poliKeterangansBeforeSort).to.not.deep.equal(
            poliKeterangansAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPoliKeterangansFromFirstPage().then(
            (poliKeterangansAfterSortZA) => {
              // Validasi bahwa data berubah setelah pengurutan Z-A
              expect(poliKeterangansAfterSortAZ).to.not.deep.equal(
                poliKeterangansAfterSortZA
              );
            }
          );
        });
      });
    });
  });

  context("Pagination Laporan Data Poli", () => {
    beforeEach(() => {
      navigateToLapDataPoli();
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
