# SQR-ID
(beta testing) Shoppe Quick Spending Report maker (title subject to change), this markdown generate with helo of Ai
# ( Beta )Shopee Financial Spending Report Maker (Final Stable + Ctrl+M Fix)

A Tampermonkey userscript to automate extraction and export of Shopee order history into CSV and Markdown reports. Useful for personal finance tracking, expense summaries, and data analysis of Shopee orders.

🔗 **[Lihat Versi Bahasa Indonesia](#versi-bahasa-indonesia)**
# Shopee Order Scraper Tampermonkey Script

## 📦 Files

- **Userscript(coming soon stable version):** [Download sqrbeta.js](#) <!-- TODO: Replace # with actual link -->
- **Video Tutorial:** Coming Soon!

## 📝 Table of Contents

1. [Features](#features)
2. [Usage Instructions](#usage-instructions)
3. [Notes](#notes)
4. [Disclaimer](#disclaimer)
5. [🇮🇩 Baca Versi Bahasa Indonesia](#versi-bahasa-indonesia)

## 🚀 Features

- Extract Shopee order data
- Export to Markdown or CSV
- Simple UI buttons
- Optional data cleaning
- Adjustable scraping delay

## 🎯 Usage Instructions

1. **Install Tampermonkey Extension** in your browser.
2. To install this userscript, either:  
   - Click the `sqrbeta.js` file and then click **"Download Raw"** — Tampermonkey will show an installation prompt automatically.  
   - Or, manually create a **New Script** in Tampermonkey, copy the code from `sqrbeta.js`, paste into the Tampermonkey script editor, and save.
3. Open **Shopee Order Page** (`https://shopee.co.id/user/purchase/order`).
4. Make sure you **scroll down** to fully load the order history content (especially "Completed" orders) as needed. Then click **Extract Links**.
5. Once links are extracted, click **Start** and let the script run.  
   **Tips:** Play low-volume music/video to prevent your computer from sleeping during scraping.  
   You can also adjust the **delay mechanism** by editing the delay values directly in the script file (`setTimeout`).
6. When done, export your data as **Markdown or CSV**.
7. (Optional) Click **Clean** to clear all collected data from the table.

## 📝 Notes

- Only works on Shopee Indonesia (`shopee.co.id`).
- Shopee website structure may change; script may break if Shopee updates its DOM.
- For large order history, scraping might take several minutes.

## ⚠️ Disclaimer

This script is for personal use. Use responsibly.  
We are not affiliated with Shopee in any way.

---

# 🇮🇩 Versi Bahasa Indonesia

## 📦 File

- **Userscript:** [Unduh sqrbeta.js](#) <!-- TODO: Replace # with actual link -->
- **Video Tutorial:** Segera Hadir!

## 📝 Daftar Isi

1. [Fitur](#fitur)
2. [Cara Pakai](#cara-pakai)
3. [Catatan](#catatan)
4. [Disclaimer](#disclaimer-1)

## 🚀 Fitur

- Ekstrak data pesanan Shopee
- Ekspor ke format Markdown atau CSV
- Tombol UI sederhana
- Fitur pembersihan data opsional
- Mekanisme delay yang dapat diatur

## 🎯 Cara Pakai

1. **Pasang ekstensi Tampermonkey** di browser Anda.
2. Untuk memasang userscript ini, ada dua cara:  
   - Klik file `sqrbeta.js` lalu klik **"Download Raw"**, maka akan muncul prompt instalasi otomatis dari Tampermonkey.  
   - Atau buat **New Script** di Tampermonkey, salin seluruh kode dari `sqrbeta.js`, tempel ke editor script Tampermonkey, lalu simpan.
3. Buka **halaman pesanan Shopee** (`https://shopee.co.id/user/purchase/order`).
4. Pastikan Anda **scroll ke bawah** hingga seluruh riwayat pesanan (terutama yang sudah selesai) tampil di halaman. Setelah itu, klik **Extract Links**.
5. Setelah link berhasil diekstrak, klik **Start** dan biarkan script berjalan otomatis.  
   **Tips:** Putar musik MP3 atau video bersuara kecil untuk mencegah komputer masuk mode sleep saat proses scraping.  
   Anda juga bisa mengatur **delay mekanisme** dengan mengedit nilai delay langsung di dalam file script (`setTimeout`).
6. Setelah selesai, ekspor data Anda ke format **Markdown atau CSV**.
7. (Opsional) Klik **Clean** untuk membersihkan semua data dari tabel.

## 📝 Catatan

- Hanya berfungsi di Shopee Indonesia (`shopee.co.id`).
- Jika Shopee mengubah struktur website, script ini mungkin tidak berfungsi.
- Untuk riwayat pesanan yang besar, proses scraping bisa memakan waktu beberapa menit.

## ⚠️ Disclaimer

Script ini hanya untuk penggunaan pribadi. Gunakan dengan bijak.  
Kami tidak berafiliasi dengan Shopee dalam bentuk apapun.
