function pilihAyat(){
   let listSemuaAyat = document.querySelectorAll(".ayat");
    listSemuaAyat.forEach((ayatDipilih) => {
      ayatDipilih.addEventListener("click", () => {
      const value = ayatDipilih.getAttribute('data-value');
      const apiRequestSurah = `https://equran.id/api/v2/surat/${value}`;
      fetch(apiRequestSurah)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const containerHeaderSurah = `
            <div class="index-isi-surah">
              <div onclick="hello()" id="alquran" class="btn-kembali">kembali</div>
               <div class="header-surah">
                  <div class="tempat-diturunkan">${data.data.tempatTurun}</div>
                  <div class="nama-surah">
                    <p>${data.data.namaLatin}</p>
                    <p class="arti-surah">${data.data.arti}</p>
                  </div>
                  <div class="jumlah-ayat">${data.data.jumlahAyat}</div>
                </div>
              <div id="content"></div>
            </div>
        `;
          document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));          
        container.innerHTML = containerHeaderSurah;
        data.data.ayat.forEach((ayat) => {
          let isiSurahYangDipilih = document.getElementById("content");
          const isiAyat = `
            <div class="isiAyatDipilih">
              <div class="nomorAyat">${ayat.nomorAyat}</div>
              <div class="ar">${ayat.teksArab}</div>
              <div class="id">${ayat.teksIndonesia}</div>
              <div class="tr">${ayat.teksLatin}</div>
            </div>
          `;
          isiSurahYangDipilih.innerHTML += isiAyat;
        });
      });
      console.log(value);
      });
    });
}

// Tambahkan fungsi hello() di luar fungsi pilihAyat
function hello() {
    tampilAlQuran();
}
