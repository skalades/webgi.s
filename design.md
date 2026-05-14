# Dokumen Desain Sistem: ForestGuard GIS

Dokumen ini merinci arsitektur, struktur data, dan komponen sistem untuk **ForestGuard GIS**. Desain ini dibuat dengan prinsip **scalable**, **modular**, dan **mudah di-maintenance** sesuai dengan aturan pengembangan.

---

## 1. Arsitektur Teknologi (Stack Terpilih)

Untuk memenuhi kebutuhan WebGIS dinamis dengan pemrosesan file kompleks (SHP, KML, GPX), berikut adalah stack teknologi yang dipilih:

### Frontend (Modular & Reactive)
*   **Framework**: **React 19** + **Vite** (Sangat cepat dan mendukung ekosistem modern).
*   **Styling**: **Tailwind CSS 4.0** (Sesuai dengan spesifikasi desain yang Anda ajukan).
*   **Peta (GIS)**: **Leaflet.js** + **React-Leaflet** (Ringan, modular, dan memiliki banyak plugin).
*   **Animasi**: **Framer Motion** (Untuk mikro-animasi yang premium).
*   **Icons**: **Lucide React**.

### Backend (GIS-Heavy & Performa Tinggi)
*   **Framework**: **Python (FastAPI)**
    *   *Alasan*: FastAPI sangat cepat (asynchronous) dan Python memiliki ekosistem GIS terbaik di dunia (`geopandas`, `shapely`, `fiona`) untuk memproses file `.shp` dan `.gpx`.
*   **ORM**: **SQLAlchemy** dengan **GeoAlchemy2** (Untuk mendukung tipe data spasial PostGIS).

### Database (Scalable Spatial Data)
*   **Database**: **PostgreSQL** dengan ekstensi **PostGIS**.
    *   *Alasan*: Standar emas untuk database spasial open-source.

---

## 2. Struktur Direktori (Modular & Scalable)

Struktur ini memisahkan perhatian (separation of concerns) untuk memudahkan maintenance.

```text
forestguard-gis/
├── backend/                  # Python FastAPI Backend
│   ├── app/
│   │   ├── api/              # API Endpoints (v1)
│   │   │   ├── endpoints/
│   │   │   │   ├── features.py   # CRUD Data Spasial
│   │   │   │   ├── photos.py     # Upload & Riwayat Foto
│   │   │   │   └── logs.py       # Aktivitas Log
│   │   │   └── router.py
│   │   ├── core/             # Konfigurasi & Security
│   │   ├── db/               # Database Session & Migrasi
│   │   ├── models/           # SQLAlchemy & GeoAlchemy Models
│   │   ├── schemas/          # Pydantic Schemas (Validasi)
│   │   └── services/         # Logika Bisnis (Parser SHP, KML, GPX)
│   ├── tests/                # Automated Tests
│   └── requirements.txt
│
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── assets/           # Gambar, Gaya Global
│   │   ├── components/       # Component Reusable
│   │   │   ├── common/       # Button, Input, Modal (Gaya Custom)
│   │   │   ├── layout/       # Sidebar, Header, LogPanel
│   │   │   └── map/          # LeafletMap, CustomMarkers, Popups
│   │   ├── hooks/            # Custom Hooks (useMap, useFetch)
│   │   ├── services/         # API Client (Axios)
│   │   ├── store/            # State Management (Zustand/Context)
│   │   ├── styles/           # Desain Tokens (Colors, Typography)
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
```

---

## 3. Struktur Data (PostGIS)

Untuk mendukung riwayat foto pada objek yang sama, kita menggunakan relasi One-to-Many.

### Tabel 1: `spatial_features` (Master Data)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Identifier unik. |
| `name` | VARCHAR | Nama objek/blok. |
| `type` | ENUM | `POINT`, `LINESTRING`, `POLYGON`. |
| `geom` | GEOMETRY | Data spasial (PostGIS). |
| `attributes` | JSONB | Data dinamis (luas, diameter pohon, dll). |
| `created_at` | TIMESTAMP | Waktu pembuatan. |

### Tabel 2: `feature_photos` (History Data)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Identifier unik. |
| `feature_id` | UUID (FK) | Relasi ke `spatial_features`. |
| `photo_url` | VARCHAR | URL penyimpanan foto. |
| `description` | TEXT | Keterangan kondisi saat foto diambil. |
| `taken_at` | TIMESTAMP | Waktu pengambilan foto/update. |
| `created_at` | TIMESTAMP | Waktu upload. |

---

## 4. Desain Antarmuka (UI System)

Mengikuti tema **Geometric Balance** yang Anda usulkan:

### Token Desain (Tailwind Config)
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'forest-dark': '#0A110B',      // Background Utama
      'forest-panel': '#0F1A12',     // Background Panel
      'emerald-glow': '#10B981',    // Aksen & Hover
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'], // Untuk Koordinat & Telemetri
    }
  }
}
```

### Komponen Utama (3-Column Layout)
1.  **Left Sidebar (`Sidebar.jsx`)**:
    *   Form Input Data (Upload SHP/KML/GPX).
    *   Statistik Kawasan.
2.  **Center Viewport (`MapArea.jsx`)**:
    *   Peta Leaflet dengan grid custom.
    *   Pop-up interaktif yang menampilkan data dan ringkasan foto terbaru.
3.  **Right Panel (`LogPanel.jsx`)**:
    *   Daftar aktivitas kronologis.
    *   Detail riwayat foto (muncul saat objek di peta diklik).

---

## 5. Rencana Skalabilitas & Maintenance
*   **Lazy Loading**: Komponen peta dan data GeoJSON yang besar akan dimuat secara dinamis (lazy loaded) untuk menjaga kecepatan aplikasi.
*   **GeoJSON Tiling**: Jika data spasial menjadi sangat besar di masa depan, sistem akan ditingkatkan untuk mendukung *Vector Tiles* (MVT) menggunakan PostGIS.
*   **Dockerization**: Seluruh sistem (Frontend, Backend, DB) akan di-containerize menggunakan Docker agar mudah dideploy di berbagai server.
