const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

describe("Fungsionalitas Lap Data Supplier", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToLapDataSupplier = () => {
    cy.get("#menu_599").click();
    cy.get("#menu_77").click();
    cy.url().should("include", "/laporan-master-supplier");
  };

  const getAllSupplierData = () => {
    const supplierData = [];

    const getPageData = () => {
      return cy.get("tbody tr").then((rows) => {
        rows.each((index, row) => {
          const rowData = [];
          Cypress.$(row)
            .find("td")
            .each((i, cell) => {
              rowData.push(Cypress.$(cell).text().trim());
            });
          supplierData.push(rowData);
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

    return getPageData().then(() => supplierData);
  };

  context("Cetak data supplier", () => {
    beforeEach(() => {
      navigateToLapDataSupplier();
    });

    it("Memastikan data pada tabel sesuai dengan data yang dicetak tanpa filter", () => {
      // Ambil semua data dari semua halaman tabel
      getAllSupplierData().then((supplierData) => {
        // Klik tombol cetak
        cy.get("#cetak").invoke("removeAttr", "target").click();
        cy.get("b").should("have.text", "LAPORAN REKAP DATA SUPPLIER");

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
            expect(filteredPrintedData).to.deep.equal(supplierData);
          });
      });
    });

    it.only("Memastikan data pada tabel sesuai dengan data yang dicetak (dengan filter)", () => {
      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(3) > .form-control")
            .type(text.trim())
            .type("{enter}");
          cy.get("tbody > tr > :nth-child(3)").should("have.text", text.trim());
          getAllSupplierData().then((supplierData) => {
            // Klik tombol cetak
            cy.get("#cetak").invoke("removeAttr", "target").click();
            cy.get("b").should("have.text", "LAPORAN REKAP DATA SUPPLIER");

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
                expect(filteredPrintedData).to.deep.equal(supplierData);
              });
          });
        });
    });
  });

  context("Export Data Supplier ke Excel", () => {
    beforeEach(() => {
      navigateToLapDataSupplier();
    });

    it("Export data supplier ke excel", () => {
      const fileName = "laporan_data_supplier.xlsx";
      const filePath = path.join("cypress/downloads", fileName);

      cy.get("#btnExportExcel").click();
      cy.wait(5000);
      cy.readFile(filePath).should("exist");
      fs.unlinkSync(filePath);
    });

    it("Export data supplier ke excel dengan data", () => {
      const fileName = "laporan_data_supplier.xlsx";
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

  context("Filter Lap Data Supplier", () => {
    beforeEach(() => {
      navigateToLapSupplier();
    });

    it("Memfilter data supplier berdasarkan Kode", () => {
      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(3) > .form-control")
            .type(text.trim())
            .type("{enter}");
          cy.get("#w1").contains("Menampilkan 1 - 1 data dari total 1 data.");
          cy.get("tbody > tr > :nth-child(3)").should("have.text", text.trim());
        });
    });

    it("Memfilter data supplier berdasarkan Nama", () => {
      cy.get('[data-key="1"] > :nth-child(4)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(4) > .form-control")
            .type(text.trim())
            .type("{enter}");

          cy.get("#w1").contains("Menampilkan 1 - 1 data dari total 1 data.");
          cy.get("tbody > tr > :nth-child(4)").should("have.text", text.trim());
        });
    });

    it("Memfilter data supplier berdasarkan Alamat", () => {
      cy.get('[data-key="1"] > :nth-child(5)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(5) > .form-control")
            .type(text.trim())
            .type("{enter}");

          cy.get("#w1").contains("Menampilkan 1 - 1 data dari total 1 data.");
          cy.get("tbody > tr > :nth-child(5)").should("have.text", text.trim());
        });
    });

    it("Memfilter data supplier berdasarkan Kota", () => {
      cy.get('[data-key="1"] > :nth-child(6)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(6) > .form-control")
            .type(text.trim())
            .type("{enter}");
          cy.get("#w1").contains("Menampilkan 1 - 1 data dari total 1 data.");
          cy.get("tbody > tr > :nth-child(6)").should("have.text", text.trim());
        });
    });

    it("Memfilter data supplier berdasarkan Telepon", () => {
      cy.get('[data-key="1"] > :nth-child(7)')
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(7) > .form-control")
            .type(text.trim())
            .type("{enter}");
          cy.get("#w1").contains("Menampilkan 1 - 1 data dari total 1 data.");
          cy.get("tbody > tr > :nth-child(7)").should("have.text", text.trim());
        });
    });

    it("Memfilter data supplier berdasarkan Lead Time", () => {
      cy.get('[data-key="2"] > :nth-child(8)') // Mengambil data ke-2
        .invoke("text")
        .then((text) => {
          cy.get(":nth-child(8) > .form-control")
            .type(text.trim())
            .type("{enter}");

          // Memastikan setiap elemen di kolom ke-8 mengandung teks yang diharapkan
          cy.get("tbody > tr > :nth-child(8)").each(($el) => {
            cy.wrap($el).should("contain.text", text.trim());
          });
        });
    });

    it("Reset Field Filter", () => {
      cy.get(":nth-child(3) > .form-control").type("a{enter}");
      cy.get(":nth-child(4) > .form-control").type("a{enter}");
      cy.get(":nth-child(5) > .form-control").type("a{enter}");
      cy.get(":nth-child(6) > .form-control").type("a{enter}");
      cy.get(":nth-child(7) > .form-control").type("a{enter}");
      cy.get(":nth-child(8) > .form-control").type("1{enter}");
      cy.get(".empty").should("exist");
      cy.get(".btn-default").click();
      cy.get(":nth-child(3) > .form-control").should("have.text", "");
      cy.get(":nth-child(4) > .form-control").should("have.text", "");
      cy.get(":nth-child(5) > .form-control").should("have.text", "");
      cy.get(":nth-child(6) > .form-control").should("have.text", "");
      cy.get(":nth-child(7) > .form-control").should("have.text", "");
      cy.get(":nth-child(8) > .form-control").should("have.text", "");
    });
  });

  context("Pagination Lap Data Supplier", () => {
    beforeEach(() => {
      navigateToLapDataSupplier();
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
        cy.get("#w1").contains("Menampilkan 1 - 10 data");
        cy.get(".next > a").click();

        // Tunggu hingga data diambil dan ambil kembali semua data dari halaman kedua tabel
        getDataFromCurrentPage().then((DataAfterClickNext) => {
          // Validasi bahwa data berubah setelah mengklik tombol "Next"
          cy.get("#w1").contains("Menampilkan 11");
          expect(DataBeforeClick).to.not.deep.equal(DataAfterClickNext);

          // Klik halaman pagination ke-1 (kembali ke halaman sebelumnya)
          cy.get(".prev > a").click();

          // Tunggu hingga data diambil dan ambil kembali semua data dari halaman pertama tabel
          getDataFromCurrentPage().then((DataAfterClickPrev) => {
            // Validasi bahwa data berubah setelah mengklik tombol "Prev"
            cy.get("#w1").contains("Menampilkan 1 - 10 data");
            expect(DataAfterClickNext).to.not.deep.equal(DataAfterClickPrev);
          });
        });
      });
    });
  });

  context("Sorting A-Z dan Z-A Data Lap Supplier", () => {
    beforeEach(() => {
      navigateToLapDataSupplier();
    });

    it("Memastikan data berubah setelah sorting pada kolom Kode", () => {
      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Alamat", () => {
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Kota", () => {
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Telepon", () => {
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Lead Time", () => {
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Status", () => {
      cy.get(".select2-selection__clear").click();
      getSuppliersNameFromFirstPage().then((supplierNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSuppliersNameFromFirstPage().then((supplierNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(supplierNamesBeforeSort).to.not.deep.equal(
            supplierNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSuppliersNameFromFirstPage().then((supplierNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(supplierNamesAfterSortAZ).to.not.deep.equal(
              supplierNamesAfterSortZA
            );
          });
        });
      });
    });
  });
});
