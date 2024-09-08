//let container = document.querySelector(".container")

function tampilAlQuran(){
  
  
  const headerQuran = `          <div class="alquran-index">
            <div class="btn-kembali">kembali</div>
            <div class=" dark-background search">
              <input id="namaSurah" class="dark-color"type="text">
                <button onclick="cariAyat()" class="btn-icon-content">
                      <i class="dark-color search-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path>
                                    </svg>
                                </i>
                            </button>
            </div>

            <ul class="kumpulan-ayat"></ul>
        </div>`;
    container.innerHTML = headerQuran;

    back();
    let namaSurah = document.querySelector("#namaSurah");
    const apiAlquran = "https://api.npoint.io/99c279bb173a6e28359c/data";
    const listAyat = document.querySelector('.kumpulan-ayat');

    fetch(apiAlquran)
        .then(response => response.json())
        .then(data => {
          console.log(data)
            let html = '';

            data.forEach(ayat => {
                html += `
                    <li class="ayat dark-color dark-background" data-value="${ayat.nomor}" >
                        <div class="icon-surah">
                            <img src="assets/RubElHizb.png" alt="">
                            <p class="no-surah">${ayat.nomor}</p>
                        </div>
                        <div class="keterangan-ayat">
                            <p class="nama-ayat">${ayat.nama}</p>
                            <p class="detail-ayat"><span>${ayat.type}</span> || <span>${ayat.ayat} ayat</span></p>
                        </div>
                        <p class="ayat-arab">${ayat.asma}</p>
                    </li>`;
            });
            listAyat.innerHTML = html;
            pilihAyat();


        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = headerQuran + `<p>error</p>`;
            back();
        });

    // Fungsi untuk menyaring ayat berdasarkan input pengguna
    namaSurah.addEventListener("input", function() {
        let filter = namaSurah.value.toLowerCase();
        let ayatList = document.querySelectorAll(".kumpulan-ayat .ayat");

        ayatList.forEach(function(ayat) {
            let namaAyat = ayat.querySelector(".nama-ayat").textContent.toLowerCase();
            if (namaAyat.includes(filter)) {
                ayat.style.display = "";
            } else {
                ayat.style.display = "none";
            }
        });
    });
    
    
}
    function back(){
      document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));
    }


