  function tampilAsmaulHusna() {
    const headerAsmaulHusna = `
        <div class="index-asmaul-husna">
            <div class="btn-kembali">kembali</div>
          <div class="dark-background dark-color header-asmaul-husna">
            <h2>Asmaul Husna</h2>
            <p>nama-nama yang baik bagi Allah Swt</p>
            <div class="form-asmaul-husna">
              <input type="number" class="input-nomor-asmaul-husna" placeholder="Masukkan nomor">
            </div>
          </div>
          <ul id="listAsmaulHusna"></ul>
        </div>
      `;
      container.innerHTML = headerAsmaulHusna; // Hanya ditambahkan sekali
    
    const apiAsmaulHusna = "https://asmaul-husna-api.vercel.app/api/all";

    fetch(apiAsmaulHusna)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Tambahkan header Asmaul Husna hanya sekali
      

      const listAsmaulHusna = document.getElementById("listAsmaulHusna");

      data.data.forEach(asma => {
        const asmaAlHusna = `
          <li class="dark-color dark-background asmaAlHusna">
            <div class="icon-surah">
              <img src="assets/RubElHizb.png" alt="">
              <p class="nomorAsma">${asma.urutan}</p>
            </div>
            <div class="keterangan-asma">
              <p class="asmaLatin">${asma.latin}</p>
              <p class="asmaArti">${asma.arti}</p>
            </div>
            <p class="asmaArab">${asma.arab}</p>
          </li>
        `;
        listAsmaulHusna.innerHTML += asmaAlHusna;
      });

      // Pindahkan event listener di sini, setelah input field ada di DOM
      const searchAsma = document.querySelector(".input-nomor-asmaul-husna");
      searchAsma.addEventListener("input", function() {
        const filter = searchAsma.value;
        const asmaulHusnaList = document.querySelectorAll(".asmaAlHusna");

        asmaulHusnaList.forEach(function(asma) {
          const nomorAsma = asma.querySelector(".nomorAsma").textContent.trim().replace('.', '');
          if (nomorAsma.includes(filter)) {
            asma.style.display = "";
          } else {
            asma.style.display = "none";
          }
        });
      });
    });
  }