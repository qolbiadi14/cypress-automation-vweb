import { en, fakerID_ID as faker } from "@faker-js/faker";

describe("Fungsionalitas Data Pasien", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToDataPasien = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_74").click();
    cy.url().should("include", "/pasien-apotik");
    cy.get("h1").should(
      "have.text",
      "\n                            Data Pasien Apotek"
    );
  };
  const verifyLabel = () => {
    cy.get(".field-pasien-pasrm > .control-label").should(
      "have.text",
      "No. RM"
    );
    cy.get(".field-pasien-pasnama > .control-label").should(
      "have.text",
      "Nama"
    );
    cy.get(".field-psien-pasalamat > .control-label").should(
      "have.text",
      "Alamat"
    );
    cy.get(".field-psien-paskota > .control-label").should("have.text", "Kota");
    cy.get(
      ":nth-child(1) > :nth-child(2) > .form-group > .control-label"
    ).should("have.text", "Telepon");
    cy.get(".field-psien-pashp > .control-label").should("have.text", "No. HP");
    cy.get(".field-psien-pasnorek > .control-label").should(
      "have.text",
      "No. Rekening"
    );
    cy.get(".field-psien-pasnpwp > .control-label").should("have.text", "NPWP");
    cy.get(".field-psien-pasleadtime > .control-label").should(
      "have.text",
      "Lead Time"
    );
  };

  const getPasienFormFirstPage = () => {
    const pasienNames = [];

    return cy.get("tbody tr").then((rows) => {
      rows.each((index, row) => {
        const pasienNames = Cypress.$(row).find("td").eq(3).text().trim();
        pasienNames.push(pasienNames);
      });
      return pasienNames;
    });
  };

  const noRM = faker.string.numeric({ length: { min: 5, max: 10 } });
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

  context("Menambah data pasien", () => {
    beforeEach(() => {
      navigateToDataPasien();
    });

    it("Menambah data pasien dengan mengisi semua kolom tanpa mengubah default kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
      verifyLabel();

      cy.get("#psien-paskode")
        .invoke("val")
        .then((noRM) => {
          cy.get("#psien-pasnama").type(companyName);
          cy.get("#psien-pasalamat").type(alamat);
          cy.get("#psien-paskota").type(kota);
          cy.get("#psien-pastelp").type(notelp);
          cy.get("#psien-pashp").type(nohp);
          cy.get("#psien-pasnorek").type(norek);
          cy.get("#psien-pasnpwp").type(npwp);
          cy.get("#psien-pasleadtime").type(leadTime);

          cy.get("#submitpasien").click();

          // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
          cy.get("#w2-success")
            .should("be.visible") // Memastikan bahwa alert muncul
            .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai

          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(3)').should("have.text", noRM);
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
          cy.get('[data-key="0"] > :nth-child(2)').should("have.text", noRM);
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
            "Menambahkan Pasien " + companyName
          );
        });
    });

    it("Menambah data pasien dengan mengisi semua kolom dan mengubah kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
      verifyLabel();

      cy.get("#psien-paskode")
        .clear()
        .type("SPL" + noRM);
      cy.get("#psien-pasnama").type(companyName);
      cy.get("#psien-pasalamat").type(alamat);
      cy.get("#psien-paskota").type(kota);
      cy.get("#psien-pastelp").type(notelp);
      cy.get("#psien-pashp").type(nohp);
      cy.get("#psien-pasnorek").type(norek);
      cy.get("#psien-pasnpwp").type(npwp);
      cy.get("#psien-pasleadtime").clear().type(leadTime);

      cy.get("#submitpasien").click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w2-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai
      cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "SPL" + noRM
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
        "SPL" + noRM
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
        "Menambahkan Pasien " + companyName
      );
    });

    it("Menambah data pasien hanya dengan mengisi kolom nama", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
      verifyLabel();

      cy.get("#psien-paskode")
        .invoke("val")
        .then((noRM) => {
          cy.get("#psien-pasnama").type(companyName);

          cy.get("#submitpasien").click();

          // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
          cy.get("#w2-success")
            .should("be.visible") // Memastikan bahwa alert muncul
            .and("contain", "Data tersimpan"); // Memastikan bahwa teks dalam alert sesuai

          cy.get(":nth-child(4) > .form-control").type(`${companyName}{enter}`);
          cy.get('[data-key="0"] > :nth-child(3)').should("have.text", noRM);
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
          cy.get('[data-key="0"] > :nth-child(2)').should("have.text", noRM);
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
            "Menambahkan Pasien " + companyName
          );
        });
    });

    it("Menambah data pasien hanya dengan mengisi kolom kode", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
      verifyLabel();

      cy.get("#psien-paskode")
        .clear()
        .type("SPL" + noRM);

      cy.get("#submitpasien").click();
      cy.get(".field-psien-pasnama > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Nama tidak boleh kosong");
    });

    it("Menambah data pasien tanpa mengisi kolom apapun", () => {
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
      verifyLabel();

      cy.get("#psien-paskode").clear();

      cy.get("#submitpasien").click();
      cy.get(".field-psien-paskode > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Kode tidak boleh kosong");
      cy.get(".field-psien-pasnama > .col-sm-8 > .help-block")
        .should("be.visible")
        .and("contain", "Nama tidak boleh kosong");
    });

    it("Menambah data pasien dengan mengisi kolom nama yang sudah ada", () => {
      // Ambil nama pasien yang sudah ada dari tabel
      cy.get('[data-key="1"] > :nth-child(4)')
        .invoke("text")
        .then((existingpasienNames) => {
          cy.get("#tambah").click();
          cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
          verifyLabel();

          cy.get("#psien-pasnama").type(existingpasienNames);
          cy.get("#submitpasien").click();
          cy.get("#w0-warning")
            .should("be.visible")
            .and("contain", "Nama pasien sudah digunakan");
        });
    });

    it("Menambah data pasien dengan mengisi kolom kode yang sudah ada", () => {
      // Ambil nama pasien yang sudah ada dari tabel
      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((existingnoRM) => {
          cy.get("#tambah").click();
          cy.get(".box-header > h1").should("have.text", "Tambah Pasien");
          verifyLabel();

          cy.get("#psien-paskode").clear().type(existingnoRM);
          cy.get("#psien-pasnama").type(companyName);
          cy.get("#submitpasien").click();
          cy.get("#w0-warning")
            .should("be.visible")
            .and("contain", "Kode pasien sudah digunakan");
        });
    });

    it("Menekan tombol reset setelah mengisi semua kolom", () => {
      cy.get("#psien-paskode")
        .clear()
        .type("SPL" + noRM);
      cy.get("#psien-pasnama").type(companyName);
      cy.get("#psien-pasalamat").type(alamat);
      cy.get("#psien-paskota").type(kota);
      cy.get("#psien-pastelp").type(notelp);
      cy.get("#psien-pashp").type(nohp);
      cy.get("#psien-pasnorek").type(norek);
      cy.get("#psien-pasnpwp").type(npwp);
      cy.get("#psien-pasleadtime").type(leadTime);

      cy.get("#reset").click();
      cy.get("#psien-paskode").should("not.be.empty");
      cy.get("#psien-pasnama").should("have.text", "");
      cy.get("#psien-pasalamat").should("have.text", "");
      cy.get("#psien-paskota").should("have.text", "");
      cy.get("#psien-pastelp").should("have.text", "");
      cy.get("#psien-pashp").should("have.text", "");
      cy.get("#psien-pasnorek").should("have.text", "");
      cy.get("#psien-pasnpwp").should("have.text", "");
      cy.get("#psien-pasleadtime").should("have.text", "");
    });
  });

  context("Mengubah data pasien", () => {
    beforeEach(() => {
      navigateToDataPasien();
    });

    it.only("Mengubah data pasien dengan mengisi semua kolom tanpa mengubah kode", () => {
      // Ambil nilai dari kolom yang diinginkan dan simpan dalam variabel
      const pasienData = {};

      cy.get('[data-key="1"] > :nth-child(3)')
        .invoke("text")
        .then((kode) => {
          pasienData.kode = kode.trim();
        });

      cy.get('[data-key="1"] > :nth-child(4)')
        .invoke("text")
        .then((nama) => {
          pasienData.nama = nama.trim();
        });

      cy.get('[data-key="1"] > :nth-child(5)')
        .invoke("text")
        .then((alamat) => {
          pasienData.alamat = alamat.trim();
        });

      cy.get('[data-key="1"] > :nth-child(6)')
        .invoke("text")
        .then((kota) => {
          pasienData.kota = kota.trim();
        });

      cy.get('[data-key="1"] > :nth-child(7)')
        .invoke("text")
        .then((telepon) => {
          pasienData.telepon = telepon.trim();
        });

      cy.get('[data-key="1"] > :nth-child(8)')
        .invoke("text")
        .then((leadTime) => {
          pasienData.leadTime = leadTime.match(/\d+/)[0];
        })
        .then(() => {
          cy.get(":nth-child(3) > .form-control")
            .type(pasienData.kode)
            .type("{enter}");
          cy.get('a[href*="/pasien/update/"] > .glyphicon').click();
          cy.get("#psien-paskode").should("have.value", pasienData.kode);
          cy.get("#psien-pasnama").should("have.value", pasienData.nama);
          cy.get("#psien-pasalamat").should("have.value", pasienData.alamat);
          cy.get("#psien-paskota").should("have.value", pasienData.kota);
          cy.get("#psien-pastelp").should("have.value", pasienData.telepon);
          cy.get("#psien-pasleadtime").should(
            "have.value",
            pasienData.leadTime
          );

          cy.get("#psien-pasnama").clear().type(companyName);
          cy.get("#psien-pasnama").clear().type(companyName);
          cy.get("#psien-pasalamat").clear().type(alamat);
          cy.get("#psien-paskota").clear().type(kota);
          cy.get("#psien-pastelp").clear().type(notelp);
          cy.get("#psien-pashp").type(nohp);
          cy.get("#psien-pasnorek").type(norek);
          cy.get("#psien-pasnpwp").type(npwp);
          cy.get("#psien-pasleadtime").clear().type(leadTime);

          cy.get("#submitpasien");

          cy.get("#w2-success")
            .should("be.visible")
            .and("contain", "Data berhasil diperbaharui");
        });
    });
  });

  context("Sorting A-Z dan Z-A Data pasien", () => {
    beforeEach(() => {
      navigateToDataPasien();
    });

    it("Memastikan data berubah setelah sorting pada kolom Kode", () => {
      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.deep.equal(pasienNamesAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Alamat", () => {
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Kota", () => {
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Telepon", () => {
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Lead Time", () => {
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Status", () => {
      cy.get(".select2-selection__clear").click();
      getPasienFormFirstPage().then((pasienNamesBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPasienFormFirstPage().then((pasienNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(pasienNamesBeforeSort).to.not.deep.equal(
            pasienNamesAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPasienFormFirstPage().then((pasienNamesAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(pasienNamesAfterSortAZ).to.not.deep.equal(
              pasienNamesAfterSortZA
            );
          });
        });
      });
    });
  });

  context("Filter Data pasien", () => {
    beforeEach(() => {
      navigateToDataPasien();
    });

    it("Memfilter data pasien berdasarkan Kode", () => {
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

    it("Memfilter data pasien berdasarkan Nama", () => {
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

    it("Memfilter data pasien berdasarkan Alamat", () => {
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

    it("Memfilter data pasien berdasarkan Kota", () => {
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

    it("Memfilter data pasien berdasarkan Telepon", () => {
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

    it("Memfilter data pasien berdasarkan Lead Time", () => {
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

  context("Pagination Data pasien", () => {
    beforeEach(() => {
      navigateToDataPasien();
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
