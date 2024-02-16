// Initialize Vue
const app = new Vue({
    el: '#app',
    data: {
      angle: 0,
      speed: 0,
      roundedSpeed: 0,
      score: 0
    },
    mounted() {
      window.addEventListener('resize', this.resizeCanvas);
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.img = new Image();
      this.img.src = 'moto.png';
      this.img.onload = this.startGame;
      this.resizeCanvas();
    },
    methods: {
      startGame() {
        setInterval(this.move, 1000 / 60);
      },
      move() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        // Draw the road
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(0, 200, this.canvas.width, 200);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 250, this.canvas.width, 50);
  
        // Draw the motorcycle (static at the left side)
        this.ctx.save();
        this.ctx.translate(100 + this.img.width / 2, 200 + this.img.height / 2); // Posición estática a la izquierda
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2); // Ajuste del punto de origen para la rotación
        this.ctx.restore();
  
        // Increment the score for each frame
        this.score++;
  
        // Update the speed indicator display
        this.roundedSpeed = Math.round(this.speed);
      },
      resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
      }
    }
  });
  