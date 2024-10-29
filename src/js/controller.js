import { solarSystem } from "./model.js";

let galaxy = document.querySelector(".galaxy");
var width = galaxy.offsetWidth;
var height = galaxy.offsetHeight;

n = 20;
let speedFactor = 1; // Zmienna wpływająca na prędkość
let isAnimating = true; // Flaga kontrolująca animację
spacePosition();
drawCircles();
scaleHandler();
$(window).scrollTop($(window).height());
$(window).scrollLeft($(window).width() / 2);

const slider = document.querySelector(".slider__input");

// Zmienna, do której przypiszemy wartość suwaka

// Dodaj nasłuchiwacz zdarzeń dla suwaka
slider.addEventListener("input", function () {
  // Pobierz wartość suwaka
  speedFactor = slider.value;

  // Aktualizuj wyświetlaną wartość

  // (Opcjonalnie) Możesz dodać dodatkowe działania w zależności od wartości
  console.log(`Current speed: ${speedFactor}`);
});

const stopButton = document.querySelector(".button__stop");
stopButton.addEventListener("click", function () {
  isAnimating = !isAnimating; // Zmienia stan animacji
});

// Zamiast tej ściany tekstu
function count_X_Y() {
  Object.values(solarSystem).forEach((planet) => {
    if (planet.x !== undefined && planet.y !== undefined && planet.box) {
      planet.x = width / 2 - planet.box.offsetWidth / 2;
      planet.y = height / 2 - planet.box.offsetHeight / 2;

      console.log(`Planeta: ${planet.box}, x: ${planet.x}, y: ${planet.y}`);
      console.log("działa");
    }
  });
}
// Wywołanie funkcji
count_X_Y();

function spacePosition() {
  sun = document.querySelector(".galaxy__sun");

  sun.style.top = height / 2 - sun.offsetHeight / 2 + "px";
  sun.style.left = width / 2 - sun.offsetWidth / 2 + "px";

  Object.values(solarSystem).forEach((planet) => {
    if (planet.x !== undefined && planet.y !== undefined && planet.box) {
      planet.box.style.top = height / 2 - planet.box.offsetHeight / 2 + "px";
      planet.box.style.left =
        width / 2 - planet.box.offsetWidth / 2 + planet.r + "px";
    }
  });
}

// Funkcja animacji
function animate() {
  if (isAnimating) {
    move(); // Wywołanie funkcji move przy każdej klatce animacji
  }
  requestAnimationFrame(animate); // Kolejne wywołanie animacji
}

// Rozpoczęcie animacji
animate();

function move() {
  Object.values(solarSystem).forEach((planet) => {
    if (planet.box) {
      planet.delta = movePlanet(
        planet.delta,
        planet.box,
        planet.x,
        planet.y,
        planet.r,
        planet.shadow,
        planet.rotationSpeed
      );
    }
  });
}

function movePlanet(delta, planet, x, y, r, shadow, rotationSpeed) {
  let alpha = (Math.PI * delta) / 180;
  planet.style.top =
    y + r * Math.sin(alpha) * solarSystem.verticalKaificent + "px";
  planet.style.left = x + r * Math.cos(alpha) + "px";
  shadow.style.transform = "rotate(" + delta + "deg)";

  planet.style.zIndex = delta < 180 ? 11 : 9;

  delta += (rotationSpeed / n) * speedFactor;

  if (delta > 360) {
    delta -= 360;
  }
  return delta;
}

function drawCircles() {
  Object.values(solarSystem).forEach((planet) => {
    if (planet.box) {
      planet.circle.style.left = width / 2 - planet.r + "px";
      planet.circle.style.top =
        height / 2 - planet.r * solarSystem.verticalKaificent + "px";
      planet.circle.style.width = planet.r * 2 + "px";
      planet.circle.style.height =
        planet.r * 2 * solarSystem.verticalKaificent + "px";
    }
  });
}

function positionChange() {
  Object.values(solarSystem).forEach((planet) => {
    if (planet.box) {
      planet.box.style.top =
        planet.y +
        planet.r *
          Math.sin((Math.PI * planet.delta) / 180) *
          solarSystem.verticalKaificent +
        "px";
    }
  });
}

function scaleHandler() {
  var currentMousePos = { x: -1, y: -1 };
  var isDragged = false;

  function handleMove(event) {
    var pageY;

    if (
      event.type === "touchstart" ||
      event.type === "touchmove" ||
      event.type === "touchend"
    ) {
      if (event.touches && event.touches.length > 0) {
        pageY = event.touches[0].pageY;
        console.log("pageY:", pageY);
      }
    } else {
      pageY = event.pageY;
    }

    if (!isDragged) {
      currentMousePos.x = pageY;
      currentMousePos.y = pageY;
    } else {
      var delta =
        (pageY - currentMousePos.y) / 10000 + solarSystem.verticalKaificent;
      console.log(delta);
      if (delta <= 1 && delta >= 0) {
        solarSystem.verticalKaificent = delta;
      }
      drawCircles();
      positionChange();
    }
  }

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove);

  document.addEventListener("mousedown", function () {
    isDragged = true;
    document.body.style.cursor = "-webkit-grabbing";
  });

  document.addEventListener("mouseup", function () {
    isDragged = false;
    document.body.style.cursor = "-webkit-grab";
  });

  document.addEventListener("touchstart", function () {
    isDragged = true;
    document.body.style.cursor = "-webkit-grabbing";
  });

  document.addEventListener("touchend", function () {
    isDragged = false;
    document.body.style.cursor = "-webkit-grab";
  });
}

// Przykładowe przyciski do zatrzymywania i wznawiania animacji

// Pozostała część Twojego kodu (np. funkcje rysujące, ruch itd.)

// Generowanie losowych pozycji

// Przypisanie losowych wartości do zmiennych CSS

// Znajdź element kropki i przyciski

const startButton = document.querySelector(".planet__icons__mercury");
const resetButton = document.querySelector(".button__close");
const info = document.querySelector(".planet__info");

startButton.addEventListener("click", () => {
  isAnimating = false;

  solarSystem.mercury.box.classList.add("animate");
  solarSystem.mercury.box.classList.remove("reset"); // Usuwamy klasę resetującą
  info.style.display = "block";
});

// Funkcja resetująca animację
resetButton.addEventListener("click", () => {
  isAnimating = true;
  solarSystem.mercury.box.classList.add("reset");
  solarSystem.mercury.box.classList.remove("animate"); // Usuwamy klasę animującą
  info.style.display = "none";
});
