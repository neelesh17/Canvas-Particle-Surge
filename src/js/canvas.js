import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = [
  {r: 255, g: 71, b: 71},
  {r: 0, g: 206, b: 237},
  {r: 255, g: 255, b: 255}
];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, dx, dy, radius, ttl) {
    this.x = x
    this.y = y
    this.radius = radius
    this.dy = dy
    this.dx = dx
    this.timeToLive = ttl
    this.opacity = 1
    this.randomColor = Math.floor(Math.random() * colors.length);
  }

  update() {
    this.y += this.dy
    this.x += this.dx
    if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
      this.dy = -this.dy;
    }
    this.x = Math.min(Math.max(this.x, this.radius), canvas.width-this.radius);
    this.y = Math.min(Math.max(this.y, this.radius), canvas.height-this.radius);

    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle =
          'rgba(' +
          colors[this.randomColor].r +
          ',' +
          colors[this.randomColor].g +
          ',' +
          colors[this.randomColor].b +
          ',' +
          this.opacity +
          ')'
    c.stroke()
    c.closePath()

    this.opacity -= 1/(ttl/0.1)
    this.radius -= r/(ttl/0.1)

    if (this.radius < 0) {this.radius = 0}

    this.timeToLive -= 0.1
  }

  remove(){
    return (this.timeToLive <= 0)
  }
}

let r = 35;
let ttl = 15;
class Explosion{
  constructor(x,y){
    this.particles = [];
    this.x = x;
    this.y = y;
    this.init()
  }
  init(){
      let randomVelocity = {
        x:(Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 3.5,
      }
      this.particles.push(new Particle(this.x, this.y, randomVelocity.x, randomVelocity.y, r, ttl))
    }
  draw(){
    this.particles.forEach((particle, i) => {
      particle.update();
      if(particle.remove() == true)
        this.particles.splice(i, 1);	
    });

  }
}

// Implementation
let explosions=[]

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.fillStyle = "#1e1e1e"
  c.fillRect(0, 0, canvas.width, canvas.height)

  explosions.push(new Explosion(mouse.x, mouse.y));

  explosions.forEach(explosion => {
    explosion.draw()
  })
  c.save();
  c.font = "bold 60px Balsamiq Sans";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.textBaseline = "ideographic";
  let ctext = "PARTICLE SURGE".split("").join(String.fromCharCode(8201))
  c.fillText(ctext, canvas.width/2, canvas.height/2);
  c.font = "40px Crimson Text";
  c.fillText("Jul 27, 2020", canvas.width/2, canvas.height/2 + 100);
  c.beginPath();
  c.moveTo(canvas.width/2 - 100 , canvas.height/2 + 20);
  c.lineTo(canvas.width/2 + 100, canvas.height/2 + 20);
  c.strokeStyle = "rgba(255, 255, 255, 1)";
  c.lineWidth = 2.5;
  c.stroke();
  c.closePath();
  c.restore();
}

animate()
