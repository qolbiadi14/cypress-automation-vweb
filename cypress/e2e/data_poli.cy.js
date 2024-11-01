import { faker } from "@faker-js/faker";

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

  const listPoli = [
    {
      nama: "Poli Umum",
      deskripsi:
        "Pelayanan kesehatan dasar untuk diagnosis dan pengobatan penyakit umum yang tidak memerlukan spesialisasi tertentu.",
    },
    {
      nama: "Poli Anak",
      deskripsi:
        "Pelayanan kesehatan yang menangani kesehatan bayi, anak-anak, dan remaja dengan fokus pada pencegahan dan pengobatan penyakit.",
    },
    {
      nama: "Poli Gigi dan Mulut",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada perawatan dan pengobatan masalah gigi, gusi, dan mulut.",
    },
    {
      nama: "Poli Kebidanan dan Kandungan",
      deskripsi:
        "Pelayanan kesehatan untuk wanita, termasuk pemeriksaan kehamilan, persalinan, dan perawatan pasca melahirkan serta pengobatan masalah kesehatan reproduksi wanita.",
    },
    {
      nama: "Poli Penyakit Dalam",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit pada organ dalam tubuh seperti diabetes, hipertensi, dan penyakit lainnya yang membutuhkan penanganan lebih lanjut.",
    },
    {
      nama: "Poli Bedah Umum",
      deskripsi:
        "Pelayanan bedah untuk berbagai penyakit yang memerlukan intervensi bedah, seperti operasi usus buntu, hernia, dan lainnya.",
    },
    {
      nama: "Poli Bedah Saraf",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit atau gangguan sistem saraf yang memerlukan tindakan bedah, seperti tumor otak atau cedera saraf.",
    },
    {
      nama: "Poli Jantung dan Pembuluh Darah",
      deskripsi:
        "Pelayanan kesehatan yang khusus menangani penyakit jantung dan sistem peredaran darah, seperti hipertensi, penyakit jantung koroner, dan lainnya.",
    },
    {
      nama: "Poli Mata",
      deskripsi:
        "Pelayanan kesehatan untuk diagnosis, perawatan, dan pengobatan berbagai penyakit atau kelainan pada mata.",
    },
    {
      nama: "Poli Telinga Hidung Tenggorok (THT)",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada diagnosis dan pengobatan penyakit pada telinga, hidung, dan tenggorokan.",
    },
    {
      nama: "Poli Paru",
      deskripsi:
        "Pelayanan kesehatan untuk menangani penyakit pada sistem pernapasan, seperti asma, bronkitis, dan penyakit paru obstruktif kronis (PPOK).",
    },
    {
      nama: "Poli Saraf",
      deskripsi:
        "Pelayanan kesehatan yang menangani gangguan pada sistem saraf, termasuk otak, sumsum tulang belakang, dan saraf tepi.",
    },
    {
      nama: "Poli Kulit dan Kelamin",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit pada kulit, rambut, kuku, serta kelamin, seperti infeksi kulit atau penyakit menular seksual.",
    },
    {
      nama: "Poli Rehabilitasi Medik",
      deskripsi:
        "Pelayanan kesehatan untuk membantu pemulihan fungsi fisik dan kognitif setelah cedera atau penyakit, termasuk fisioterapi.",
    },
    {
      nama: "Poli Psikiatri",
      deskripsi:
        "Pelayanan kesehatan yang menangani gangguan mental dan emosional, seperti depresi, skizofrenia, atau gangguan kecemasan.",
    },
    {
      nama: "Poli Anestesi",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada manajemen nyeri dan anestesi selama prosedur bedah atau tindakan medis.",
    },
    {
      nama: "Poli Urologi",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit pada saluran kemih dan sistem reproduksi pria, seperti batu ginjal atau gangguan prostat.",
    },
    {
      nama: "Poli Orthopedi",
      deskripsi:
        "Pelayanan kesehatan untuk diagnosis dan pengobatan penyakit atau cedera pada sistem muskuloskeletal, seperti tulang, sendi, dan otot.",
    },
    {
      nama: "Poli Gizi Klinik",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada manajemen diet dan gizi untuk mendukung pengobatan dan pencegahan penyakit.",
    },
    {
      nama: "Poli Endokrinologi",
      deskripsi:
        "Pelayanan kesehatan yang menangani gangguan pada kelenjar endokrin dan masalah hormon, seperti diabetes dan gangguan tiroid.",
    },
    {
      nama: "Poli Hematologi",
      deskripsi:
        "Pelayanan kesehatan yang khusus menangani penyakit darah dan sistem pembentukan darah, seperti anemia dan leukemia.",
    },
    {
      nama: "Poli Onkologi",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada diagnosis dan pengobatan kanker, termasuk perawatan kemoterapi dan radioterapi.",
    },
    {
      nama: "Poli Geriatri",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada perawatan kesehatan lansia, termasuk penanganan penyakit yang sering dialami pada usia tua.",
    },
    {
      nama: "Poli Reumatologi",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit sendi, tulang, dan otot, termasuk penyakit autoimun seperti lupus dan rheumatoid arthritis.",
    },
    {
      nama: "Poli Kedokteran Nuklir",
      deskripsi:
        "Pelayanan kesehatan yang menggunakan teknik diagnostik dan terapi dengan bahan radioaktif untuk penyakit tertentu.",
    },
    {
      nama: "Poli Kedokteran Forensik",
      deskripsi:
        "Pelayanan kesehatan yang berfokus pada pemeriksaan medis untuk tujuan hukum, seperti otopsi dan identifikasi korban.",
    },
    {
      nama: "Poli Patologi Klinik",
      deskripsi:
        "Pelayanan kesehatan untuk pemeriksaan laboratorium guna membantu diagnosis penyakit melalui analisis darah, urin, dan jaringan tubuh lainnya.",
    },
    {
      nama: "Poli Patologi Anatomi",
      deskripsi:
        "Pelayanan kesehatan untuk mendiagnosis penyakit melalui analisis jaringan tubuh, termasuk biopsi.",
    },
    {
      nama: "Poli Penyakit Tropik dan Infeksi",
      deskripsi:
        "Pelayanan kesehatan yang menangani penyakit menular dan infeksi tropis seperti malaria, demam berdarah, dan tuberkulosis.",
    },
  ];

  const listTipeFisikLokasi = [
    "Area",
    "Bed",
    "Building",
    "Cabinet",
    "Corridor",
    "House",
    "Jurisdiction",
    "Level",
    "Road",
    "Room",
    "Site",
    "Vehicle",
    "Virtual",
    "Ward",
    "Wing",
  ];

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
      const selectedPoli = faker.helpers.arrayElement(listPoli);

      // Mengambil nama dan deskripsi dari elemen yang dipilih
      const name = selectedPoli.nama;
      const description = selectedPoli.deskripsi;
      const locationType = faker.helpers.arrayElement(listTipeFisikLokasi);

      fillPoliForm(name, locationType, description);

      // Klik tombol 'Simpan'
      cy.get('button[type="submit"]').click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w3-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan."); // Memastikan bahwa teks dalam alert sesuai

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Data Poli
      cy.get(":nth-child(3) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", name);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", description);
      cy.get('[data-key="0"] > :nth-child(5)').should(
        "have.text",
        locationType
      );
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Data Poli
      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", name);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", description);
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan Data Poli " + name
      );
    });

    it("Menambah Data Poli Baru tanpa mengisi keterangan", () => {
      const selectedPoli = faker.helpers.arrayElement(listPoli);

      // Mengambil nama dan deskripsi dari elemen yang dipilih
      const name = selectedPoli.nama;
      const locationType = faker.helpers.arrayElement(listTipeFisikLokasi);
      fillPoliForm(name, locationType, "");
      cy.get('button[type="submit"]').click();

      // Memverifikasi bahwa alert sukses muncul dan mengandung teks yang diharapkan
      cy.get("#w3-success")
        .should("be.visible") // Memastikan bahwa alert muncul
        .and("contain", "Data tersimpan."); // Memastikan bahwa teks dalam alert sesuai

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Data Poli
      cy.get(":nth-child(3) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(3)').should("have.text", name);
      cy.get('[data-key="0"] > :nth-child(4)').should("be.empty");
      cy.get('[data-key="0"] > :nth-child(5)').should(
        "have.text",
        locationType
      );
      cy.get('[data-key="0"] > :nth-child(7)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Data Poli
      cy.get("#menu_31").click();
      cy.get(":nth-child(2) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(2)').should("have.text", name);
      cy.get('[data-key="0"] > :nth-child(3)').should("be.empty");
      cy.get('[data-key="0"] > :nth-child(4)').should("have.text", "Aktif");

      // Verifikasi bahwa data yang baru saja ditambahkan ada di menu Laporan Aktifitas User
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type(`${name}{enter}`);
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menambahkan Data Poli " + name
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

    it("Mengubah Data Poli dengan data lengkap menjadi tanpa mengisi keterangan", () => {
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

    it("Mengubah Data Poli dengan data lengkap menjadi tanpa mengisi nama poli", () => {
      cy.get("#poli-polnama").should("have.value", "Poli Baru Diubah");
      cy.get("select#poli-physical_typecode").should("have.value", "area");
      cy.get("#poli-polket").should(
        "have.value",
        "Keterangan Poli Baru Diubah"
      );

      cy.get("#poli-polnama").clear();
      cy.get('button[type="submit"]').click();
      cy.get(".field-poli-polnama > .col-sm-6 > .help-block").should(
        "have.text",
        "Nama tidak boleh kosong"
      );
    });

    it("Mengubah Data Poli dengan nama yang sama", () => {
      cy.get("#poli-polnama").should("have.value", "Poli Baru Diubah");
      cy.get("select#poli-physical_typecode").should("have.value", "area");
      cy.get("#poli-polket").should(
        "have.value",
        "Keterangan Poli Baru Diubah"
      );

      cy.get("#poli-polnama").clear();
      cy.get("#poli-polket").clear();
      fillPoliForm("a", "Room", "a");
      cy.get('button[type="submit"]').click();
      cy.get("#w1-warning")
        .should("be.visible")
        .and("contain", "Nama poli sudah digunakan!");
    });
  });

  context("Nonaktif dan aktifkan Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
    });

    it("Menghapus Data Poli", () => {
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get(
        '[data-key="0"] > [style="width: 7%;"] > .glyphicon-trash'
      ).click();
      cy.get("#w3-success")
        .should("be.visible")
        .and("contain", "Poli Poli Baru Diubah dihapus.");
      cy.get("#select2-w1-container").click(); // Klik elemen pertama
      cy.get(".select2-results__option").contains("Non Aktif").click();
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(3)').contains("Poli Baru Diubah");

      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type("Poli Baru{enter}");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Menonaktifkan poli Poli Poli Baru Diubah"
      );
    });

    it("Mengaktifkan Data Poli", () => {
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get("#select2-w1-container").click();
      cy.get(".select2-results__option").contains("Non Aktif").click();
      cy.get('[data-key="0"] > [style="width: 7%;"] > .glyphicon-plus').click();
      cy.get("#w3-success")
        .should("be.visible")
        .and("contain", "Poli Poli Baru Diubah diaktifkan.");
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get('[data-key="0"] > :nth-child(3)').contains("Poli Baru Diubah");
      cy.get('[data-key="0"] > :nth-child(7)').contains("Aktif");
      cy.get("#menu_47").click();
      cy.get("#menu_138").click();
      cy.get(":nth-child(4) > .form-control").type("Poli Baru{enter}");
      cy.get('[data-key="0"] > :nth-child(4)').should(
        "have.text",
        "Mengaktifkan Data Poli Poli Poli Baru Diubah"
      );
    });
  });

  context("Tombol Refresh Menu Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
    });

    it("Refresh Data Poli", () => {
      cy.get(":nth-child(3) > .form-control").type("Poli Baru Diubah{enter}");
      cy.get(":nth-child(4) > .form-control").type(
        "Keterangan Poli Baru Diubah{enter}"
      );
      cy.get("#select2-w0-container").click();
      cy.get(".select2-results__option").eq(0).contains("Site").click();
      cy.get("#select2-w1-container").click();
      cy.get(".select2-results__option").eq(1).contains("Non Aktif").click();
      cy.get(".btn-default").should("have.text", " Refresh").click();
      cy.get(":nth-child(3) > .form-control").should("have.value", "");
      cy.get(":nth-child(4) > .form-control").should("have.value", "");
      cy.get(".select2-selection__placeholder").should(
        "have.text",
        "SEMUA TIPE"
      );
      cy.get("#select2-w1-container").should("have.text", "×Aktif");
    });
  });

  // context("Sorting A-Z dan Z-A Data Poli", () => {
  //   beforeEach(() => {
  //     navigateToDataPoli();
  //   });

  //   it.only("Memastikan sorting A-Z pada kolom Nama dari API", () => {
  //     cy.get("tbody tr").then((rows) => {
  //       const poliNames = [];

  //       // Iterasi setiap baris <tr> untuk mengambil kolom "Nama" (kolom ketiga)
  //       rows.each((index, row) => {
  //         const poliName = Cypress.$(row).find("td").eq(2).text().trim();
  //         poliNames.push(poliName);
  //       });

  //       // Urutkan array poliNames secara alfabetis (A-Z)
  //       const sortedPoliNames = [...poliNames].sort();

  //       // Klik header tabel untuk mengurutkan data
  //       cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

  //       // Tunggu hingga data diurutkan dan ambil kembali data dari baris tabel
  //       cy.get("tbody tr").then((sortedRows) => {
  //         const sortedPoliNamesFromTable = [];

  //         sortedRows.each((index, row) => {
  //           const poliName = Cypress.$(row).find("td").eq(2).text().trim();
  //           sortedPoliNamesFromTable.push(poliName);
  //         });

  //         // Validasi bahwa data yang diambil setelah pengurutan sesuai dengan data yang diurutkan sebelumnya
  //         expect(sortedPoliNamesFromTable).to.deep.equal(sortedPoliNames);
  //       });
  //     });
  //   });
  // });

  // context("Sorting A-Z dan Z-A Data Poli", () => {
  //   beforeEach(() => {
  //     navigateToDataPoli();
  //   });

  //   it.only("Memastikan sorting A-Z pada kolom Nama dari API", () => {
  //     const getAllPoliNames = () => {
  //       const poliNames = [];

  //       const getPageData = () => {
  //         return cy.get("tbody tr").then((rows) => {
  //           rows.each((index, row) => {
  //             const poliName = Cypress.$(row).find("td").eq(2).text().trim();
  //             poliNames.push(poliName);
  //           });

  //           // Cek apakah ada tombol "Next" untuk pagination
  //           return cy.get(".next").then(($next) => {
  //             if ($next.find("a").length) {
  //               // Klik tombol "Next" dan ambil data dari halaman berikutnya
  //               cy.wrap($next).find("a").click({ force: true });
  //               return getPageData();
  //             } else if ($next.find("span").length) {
  //               // Pagination sudah mencapai akhir
  //               return;
  //             } else {
  //               // Tidak ada elemen "Next" yang valid ditemukan
  //               throw new Error("Pagination element not found");
  //             }
  //           });
  //         });
  //       };

  //       return getPageData().then(() => poliNames);
  //     };

  //     // Ambil semua data dari semua halaman tabel
  //     getAllPoliNames().then((poliNames) => {
  //       // Urutkan array poliNames secara alfabetis (A-Z)
  //       const sortedPoliNames = [...poliNames].sort();

  //       // Klik header tabel untuk mengurutkan data
  //       cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

  //       // Tunggu hingga data diurutkan dan ambil kembali semua data dari semua halaman tabel
  //       getAllPoliNames().then((sortedPoliNamesFromTable) => {
  //         // Validasi bahwa data yang diambil setelah pengurutan sesuai dengan data yang diurutkan sebelumnya
  //         expect(sortedPoliNamesFromTable).to.deep.equal(sortedPoliNames);
  //       });
  //     });
  //   });
  // });

  context("Sorting A-Z dan Z-A Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
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
        cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPoliNamesFromFirstPage().then((poliNamesAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(poliNamesBeforeSort).to.not.deep.equal(poliNamesAfterSortAZ);

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(3) > a").click();

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
        cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPoliKeterangansFromFirstPage().then((poliKeterangansAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(poliKeterangansBeforeSort).to.not.deep.equal(
            poliKeterangansAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(4) > a").click();

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

    it("Memastikan data berubah setelah sorting pada kolom Tipe Fisik Lokasi", () => {
      const getPoliTFLokasisFromFirstPage = () => {
        const poliTFLokasis = [];

        return cy.get("tbody tr").then((rows) => {
          rows.each((index, row) => {
            const poliTFLokasi = Cypress.$(row).find("td").eq(2).text().trim();
            poliTFLokasis.push(poliTFLokasi);
          });
          return poliTFLokasis;
        });
      };

      // Ambil semua data dari halaman pertama tabel sebelum pengurutan
      getPoliTFLokasisFromFirstPage().then((poliTFLokasisBeforeSort) => {
        // Klik header tabel untuk mengurutkan data A-Z
        cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

        // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan A-Z
        getPoliTFLokasisFromFirstPage().then((poliTFLokasisAfterSortAZ) => {
          // Validasi bahwa data berubah setelah pengurutan A-Z
          expect(poliTFLokasisBeforeSort).to.not.deep.equal(
            poliTFLokasisAfterSortAZ
          );

          // Klik header tabel lagi untuk mengurutkan data Z-A
          cy.get("thead > :nth-child(1) > :nth-child(5) > a").click();

          // Tunggu hingga data diurutkan dan ambil kembali semua data dari halaman pertama tabel setelah pengurutan Z-A
          getPoliTFLokasisFromFirstPage().then((poliTFLokasisAfterSortZA) => {
            // Validasi bahwa data berubah setelah pengurutan Z-A
            expect(poliTFLokasisAfterSortAZ).to.not.deep.equal(
              poliTFLokasisAfterSortZA
            );
          });
        });
      });
    });
  });

  context("Pagination Data Poli", () => {
    beforeEach(() => {
      navigateToDataPoli();
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
