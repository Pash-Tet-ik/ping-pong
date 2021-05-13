var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

alert("W - вверх S - вниз")

var score = 0 //счёт
var s=0 //буфер
var tx=5 //положение пластины x
var ty=5 //положение пластины y
var tdy=0 //скорость пластины
var shx=16 //положение шара x
var shy=Math.random()*canvas.height //положение шара y
var shdx=2 //скорость шара x
var shdy=(Math.random()-0.5)*8 //скорость шара y
var colorid = ["#ff0000","#d84b20","#EC9210","#ffd800","#CBE900","#96fa00","#4BBD00","#008000","#219580","#42aaff","#0000ff","#2600C1","#4b0082","#9D41B8","#ee82ee","#F74177"] //радуга
var colorch = 0 //цикл радуги
var textlosesize = canvas.width/8 + "px Tahoma" //шрифт

function keybordup(){
    if((event.which==83 && tdy==5)||(event.which==87 && tdy==-5)){
        tdy=0
    }
}
function keyborddown(){
    if(event.which==87){
        tdy=-5
    }
    else if(event.which==83){
        tdy=5
    } 
}

function draw(){
//очистка
    ctx.clearRect(0,0, canvas.width, canvas.height)
//шар
    ctx.beginPath()
    ctx.arc (shx,shy,7,0,Math.PI*2);
    ctx.fillStyle = colorid[colorch]
    ctx.fill()
    ctx.closePath()
//пластина
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect (tx,ty,10,100);
    ctx.closePath()

    if (shx<4){
        ctx.font = textlosesize
        ctx.fillText("you lose", canvas.width/3.5, canvas.height/2.5);
        ctx.fillText("score:"+score, canvas.width/3.5, canvas.height/1.6);
        
    }
}
//смэрц
function lose(){
    shx=20
    shy=Math.random()*canvas.height
    shdy=(Math.random()-0.5)*7
    shdx=3
    score = 0
}

function run(){
//движениеw
    shx=shx+shdx
    shy=shy+shdy
    ty=ty+tdy
    if(tx<0){
        tx=0
    }
//контроль выхода пластины за границу
    if(ty<0){
        ty=0
    }
    if(ty>canvas.height-100){
        ty=canvas.height-100
    }
//отскок справа
    if (shx>canvas.width){
        shdx=-shdx
        colorch=colorch+1
//отскок сверху и снизу
    }
    if (shy+7>canvas.height || shy<0){
        shdy=-shdy
        colorch=colorch+1
    }
//отскок от пластины
    if (shx<16 && shx>16+1.4*shdx && shy>ty-2 && shy<ty+102){
        shdx=-1.1*shdx
        shdy=shdy+(tdy/10)
        shdy=shdy+Math.random()-0.5
        score = score+1
        colorch=colorch+1
    }
//левый край=смэрц
    if (shx<4 && shdx != 0){
        shdx=0
        shdy=0
        setTimeout(lose,1500)
//радуга
    }
    if (colorch >= colorid.length){
            colorch = 0
    }

    draw()
}

setInterval(run, 9)

document.addEventListener('keydown',keyborddown)
document.addEventListener('keyup',keybordup)
