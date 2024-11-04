//const needle = document.querySelector('.needle');
        //setInterval(() => {
            //const rotation = Math.random() * 360;
            //const rotation = 0.1* 360;
            //needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        //}, 3000);
       // داده‌های نمونه شهرها
    const cities = [
        { label: "تهران", value: "tehran", lat: 35.6892, lng: 51.3890 },
        { label: "مشهد", value: "mashhad", lat: 36.2605, lng: 59.6168 },
        { label: "اصفهان", value: "isfahan", lat: 32.6546, lng: 51.6680 },
        { label: "شیراز", value: "shiraz", lat: 29.5926, lng: 52.5836 },
        { label: "تبریز", value: "tabriz", lat: 38.0962, lng: 46.2738 }
    ];

    $(document).ready(function() {
        // راه‌اندازی autocomplete
        $(".search-input").autocomplete({
            source: cities.map(city => city.label),
            minLength: 1,
            select: function(event, ui) {
                const selectedCity = cities.find(city => city.label === ui.item.value);
                if (selectedCity) {
                    // نمایش مختصات
                    $("#coordinates")
                        .html(`طول جغرافیایی: ${selectedCity.lng}<br>عرض جغرافیایی: ${selectedCity.lat}`)
                        .addClass("active");

                    // چرخاندن عقربه (مثال ساده)
                    const rotation = Math.random() * 360; // در حالت واقعی باید بر اساس مختصات محاسبه شود
                    $(".needle").css("transform", `translateX(-50%) rotate(${rotation}deg)`);
                }
            }
        });
        function updateDateTime() {
            moment.locale('fa'); // تنظیم زبان به فارسی
            const now = moment();
            
            // ساعت به فارسی
            const time = now.format('HH:mm:ss');
            const persianTime = convertToPersianNumbers(time);
            document.getElementById('current-time').textContent = `ساعت: ${persianTime}`;
            
            // تاریخ به فارسی
            const day = convertToPersianNumbers(now.format('DD'));
            const month = parseInt(now.format('jM')); // ماه را به عدد دریافت می‌کنیم
            const year = convertToPersianNumbers(now.format('jYYYY'));
            const weekDay = now.format('dddd');
            
            // دریافت نام ماه فارسی
            const monthName = getJalaliMonth(month);
            
            // ساخت رشته نهایی تاریخ
            const persianDate = `${weekDay} ${day} ${monthName} ${year}`;
            document.getElementById('current-date').textContent = `تاریخ: ${persianDate}`;
        }
        
        function getJalaliMonth(monthNumber) {
            const months = {
                1: 'فروردین',
                2: 'اردیبهشت',
                3: 'خرداد',
                4: 'تیر',
                5: 'مرداد',
                6: 'شهریور',
                7: 'مهر',
                8: 'آبان',
                9: 'آذر',
                10: 'دی',
                11: 'بهمن',
                12: 'اسفند'
            };
            return months[monthNumber] || '';
        }
        
        function convertToPersianNumbers(input) {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return String(input).replace(/[0-9]/g, d => persianNumbers[parseInt(d)]);
        }

        // بروزرسانی هر ثانیه
        updateDateTime();
        setInterval(updateDateTime, 1000);
    });      