# Shopee Financial Tracker

A powerful browser extension to track and analyze your Shopee purchases with detailed financial reporting.

## Features

- 📊 **Comprehensive Financial Tracking**
  - Track product subtotals
  - Monitor shipping costs
  - Record shipping discounts
  - Track Shopee vouchers
  - Monitor service fees
  - Calculate total order amounts

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Dark/Light mode support
  - Draggable and resizable window
  - Real-time status updates
  - Beautiful notifications

- 📈 **Advanced Export Options**
  - CSV export with Excel optimization
  - Markdown export for documentation
  - Proper currency formatting
  - Organized data structure

- 🔄 **Smart Features**
  - Automatic order link extraction
  - Duplicate detection and removal
  - Smart retry mechanism
  - Popup handling
  - CAPTCHA detection

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Greasemonkey](https://www.greasespot.net/)

2. Click the "Raw" button on the script page to install

## Usage

1. **Enable Popups**
   - Chrome: 🔐 (Site Info) > Site Settings > Allow Popups
   - Firefox: ⓘ (Site Info) > Permissions > Allow Popups

2. **Extract Order Links**
   - Go to "My Orders" page
   - Click [🔗 Extract Order Links] to capture visible order URLs

3. **Remove Duplicates**
   - Click [🔍 Remove Duplicates] to clean up duplicated links

4. **Start Tracking**
   - Click [▶️ Start] to begin extracting order details
   - Wait for the process to complete

5. **Export Results**
   - [📊 Export CSV] for spreadsheet analysis
   - [📝 Export Markdown] for documentation

## UI Controls

- Press `Ctrl+M` to toggle UI visibility
- Click 🌙/☀️ to toggle dark/light mode
- Drag the header to move the window
- Resize using the bottom-right corner

## Tips

- Process 1-3 orders at a time to avoid detection
- Keep the tab active during processing
- Solve CAPTCHA manually if prompted
- CSV export uses semicolons (;) for better Excel compatibility
- Dark mode preference is saved between sessions

## Support

For issues, suggestions, or contributions:
- Create an issue on GitHub
- Contact the developer directly

## Credits

Developed by [Ryu-Sena](https://github.com/tukangcode) | IndoTech Community

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

# 🇮🇩 Shopee Financial Tracker (Bahasa Indonesia)
Skrip ini membantumu mencatat dan menganalisis semua transaksi belanja di Shopee secara otomatis, lengkap dengan laporan keuangan yang detail.
Fitur Unggulan

    📊 Rincian Keuangan Lengkap
    Pecah setiap pesanan untuk melihat:
        Harga asli produk
        Ongkos kirim & diskon ongkir
        Voucher yang dipakai
        Biaya layanan
        Total akhir yang kamu bayar

    🎨 Tampilan Modern & Nyaman
        Antarmuka yang bersih dan gampang dimengerti.
        Pilih mode terang atau gelap sesuai selera.
        Jendela bisa digeser dan diubah ukurannya.
        Pantau progres secara real-time dengan notifikasi yang jelas.

    📈 Ekspor Data Jadi Gampang
        Ekspor ke CSV yang langsung rapi saat dibuka di Excel.
        Ekspor ke Markdown untuk catatan atau dokumentasi.
        Format mata uang sudah disesuaikan (Rp).

    🔄 Fitur Pintar untuk Kemudahan
        Otomatis mengambil semua link pesanan dari halaman riwayat.
        Mendeteksi dan menghapus link yang ganda.
        Jika ada kendala, skrip akan mencoba ulang secara otomatis.
        Bisa menangani popup dan mendeteksi jika ada CAPTCHA.

Cara Pemasangan

    Install dulu userscript manager (pilih salah satu):
        Tampermonkey (Paling direkomendasikan)
        Violentmonkey
        Greasemonkey

    Klik tombol "Raw" di halaman skrip ini untuk memasangnya.

Langkah-langkah Pemakaian

    Izinkan Popup: Pastikan browser kamu mengizinkan popup dari situs Shopee.
        Biasanya ada ikon 🔐 atau ⓘ di address bar untuk mengatur ini.

    Ambil Link Pesanan: Buka halaman "Pesanan Saya" di Shopee, lalu klik tombol [🔗 Extract Order Links].

    Hapus Link Ganda: Klik [🔍 Remove Duplicates] untuk memastikan tidak ada data yang dobel.

    Mulai Lacak: Klik [▶️ Start] dan biarkan skrip bekerja mengambil detail setiap pesanan.

    Ekspor Hasil: Setelah selesai, simpan datamu dengan klik:
        [📊 Export CSV] untuk diolah di Excel/Sheets.
        [📝 Export Markdown] untuk dokumentasi.

Kontrol & Tips

    Tampilkan/Sembunyikan Jendela: Tekan Ctrl+M.
    Ganti Mode: Klik ikon 🌙 (gelap) atau ☀️ (terang).
    Biar Aman: Proses 1-3 pesanan dalam satu waktu untuk menghindari terdeteksi oleh sistem Shopee.
    Captcha: Jika muncul CAPTCHA, selesaikan secara manual agar proses bisa lanjut.
    Simpan Preferensi: Pilihan mode gelap/terang akan tersimpan otomatis.

Dukungan & Kredit

Punya masalah, ide, atau mau berkontribusi?

    Buat issue baru di laman GitHub.
    Hubungi langsung developernya.

Dikembangkan oleh Ryu-Sena | Komunitas IndoTech