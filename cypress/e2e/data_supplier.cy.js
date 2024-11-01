import { en, fakerID_ID as faker } from "@faker-js/faker";

describe("Fungsionalitas Data Supplier", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToDataSupplier = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_66").click();
    cy.url().should("include", "/supplier");
    cy.get("h1").should(
      "have.text",
      "\n                            Data Supplier"
    );
  };

  const verifyLabel = () => {
    cy.get(".field-supplier-supkode > .control-label").should(
      "have.text",
      "Kode"
    );
    cy.get(".field-supplier-supnama > .control-label").should(
      "have.text",
      "Nama"
    );
    cy.get(".field-supplier-supalamat > .control-label").should(
      "have.text",
      "Alamat"
    );
    cy.get(".field-supplier-supkota > .control-label").should(
      "have.text",
      "Kota"
    );
    cy.get(".field-supplier-suptelp > .control-label").should(
      "have.text",
      "Telepon"
    );
    cy.get(".field-supplier-suphp > .control-label").should(
      "have.text",
      "No. HP"
    );
    cy.get(".field-supplier-supnorek > .control-label").should(
      "have.text",
      "No. Rekening"
    );
    cy.get(".field-supplier-supnpwp > .control-label").should(
      "have.text",
      "NPWP"
    );
    cy.get(".field-supplier-supleadtime > .control-label").should(
      "have.text",
      "Lead Time"
    );
  };

  const getSuppliersNameFromFirstPage = () => {
    const supplierNames = [];

    return cy.get("tbody tr").then((rows) => {
      rows.each((index, row) => {
        const supplierName = Cypress.$(row).find("td").eq(3).text().trim();
        supplierNames.push(supplierName);
      });
      return supplierNames;
    });
  };

  const supplierCode = faker.string.numeric({ length: { min: 5, max: 10 } });
  const companyName = faker.company.name();
  const alamat = faker.location.streetAddress(true);
  const kota = faker.location.city();
  const notelp = faker.phone.number({ style: "national" });
  const nohp = faker.phone.number({ style: "international" });
  const npwp = faker.number.int({
    min: 1000000000000000,
    max: 9999999999999999,
  });
  const norek = faker.string.numeric(16);
  const leadTime = faker.number.int({ max: 30 });

  context("Menambah data supplier", () => {
    beforeEach(() => {
      navigateToDataSupplier();
    });

    it("Menambah data supplier dengan mengisi semua kolom tanpa mengubah default kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
      verifyLabel();

      cy.get("#supplier-supkode")
        .invoke("val")
        .then((supKode) => {
          cy.get("#supplier-supnama").type(companyName);
          cy.get("#supplier-supalamat").type(alamat);
          cy.get("#supplier-supkota").type(kota);
          cy.get("#supplier-suptelp").type(notelp);
          cy.get("#supplier-suphp").type(nohp);
          cy.get("#supplier-supnorek").type(norek);
          cy.get("#supplier-supnpwp").type(npwp);
          cy.get("#supplier-supleadtime").type(leadTime);

          cy.get("#submitsupplier").click();

          // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
          cy.get("#w2-success")
            .should("be.visible") // Memastikan bahwa alert muncul
            .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai

          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(3)').should("have.text", supKode);
          cy.get('[data-key="0"] > :nth-child(4)').should(
            "have.text",
            companyName
          );
          cy.get('[data-key="0"] > :nth-child(5)').should("have.text", alamat);
          cy.get('[data-key="0"] > :nth-child(6)').should("have.text", kota);
          cy.get('[data-key="0"] > :nth-child(7)').should("have.text", notelp);
          cy.get('[data-key="0"] > :nth-child(8)').should(
            "have.text",
            leadTime + " Hari"
          );
          cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

          cy.get("#menu_77").click();
          cy.get(":nth-child(3) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(2)').should("have.text", supKode);
          cy.get('[data-key="0"] > :nth-child(3)').should(
            "have.text",
            companyName
          );
          cy.get('[data-key="0"] > :nth-child(4)').should("have.text", alamat);
          cy.get('[data-key="0"] > :nth-child(5)').should("have.text", kota);
          cy.get('[data-key="0"] > :nth-child(6)').should("have.text", notelp);
          cy.get('[data-key="0"] > :nth-child(7)').should(
            "have.text",
            leadTime + " Hari"
          );
          cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

          cy.get("#menu_47").click();
          cy.get("#menu_138").click();
          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(4)').should(
            "have.text",
            "Menambahkan supplier " + companyName
          );
        });
    });

    it("Menambah data supplier dengan mengisi semua kolom dan mengubah kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
      verifyLabel();

      cy.get("#supplier-supkode")
        .clear()
        .type("SPL" + supplierCode);
      cy.get("#supplier-supnama").type(companyName);
      cy.get("#supplier-supalamat").type(alamat);
      cy.get("#supplier-supkota").type(kota);
      cy.get("#supplier-suptelp").type(notelp);
      cy.get("#supplier-suphp").type(nohp);
      cy.get("#supplier-supnorek").type(norek);
      cy.get("#supplier-supnpwp").type(npwp);
      cy.get("#supplier-supleadtime").clear().type(leadTime);

      cy.get("#submitsupplier").click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w2-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai
      cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "SPL" + supplierCode
      );
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", companyName);
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(6)').should("have.text", kota);
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", notelp);
      cy.get('[data-key="0"] > :nth-child(8)').should(
        "have.text",
        leadTime + " Hari"
      );
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_77").click();
      cy.get(":nth-child(3) > .form-control").type(`${companyName}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should(
        "have.text",
        "SPL" + supplierCode
      );
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", companyName);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", kota);
      cy.get('[data-key="0"] > :nth-child(6)').should("have.text", notelp);
      cy.get('[data-key="0"] > :nth-child(7)').should(
        "have.text",
        leadTime + " Hari"
      );
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan supplier " + companyName
      );
    });

    it("Menambah data supplier hanya dengan mengisi kolom nama", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
      verifyLabel();

      cy.get("#supplier-supkode")
        .invoke("val")
        .then((supKode) => {
          cy.get("#supplier-supnama").type(companyName);

          cy.get("#submitsupplier").click();

          // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
          cy.get("#w2-success")
            .should("be.visible") // Memastikan bahwa alert muncul
            .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai

          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(3)').should("have.text", supKode);
          cy.get('[data-key="0"] > :nth-child(4)').should(
            "have.text",
            companyName
          );
          cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(6)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(8)').should(
            "have.text",
            "0 Hari"
          );
          cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

          cy.get("#menu_77").click();
          cy.get(":nth-child(3) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(2)').should("have.text", supKode);
          cy.get('[data-key="0"] > :nth-child(3)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(6)').should("have.text", "");
          cy.get('[data-key="0"] > :nth-child(7)').should(
            "have.text",
            "0 Hari"
          );
          cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

          cy.get("#menu_47").click();
          cy.get("#menu_138").click();
          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(4)').should(
            "have.text",
            "Menambahkan supplier " + companyName
          );
        });
    });

    it("Menambah data supplier hanya dengan mengisi kolom kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
      verifyLabel();

      cy.get("#supplier-supkode")
        .clear()
        .type("SPL" + supplierCode);

      cy.get("#submitsupplier").click();
      cy.get(".field-supplier-supnama > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Nama tidak boleh kosong");
    });

    it("Menambah data supplier tanpa mengisi kolom apapun", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
      verifyLabel();

      cy.get("#supplier-supkode").clear();

      cy.get("#submitsupplier").click();
      cy.get(".field-supplier-supkode > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Kode tidak boleh kosong");
      cy.get(".field-supplier-supnama > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Nama tidak boleh kosong");
    });

    it("Menambah data supplier dengan mengisi kolom nama yang sudah ada", () => {
      // Ambil nama supplier yang sudah ada dari tabel
      cy.get('[data-key="1"] > :nth-child(4)')
        .invoke("text")
        .then((existingSupplierName) => {
          cy.get("#tambah").click();
          cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
          verifyLabel();

          cy.get("#supplier-supnama").type(existingSupplierName);
          cy.get("#submitsupplier").click();
          cy.get("#w0-warning")
            .should("be.visible")
            .and("contain", "Nama Supplier sudah digunakan");
        });
    });

    it("Menambah data supplier dengan mengisi kolom kode yang sudah ada", () => {
      // Ambil nama supplier yang sudah ada dari tabel
      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((existingSupplierCode) => {
          cy.get("#tambah").click();
          cy.get(".box-header > h1").should("have.text", "Tambah Supplier");
          verifyLabel();

          cy.get("#supplier-supkode").clear().type(existingSupplierCode);
          cy.get("#supplier-supnama").type(companyName);
          cy.get("#submitsupplier").click();
          cy.get("#w0-warning")
            .should("be.visible")
            .and("contain", "Kode Supplier sudah digunakan");
        });
    });

    it("Menekan tombol reset setelah mengisi semua kolom", () => {
      cy.get("#supplier-supkode")
        .clear()
        .type("SPL" + supplierCode);
      cy.get("#supplier-supnama").type(companyName);
      cy.get("#supplier-supalamat").type(alamat);
      cy.get("#supplier-supkota").type(kota);
      cy.get("#supplier-suptelp").type(notelp);
      cy.get("#supplier-suphp").type(nohp);
      cy.get("#supplier-supnorek").type(norek);
      cy.get("#supplier-supnpwp").type(npwp);
      cy.get("#supplier-supleadtime").type(leadTime);

      cy.get("#reset").click();
      cy.get("#supplier-supkode").should("not.be.empty");
      cy.get("#supplier-supnama").should("have.text", "");
      cy.get("#supplier-supalamat").should("have.text", "");
      cy.get("#supplier-supkota").should("have.text", "");
      cy.get("#supplier-suptelp").should("have.text", "");
      cy.get("#supplier-suphp").should("have.text", "");
      cy.get("#supplier-supnorek").should("have.text", "");
      cy.get("#supplier-supnpwp").should("have.text", "");
      cy.get("#supplier-supleadtime").should("have.text", "");
    });
  });

  context("Mengubah data supplier", () => {
    beforeEach(() => {
      navigateToDataSupplier();
    });

    it.only("Mengubah data supplier dengan mengisi semua kolom tanpa mengubah kode", () => {
      // Ambil nilai dari kolom yang diinginkan dan simpan dalam variabel
      const supplierData = {};

      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((kode) => {
          supplierData.kode = kode.trim();
        });

      cy.get('[data-key="1"] > :nth-child(4)')
        .invoke("text")
        .then((nama) => {
          supplierData.nama = nama.trim();
        });

      cy.get('[data-key="1"] > :nth-child(5)')
        .invoke("text")
        .then((alamat) => {
          supplierData.alamat = alamat.trim();
        });

      cy.get('[data-key="1"] > :nth-child(6)')
        .invoke("text")
        .then((kota) => {
          supplierData.kota = kota.trim();
        });

      cy.get('[data-key="1"] > :nth-child(7)')
        .invoke("text")
        .then((telepon) => {
          supplierData.telepon = telepon.trim();
        });

      cy.get('[data-key="1"] > :nth-child(8)')
        .invoke("text")
        .then((leadTime) => {
          supplierData.leadTime = leadTime.match(/\d+/)[0];
        })
        .then(() => {
          cy.get(":nth-child(3) > .form-control")
            .type(supplierData.kode)
            .type("{enter}");
          cy.get('a[href*="/supplier/update/"] > .glyphicon').click();
          cy.get("#supplier-supkode").should("have.value", supplierData.kode);
          cy.get("#supplier-supnama").should("have.value", supplierData.nama);
          cy.get("#supplier-supalamat").should(
            "have.value",
            supplierData.alamat
          );
          cy.get("#supplier-supkota").should("have.value", supplierData.kota);
          cy.get("#supplier-suptelp").should(
            "have.value",
            supplierData.telepon
          );
          cy.get("#supplier-supleadtime").should(
            "have.value",
            supplierData.leadTime
          );

          cy.get("#supplier-supnama").clear().type(companyName);
          cy.get("#supplier-supnama").clear().type(companyName);
          cy.get("#supplier-supalamat").clear().type(alamat);
          cy.get("#supplier-supkota").clear().type(kota);
          cy.get("#supplier-suptelp").clear().type(notelp);
          cy.get("#supplier-suphp").type(nohp);
          cy.get("#supplier-supnorek").type(norek);
          cy.get("#supplier-supnpwp").type(npwp);
          cy.get("#supplier-supleadtime").clear().type(leadTime);

          cy.get("#submitsupplier");

          cy.get("#w2-success")
            .should("be.visible")
            .and("contain", "Data berhasil diperbaharui");
        });
    });
  });

  context("Sorting A-Z dan Z-A Data Supplier", () => {
    beforeEach(() => {
      navigateToDataSupplier();
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

  context("Filter Data Supplier", () => {
    beforeEach(() => {
      navigateToDataSupplier();
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

  context("Pagination Data Supplier", () => {
    beforeEach(() => {
      navigateToDataSupplier();
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
});
