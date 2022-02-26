import { Layer } from "./layer.js"
import { Loop } from "./loop.js"
import { Mesh } from "./mesh.js"

class App{
  constructor(container){
    this.layer = new Layer(container)

    this.createMesh()
    addEventListener('resize', () => this.createMesh())

    this.loop = new Loop(time => this.update(time), () => this.display())
  }
  createMesh(){
    this.mesh = new Mesh(this.layer.w, this.layer.h) 
  }
  update(correction = 0){
    this.mesh.moveTriangles(correction)
    this.mesh.updateColor(correction)
  }
  display(){
    this.mesh.drawTriangles(this.layer.context)
    // this.mesh.drawDot(this.layer.context)
  }
}

onload = ()=>{
  new App(document.querySelector('body'))
}