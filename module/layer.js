export class Layer{
  constructor(container){
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    container.appendChild(this.canvas)

    this.reSize = this.reSize.bind(this)
    this.reSize()

    addEventListener('resize', () => this.reSize())
  }
  reSize(){
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
  }

  get w() { return this.canvas.width }
  get h() { return this.canvas.height }
}