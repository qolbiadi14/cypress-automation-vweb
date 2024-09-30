import { en, fakerID_ID as faker } from "@faker-js/faker";
import "cypress-file-upload";

function generateStrDokter() {
  // Generate sections of the STR number
  const section1 = faker.string.numeric(2); // 2 digits
  const section2 = faker.string.numeric(2); // 2 digits
  const section3 = faker.string.numeric(1); // 1 digit
  const section4 = faker.string.numeric(1); // 1 digit
  const section5 = faker.string.numeric(1); // 1 digit
  const section6 = faker.string.numeric(2); // 2 digits
  const section7 = faker.string.numeric(6); // 6 digits

  // Combine them into the correct format
  return `${section1} ${section2} ${section3} ${section4} ${section5} ${section6}-${section7}`;
}

function generateDate() {
  const year = faker.number.int({ min: 2000, max: 2024 });
  const month = faker.date.month({ abbreviated: true });
  const day = faker.number.int({ min: 1, max: 28 });
  return `${day} ${month} ${year}`;
}

describe("Fungsionalitas Data Dokter", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const listSpesialis = [
    "Spesialis Anak",
    "Spesialis Penyakit Dalam",
    "Spesialis Bedah Umum",
    "Spesialis Bedah Saraf",
    "Spesialis Jantung dan Pembuluh Darah",
    "Spesialis Kulit dan Kelamin",
    "Spesialis Mata",
    "Spesialis Telinga Hidung Tenggorok (THT)",
    "Spesialis Gigi dan Mulut",
    "Spesialis Anestesi",
    "Spesialis Urologi",
    "Spesialis Orthopedi dan Traumatologi",
    "Spesialis Rehabilitasi Medik",
    "Spesialis Kedokteran Jiwa (Psikiatri)",
    "Spesialis Kebidanan dan Kandungan",
    "Spesialis Paru",
    "Spesialis Saraf",
    "Spesialis Radiologi",
    "Spesialis Patologi Anatomi",
    "Spesialis Patologi Klinik",
    "Spesialis Kedokteran Forensik",
    "Spesialis Gizi Klinik",
    "Spesialis Kedokteran Nuklir",
    "Spesialis Mikrobiologi Klinik",
    "Spesialis Endokrinologi",
    "Spesialis Hematologi-Onkologi Medik",
    "Spesialis Penyakit Tropik dan Infeksi",
    "Spesialis Reumatologi",
  ];

  const nik = faker.number.int({
    min: 1000000000000000,
    max: 9999999999999999,
  });
  const nama = faker.person.fullName();
  const spesialis = faker.helpers.arrayElement(listSpesialis);
  const alamat = faker.location.streetAddress(true);
  const kota = faker.location.city();
  const notelp = faker.phone.number({ style: "international" });
  const nostr = generateStrDokter();
  const tmt = generateDate();
  const username = faker.string.alpha({ length: 10, casing: "lower" });
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 8 });
  const fotoPath = "uploads/foto_dokter.jpg";
  const ttdPath = "uploads/foto_ttd_dokter.png";
  const stempPath = "uploads/foto_stempel_dokter.png";

  const navigateToDataDokter = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_4").click();
    cy.url().should("include", "/dokter");
    cy.get(".box-header > h1").should("have.text", "Data Dokter");
  };

  const fillDokterForm = (
    nik,
    nama,
    spesialis,
    alamat,
    kota,
    notelp,
    nostr,
    tmt,
    fotoPath,
    ttdPath,
    stempPath
  ) => {
    cy.get("#dokter-doknik").type(nik);
    cy.get("#dokter-doknama").type(nama);
    cy.get("#dokter-dokspesialis").type(spesialis);
    cy.get("#dokter-dokalamat").type(alamat);
    cy.get("#dokter-dokkota").type(kota);
    cy.get("#dokter-doktelp").type(notelp);
    cy.get("#dokter-doknostr").type(nostr);
    cy.get("#dokter-doktglmulai")
      .clear()
      .type(tmt + "{enter}");
    cy.get("#dokter-dokfoto").attachFile(fotoPath);
    cy.get("#dokter-dok_s3_ttd").attachFile(ttdPath);
    cy.get("#dokter-dok_s3_stemp").attachFile(stempPath);
  };

  const fillDokterUserForm = (username, email, password) => {
    cy.get("#dokter-username").type(username).blur();
    cy.get("#dokter-dokemail").type(email).blur();
    cy.wait(500);
    cy.get("#spinner_modal").should("not.exist");
    cy.get("#dokter-password_hash").type(password);
    cy.get("#dokter-password_repeat").type(password);
  };

  const verifyLabel = () => {
    cy.get(".field-dokter-doknik > .control-label").should("have.text", "NIK");
    cy.get(".field-dokter-doknama > .control-label").should(
      "have.text",
      "Nama"
    );
    cy.get(".field-dokter-dokspesialis > .control-label").should(
      "have.text",
      "Spesialis"
    );
    cy.get(".field-dokter-dokalamat > .control-label").should(
      "have.text",
      "Alamat"
    );
    cy.get(".field-dokter-dokkota > .control-label").should(
      "have.text",
      "Kota"
    );
    cy.get(".field-dokter-doktelp > .control-label").should(
      "have.text",
      "No. Telepon"
    );
    cy.get(".field-dokter-doknostr > .control-label").should(
      "have.text",
      "No. STR"
    );
    cy.get(".field-dokter-username > .control-label").should(
      "have.text",
      "Username"
    );
    cy.get(".field-dokter-doktglmulai > .control-label").should(
      "have.text",
      "Tanggal Mulai Tugas"
    );
    cy.get(".field-dokter-dokfoto > .control-label").should(
      "have.text",
      "Foto Dokter"
    );
    cy.get(".field-dokter-dok_s3_ttd > .control-label").should(
      "have.text",
      "Tanda Tangan Dokter"
    );
    cy.get(".field-dokter-dok_s3_stemp > .control-label").should(
      "have.text",
      "Stampel Dokter"
    );
  };

  context("Tambah Data Dokter", () => {
    beforeEach(() => {
      navigateToDataDokter();
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Dokter");
      verifyLabel();
    });

    it("Menambahkan data dokter tanpa menambah user", () => {
      fillDokterForm(
        nik,
        nama,
        spesialis,
        alamat,
        kota,
        notelp,
        nostr,
        tmt,
        fotoPath,
        ttdPath,
        stempPath
      );
      cy.get("#submitdokter").click();

      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Data tersimpan");

      cy.get(":nth-child(3) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", nik);
      cy.get('[data-key="0"] > :nth-child(6)').should("have.text", spesialis);
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nik);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", spesialis);
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan dokter " + nama
      );
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "-");
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(1)').should(
        "have.text",
        nik
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(3)').should(
        "have.text",
        nama
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(5)').should(
        "have.text",
        spesialis
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(7)').should(
        "have.text",
        alamat
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(9)').should(
        "have.text",
        kota
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(11)').should(
        "have.text",
        notelp
      );
      cy.get(":nth-child(6) > :nth-child(13)").contains(".jpg");
      cy.get(":nth-child(6) > :nth-child(17)").contains("dokter_ttd");
      cy.get(":nth-child(6) > :nth-child(19)").contains("dokter_stemp");
    });

    it.only("Menambah data dokter sekaligus menambah user", () => {
      fillDokterForm(
        nik,
        nama,
        spesialis,
        alamat,
        kota,
        notelp,
        nostr,
        tmt,
        fotoPath,
        ttdPath,
        stempPath
      );
      fillDokterUserForm(username, email, password);
      cy.get("#submitdokter").click();

      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Data tersimpan");

      cy.get(":nth-child(3) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", nik);
      cy.get('[data-key="0"] > :nth-child(6)').should("have.text", spesialis);
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nik);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", spesialis);
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan dokter " + nama
      );
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "-");
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(1)').should(
        "have.text",
        nik
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(3)').should(
        "have.text",
        nama
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(5)').should(
        "have.text",
        spesialis
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(7)').should(
        "have.text",
        alamat
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(9)').should(
        "have.text",
        kota
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(11)').should(
        "have.text",
        notelp
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(11)').should(
        "be.exist"
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(11)').contains(
        "dokter_ttd"
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(11)').contains(
        "dokter_stemp"
      );
    });

    it("Menambah data dokter hanya mengisi nama dokternya saja", () => {
      cy.get("#dokter-doknama").type(nama);
      cy.get("#submitdokter").click();
      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Data tersimpan");
      cy.get(":nth-child(3) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(6)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan dokter " + nama
      );
    });

    it("Menambah data dokter tanpa mengisi form", () => {
      cy.get("#submitdokter").click();
      cy.get(".field-dokter-doknama > .col-sm-8 > .help-block").should(
        "have.text",
        "Nama tidak boleh kosong"
      );
    });
  });

  context("Mengubah Data Dokter", () => {
    beforeEach(() => {
      navigateToDataDokter();
    });

    it("Mengubah data dokter tanpa mengubah user", () => {});
  });

  context("Aktif / Non Aktif Data Dokter", () => {
    beforeEach(() => {
      navigateToDataDokter();
    });

    it("Menonaktifkan data dokter", () => {
      const namaDokter = "Ayu Lestari";
      cy.get(":nth-child(3) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", namaDokter);
      cy.get(
        '[data-key="0"] > [style="width: 9%;"] > .glyphicon-trash'
      ).click();
      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Dokter " + namaDokter + " dihapus");
      cy.get(".select2-selection__clear").click();
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Non Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Non Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menonaktifkan dokter " + namaDokter
      );
    });

    it("Mengaktifkan data dokter", () => {
      const namaDokter = "Ayu Lestari";
      cy.get(".select2-selection__clear").click();
      cy.get(":nth-child(3) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", namaDokter);
      cy.get('[style="width: 9%;"] > .glyphicon-plus').click();
      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Dokter " + namaDokter + " diaktifkan");
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${namaDokter}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Mengaktifkan dokter " + namaDokter
      );
    });
  });

  context("Sorting A-Z dan Z-A Data Dokter", () => {
    beforeEach(() => {
      navigateToDataDokter();
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      const getNamaDokterHalamanPertama = () => {
        const namaDokters = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const namaDokter = Cypress.$(row).find("td").eq(2).text().trim();
            namaDokters.push(namaDokter);
          });
          return namaDokters;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getNamaDokterHalamanPertama().then((namaDokterBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getNamaDokterHalamanPertama().then((namaDokterAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(namaDokterBeforeSort).to.not.deep.equal(namaDokterAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getNamaDokterHalamanPertama().then((namaDokterAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(namaDokterAfterSortAZ).to.not.deep.equal(
              namaDokterAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom NIK", () => {
      const getNIKDokterHalamanPertama = () => {
        const nikDokters = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const nikDokter = Cypress.$(row).find("td").eq(3).text().trim();
            nikDokters.push(nikDokter);
          });
          return nikDokters;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getNIKDokterHalamanPertama().then((nikDoktersBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getNIKDokterHalamanPertama().then((nikDoktersAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(nikDoktersBeforeSort).to.not.deep.equal(nikDoktersAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getNIKDokterHalamanPertama().then((nikDoktersAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(nikDoktersAfterSortAZ).to.not.deep.equal(
              nikDoktersAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Spesialis", () => {
      const getSpesialisHalamanPertama = () => {
        const spesialiss = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const spesialis = Cypress.$(row).find("td").eq(4).text().trim();
            spesialiss.push(spesialis);
          });
          return spesialiss;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getSpesialisHalamanPertama().then((spesialissBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getSpesialisHalamanPertama().then((spesialissAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(spesialissBeforeSort).to.not.deep.equal(spesialissAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(6) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getSpesialisHalamanPertama().then((spesialissAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(spesialissAfterSortAZ).to.not.deep.equal(
              spesialissAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Alamat", () => {
      const getAlamatHalamanPertama = () => {
        const alamats = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const alamat = Cypress.$(row).find("td").eq(5).text().trim();
            alamats.push(alamat);
          });
          return alamats;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getAlamatHalamanPertama().then((alamatsBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getAlamatHalamanPertama().then((alamatsAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(alamatsBeforeSort).to.not.deep.equal(alamatsAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(7) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getAlamatHalamanPertama().then((alamatsAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(alamatsAfterSortAZ).to.not.deep.equal(alamatsAfterSortZA);
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Tanggal Mulai Tugas", () => {
      const getTanggalTugas = () => {
        const tanggalTugass = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const tanggalTugas = Cypress.$(row).find("td").eq(6).text().trim();
            tanggalTugass.push(tanggalTugas);
          });
          return tanggalTugass;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getTanggalTugas().then((tanggalTugassBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getTanggalTugas().then((tanggalTugassAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(tanggalTugassBeforeSort).to.not.deep.equal(
            tanggalTugassAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(8) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getTanggalTugas().then((tanggalTugassAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(tanggalTugassAfterSortAZ).to.not.deep.equal(
              tanggalTugassAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom Status", () => {
      const getStatus = () => {
        const statuss = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const status = Cypress.$(row).find("td").eq(7).text().trim();
            statuss.push(status);
          });
          return statuss;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getStatus().then((statussBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get(".select2-selection__clear").click();
        cy.get("thead > :nth-child(1) > :nth-child(9) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getStatus().then((statussAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(statussBeforeSort).to.not.deep.equal(statussAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(9) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getStatus().then((statussAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(statussAfterSortAZ).to.not.deep.equal(statussAfterSortZA);
          });
        });
      });
    });
  });

  context("Pagination Data Dokter", () => {
    beforeEach(() => {
      navigateToDataDokter();
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
