import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
    // ... (kodunuzun geri kalanı)
});

export default {
  resolve: {
    alias: {
      flatpickr: 'node_modules/flatpickr/dist/flatpickr.js',
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
    const datePicker = document.getElementById("datetime-picker");
    const startButton = document.querySelector("[data-start]");
    const daysSpan = document.querySelector("[data-days]");
    const hoursSpan = document.querySelector("[data-hours]");
    const minutesSpan = document.querySelector("[data-minutes]");
    const secondsSpan = document.querySelector("[data-seconds]");

    let selectedDate = null;
    let timerId = null;

    startButton.disabled = true; // Sayfa yüklendiğinde buton devre dışı

    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        allowInput: true, // Manuel girişe izin verir
        onClose(selectedDates) {
            selectedDate = selectedDates[0];
            console.log("Seçilen Tarih:", selectedDate);

            if (selectedDate <= new Date()) {
                iziToast.error({
                    title: "Hata",
                    message: "Please choose a date in the future!",
                    position: "topRight",
                });
                startButton.disabled = true;
            } else {
                startButton.disabled = false;
            }
        },
    };

    flatpickr(datePicker, options);  // Flatpickr tarih seçiciyi başlat
    datePicker.removeAttribute("readonly"); // Tarih giriş alanını tıklanabilir yap

    startButton.addEventListener("click", () => {
        startButton.disabled = true; // Start butonu tıklandıktan sonra devre dışı bırakılır
        datePicker.disabled = true;  // Tarih giriş alanı devre dışı bırakılır

        timerId = setInterval(() => {
            const now = new Date();
            const timeRemaining = selectedDate - now;

            if (timeRemaining <= 0) {
                clearInterval(timerId);  // Zamanlayıcı durdurulur
                updateTimerDisplay(0);   // Zaman sıfırlanır
                datePicker.disabled = false;  // Tarih seçimi tekrar etkinleştirilir
                return;
            }

            updateTimerDisplay(timeRemaining);
        }, 1000);
    });

    function updateTimerDisplay(ms) {
        const { days, hours, minutes, seconds } = convertMs(ms);
        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor((ms % hour) / minute);
        const seconds = Math.floor((ms % minute) / second);

        return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }
});
