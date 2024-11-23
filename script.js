let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    const movePaper = (x, y) => {
      this.currentX = x - this.offsetX;
      this.currentY = y - this.offsetY;
      paper.style.transform = `
        translate(${this.currentX}px, ${this.currentY}px)
        rotateZ(${this.rotation}deg)`;
    };

    const startDrag = (x, y) => {
      this.holdingPaper = true;
      this.offsetX = x - this.currentX;
      this.offsetY = y - this.currentY;
      paper.style.zIndex = highestZ++;
    };

    const stopDrag = () => {
      this.holdingPaper = false;
    };

    // Mouse events
    paper.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
    document.addEventListener("mousemove", (e) => {
      if (this.holdingPaper) movePaper(e.clientX, e.clientY);
    });
    document.addEventListener("mouseup", stopDrag);

    // Touch events
    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    });
    document.addEventListener("touchmove", (e) => {
      if (this.holdingPaper) {
        const touch = e.touches[0];
        movePaper(touch.clientX, touch.clientY);
      }
    });
    document.addEventListener("touchend", stopDrag);
  }
}

// Initialize all papers
document.querySelectorAll(".paper").forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});


