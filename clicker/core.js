let clicks = 0;

const randomBackgroundColor = (element, clicks) => {
  const letters = "0123456789ABCDEF";
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[(Math.floor(Math.random() * 16))]
  }
  console.log(color)
  element.style.background = color
  insertElementWith(clicks, color)
};

const insertElementWith = (step, color) => {
  const table = document.getElementById("steps")
  const paragraph = document.createElement("tr")
  paragraph.innerHTML = `<td>${step}</td><td>${color}</td>`
  table.appendChild(paragraph)
}


const clickCounter = (element, clicks) => {
  element.innerHTML = clicks
};

document.addEventListener("DOMContentLoaded",(e) => {
  const square = document.getElementById("square");
  randomBackgroundColor(square, clicks)
  clickCounter(square, clicks);
  if (square) {
    square.addEventListener('click', (e) => {
      clicks++
      randomBackgroundColor(square, clicks);
      clickCounter(square, clicks);
    });
  }
});
