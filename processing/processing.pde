void setup() {
  size(64, 64);  // Lienzo pequeño
}

void draw() {
  // 6 imágenes por frame → tras 100 frames tendremos 600 imágenes
  for (int i = 0; i < 6; i++) {
    background(255);
    strokeWeight(4);
    
    pushMatrix();
    float r = random(8, 24);
    float x = random(r, width - r);
    float y = random(r, height - r);
    translate(x, y);
    
    stroke(100);
    noFill();
    
    if (i == 0) {
      // Triángulo rectángulo abajo-izquierda (A)
      triangle(0, 0,  r, 0,  0, -r);
      saveFrame("data/trian-rect_A###.png");
      
    } else if (i == 1) {
      // Triángulo rectángulo abajo-derecha (B)
      triangle(0, 0, -r, 0,  0, -r);
      saveFrame("data/trian-rect_B###.png");
      
    } else if (i == 2) {
      // Triángulo rectángulo arriba-izquierda (C)
      triangle(0, 0,  r, 0,  0,  r);
      saveFrame("data/trian-rect_C###.png");
      
    } else if (i == 3) {
      // Triángulo rectángulo arriba-derecha (D)
      triangle(0, 0, -r, 0,  0,  r);
      saveFrame("data/trian-rect_D###.png");
      
    } else if (i == 4) {
      // Triángulo acutángulo apuntando hacia arriba (A)
      triangle(0, -r, -r, r,  r, r);
      saveFrame("data/acutangulo_A###.png");
      
    } else if (i == 5) {
      // Triángulo acutángulo apuntando hacia abajo (B)
      triangle(0,  r, -r, -r, r, -r);
      saveFrame("data/acutangulo_B###.png");
    }
    
    popMatrix();
  }
  
  // Cuando frameCount llegue a 100 → 100 × 6 = 600 imágenes, y cerramos
  if (frameCount == 100)
  {
    exit();
  }
}
