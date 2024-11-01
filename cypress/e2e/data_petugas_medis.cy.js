import { en, fakerID_ID as faker } from "@faker-js/faker";
import "cypress-file-upload";

function generateDate() {
  const year = faker.number.int({ min: 2000, max: 2024 });
  const month = faker.date.month({ abbreviated: true });
  const day = faker.number.int({ min: 1, max: 28 });
  return `${day} ${month} ${year}`;
}

describe("Fungsionalitas Data Petugas Medis", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const nik = faker.number.int({
    min: 1000000000000000,
    max: 9999999999999999,
  });
  const nama = faker.person.fullName();
  const alamat = faker.location.streetAddress(true);
  const kota = faker.location.city();
  const notelp = faker.phone.number({ style: "international" });
  const tmt = generateDate();

  const navigateToDataPetugas = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_9").click();
    cy.url().should("include", "/petugas-medis");
    cy.get(".box-header > h1").should("have.text", "Data Petugas Medis");
  };

  const fillPetugasForm = (nik, nama, alamat, kota, notelp, tmt) => {
    cy.get("#petugas-nik").type(nik);
    cy.get("#petugas-nama").type(nama);
    cy.get("#petugas-alamat").type(alamat);
    cy.get("#petugas-kota").type(kota);
    cy.get("#petugas-telp").type(notelp);
    cy.get("#petugas-nostr").type(nostr);
    cy.get("#petugas-tglmulai")
      .clear()
      .type(tmt + "{enter}");

    const verifyLabel = () => {
      cy.get(".field-petugas-nik > .control-label").should("have.text", "NIK");
      cy.get(".field-petugas-nama > .control-label").should(
        "have.text",
        "Nama"
      );
      cy.get(".field-petugas-alamat > .control-label").should(
        "have.text",
        "Alamat"
      );
      cy.get(".field-petugas-kota > .control-label").should(
        "have.text",
        "Kota"
      );
      cy.get(".field-petugas-telp > .control-label").should(
        "have.text",
        "No. Telepon"
      );
      cy.get(".field-petugas-tglmulai > .control-label").should(
        "have.text",
        "Tanggal Mulai Tugas"
      );
    };
  };

  context("Tambah Data Petugas Medis", () => {
    beforeEach(() => {
      navigateToDataPetugas();
      cy.get("#tambah").click();
      cy.get(".box-header > h1").should("have.text", "Tambah Petugas Medis");
      verifyLabel();
    });

    it("Menambahkan data Petugas Medis", () => {
      fillPetugasForm(nik, nama, alamat, kota, notelp, tmt);
      cy.get("#submitpetugas").click();

      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Data tersimpan");

      cy.get(":nth-child(3) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", nama);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", nik);
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
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", alamat);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${nama}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan petugas medis " + nama
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
    });

    it("Menambah data petugas medus hanya mengisi nama saja", () => {
      cy.get("#petugas-nama").type(nama);
      cy.get("#submitpetugas").click();
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
        "Menambahkan petugas medis " + nama
      );
    });

    it("Menambah data petigas tanpa mengisi form", () => {
      cy.get("#submitpetugas").click();
      cy.get(".field-petugas-nama > .col-sm-8 > .help-block").should(
        "have.text",
        "Nama tidak boleh kosong"
      );
    });
  });

  context("Mengubah Data Petugas", () => {
    beforeEach(() => {
      navigateToDataPetugas();
      cy.get(".box-header > h1").should;
      "have.text", "Ubah Petugas";
      verifyLabel();
    });

    it("Mengubah data Petugas tanpa mengubah user", () => {
      const namaPetugas = "Mahmud Wahyudin";
      // const namaPetugas = "Daniswara Abimanyu";
      // const nikPetugas = "9974335477372540";
      // const spesialisPetugas = "Spesialis Saraf";
      // const alamatPetugas = "Ki. Zahrah no 63 Suite 173";
      // const koataPetugas = "Wangi Wangi"
      // const noTelpPetugas = "+626632144152";
      // const noStrPetugas = "28 09 7 4 8 54-136566";
      // const emailPetugas = "Marwata_Nanda@gmail.com"
      // const tmtPetugas = "16 Jul 2003";
      // const tglRegPetugas = "23 Sep 2024";
      // const statusPetugas = "Aktif";
      cy.get(":nth-child(3) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", namaPetugas);
      cy.get('[href="/Petugas/update/1813"] > .glyphicon').click();

      cy.get("#petugas-nik").should("have.value", "7015167190627633").clear();
      cy.get("#petugas-nama").should("have.value", "Mahmud Wahyudin").clear();
      cy.get("#petugas-spesialis")
        .should("have.value", "Spesialis Bedah Umum")
        .clear();
      cy.get("#petugas-alamat")
        .should("have.value", "Gg. Adhitama no 34 Suite 643")
        .clear();
      cy.get("#petugas-kota").should("have.value", "Singaraja").clear();
      cy.get("#petugas-telp").should("have.value", "+6265051636722").clear();
      cy.get("#petugas-nostr")
        .should("have.value", "89 44 4 7 1 41-907341")
        .clear();
      cy.get("#petugas-tglmulai")
        .clear()
        .type(tmt + "{enter}");
    });
  });

  context("Aktif / Non Aktif Data Petugas Medis", () => {
    beforeEach(() => {
      navigateToDataPetugas();
    });

    it("Menonaktifkan data Petugas", () => {
      const namaPetugas = "Ayu Lestari";
      cy.get(":nth-child(3) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", namaPetugas);
      cy.get(
        '[data-key="0"] > [style="width: 9%;"] > .glyphicon-trash'
      ).click();
      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Petugas " + namaPetugas + " dihapus");
      cy.get(".select2-selection__clear").click();
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Non Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Non Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menonaktifkan Petugas " + namaPetugas
      );
    });

    it("Mengaktifkan data Petugas", () => {
      const namaPetugas = "Ayu Lestari";
      cy.get(".select2-selection__clear").click();
      cy.get(":nth-child(3) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", namaPetugas);
      cy.get('[style="width: 9%;"] > .glyphicon-plus').click();
      cy.get("#w4-success")
        .should("be.visible")
        .and("contain", "Petugas " + namaPetugas + " diaktifkan");
      cy.get('[data-key="0"] > :nth-child(9)').should("have.text", "Aktif");

      cy.get("#menu_33").click();
      cy.get(
        "#cari > .form-group > .select2 > .selection > .select2-selection"
      ).click();
      cy.get(".select2-dropdown").contains("Semua Data").click();
      cy.get("#w1 > div:nth-child(8) > button").click();
      cy.wait(1000);
      cy.get(":nth-child(2) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(8)').should("have.text", "Aktif");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${namaPetugas}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Mengaktifkan Petugas " + namaPetugas
      );
    });
  });

  context("Sorting A-Z dan Z-A Data Petugas", () => {
    beforeEach(() => {
      navigateToDataPetugas();
    });

    it("Memastikan data berubah setelah sorting pada kolom Nama", () => {
      const getnamaPetugasHalamanPertama = () => {
        const namaPetugass = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const namaPetugas = Cypress.$(row).find("td").eq(2).text().trim();
            namaPetugass.push(namaPetugas);
          });
          return namaPetugass;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getnamaPetugasHalamanPertama().then((namaPetugasBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getnamaPetugasHalamanPertama().then((namaPetugasAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(namaPetugasBeforeSort).to.not.deep.equal(
            namaPetugasAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getnamaPetugasHalamanPertama().then((namaPetugasAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(namaPetugasAfterSortAZ).to.not.deep.equal(
              namaPetugasAfterSortZA
            );
          });
        });
      });
    });

    it("Memastikan data berubah setelah sorting pada kolom NIK", () => {
      const getNIKPetugasHalamanPertama = () => {
        const nikPetugass = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const nikPetugas = Cypress.$(row).find("td").eq(3).text().trim();
            nikPetugass.push(nikPetugas);
          });
          return nikPetugass;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getNIKPetugasHalamanPertama().then((nikPetugassBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getNIKPetugasHalamanPertama().then((nikPetugassAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(nikPetugassBeforeSort).to.not.deep.equal(
            nikPetugassAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getNIKPetugasHalamanPertama().then((nikPetugassAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(nikPetugassAfterSortAZ).to.not.deep.equal(
              nikPetugassAfterSortZA
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

  context("Pagination Data Petugas", () => {
    beforeEach(() => {
      navigateToDataPetugas();
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
