let classifier, inputImage, canvasElem;
let hasDrawn = false;

function setup() {
  // canvas principal
  canvasElem = createCanvas(400, 400);
  canvasElem.parent('sketch-holder');
  background(255);

  // lienzo auxiliar
  inputImage = createGraphics(64, 64);

  // configurar la red
  classifier = ml5.neuralNetwork({
    inputs: [64, 64, 4],
    task: 'imageClassification'
  });

  // cargar modelo (no clasificamos aún)
  classifier.load({
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  });

  // botón limpiar
  document.getElementById('clear-btn')
    .addEventListener('click', () => {
      background(255);
      hasDrawn = false;
      document.getElementById('result').innerText = 'Dibuja un triángulo para clasificar';
      document.querySelectorAll('#samples figure.selected')
        .forEach(fig => fig.classList.remove('selected'));
    });
}

function draw() {
  if (mouseIsPressed) {
    hasDrawn = true;
    strokeWeight(8);
    stroke(0);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  // solo dentro de nuestro canvas (0 ≤ mouseX ≤ width, 0 ≤ mouseY ≤ height)
  if (!hasDrawn || mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  classifyCanvas();
}

function classifyCanvas() {
  inputImage.copy(canvasElem, 0, 0, 400, 400, 0, 0, 64, 64);
  classifier.classify({ image: inputImage }, gotResult);
}

function gotResult(err, results) {
  if (err) return console.error(err);
  if (!hasDrawn) return;

  const label = results[0].label;
  const conf = Math.round(results[0].confidence * 100) + '%';
  document.getElementById('result').innerText = `${label} – ${conf}`;

  // resaltar
  document.querySelectorAll('#samples figure.selected')
    .forEach(fig => fig.classList.remove('selected'));
  const sel = document.querySelector(`#samples figure[data-label="${label}"]`);
  if (sel) sel.classList.add('selected');
}