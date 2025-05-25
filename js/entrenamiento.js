let triA = [], triB = [], triC = [], triD = [], acuA = [], acuB = [];
let ShapeClassifier;

function preload() {
  for (let i = 0; i < 100; i++) {
    let idx = nf((i + 1), 3, 0); // 001, 002, ..., 100
    triA[i] = loadImage(`data/trian-rect_A${idx}.png`);
    triB[i] = loadImage(`data/trian-rect_B${idx}.png`);
    triC[i] = loadImage(`data/trian-rect_C${idx}.png`);
    triD[i] = loadImage(`data/trian-rect_D${idx}.png`);
    acuA[i] = loadImage(`data/acutangulo_A${idx}.png`);
    acuB[i] = loadImage(`data/acutangulo_B${idx}.png`);
  }
}

function setup() {
  // Parámetros del clasificador
  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true
  };
  // Inicialización de la red neuronal
  ShapeClassifier = ml5.neuralNetwork(options);

  // Añadir datos
  for (let i = 0; i < 100; i++) {
    ShapeClassifier.addData({ image: triA[i] }, { label: 'rect_A' });
    ShapeClassifier.addData({ image: triB[i] }, { label: 'rect_B' });
    ShapeClassifier.addData({ image: triC[i] }, { label: 'rect_C' });
    ShapeClassifier.addData({ image: triD[i] }, { label: 'rect_D' });
    ShapeClassifier.addData({ image: acuA[i] }, { label: 'acu_A' });
    ShapeClassifier.addData({ image: acuB[i] }, { label: 'acu_B' });
  }

  // Normalización y entrenamiento
  ShapeClassifier.normalizeData();
  ShapeClassifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log("Entrenamiento finalizado.");
  // Guardar el modelo
  ShapeClassifier.save();
}