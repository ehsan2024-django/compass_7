// داده‌های نمونه شهرها
const cities = [
    { label: "تهران", value: "tehran", lat: 35.6892, lng: 51.3890 },
    { label: "مشهد", value: "mashhad", lat: 36.2605, lng: 59.6168 },
    { label: "اصفهان", value: "isfahan", lat: 32.6546, lng: 51.6680 },
    { label: "شیراز", value: "shiraz", lat: 29.5926, lng: 52.5836 },
    { label: "تبریز", value: "tabriz", lat: 38.0962, lng: 46.2738 }
];

$(document).ready(function() {
    // تنظیم اتوکامپلیت
    $(".search-input").autocomplete({
        source: cities.map(city => city.label),
        minLength: 1,
        select: function(event, ui) {
            const selectedCity = cities.find(city => city.label === ui.item.value);
            if (selectedCity) {
                // درخواست به سرور برای محاسبه موقعیت خورشید
                $.ajax({
                    url: '/calculate_sun_position/',
                    data: { city: selectedCity.value },
                    success: function(response) {
                        // نمایش نام شهر
                        $("#city-name")
                            .text(selectedCity.label)
                            .addClass("active");

                        // بروزرسانی اطلاعات خورشید
                        $("#sun-position").text(`سمت خورشید: ${response.azimuth.toFixed(1)}°`);
                        $("#sun-elevation").text(`ارتفاع خورشید: ${response.altitude.toFixed(1)}°`);

                        // چرخاندن عقربه به سمت خورشید
                        $(".needle").css("transform", `translateX(-50%) rotate(${response.azimuth}deg)`);
                    },
                    error: function(xhr, status, error) {
                        console.error("Error:", error);
                        $("#city-name")
                            .text("خطا در محاسبه موقعیت خورشید")
                            .addClass("active");
                    }
                });
            }
        }
    });

    // بروزرسانی ساعت و تاریخ
    function updateDateTime() {
        moment.locale('en');
        const now = moment();
        
        const time = now.format('HH:mm:ss');
        document.getElementById('current-time').textContent = `Time: ${time}`;
        
        const date = now.format('dddd, MMMM Do YYYY');
        document.getElementById('current-date').textContent = `Date: ${date}`;
    }

    // اجرای اولیه و تنظیم بروزرسانی مداوم
    updateDateTime();
    setInterval(updateDateTime, 1000);
});