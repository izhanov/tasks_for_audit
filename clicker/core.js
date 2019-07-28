const randomBackgroundColor = (element) => {
  const letters = "0123456789ABCDEF";
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[(Math.floor(Math.random() * 16))]
  }
  console.log(color)
  element.style.background = color
  const colorName = document.getElementById("color")
  colorName.innerHTML = color
};

let clicks = 0;

const clickCounter = (element, clicks) => {
  element.innerHTML = clicks
};

document.addEventListener("DOMContentLoaded",(e) => {
  const square = document.getElementById("square");
  randomBackgroundColor(square)
  clickCounter(square, clicks);
  if (square) {
    square.addEventListener('click', (e) => {
      clicks++
      randomBackgroundColor(square);
      clickCounter(square, clicks);
    });
  }
});
