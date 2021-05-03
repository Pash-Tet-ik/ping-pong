var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var tbl = canvas.getContext("2d")

var s=0
var tx=5
var ty=5
var tdy=0
var shx=16
var shy=5
var shdx=3
var shdy=3
var colorid = ["#ff0000","#ffa500","#ffd800"," #008000","#0000ff"," #4b0082","#ee82ee"]
var colorch = 0

function keybordup(){
    if(event.which==83||event.which==87){
        tdy=0
    }
}
function keybordpress(){
    if(event.which==119){
        tdy=-5
    }
    else if(event.which==115){
        tdy=5
    }
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc (shx,shy,5,0,Math.PI*2);
    ctx.fillStyle = colorid[colorch]
    ctx.fill()
    ctx.closePath()

    tbl.beginPath()
    tbl.fillStyle = "black"
    tbl.fillRect (tx,ty,10,100);
    tbl.closePath()
}

function run(){
    shx=shx+shdx
    shy=shy+shdy
    ty=ty+tdy

    if (shx>canvas.width){
        shdx=-shdx
        colorch=colorch+1
    }
    if (shy>canvas.height || shy<0){
        shdy=-shdy
        colorch=colorch+1
    }
    if (shx<16 && shx>12 && shy>ty && shy<ty+100){
        shdx=-1.1*shdx
        s=Math.random()-0.5
        s=parseFloat(s.toFixed(1))
        shdy=shdy+s
    }
    if (shx<0){
        alert("you lose")
        shx=16
        shy=160
        shdx=3
    }
    if (colorch == 7){
            colorch = 0
    }
    draw()
}

function cl(){
    console.log( document.getElementById("ddx").value)
    shdx= parseInt(document.getElementById("ddx").value)
    shdy= parseInt(document.getElementById("ddy").value)
}

setInterval(run, 10)

document.addEventListener('keypress',keybordpress)
document.addEventListener('keyup',keybordup)
