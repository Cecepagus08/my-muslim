const container = document.querySelector('.container');
const loader = document.querySelector(".loader");
function menuUtama() {
    const apiWaktuSholat = "https://api.aladhan.com/v1/timingsByCity?city=palangkaraya&country=indonesia&method=8";

    fetch(apiWaktuSholat)
        .then((response) => response.json())
        .then((data) => {
            const ashar = data.data.timings.Asr;
            const dzuhur = data.data.timings.Dhuhr;
            const subuh = data.data.timings.Fajr;
            const isya = data.data.timings.Isha;
            const maghrib = data.data.timings.Maghrib;
            console.log(data);

            const jadwalSholat = `
                <div class="dark-background dark-color container-jadwal-shalat">
                    <div class="waktu-shalat">
                        <p>Subuh</p>
                        <p>${subuh}</p>
                    </div>
                    <div class="waktu-shalat">
                        <p>Zhuhur</p>
                        <p>${dzuhur}</p>
                    </div>
                    <div class="waktu-shalat">
                        <p>Ashar</p>
                        <p>${ashar}</p>
                    </div>
                    <div class="waktu-shalat">
                        <p>Maghrib</p>
                        <p>${maghrib}</p>
                    </div>
                    <div class="waktu-shalat">
                        <p>Isya</p>
                        <p>${isya}</p>
                    </div>
                </div>
            `;

            // Tambahkan jadwal shalat ke dalam container sebelum menu utama
            container.innerHTML = jadwalSholat + `
                <div class="menu">
                    <div id="alquran" class="dark-background dark-color box-menu">
                        <div class="icon-menu">
                            <img src="assets/Al-Qur'an.png" alt="">
                        </div>
                        <div class="title-menu">
                            <p>Al-Qur'an</p>
                        </div>
                    </div>
                    <div id="shalat" class="dark-color dark-background box-menu">
                        <div class="icon-menu">
                            <img src="assets/shalat.png" alt="">
                        </div>
                        <div class="title-menu">
                            <p>Tuntunan Shalat</p>
                        </div>
                    </div>
                    <div id="hadits" class="dark-background dark-color box-menu">
                        <div class="icon-menu">
                            <img src="assets/tasbih.png" alt="">
                        </div>
                        <div class="title-menu">
                            <p>Hadits</p>
                        </div>
                    </div>
                    <div id="asmaulHusna" class="dark-color dark-background box-menu">
                        <div class="icon-menu">
                            <img src="assets/asmaulHusna.png" alt="">
                        </div>
                        <div class="title-menu">
                            <p>Asmaul Husna</p>
                        </div>
                    </div>
                </div>
            `;

            // Setelah elemen ditambahkan ke DOM, pasang event listeners
            document.getElementById("alquran").addEventListener("click", () => handleMenuClick(1));
            document.getElementById("shalat").addEventListener("click", () => handleMenuClick(2));
            document.getElementById("hadits").addEventListener("click", () => handleMenuClick(3));
            document.getElementById("asmaulHusna").addEventListener("click", () => handleMenuClick(4));
        });
}

function handleMenuClick(index) {
    if (index === 1) {
        tampilAlQuran();
        console.log("haiii")
        document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));
        // Pastikan fungsi ini sudah didefinisikan di tempat lain
    } else if (index === 2) {
        container.innerHTML = `
            <div class="shalat-index">
                <div class="dark-background btn-kembali">kembali</div>
                <p>Tuntunan Shalat</p>
            </div>
        `;
        document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));
    } else if (index === 3) {
        menuHaditsTampil();

        document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));
    } else if (index === 4) {
        tampilAsmaulHusna();
        document.querySelector(".btn-kembali").addEventListener("click", () => handleMenuClick(5));
    } else if (index === 5) {
        menuUtama();
    }
}
const navbarToggle = document.getElementById("nav-toggle"); 
let navbarNav = document.querySelector(".navbar-nav"); 

navbarToggle.addEventListener("change", () => { 
  navbarNav.classList.toggle("active");
});



// Panggil menuUtama() untuk menampilkan menu utama pada awalnya
menuUtama();
