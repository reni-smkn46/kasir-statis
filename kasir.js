document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".order-image");
    const orderModal = document.getElementById("orderModal");
    const modalTitle = document.getElementById("modalTitle");
    const quantityInput = document.getElementById("quantity");
    const orderBody = document.getElementById("orderBody");
    const totalPriceElement = document.getElementById("totalPrice");

    let currentProduct = { name: "", price: 0 };

    images.forEach(image => {
        image.addEventListener("click", function() {
            currentProduct.name = this.dataset.name;
            currentProduct.price = parseInt(this.dataset.price);
            modalTitle.textContent = `Pesan ${currentProduct.name}`;
            quantityInput.value = 1;
            orderModal.classList.remove("hidden");
        });
    });

    document.getElementById("closeModal").addEventListener("click", function() {
        orderModal.classList.add("hidden");
    });

    document.getElementById("increaseQty").addEventListener("click", function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById("decreaseQty").addEventListener("click", function() {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    document.getElementById("addToOrder").addEventListener("click", function() {
        const qty = parseInt(quantityInput.value);
        const subtotal = qty * currentProduct.price;
        
        // Menambahkan baris baru ke tabel order
        const row = document.createElement("tr");
        row.classList.add("text-center");
        row.innerHTML = `
            <td class="px-2 py-1 border">${orderBody.children.length + 1}</td>
            <td class="px-2 py-1 border text-left">${currentProduct.name}</td>
            <td class="px-2 py-1 border">${qty}</td>
            <td class="px-2 py-1 border">${currentProduct.price.toLocaleString()}</td>
            <td class="px-2 py-1 border">${subtotal.toLocaleString()}</td>
        `;
        orderBody.appendChild(row);

        // Mengupdate total harga
        updateTotalPrice();

        // Sembunyikan modal
        orderModal.classList.add("hidden");
    });

    function updateTotalPrice() {
        let total = 0;
        const rows = orderBody.querySelectorAll("tr");
        rows.forEach(row => {
            const subtotal = parseInt(row.children[4].textContent.replace(/,/g, ''));
            total += subtotal;
        });
        totalPriceElement.textContent = `Rp ${total.toLocaleString()}`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Referensi elemen-elemen yang diperlukan
    const checkoutButton = document.querySelector(".bg-indigo-500");
    const receiptModal = document.getElementById("receiptModal");
    const receiptBody = document.getElementById("receiptBody");
    const receiptTotal = document.getElementById("receiptTotal");
    const paymentMethodDisplay = document.getElementById("paymentMethodDisplay");
    const closeReceiptButton = document.getElementById("closeReceipt");

    let selectedPaymentMethod = ""; // Variabel untuk menyimpan metode pembayaran yang dipilih

    // Event listener untuk metode pembayaran
    const paymentButtons = document.querySelectorAll(".payment-method-button");
    paymentButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Simpan metode pembayaran yang dipilih
            selectedPaymentMethod = this.textContent;
            console.log("Metode pembayaran dipilih:", selectedPaymentMethod); // Debugging

            // Tambahkan kelas aktif untuk menunjukkan tombol yang dipilih
            paymentButtons.forEach(btn => btn.classList.remove("bg-gray-200", "text-blue-500"));
            this.classList.add("bg-gray-200", "text-blue-500");
        });
    });

    // Fungsi untuk menampilkan modal struk dan mengisi data
    checkoutButton.addEventListener("click", function() {
        // Bersihkan data struk sebelumnya
        receiptBody.innerHTML = "";

        // Ambil data dari tabel pesanan
        let total = 0;
        const rows = orderBody.querySelectorAll("tr");
        rows.forEach(row => {
            const name = row.children[1].textContent;
            const qty = row.children[2].textContent;
            const price = row.children[3].textContent;
            const subtotal = row.children[4].textContent;
            total += parseInt(subtotal.replace(/,/g, ''));

            // Tambahkan data ke struk
            const receiptRow = document.createElement("tr");
            receiptRow.innerHTML = `
                <td class="border px-2 py-1">${name}</td>
                <td class="border px-2 py-1">${qty}</td>
                <td class="border px-2 py-1">${price}</td>
                <td class="border px-2 py-1">${subtotal}</td>
            `;
            receiptBody.appendChild(receiptRow);
        });

        // Tampilkan total pada struk
        receiptTotal.textContent = `Rp ${total.toLocaleString()}`;

        // Tampilkan metode pembayaran yang dipilih
        paymentMethodDisplay.textContent = selectedPaymentMethod || "-";
        console.log("Metode pembayaran pada struk:", paymentMethodDisplay.textContent); // Debugging

        // Tampilkan modal struk
        receiptModal.classList.remove("hidden");
    });

    // Tombol untuk menutup modal struk dan mereset semua data
    closeReceiptButton.addEventListener("click", function() {
        // Sembunyikan modal struk
        receiptModal.classList.add("hidden");
    
    });
    
});

