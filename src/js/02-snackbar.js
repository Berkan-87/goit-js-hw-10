import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Form seçme ve submit eventi
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then((message) => {
      iziToast.success({
        message,
        position: "topRight",
      });
    })
    .catch((message) => {
      iziToast.error({
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
