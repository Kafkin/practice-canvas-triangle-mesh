export class Mesh{
  constructor(w, h){
    this.w = w
    this.h = h

    this.dotArray = []
    this.trianglesArray = []

    this.maxDist = Math.hypot(this.w, this.h)

    this.stepX = this.maxDist * 0.1
    this.stepY = this.stepX * Math.sqrt(3) / 2

    this.cols = (this.w / this.stepX | 0) + 4
    this.rows = (this.h / this.stepY | 0) + 4

    this.extraOffsetX = this.stepX / 4
    this.offsetX = (this.w - (this.cols - 1) * this.stepX) / 2
    this.offsetY = (this.h - (this.rows - 1) * this.stepY) / 2

    this.colorTimer = 0
    this.colorSpeed = 30
    this.colorRange = 160

    this.createDot()
    this.createTriangles()
  }
  createDot(){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        let shiftX = i & 1 ? -this.extraOffsetX : this.extraOffsetX 

        const x = j * this.stepX + this.offsetX + shiftX
        const y = i * this.stepY + this.offsetY
        const homeX = x
        const homeY = y

        const angle = Math.random() * Math.PI*2
        const radius = Math.random() * this.extraOffsetX/2 + this.extraOffsetX
        const velocity = Math.random() * 2-1

        this.dotArray.push( {x, y, homeX, homeY, angle, radius, velocity} )
      }
    }
  }
  updateColor(correction){
    this.colorTimer = (this.colorTimer + this.colorSpeed * correction) % 360
  }
  // drawDot(ctx){
  //   ctx.fillStyle = `orange`
  //   this.dotArray.forEach(d => {
  //     ctx.beginPath()
  //     ctx.arc(d.x, d.y, 3, 0, Math.PI*2)
  //     ctx.fill()
  //   })
  // }
  createTriangles(){
    for(let y=0; y<this.rows-1; y++){
      let vertices = []
      for(let x=0; x<this.cols; x++){
        let a = x + this.cols * (y+1)
        let b = x + this.cols * y

        if (y & 1) { [a, b] = [b, a] }

        vertices.push(this.dotArray[a], this.dotArray[b])
      }
      for(let i=0; i<vertices.length-2; i++){
        let a = vertices[i]
        let b = vertices[i+1]
        let c = vertices[i+2]

        this.trianglesArray.push( {a, b, c} )
      }
    }
  }
  moveTriangles(correction = 0){
    this.dotArray.forEach(t => {
      t.angle += t.velocity * correction

      t.x = Math.cos(t.angle) * t.radius + t.homeX
      t.y = Math.sin(t.angle) * t.radius + t.homeY
    })
  }
  drawTriangles(ctx){
    this.trianglesArray.forEach(t => {
      const {a, b, c} = t

      const posX = (a.x + b.x + c.x) / 3
      const posY = (a.y + b.y + c.y) / 3
      const dist = Math.hypot(posX, posY)
      
      const hue = dist / this.maxDist * this.colorRange - this.colorTimer

      ctx.fillStyle = `hsl(${hue}, 85%, 50%)`
      ctx.strokeStyle = `hsl(${hue}, 85%, 85%)`

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.lineTo(c.x, c.y)
      ctx.closePath()

      ctx.fill()
      ctx.stroke()
    })
  }
}