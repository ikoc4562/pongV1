let x = 150, y = 150;
let dx = 2;
let dy = 3;
let WIDTH;
let HEIGHT;
let ctx;
let interval=10;
var rakety=0;
var rakety2=0;

ctx=document.querySelector('#canvas').getContext("2d");

function baslat() {

    WIDTH = ctx.canvas.width;
    HEIGHT = ctx.canvas.height;
}

function daire(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.fill();

}

function dikdortgen(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function dikdortgen2(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}
function temizle() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}




var rscore = document.getElementById('scoreleft');
var lscore = document.getElementById('scoreright');
var ogoal = document.getElementById('goal');
var refresh = document.getElementById('refresh');
refresh.style.display="none";

var ps = 10;
var map = [];
onkeydown = onkeyup = function (e) {
    map[e.keyCode] = e.type == 'keydown';
}


function keydown() {
    //if key was up arrow
    if (map[40]) {
        if (rakety + ps > HEIGHT - 180)
            rakety = HEIGHT - 180;
        else
            rakety = rakety + ps;
    }

    //if key was down arrow
    else if (map[38]) {
        if (rakety - ps < 0)
            rakety = 0;
        else
            rakety = rakety - ps;
    }


    if (map[83]) {
        if (rakety2 + ps > HEIGHT - 180)
            rakety2 = HEIGHT - 180;
        else
            rakety2 = rakety2 + ps;
    } else if (map[87]) {
        if (rakety2 - ps < 0)
            rakety2 = 0;
        else
            rakety2 = rakety2 - ps;
    }

    temizle();
    dikdortgen2(1380, rakety, 20, 180);
    dikdortgen(0, rakety2, 20, 180);


}

var balltime = 3;

function ball() {
    daire(x, y, 10);
}


function moveball() {

    ball();

    if (HEIGHT < y + 20 || y < 0) {
        dy *= -1;
    }

    if (x >= WIDTH) {
        if (rakety<=y +20 && rakety + 180 >= y) {
            dx *= -1;
        } else if (x >= WIDTH)
        {
            goal('left');
        }

    }

    if (x <= 30) {
        if (rakety2 <= y + 20 && rakety2 + 180 >= y) {
            dx *= -1;
        } else if (x <= 0)
        {
            goal('right');
        }
    }

    if (lscore.innerHTML =="11" || rscore.innerHTML=="11"){
        ogoal.innerHTML="Game Over";
        refresh.style.display="block";
    } else {

        setTimeout(function() {
            moveball()
        }, balltime);
    }

    x += dx;
    y += dy;


}


function goal(txt) {


    if (txt == "left")
    {
        ogoal.style.color = "red";
        rscore.innerHTML = Number(rscore.innerHTML) + 1;
    }

    else
    {
        ogoal.style.color = "blue";
        lscore.innerHTML = Number(lscore.innerHTML) + 1;
    }

    dx *= -1;
    x = WIDTH / 2 ;


}

baslat();
setInterval(function () {
    keydown();
}, interval);
moveball();



