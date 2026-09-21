# 🌟 Personal & Professional Portfolio Website

Website portofolio interaktif dan modern yang dirancang khusus untuk menampilkan rekam jejak akademis, pengalaman organisasi, proyek teknologi unggulan, serta inisiatif kontribusi komunitas. Dibangun dengan pendekatan modular agar mudah dikelola dan dikembangkan.

---

## 📌 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Teknologi & Arsitektur](#️-teknologi--arsitektur)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Panduan Instalasi & Menjalankan Proyek](#-panduan-instalasi--menjalankan-proyek)
- [Pembaruan Data Dinamis (`data.js`)](#-pembaruan-data-dinamis-datajs)
- [Kontribusi & Lisensi](#-kontribusi--lisensi)

---

## ✨ Fitur Utama

- **Responsive & Mobile-First Design:** Dioptimalkan agar tampil sempurna dan rapi di berbagai ukuran layar, mulai dari *smartphone*, tablet, hingga layar desktop beresolusi tinggi.
- **Dynamic Theme Switcher (Dark/Light Mode):** Dilengkapi fitur pengaturan tema terang dan gelap otomatis (*prefers-color-scheme*) maupun manual berdasarkan preferensi pengguna.
- **Dynamic Content Management:** Pemisahan struktur data (`data.js`) dari kerangka tampilan utama, memudahkan proses pembaruan konten teks, daftar proyek, hingga linimasa kegiatan tanpa menyentuh file HTML.
- **Interactive Sections:**
  - **Profil & Bio:** Menampilkan identitas profesional, keahlian teknis (*skills*), serta latar belakang pendidikan.
  - **Moments (Kegiatan & Kepanitiaan):** Dokumentasi pengalaman organisasi, kepanitiaan acara, dan keikutsertaan kompetisi.
  - **Projects (Portofolio Karya):** Showcase proyek-proyek pengembangan web maupun rekayasa perangkat lunak.
  - **Community Plan (Inisiatif GSA):** Rencana program kerja dan aksi nyata untuk mendukung komunitas teknologi di kampus.

---

## 🛠️ Teknologi & Arsitektur

Proyek ini dibangun murni menggunakan teknologi web standar modern tanpa ketergantungan pada *framework* JavaScript yang berat, menjadikannya sangat ringan dan cepat diakses:

- **HTML5:** Memberikan struktur semantik web yang baik untuk aksesibilitas dan SEO.
- **CSS3 (Custom Properties):** Memanfaatkan variabel CSS untuk manajemen warna dinamis yang mendukung peralihan tema dengan mulus.
- **JavaScript (ES6+):** Mengatur logika interaksi antarmuka serta perenderan data secara dinamis ke DOM.

---

## 📁 Struktur Direktori Proyek

Berikut adalah peta struktur folder dari direktori utama proyek portofolio ini:

```text
PORTOFOLIO/
│
├── css/
│   └── style.css          # Berisi seluruh styling, layout, animasi, dan CSS Variables (Dark/Light Mode)
├── images/                # Kumpulan aset visual, foto profil, dan dokumentasi kegiatan
├── js/
│   ├── data.js            # Pusat data dinamis (profil, momen kegiatan, proyek, & rencana kerja)
│   └── main.js            # Skrip logika utama untuk manipulasi DOM dan fungsionalitas web
├── index.html             # Berkas utama kerangka halaman portofolio
└── README.md              # Dokumentasi lengkap proyek