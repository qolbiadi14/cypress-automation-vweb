describe("Fungsionalitas Data Poli", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.login("fadil123", "fadil123");
  });

  const navigateToDataPoli = () => {
    cy.get("#menu_1").click();
    cy.get("#menu_2").click();
    cy.url().should("include", "/poli");
    cy.get("h1").should("have.text", "\n                            Data Poli");
  };

  const fillPoliForm = (name, locationType, description) => {
    cy.get("#poli-polnama").type(name);
    cy.get(".select2-selection").click();
    cy.get(".select2-results__option").contains(locationType).click();
    cy.get(".select2-selection__rendered").should(
      "have.text",
      `×${locationType}`
    );

    if (description) {
      cy.get("#poli-polket").type(description);
    }
  };

  const verifyLabel = () => {
    // Verifikasi bahwa label memiliki teks 'Nama'
    cy.get('label[for="poli-polnama"]').should("have.text", "Nama");
    cy.get('label[for="poli-physical_typecode"]').should(
      "have.text",
      "Tipe Fisik Lokasi"
    );
    cy.get('label[for="poli-polket"]').should("have.text", "Keterangan");
  };

  context("Menambah Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
      cy.get("a.btn.btn-info.wahyu").contains("Tambah").click();
      cy.get("h1").should(
        "have.text",
        "\n                            Tambah Poli"
      );
      verifyLabel();
    });

    it("Menambah Data Poli Baru dengan data yang lengkap", () => {
      fillPoliForm("Poli Baru", "Room", "Keterangan Poli Baru");

      // Klik tombol 'Simpan'
      cy.get('button[type="submit"]').click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w3-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan."); // Memastikan bahwa teks dalam alert sesuai

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Data Poli
      cy.get(":nth-child(3) > .form-control").type("Poli Baru{enter}");
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", "Poli Baru");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Keterangan Poli Baru"
      );
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "Room");
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Data Poli
      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type("Poli Baru{enter}");
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", "Poli Baru");
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "Keterangan Poli Baru"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type("Poli Baru{enter}");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan Data Poli Poli Baru"
      );
    });

    it("Menambah Data Poli Baru tanpa mengisi keterangan", () => {
      fillPoliForm("Poli Baru tanpa keterangan", "Room", "");
      cy.get('button[type="submit"]').click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w3-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan."); // Memastikan bahwa teks dalam alert sesuai

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Data Poli
      cy.get(":nth-child(3) > .form-control").type(
        "Poli Baru tanpa keterangan{enter}"
      );
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "Poli Baru tanpa keterangan"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should("be.empty");
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "Room");
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Data Poli
      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type(
        "Poli Baru tanpa keterangan{enter}"
      );
      cy.get('[data-key="0"] > :nth-child(2)').should(
        "have.text",
        "Poli Baru tanpa keterangan"
      );
      cy.get('[data-key="0"] > :nth-child(3)').should("be.empty");
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(
        "Poli Baru tanpa keterangan{enter}"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan Data Poli Poli Baru tanpa keterangan"
      );
    });

    it("Menambah Data Poli Baru tanpa mengisi semua field", () => {
      cy.get('button[type="submit"]').click();
      cy.get(".field-poli-polnama > .col-sm-6 > .help-block").should(
        "have.text",
        "Nama tidak boleh kosong"
      );
      cy.get(".field-poli-physical_typecode > .col-sm-6 > .help-block").should(
        "have.text",
        "Tipe Fisik Lokasi tidak boleh kosong"
      );
    });

    it("Menambah Data Poli Baru dengan nama yang sama", () => {
      // fillPoliForm("Poli Baru", "Room", "Keterangan Poli Baru");
      // cy.get('button[type="submit"]').click();
      // cy.get("#w3-success")
      //   .should("be.visible") // Memastikan bahwa alert muncul
      //   .and("contain", "Data tersimpan.");
      // cy.get("a.btn.btn-info.wahyu").contains("Tambah").click();
      // cy.get("h1").should(
      //   "have.text",
      //   "\n                            Tambah Poli"
      // );
      fillPoliForm("a", "Room", "a");
      cy.get('button[type="submit"]').click();
      cy.get("#w1-warning")
        .should("be.visible")
        .and("contain", "Nama poli sudah digunakan!");
    });
  });

  context("Mengubah Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
      cy.get(":nth-child(3) > .form-control").type("Poli Baru{enter}");
      cy.get(
        '[data-key="0"] > [style="width: 7%;"] > .glyphicon-pencil'
      ).click();
      cy.get(".box-header > h1").should("have.text", "Ubah Poli");
      verifyLabel();
    });

    it("Mengubah Data Poli dengan data lengkap dan semua kolom diubah", () => {
      cy.get("#poli-polnama").should("have.value", "Poli Baru");
      cy.get("select#poli-physical_typecode").should("have.value", "ro");
      cy.get("#poli-polket").should("have.value", "Keterangan Poli Baru");

      cy.get("#poli-polnama").clear();
      cy.get(".select2-selection__clear").click();
      cy.get("#poli-polket").clear();

      fillPoliForm("Poli Baru Diubah", "Area", "Keterangan Poli Baru Diubah");
      cy.get('button[type="submit"]').click();
      cy.get("#w3-success")
        .should("be.visible")
        .and("contain", "Data berhasil diperbarui.");

      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Keterangan Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "Area");
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(2)').should(
        "have.text",
        "Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "Keterangan Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Mengubah Data Poli Poli Baru Diubah"
      );

      cy.get('[data-key="0"] > :nth-child(5) > :nth-child(1)').should(
        "have.text",
        "Poli Baru"
      );
      cy.get('[data-key="0"] > :nth-child(5) > :nth-child(3)').should(
        "have.text",
        "Keterangan Poli Baru"
      );

      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(1)').should(
        "have.text",
        "Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(6) > :nth-child(3)').should(
        "have.text",
        "Keterangan Poli Baru Diubah"
      );
    });

    it.only("Mengubah Data Poli dengan data lengkap menjadi tanpa mengisi keterangan", () => {
      cy.get("#poli-polnama").should("have.value", "Poli Baru Diubah");
      cy.get("select#poli-physical_typecode").should("have.value", "area");
      cy.get("#poli-polket").should(
        "have.value",
        "Keterangan Poli Baru Diubah"
      );

      cy.get("#poli-polket").clear();
      cy.get('button[type="submit"]').click();
      cy.get("#w3-success")
        .should("be.visible")
        .and("contain", "Data berhasil diperbarui.");
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(3)').should(
        "have.text",
        "Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(5)').should("have.text", "Area");
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(2)').should(
        "have.text",
        "Poli Baru Diubah"
      );
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", "");
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Mengubah Data Poli Poli Baru Diubah"
      );

      cy.get('[data-key="0"] > :nth-child(5)').should(
        "have.text",
        "Keterangan : Keterangan Poli Baru Diubah \n "
      );
      cy.get('[data-key="0"] > :nth-child(6)').should(
        "have.text",
        "Keterangan :  \n "
      );
    });
  });
});
