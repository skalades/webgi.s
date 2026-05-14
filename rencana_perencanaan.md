# Dokumen Perencanaan: ForestGuard GIS

Dokumen ini menggabungkan visi desain "Geometric Balance" Anda dengan kebutuhan fungsional sistem WebGIS dinamis yang telah kita diskusikan sebelumnya (input data multi-format dan riwayat foto).

## 1. Filosofi Desain: "Geometric Balance" (Merged)
Aplikasi ini mengadopsi tema **Geometric Balance**, menggabungkan estetika antarmuka instrumen teknis dengan fokus maksimal pada data spasial.

*   **Palet Warna**:
    - **Background Utama**: `#0A110B` (Dark Forest Green)
    - **Panel UI**: `#0F1A12` dengan border emerald transparan.
    - **Aksen**: Emerald Green (`#10B981`) sebagai identitas "Digital Forestry".
*   **Tipografi**: Sans-serif bersih untuk kontrol UI dan Monospaced (JetBrains Mono) untuk koordinat dan ID data.
*   **Layout**: Struktur tiga bagian yang simetris:
    - **Kiri**: Kontrol filter, statistik kawasan, dan **Form Input (untuk Admin)**.
    - **Tengah (Main)**: Viewport peta dengan grid geometris transparan.
    - **Kanan**: Log aktivitas real-time dan **Detail Popup/Sidebar Riwayat Foto**.

## 2. Fitur Utama

### A. Manajemen Data Spasial & File GIS (Input & Update)
*   **Multi-format Upload**: Admin dapat mengunggah file **SHP, KML, GPX**, atau memasukkan koordinat manual.
*   **Sistem Riwayat Foto**: Objek yang sama dapat memiliki banyak foto yang diunggah berkala (harian).
    *   *Implementasi*: Ketika objek diklik di peta (Public/Admin), akan muncul popup dengan galeri foto historis beserta keterangan dan tanggalnya.

### B. Visualisasi Spasial High-Fidelity (Dari Desain Anda)
*   **Dual Basemap Control**: Citra Satelit (Esri World Imagery) dan Topographic/Voyager.
*   **Manajemen Blok (Poligon)**: Area hutan menggunakan poligon dengan border *dashed* teknis.
*   **Titik Monitoring (Markers)**: Marker khusus (Flora, Fauna, Stasiun) dengan pop-up detail yang diperluas.

### C. Dashboard, Analitik & Navigasi
*   **Statistik Real-time**: Luas area, indeks kerapatan, dll.
*   **Sistem Log Aktivitas**: Panel kanan mencatat kejadian di lapangan dan riwayat pembaruan data secara kronologis.
*   Display koordinat real-time yang mengikuti kursor.

## 3. Arsitektur Teknologi

Sesuai dengan preferensi desain Anda dan kebutuhan pemrosesan file GIS:

*   **Frontend**: React 19 + Vite (Moderen & Modular).
*   **Styling**: **Tailwind CSS 4.0** (Sesuai permintaan Anda dalam dokumen desain).
*   **GIS**: Leaflet.js dengan React-Leaflet.
*   **Backend (Rekomendasi)**: **Python (FastAPI)** + PostGIS (PostgreSQL).
    *   *Alasan*: Diperlukan untuk memproses file `.shp` and `.gpx` yang diunggah admin secara andal sebelum ditampilkan di frontend.

## 4. Open Questions & Konfirmasi

> [!IMPORTANT]
> Untuk memulai eksekusi, mohon konfirmasi hal berikut:

1.  **Backend**: Apakah Anda menyetujui penggunaan **Python (FastAPI)** untuk mendukung fitur upload SHP/GPX?
2.  **Penyimpanan**: Apakah foto disimpan lokal atau di Cloud (S3)?
3.  **UI Admin vs Publik**: Apakah Admin Panel akan berupa halaman terpisah (misal: `/admin`), atau menggunakan layout yang sama namun dengan fitur input yang hanya muncul jika user login sebagai admin?

---
*Catatan: Saya telah mengambil elemen estetika terbaik dari desain Anda (Warna, Layout 3 bagian, Basemap) dan mengintegrasikannya dengan kebutuhan fungsional (Upload file, History foto).*
