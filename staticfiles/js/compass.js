console.log("compass.js loaded!");
const menuToggle = document.getElementById('menuToggle');
const dropdown = document.getElementById('dropdown');

menuToggle.addEventListener('click', (event) => {
    dropdown.classList.toggle('active');
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('#menuToggle') && !event.target.closest('#dropdown')) {
        dropdown.classList.remove('active');
    }
});

// تابع برای ایجاد پیشنهادات اتوکامپلیت
function convertToPersianNumbers(input) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.toString().replace(/[0-9]/g, function (w) {
    return persianNumbers[+w];
  });
}
// function autocomplete(inputElement, data) {
//   let currentFocus;

//   inputElement.addEventListener("input", function () {
//     const value = this.value;
//     closeAllLists();

//     if (!value) return false;

//     currentFocus = -1;

//     const listContainer = document.createElement("div");
//     listContainer.setAttribute("id", this.id + "-autocomplete-list");
//     listContainer.setAttribute("class", "autocomplete-items");
//     this.parentNode.appendChild(listContainer);

//     for (let i = 0; i < data.length; i++) {
//       if (data[i].label.toLowerCase().includes(value.toLowerCase())) {
//         const item = document.createElement("div");
//         item.innerHTML = `<strong>${data[i].label.substr(
//           0,
//           value.length
//         )}</strong>${data[i].label.substr(value.length)}`;
//         item.addEventListener("click", function () {
//           inputElement.value = data[i].label;
//           closeAllLists();
//           fetchSunPosition(data[i]);
//         });
//         listContainer.appendChild(item);
//       }
//     }
//   });

//   function closeAllLists() {
//     const items = document.querySelectorAll(".autocomplete-items");
//     items.forEach((item) => item.parentNode.removeChild(item));
//   }
// }

// // تابع برای درخواست موقعیت خورشید
// function fetchSunPosition(selectedCity) {
//   fetch(`/calculate_sun_position/?city=${selectedCity.value}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // نمایش نام شهر
//       document.getElementById("city-name").textContent = selectedCity.label;
//       document.getElementById("city-name").classList.add("active");

//       // بروزرسانی اطلاعات خورشید
//       let persian_c = convertToPersianNumbers(data.azimuth.toFixed(1));
//       let persian_h = convertToPersianNumbers(data.altitude.toFixed(1));
//       document.getElementById(
//         "sun-position"
//       ).textContent = `سمت خورشید: ${persian_c}°`;
//       document.getElementById(
//         "sun-elevation"
//       ).textContent = `ارتفاع خورشید: ${persian_h}°`;

//       // چرخاندن عقربه به سمت خورشید
//       document.querySelector(
//         ".needle"
//       ).style.transform = `translateX(-50%) rotate(${data.azimuth}deg)`;
//       document.querySelector(
//         ".qibla-needle"
//       ).style.transform = `translateX(-50%) rotate(${data.qibla_angle}deg)`;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       document.getElementById("city-name").textContent =
//         "خطا در محاسبه موقعیت خورشید";
//       document.getElementById("city-name").classList.add("active");
//     });
// }

// بروزرسانی ساعت و تاریخ
function updateDateTime() {
  const now = new Date();

  // ساعت
  const time = now.toLocaleTimeString("fa-IR");
  document.querySelector(".time-now").textContent = time;

  // تاریخ
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = now.toLocaleDateString("fa-IR", options);
  const parts = date.split(" ");

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const weekday = parts[3];
  document.querySelector(".day-name").textContent = weekday;
  document.querySelector(".day-number").textContent = day;
  document.querySelector(".month-name").textContent = month;
  document.querySelector(".year-number").textContent = year;
}

// // اجرای اولیه و تنظیم بروزرسانی مداوم
// document.addEventListener("DOMContentLoaded", function () {
//   // تنظیم اتوکامپلیت
//   const searchInput = document.querySelector(".search-input");
//   autocomplete(searchInput, cities);

//   // بروزرسانی تاریخ و ساعت
updateDateTime();
setInterval(updateDateTime, 1000);
// });

// let how_option = document.querySelectorAll('.how-option');
// let how_find_show = document.querySelector('.how-find-show');
// let array_show = ['fa moon', 'fa sun', 'fa star']
// how_option.forEach(e => {
//   e.addEventListener('click', event => {

//   })
// })
let paramE = 'sun'
function showIcon(icon, color = 'text-yellow-400') {
  console.log("icon changed to:", icon);
  console.log("paramE changed to:", paramE);
  // ابتدا تمام آیکون‌ها رو مخفی می‌کنیم
  document.getElementById("sun").classList.add("hidden1");
  document.getElementById("moon").classList.add("hidden1");
  document.getElementById("star").classList.add("hidden1");
  if (icon == "moon") {
    document.getElementById('show-compass').classList.add('hidden')
    document.getElementById('span-show').innerHTML = 'ماه'
    document.getElementById(
      "hf"
    ).innerHTML = `<i class="fas fa-${icon} animate-bounce text-white text-xl"></i>`;
    document.getElementById("moon").classList.add("bg-purple-400");
    document.getElementById("sun").classList.remove("bg-purple-400");
    document.getElementById("star").classList.remove("bg-purple-400");
    paramE = 'moon'
  } else if (icon == "sun") {
    document.getElementById('show-compass').classList.add('hidden')
    document.getElementById('span-show').innerHTML = 'خورشید'
    document.getElementById(
      "hf"
    ).innerHTML = `<i class="fas fa-${icon} animate-bounce text-yellow-400 text-xl"></i>`;
    document.getElementById("sun").classList.add("bg-purple-400");
    document.getElementById("moon").classList.remove("bg-purple-400");
    document.getElementById("star").classList.remove("bg-purple-400");
    paramE = 'sun'
  } else {
    document.getElementById('star-modal').classList.remove('hidden')
    document.getElementById('show-compass').classList.add('hidden')
    document.getElementById('span-show').innerHTML = 'ستاره'
    document.getElementById(
      "hf"
    ).innerHTML = `<i class="fas fa-${icon} animate-bounce ${color} text-xl"></i>`;
    document.getElementById("star").classList.add(color);
    document.getElementById("star").classList.add('bg-purple-400');
    document.getElementById("moon").classList.remove("bg-purple-400");
    document.getElementById("sun").classList.remove("bg-purple-400");
    paramE = 'star'
  }
  document.getElementById(icon).classList.remove("hidden1");
}

document.getElementById('search-i').addEventListener('click', ()=> {
  updateQibla(paramE);
  document.getElementById('show-compass').classList.remove('hidden')
})
const qiblaLat = 21.4225;
const qiblaLon = 39.8262;

const cities = {
  تهران: { lat: 35.6892, lon: 51.389, en_name: 'tehran' },
  مشهد: { lat: 36.2605, lon: 59.6168, en_name: 'mashhad' },
  شیراز: { lat: 29.619, lon: 52.5387, en_name: 'shiraz' },
  اصفهان: { lat: 32.6613, lon: 51.6804, en_name: 'isfahan' },
  تبریز: { lat: 38.0962, lon: 46.2738, en_name: 'tabriz' },
  قم: { lat: 34.6399, lon: 50.8759, en_name: 'qom' },
  اهواز: { lat: 31.3183, lon: 48.6706, en_name: 'ahvaz' },
  کرمان: { lat: 30.2839, lon: 57.0834, en_name: 'kerman' },
  همدان: { lat: 34.7992, lon: 48.5146, en_name: 'hamedan' },
  بابلسر: { lat: 36.418, lon: 54.9763, en_name: 'shahrood' },
  یزد: { lat: 31.8974, lon: 54.3569, en_name: 'yazd' },
  شاهرود: { lat: 36.418, lon: 54.9763, en_name: 'shahrood' },
  قائمشهر: { lat: 36.4635, lon: 52.8578, en_name: 'ghaemshahr' }
 };

let deviceOrientation = 0;
let qiblaDirection = 0;
let azimuthValue = 0; // متغیر جدید

//if (window.DeviceOrientationEvent) {
  //window.addEventListener("deviceorientation", (event) => {
  //deviceOrientation = event.alpha;
  //updateNeedles();
  //});
//} else {
  //alert("مرورگر شما از قطب‌نما پشتیبانی نمی‌کند.");
//}

function calculateQibla(lat, lon) {
  return 20;
}

function calculateMoonQibla(lat, lon) {
  return 90;
}

function updateNeedles() {
  const directions = document.querySelector(".directions");
  const greenNeedle = document.querySelector(".qibla-needle");
  const redNeedle = document.querySelector(".fixed-needle");

  // عقربه قرمز ثابت می‌ماند (رو به بالا)
  redNeedle.style.transform = `translateX(-50%) translateY(-100%)`;

  // عقربه سبز (قبله) بر اساس اختلاف زاویه قبله و azimuth می‌چرخد
  greenNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${qiblaDirection - azimuthValue}deg)`;

  // دایره NEWS باید طوری بچرخد که N در راستای شمال باشد
  // وقتی خط قرمز به سمت جرم سماوی است (azimuth)، باید N شمال را نشان دهد
  directions.style.transform = `rotate(${-azimuthValue}deg)`;
}
console.log('object')
async function updateQibla(type) {
  const cityInput = document.getElementById("city").value;
  const city = cities[cityInput];
  console.log("City Input (Persian):", cityInput);
  console.log("Input:", cityInput.split('')); 
  console.log("City Object:", city);
  if (city) {
    try {
      // از en_name استفاده می‌کنیم
      const cityEnglishName = city.en_name || cityInput.toLowerCase();
      console.log("City English Name:", cityEnglishName);
      const response = await fetch(`/calculate_sun_position/?city=${cityEnglishName}&type=${type}`);
      const data = await response.json();
      // ...
      if (data.success) {
        // ذخیره زاویه محاسبه شده
        qiblaDirection = data.qibla_angle;
        console.log("icon changed to:", qiblaDirection);
                // نمایش مقادیر azimuth و altitude
        document.getElementById("azimuth-text").textContent = `سمت: ${data.azimuth} درجه`;
        document.getElementById("altitude-text").textContent = `ارتفاع: ${data.altitude} درجه`;
        azimuthValue = data.azimuth;
        // مدیریت نمایش آیکون‌ها
        if (type === "sun") {
          document.getElementById("sun-q").classList.remove("hidden");
          document.getElementById("moon-q").classList.add("hidden");
          document.getElementById("star-q").classList.add("hidden");
          setTimeout(() => {
            document.getElementById('modal').classList.add('flex')
          }, 1000);
        } else if (type === "moon") {
          document.getElementById("moon-q").classList.remove("hidden");
          document.getElementById("sun-q").classList.add("hidden");
          document.getElementById("star-q").classList.add("hidden");
          alert(`زاویه‌ی قبله برای ${cityInput} بر اساس ماه محاسبه شد.`);
        } else if (type === "star") {
          document.getElementById("star-q").classList.remove("hidden");
          document.getElementById("sun-q").classList.add("hidden");
          document.getElementById("moon-q").classList.add("hidden");
          alert(`زاویه‌ی قبله برای ${cityInput} بر اساس ستاره محاسبه شد.`);
        }
        
        updateNeedles();
      }
    } catch (error) {
      console.error('Error:', error);
      alert("خطا در دریافت اطلاعات از سرور");
    }
  } else {
    alert("شهر انتخابی معتبر نیست. لطفاً یک شهر معتبر انتخاب کنید.");
  }
}
document.getElementById('close-s').addEventListener('click',()=> {
  document.getElementById('star-modal').classList.add('hidden');
})
console.log('dmmmmdk')
function setStar(name){
  let cl;
  if(name == 'qotb'){
    cl = 'text-yellow-400'
    document.getElementById('qotb').classList.add('bg-purple-600')
    document.getElementById('soheil').classList.remove('bg-purple-600')
    document.getElementById('shabahang').classList.remove('bg-purple-600')
    document.getElementById('eioq').classList.remove('bg-purple-600')
  }else if(name == 'soheil'){
    cl = 'text-blue-500'
    document.getElementById('qotb').classList.remove('bg-purple-600')
    document.getElementById('soheil').classList.add('bg-purple-600')
    document.getElementById('shabahang').classList.remove('bg-purple-600')
    document.getElementById('eioq').classList.remove('bg-purple-600')
  }else if(name == 'shabahang'){
    cl = 'text-blue-800'
    document.getElementById('qotb').classList.remove('bg-purple-600')
    document.getElementById('soheil').classList.remove('bg-purple-600')
    document.getElementById('shabahang').classList.add('bg-purple-600')
    document.getElementById('eioq').classList.remove('bg-purple-600')
  }else if(name == 'eioq'){
    cl = 'text-red-500'
    document.getElementById('qotb').classList.remove('bg-purple-600')
    document.getElementById('soheil').classList.remove('bg-purple-600')
    document.getElementById('shabahang').classList.remove('bg-purple-600')
    document.getElementById('eioq').classList.add('bg-purple-600')
  }
  document.getElementById('star-btn').addEventListener('click', ()=> {
    showIcon('star', cl);
    document.getElementById('star-modal').classList.add('hidden')
  })
}