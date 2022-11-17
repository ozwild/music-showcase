<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<style lang="scss" scoped>
canvas {
  position: absolute;
}
</style>

<script lang="ts">
// @ref https://codepen.io/tmrDevelops/pen/KwBzpM
const rnd = (min: number, max: number) => Math.random() * (max - min) + min
const DIRECTION = {
  LEFT: -1,
  RIGHT: 1,
}

class Branch {
  len: number
  ang: number
  gen: number
  mult: number
  limb: Branch[] = []
  sway = 0
  spawn = 0
  vel = 0

  constructor(len: number, ang: number, gen: number) {
    this.len = len
    this.ang = ang
    this.gen = gen
    this.mult = rnd(0.01, 0.1)

    if (gen < 10) {
      this.addRandomLimb(DIRECTION.RIGHT)
      this.addRandomLimb(DIRECTION.LEFT)
    }
  }

  addRandomLimb(direction: number) {
    this.limb.push(
      new Branch(
        this.len * rnd(0.8, 0.99),
        rnd(0, (direction * Math.PI) / 6),
        this.gen + 1
      )
    )
  }

  disp($: CanvasRenderingContext2D, u: number) {
    this.sway++
    $.save()
    this.vel *= 0.9
    const dif = 1 - this.spawn
    this.vel += dif * 0.1
    this.spawn += this.vel

    $.strokeStyle = 'hsla(' + (u % 360) + ',80%,50%,0.9)'
    $.lineWidth = 1
    $.beginPath()
    $.rotate(this.ang + (Math.sin(this.sway * this.mult) * Math.PI) / 128)
    $.moveTo(0, 0)
    $.lineTo(this.len * this.spawn, 0)
    $.stroke()

    $.translate(this.len * this.spawn, 0)

    if (this.spawn > 0.6) {
      for (var i = 0; i < this.limb.length; i++) {
        var limb = this.limb[i]
        limb.disp($, u)
      }
    }
    $.restore()
  }
}
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { debounce } from 'ts-debounce'

const canvas: HTMLCanvasElement = $ref()
const topiaryGeneration = 3
const topiary = $ref(new Branch(75, 0, topiaryGeneration))
let $: CanvasRenderingContext2D | null = $ref()
let w = $ref(0)
let h = $ref(0)
let w2 = $ref(0)
let u = $ref(0.0)
let cnt = $ref(0)

onMounted(() => {
  if (canvas) {
    $ = canvas.getContext('2d')
  }

  if (window) {
    window.addEventListener(
      'resize',
      debounce((e: UIEvent) => {
        calculateBoundaries()
      }, 150)
    )
  }

  calculateBoundaries()
  draw()
})

function calculateBoundaries() {
  w = window.innerWidth
  h = window.innerHeight
  w2 = w * 0.5

  canvas.width = w
  canvas.height = h
}

function anim() {
  cnt++
  u -= 0.5
  if (cnt % 2) {
    draw()
  }
  window.requestAnimationFrame(anim)
}

function draw() {
  if ($) {
    $.save()
    $.clearRect(0, 0, w, h)
    $.translate(w2, h * 0.85)
    $.rotate(-Math.PI * 0.5)
    topiary.disp($, u)
    $.restore()
  }
}

anim()
</script>
