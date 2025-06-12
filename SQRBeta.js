// ==UserScript==
// @name         Shopee Financial Spending Report Maker (Final Stable + Ctrl+M Fix)
// @namespace    http://tampermonkey.net/
// @version      9.95
// @description  Fixed UI toggle, deduplication, and syntax errors
// @author       Ryu-Sena (IndoTech Community)
// @match        https://shopee.co.id/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        PAGE_LOAD_TIMEOUT: 20000,
        BETWEEN_DELAY: 10000,
        MAX_RETRIES: 2,
        UI_TOGGLE_KEY: 'KeyM'
    };

    // Global State
    let isParsing = false;
    let currentEntry = 1;
    let parsedData = [];
    let extractedUrls = new Set(); // Prevents duplicate extractions
    let isUIHidden = false;

    // === Inject UI Styles ===
    const style = document.createElement('style');
    style.textContent = `
#parser-ui {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 999999;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    padding: 16px;
    width: 90vw;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: ${isUIHidden ? 'none' : 'block'};
}
.parser-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.parser-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
.parser-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1a1a1a;
}
.parser-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
}
.parser-table th, .parser-table td {
    border: 1px solid #e5e7eb;
    padding: 12px;
    text-align: left;
    vertical-align: top;
}
.parser-table th {
    background: #f9fafb;
    font-weight: 600;
    white-space: nowrap;
}
.parser-table tr:nth-child(even) {
    background: #f3f4f6;
}
.parser-table tr:hover {
    background: #e5e7eb;
}
.parser-controls {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.parser-textarea {
    width: 100%;
    height: 150px;
    margin-top: 12px;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
    resize: vertical;
    font-family: monospace;
}
.btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
}
.btn-green { background: #22c55e; color: white; }
.btn-red { background: #ef4444; color: white; }
.btn-blue { background: #3b82f6; color: white; }
.btn-yellow { background: #f59e0b; color: white; }
.btn-purple { background: #8b5cf6; color: white; }
.btn-gray { background: #9ca3af; color: white; }
.parser-status {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 8px;
}
.credit {
    font-size: 0.75rem;
    color: #9ca3af;
    text-align: center;
    margin-top: 12px;
    display: block;
}
.guide-modal {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999999;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    padding: 24px;
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;
    display: none;
    flex-direction: column;
    gap: 16px;
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modal-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
}
.modal-content {
    white-space: pre-wrap;
    font-size: 0.875rem;
    color: #374151;
}
.modal-close {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 4px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}
`;
    document.head.appendChild(style);

    // === UI HTML ===
    const uiHTML = `
        <div id="parser-ui">
            <div class="parser-container">
                <div class="parser-header">
                    <div class="parser-title">📦 Shopee Order Parser v9</div>
                    <button class="btn btn-gray" id="guide-btn">📘 Guide</button>
                </div>
                <textarea id="url-input" placeholder="Paste 1-3 order links (one per line)" class="parser-textarea"></textarea>
                <div class="parser-controls">
                    <button class="btn btn-green" id="start-btn">Start</button>
                    <button class="btn btn-red" id="stop-btn" disabled>Stop</button>
                    <button class="btn btn-yellow" id="clear-btn">Clear</button>
                    <button class="btn btn-gray" id="remove-dupes-btn">🗑️ Remove Duplicates</button>
                    <button class="btn btn-blue" id="csv-btn">Export CSV</button>
                    <button class="btn btn-purple" id="md-btn">Export Markdown</button>
                    <button class="btn btn-gray" id="extract-btn">🔍 Extract Order Links</button>
                </div>
                <div class="parser-status" id="status">Ready</div>
                <table class="parser-table" id="results-table">
                    <thead>
                        <tr>
                            <th>Entry</th>
                            <th>Shop</th>
                            <th>Order Date</th>
                            <th>Item</th>
                            <th>Final Price</th>
                            <th>Original Price</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody id="results-body"></tbody>
                </table>
                <div class="credit">Developed by <a href="https://github.com/tukangcode"  target="_blank" style="color: #3b82f6; text-decoration: underline;">Ryu-Sena</a> | IndoTech Community</div>
            </div>
            <div class="guide-modal" id="guide-modal">
                <div class="modal-header">
                    <div class="modal-title">📘 User Guide</div>
                    <button class="modal-close" id="modal-close">✕</button>
                </div>
                <div class="modal-content">📘 How to Use:
1. Enable Popups for Shopee:
   - Chrome: 🔐 (Site Info) > Site Settings > Allow Popups
   - Firefox: ⓘ (Site Info) > Permissions > Allow Popups

2. Extract Order Links:
   - Go to "My Orders" page.
   - Click [🔍 Extract Order Links] to capture visible order URLs.

3. Ensure No Duplicate Links:
   - Click [🗑️ Remove Duplicates] to clean up duplicated links.

4. Start Parsing:
   - Click [Start] to begin extracting order details.
   - Wait patiently; progress will appear in the status.

5. If CAPTCHA Appears:
   - Script will pause for 60 seconds to let you solve CAPTCHA manually.
   - After solving, let tab for 10 second script will continue last progrres
   - Parsing will automatically resume.

7. Export Results:
   - After parsing, export the result via:
     - [Export CSV] for spreadsheet (Excel, etc).
     - [Export Markdown] for clean text format.

8. Close UI:
   - Press Ctrl+M anytime to toggle the UI visibility.

ℹ️ Notes:
- Avoid opening more than 3 order links manually to prevent Shopee detection.
- Parsing 200+ orders usually does NOT trigger CAPTCHA but stay alert just in case.
                <div class="modal-footer">
                    <button class="modal-close" id="modal-ok">OK</button>
                </div>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = uiHTML;
    document.body.appendChild(div);

    // === DOM Elements ===
    const parserUI = document.getElementById('parser-ui');
    const urlInput = document.getElementById('url-input');
    const statusText = document.getElementById('status');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const clearBtn = document.getElementById('clear-btn');
    const csvBtn = document.getElementById('csv-btn');
    const mdBtn = document.getElementById('md-btn');
    const extractBtn = document.getElementById('extract-btn');
    const removeDupesBtn = document.getElementById('remove-dupes-btn');
    const resultsBody = document.getElementById('results-body');
    const guideBtn = document.getElementById('guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    // === Helper Functions ===
    function updateStatus(text) {
        statusText.textContent = text;
    }

    function extractOrderNumber(url) {
        const pattern = '/user/purchase/order/';
        const startIndex = url.indexOf(pattern);
        if (startIndex === -1) return null;
        const idStart = startIndex + pattern.length;
        const idEnd = url.indexOf('?', idStart);
        const rawId = idEnd !== -1 ? url.substring(idStart, idEnd) : url.substring(idStart);
        return /^\d+$/.test(rawId) ? rawId : null;
    }

    function removeDuplicatesFromInput() {
        const urls = urlInput.value
            .split('\n')
            .map(u => u.trim())
            .filter(Boolean);

        const seen = new Set();
        const uniqueUrls = [];

        for (const url of urls) {
            const orderNumber = extractOrderNumber(url);
            if (orderNumber && !seen.has(orderNumber)) {
                seen.add(orderNumber);
                uniqueUrls.push(url);
            }
        }

        urlInput.value = uniqueUrls.join('\n');
        updateStatus(`✅ Removed ${urls.length - uniqueUrls.length} duplicate(s)`);
    }

    function extractOrderLinks() {
        const links = Array.from(document.querySelectorAll('a[href^="/user/purchase/order/"]'))
            .map(a => `https://shopee.co.id${a.getAttribute('href')}`);

        const seen = new Set();
        const uniqueLinks = [];

        for (const url of links) {
            const orderNumber = extractOrderNumber(url);
            if (orderNumber && !seen.has(orderNumber)) {
                seen.add(orderNumber);
                uniqueLinks.push(url);
            }
        }

        if (uniqueLinks.length > 0) {
            const existingUrls = urlInput.value
                .split('\n')
                .map(u => u.trim())
                .filter(Boolean);

            urlInput.value = [...existingUrls, ...uniqueLinks].join('\n');
            updateStatus(`✅ Found ${uniqueLinks.length} new order links`);
        } else {
            updateStatus("⚠️ No new order links found");
        }
    }

    function addResult(result) {
        if (!result || !result.items.length) return;

        result.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.Entry}</td>
                <td>${result.Shop}</td>
                <td>${result['Order Date']}</td>
                <td>${item.name}</td>
                <td>${item.finalPrice}</td>
                <td>${item.originalPrice || '-'}</td>
                <td><a href="${result.URL}" target="_blank">${result.URL}</a></td>
            `;
            resultsBody.appendChild(row);
        });

        parsedData.push(result);
    }

    function clearResults() {
        while (resultsBody.firstChild) {
            resultsBody.removeChild(resultsBody.firstChild);
        }
        parsedData = [];
        updateStatus("🧹 Cleared");
    }

    function exportData(format) {
        if (!parsedData.length) {
            alert("⚠️ No data to export!");
            return;
        }
        if (format === 'csv') {
            exportToCSV(parsedData);
        } else {
            exportToMarkdown(parsedData);
        }
    }

    function exportToCSV(data) {
        const headers = ['Entry','Shop','Order Date','Item','Final Price','Original Price','URL'];
        let csv = headers.join(',') + '\n';
        data.forEach(order => {
            order.items.forEach(item => {
                csv += [
                    order.Entry,
                    order.Shop,
                    order['Order Date'],
                    item.name,
                    item.finalPrice,
                    item.originalPrice || '-',
                    `"${order.URL}"`
                ].join(',') + '\n';
            });
        });
        downloadFile(csv, 'shopee_orders.csv');
    }

    function exportToMarkdown(data) {
        const headers = ['Entry','Shop','Order Date','Item','Final Price','Original Price','URL'];
        let md = '# Shopee Orders\n';
        md += headers.map(h => `**${h}**`).join(' | ') + '\n';
        md += headers.map(() => '---').join(' | ') + '\n';
        data.forEach(order => {
            order.items.forEach(item => {
                md += [
                    order.Entry,
                    order.Shop,
                    order['Order Date'],
                    item.name,
                    item.finalPrice,
                    item.originalPrice || '-',
                    order.URL
                ].join(' | ') + '\n';
            });
        });
        downloadFile(md, 'shopee_orders.md');
    }

    function downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function cancellableDelay(ms) {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (!isParsing) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 500);

            const timeout = setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, ms);
        });
    }

    function waitForPageLoad(win) {
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (!isParsing || !win || !win.document) {
                    clearInterval(checkInterval);
                    win?.close();
                    return;
                }

                if (win.document.readyState === 'complete') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 1000);
        });
    }

    async function scrapeOrderDetail(url, entryNumber) {
        let retryCount = 0;
        while (retryCount <= CONFIG.MAX_RETRIES && isParsing) {
            const win = window.open(url, '_blank');
            if (!win) {
                alert("❌ Popup blocked - Enable popups in browser settings");
                return null;
            }

            try {
                await waitForPageLoad(win);
                if (!isParsing) {
                    win.close();
                    return null;
                }

                await cancellableDelay(5000);
                const doc = win.document;

                const shopName = doc.querySelector('.UDaMW3')?.textContent.trim() || 'NOT FOUND';
                const orderDate = doc.querySelector('.stepper__step-date')?.textContent.trim() || 'NOT FOUND';

                const itemElements = doc.querySelectorAll('a.mZ1OWk');
                const items = [];

                itemElements.forEach(item => {
                    const name = item.querySelector('.DWVWOJ')?.textContent.trim() || 'NOT FOUND';
                    const quantity = item.querySelector('.j3I_Nh')?.textContent.trim() || 'x1';
                    const finalPrice = item.querySelector('.YRp1mm .nW_6Oi')?.textContent.trim() || 'NOT FOUND';
                    const originalPrice = item.querySelector('.q6Gzj5')?.textContent.trim() || 'NOT FOUND';

                    if (name !== 'NOT FOUND') {
                        items.push({
                            name: `${name} ${quantity}`,
                            finalPrice,
                            originalPrice
                        });
                    }
                });

                win.close();

                if (items.length === 0) {
                    retryCount++;
                    if (retryCount > CONFIG.MAX_RETRIES) return null;
                    updateStatus(`🔁 Retrying #${retryCount}`);
                    await cancellableDelay(3000);
                    continue;
                }

                return {
                    Entry: entryNumber,
                    Shop: shopName,
                    'Order Date': orderDate,
                    items,
                    URL: url
                };
            } catch (err) {
                win.close();
                retryCount++;
                if (retryCount > CONFIG.MAX_RETRIES) return null;
                updateStatus(`🔁 Retrying #${retryCount}`);
                await cancellableDelay(3000);
            }
        }
        return null;
    }

    async function run() {
        isParsing = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        updateStatus('🚀 Starting...');
        currentEntry = 1;

        const urls = urlInput.value
            .split('\n')
            .map(u => u.trim())
            .filter(u => u.startsWith('https://shopee.co.id'));

        if (!urls.length) {
            alert("⚠️ No valid URLs found");
            resetUI();
            return;
        }

        clearResults();

        for (const url of urls) {
            if (!isParsing) break;
            updateStatus('Processing #' + currentEntry);
            const result = await scrapeOrderDetail(url, currentEntry);
            if (result && isParsing) {
                addResult(result);
                currentEntry++;
                if (urls.indexOf(url) < urls.length - 1) {
                    updateStatus(`⏳ Waiting ${CONFIG.BETWEEN_DELAY / 1000}s`);
                    await cancellableDelay(CONFIG.BETWEEN_DELAY);
                }
            }
        }

        if (isParsing) {
            updateStatus("✅ All done!");
        } else {
            updateStatus("🛑 Stopped");
        }

        resetUI();
    }

    function resetUI() {
        isParsing = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    function toggleUIVisibility() {
        isUIHidden = !isUIHidden;
        parserUI.style.display = isUIHidden ? 'none' : 'block';
    }

    // === Event Listeners ===
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.code === CONFIG.UI_TOGGLE_KEY) {
            e.preventDefault();
            toggleUIVisibility();
        }
    });

    startBtn.addEventListener('click', () => {
        if (!isParsing) run();
    });

    stopBtn.addEventListener('click', () => {
        isParsing = false;
        updateStatus("🛑 Stopped");
    });

    clearBtn.addEventListener('click', () => {
        if (confirm("Clear all data?")) {
            clearResults();
            updateStatus("🧹 Cleared");
        }
    });

    csvBtn.addEventListener('click', () => exportData('csv'));
    mdBtn.addEventListener('click', () => exportData('markdown'));
    extractBtn.addEventListener('click', extractOrderLinks);
    removeDupesBtn.addEventListener('click', removeDuplicatesFromInput);

    guideBtn.addEventListener('click', () => {
        guideModal.style.display = 'flex';
    });

    [modalClose, modalOk].forEach(btn => {
        btn.addEventListener('click', () => {
            guideModal.style.display = 'none';
        });
    });

    // === Initialize ===
    window.addEventListener('load', () => {
        updateStatus("Ready");
    });

})();
