function menuHaditsTampil() {
  container.innerHTML = `
    <div class="hadits-index">
      <div class="btn-kembali">kembali</div>
      <p id="nama-fitur">Hadits al-quran</p>
      <div class="form-hadits">
        <div class="container-input">
          <div class="select-menu select-parawi">
            <div class="select-btn">
              <span class="sBtn-text">-Pilih Parawi</span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul id="pilihan-hadits" class="options">

              <div class="textWrapper">
                <p class="text">Loading...</p>
                <div class="invertbox"></div>
              </div>

            </ul>
          </div>

          <div class="select-menu select-nomor">
            <div class="select-btn">
              <input type="number" id="nomor-hadits" placeholder="nomor hadits">
            </div>
          </div>
        </div>
        <button class="btn-cari-hadits dark-background dark-color">Cari hadits</button>
      </div>

      <!-- Tombol di luar form untuk mencegah refresh -->
      <div class="container-jawaban"></div>
    </div>
  `;

  const containerHadits = document.querySelector(".container-jawaban");
  const nomorHaditsInput = document.querySelector("#nomor-hadits");
  const containerPilihanHadits = document.querySelector("#pilihan-hadits");

  let selectedParawiValue = "";  // Menyimpan nilai asli untuk parameter API

  function cariHadits() {
    const nomorHadits = nomorHaditsInput.value;

    if (selectedParawiValue && nomorHadits) {
      // Buat URL API dinamis
      const apiRequestHadits = `https://api.hadith.gading.dev/books/${selectedParawiValue}/${nomorHadits}`;
      console.log(apiRequestHadits);

      fetch(apiRequestHadits)
        .then((response) => response.json())
        .then((data) => {
          const namaParawi = data.data.name;
          const nomorHadits = data.data.contents.number;
          const haditsLatin = data.data.contents.id;
          const haditsArab = data.data.contents.arab;

          // Tambahkan HTML hadits ke dalam containerHadits
          containerHadits.innerHTML = `
            <div class="container-hadits">
              <p class="detail-hadits">${namaParawi} || ${nomorHadits}</p>
              <p class="hadits-arab">${haditsArab}</p>
              <p class="hadits-latin">${haditsLatin}</p>
            </div>
          `;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          containerHadits.innerHTML = `<p class="error-message">Terjadi kesalahan saat mengambil data. Silakan coba lagi.</p>`;
        });
    } else {
      alert("Harap pilih Parawi dan masukkan nomor hadits!");
    }
  }
  const apiHadits = "https://api.hadith.gading.dev/books";
  fetch(apiHadits)
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        containerPilihanHadits.innerHTML += `
          <li class="option" data-value="${item.id}">
            <span class="option-text">${item.name}</span>
          </li>`;
      });

      document.querySelectorAll('.option').forEach((optionn) => {
        optionn.addEventListener('click', () => {
          optionMenu.classList.toggle("active");
          const outputParawi = document.querySelector(".sBtn-text");

          const spanText = optionn.querySelector('.option-text');
          const value = optionn.getAttribute('data-value');

          outputParawi.innerHTML = spanText.innerText;
          selectedParawiValue = value;  // Simpan nilai asli untuk API
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const optionMenu = document.querySelector(".select-menu");
  const selectBtn = document.querySelector(".select-btn");





  selectBtn.addEventListener("click", () => {
     optionMenu.classList.toggle("active")
    loaderOn();
  });

  // Event listener untuk tombol "Cari hadits"
  document.querySelector(".btn-cari-hadits").addEventListener("click", cariHadits);

  // Kembali ke menu utama (asumsi fungsi `menuUtama` ada di tempat lain)
  document.querySelector(".btn-kembali").addEventListener("click", menuUtama);
}
