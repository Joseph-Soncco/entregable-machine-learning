# Clasificador de Triángulos

Web que te permite dibujar un triángulo a mano alzada y, usando p5.js y ml5.js, clasificarlo en 6 categorías (4 rectángulos y 2 acutángulos).

## Estructura

- **css/style.css** - Estilos de galería, canvas y botones  
- **images/** - 1 ejemplo de cada clase (se muestra arriba del lienzo)  
- **js/script.js** - Lógica de dibujo, carga del modelo y clasificación  
- **model/** - Archivos del modelo exportado: `model.json`, `model_meta.json`, `model.weights.bin`  
- **entrenamiento.html** - Página para entrenar y exportar el modelo (uso interno)  
- **consume-rn.html** - Página principal de usuario: dibuja, clasifica y limpia  
- **processing/processing.pde** – Sketch de Processing que genera las imágenes de entrenamiento

## Uso rápido

1. Clona el repositorio.  
2. Abre `consume-rn.html` en tu navegador.  
3. Dibuja un triángulo en el lienzo y suelta el ratón para clasificar.  
4. Pulsa **Limpiar** para reiniciar.  
