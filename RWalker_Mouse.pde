//Version 2: Abhängig von Mausposition
Walker w;

void setup() {
  size(800,800);
  background(255);
  w = new Walker(width/2, height/2, 0.45); // Startwert X, Startwert Y, Stepwahrscheinlichkeit richtige Richtung, 0.45 als default

}

void draw() {
  w.step();
  w.display();
  w.eat();
  w.edges();
}

class Walker {
  float x;
  float y;
  float forward;
  float backward;
  float inDotSize = 5; //"initial Dotsize" - wie groß sind die Punkte, wie groß sind die Schritte zu Beginn
  float dotSize = inDotSize;

  Walker(int x_, int y_, float forw) {
    x = x_;
    y = y_;
    forward = forw;
    backward = (1 - forward) / 2; //könnte als viertes Attribut entfernt und automatisch ermittelt werden
  }


  void step() {

//Wenn stepX/Y Wert groß genug ist, wird keine Bewegung ausgeführt (= Wahrscheinlichkeit für stay) und wenn mouseX/Y = x/y ist, dann ebenfalls nicht. So sollte der Walker immer in Richtung Maus laufen
  
    float stepX = random(1);
    float stepY = random(1);


    if (mouseX >= x) {
      if (stepX < forward) {
        x = x + dotSize;
      } else if (stepX < forward+backward) {
        x = x - dotSize;
      } 
    } else if (mouseX < x) {
      if (stepX < forward) {
        x = x - dotSize;
      } else if (stepX < forward+backward) {
        x = x + dotSize;
      }
    }    
  
  
    if (mouseY >= y) {
      if (stepY < forward) {
        y = y + dotSize;
      } else if (stepY < forward+backward) {
        y = y - dotSize;
      } 
    } else if (mouseY < y) {
      if (stepY < forward) {
        y = y - dotSize;
      } else if (stepY < forward+backward) {
        y = y + dotSize;
      }
    } 
  }


  void eat() {
    if ((mouseX < x + dotSize && mouseX > x - dotSize) && (mouseY < y + dotSize && mouseY > y - dotSize)) {
      dotSize += 3;
    }
  }

  
  void edges(){
    if (x > width) x = 0;
    if (x < 0) x = width;
    if (y > height) y = 0;
    if (y < 0) y = height;
  }


  void display() {
    float dist = sqrt(sq(mouseX - x)+sq(mouseY - y)/2);
    fill(dist/400*255, 0, 0);
    stroke(0);
    ellipse(x, y, dotSize, dotSize);
  }
}

  void mousePressed() {
      w.x = width/2;
      w.y = height/2;
      w.dotSize = w.inDotSize;
      fill(255, 150);
      rect(0, 0, width, height);
  }