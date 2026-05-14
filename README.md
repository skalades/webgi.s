# ForestGuard GIS 🌲🛰️

ForestGuard GIS adalah sistem informasi geografis (WebGIS) modern yang dirancang untuk pemantauan kawasan hutan secara dinamis. Sistem ini menggabungkan estetika desain **Geometric Balance** dengan fitur pemrosesan data spasial yang kuat.

## ✨ Fitur Utama

- **Manajemen Data Spasial**: Dukungan unggah file multi-format (**SHP, KML, GPX**) dan input koordinat manual.
- **Sistem Riwayat Foto**: Melacak kondisi lapangan secara kronologis melalui galeri foto historis pada setiap objek spasial.
- **Visualisasi High-Fidelity**: Antarmuka peta berbasis Leaflet dengan dual basemap control (Satellite & Topographic).
- **Analitik Real-time**: Statistik otomatis untuk luas area, indeks kerapatan, dan log aktivitas lapangan.
- **Desain Premium**: Tema *Digital Forestry* dengan palet warna gelap (`#0A110B`) dan aksen Emerald Green.

## 🚀 Arsitektur Teknologi

Sistem ini dibangun dengan pendekatan modular dan scalable:

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4.0
- **Peta**: Leaflet.js + React-Leaflet
- **Animasi**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: Python (FastAPI)
- **Geospasial**: GeoPandas, Shapely, Fiona (untuk parsing file GIS)
- **ORM**: SQLAlchemy + GeoAlchemy2
- **Database**: PostgreSQL + PostGIS

## 📁 Struktur Proyek

```text
webgis/
├── backend/          # FastAPI Backend & GIS Processing
├── frontend/         # React 19 Frontend
├── design.md         # Spesifikasi Desain Sistem
└── rencana_perencanaan.md  # Dokumen Perencanaan Fitur
```

## 🛠️ Instalasi & Pengembangan

### Prasyarat
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL + PostGIS

### Backend Setup
1. Masuk ke direktori `backend`
2. Buat virtual environment: `python -m venv venv`
3. Aktifkan venv: `source venv/bin/activate` (Linux/Mac) atau `.\venv\Scripts\activate` (Windows)
4. Instal dependensi: `pip install -r requirements.txt`
5. Jalankan server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Masuk ke direktori `frontend`
2. Instal dependensi: `npm install`
3. Jalankan development server: `npm run dev`

## 🎨 Filosofi Desain: Geometric Balance
Aplikasi ini mengedepankan keseimbangan antara fungsionalitas teknis dan estetika visual. Penggunaan grid geometris, font monospaced untuk data teknis, dan mikro-animasi halus memberikan pengalaman pengguna yang profesional dan modern.

---
Dikembangkan dengan ❤️ untuk kelestarian hutan.
