function greetings(dom) {
    const hour = new Date().getHours();
    let message;
    
    if (hour < 12) {
        message = "Selamat Pagi! Selamat datang di Dashboard!";
    } else if (hour < 15) {
        message = "Selamat Siang! Selamat datang di Dashboard!";
    } else {
        message = "Selamat Sore! Selamat datang di Dashboard!";
    }
    
    dom.innerHTML = message;
}

function actionLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Silakan masukkan email dan password Anda.');
        return;
    }

    if (email !== "admin@admin.com" || password !== "admin123") {
        loginError();
        return;
    }

    alert('Login berhasil! Selamat datang, Admin!');
    window.location.href = 'dashboard.html';
}

function loginError() {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.style.display = 'block';
}

function loadBahanAjar(dom) {
    const bahanAjarList = window.dataBahanAjar || [];
    let html = '';
    bahanAjarList.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.namaBarang}</td>
                <td>${item.stok}</td>
                <td>${item.stok > 0 ? 'Tersedia' : 'Habis'}</td>
            </tr>
        `;
    });
    dom.innerHTML = html;
}

function searchTracking(event) {
    event.preventDefault();
    const nomorDO = document.getElementById('searchQuery').value.trim();
    const message = document.getElementById('searchMessage');
    const summary = document.getElementById('trackingSummary');
    const tableBody = document.getElementById('trackingTableBody');

    message.style.display = 'none';
    summary.style.display = 'none';
    tableBody.innerHTML = '';

    if (!nomorDO) {
        message.textContent = 'Silakan masukkan nomor DO.';
        message.style.display = 'block';
        tableBody.innerHTML = '<tr><td colspan="2" class="text-danger">Silakan masukkan nomor DO.</td></tr>';
        return;
    }

    const tracking = (window.dataTracking || {})[nomorDO];

    if (!tracking) {
        message.textContent = 'Nomor DO tidak ditemukan.';
        message.style.display = 'block';
        tableBody.innerHTML = '<tr><td colspan="2" class="text-danger">Nomor DO tidak ditemukan.</td></tr>';
        return;
    }

    summary.style.display = 'block';
    summary.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3>Informasi Tracking</h3>
                <p><strong>Nomor DO:</strong> ${tracking.nomorDO}</p>
                <p><strong>Nama:</strong> ${tracking.nama}</p>
                <p><strong>Status:</strong> ${tracking.status}</p>
                <p><strong>Ekspedisi:</strong> ${tracking.ekspedisi}</p>
                <p><strong>Tanggal Kirim:</strong> ${tracking.tanggalKirim}</p>
                <p><strong>Paket:</strong> ${tracking.paket}</p>
                <p><strong>Total:</strong> ${tracking.total}</p>
            </div>
        </div>
    `;

    if (!tracking.perjalanan || tracking.perjalanan.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="2" class="text-secondary">Tidak ada data perjalanan</td></tr>';
        return;
    }

    tableBody.innerHTML = tracking.perjalanan.map((item) => `
        <tr>
            <td>${item.waktu}</td>
            <td>${item.keterangan}</td>
        </tr>
    `).join('');
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Navbar dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown toggle for mobile
    const dropdownToggles = document.querySelectorAll('.navbar-link--dropdown');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other dropdowns
            document.querySelectorAll('.navbar-dropdown.active').forEach(dropdown => {
                if (dropdown !== this.nextElementSibling) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            const dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('navbar-dropdown')) {
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-item--dropdown')) {
            document.querySelectorAll('.navbar-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});


