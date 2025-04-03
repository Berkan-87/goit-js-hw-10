import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.js";
import "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";

import "https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js";
import "https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css";

export default {
  resolve: {
    alias: {
      flatpickr: 'node_modules/flatpickr/dist/flatpickr.js',
    },
  },
};

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)
        .then((message) => {
            iziToast.success({
                // title: "Başarılı!",
                message,
                position: "topRight",
            });
        })
        .catch((message) => {
            iziToast.error({
                // title: "Hata!",
                message,
                position: "topRight",
            });
        });

    form.reset();
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}



