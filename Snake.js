can = document.getElementById("can")
can.width = 1500
can.height = 600 
c = can.getContext('2d')
w = 40
h = 40
n = 3
d = 86
dt = 10
m = 2
F = []
S = []
score = 0
v = 2
T = d*dt / v
function Circle(x,y,r,color){
    c.fillStyle = color
    c.beginPath()
    c.arc(x,y,r,0,2*Math.PI)
    c.fill()
}
class Box {
    InC = "Red"
    OutC = "rgba(0,0,225,0.2)"
    constructor(x,y,vx=-v,vy=0){
        this.vx = vx
        this.vy = vy
        this.x = x
        this.y = y
    }
    Move(x,y){
        this.x = x
        this.y = y
        Circle(x,y,d/2,this.OutC)
        c.beginPath()
        c.fillStyle = this.InC
        c.fillRect(this.x-w/2,this.y-h/2,w,h)
    }
}
function Start(){
    S = []
    for(i=0;i<=n;i++){
        S.push(new Box(600 + d*i,400))
    }
    F=[]
    for(i=0;i<=m;i++){
        F.push(new Food())
    }
    B = S[0]
    B.InC = "green"
    ID = setInterval(Update,dt)
}
function Dir(vx,vy,j=0) {
    S[j].vx = vx
    S[j].vy = vy
    setTimeout(function(){
        if(j < n){
            j += 1
            Dir(vx,vy,j)
        } 
    },T)
}
function overlap(B2){
    X =  (Math.abs(B.x - B2.x) < w ) 
    Y =  (Math.abs(B.y - B2.y) < h ) 
    return ( X && Y )
}
function GameOver(){
    clearInterval(ID)
    alert("Game Over. \n Your Score is : " + score.toString())
    for(i=0;i<=n;i++){
        delete S.pop()
    }
    for(i=0;i<=m;i++){
        delete F.pop()
    }
    n = 3
}
function Check(){
    var R = B.x + w /2 > 1500
    var L = B.x - w /2 < 0
    var D = B.y + h /2 > 600
    var U = B.y - h /2 < 0
    if(R || L || D || U){
        GameOver()
    }
    for(i=1;i<=n;i++) {
        if(overlap(S[i])){
            GameOver()
        }
    }
    for(i=0;i<=m;i++) {
        if(overlap(F[i])){
            F[i].Eat()
        }
    }
}
function Update() {
    c.clearRect(0,0,1500,600)
    for(i=0;i<=n;i++){
        var b = S[i]
        b.Move(b.x + b.vx , b.y + b.vy)
    }
    for(i=0;i<=m;i++){
        var b = F[i]
        b.Move(b.x, b.y)
    }
    Check()
}
function Extend(){
    var X = 0
    var Y = 0
    if(S[n].vx == v){
        X = - d
    } else if(S[n].vx == -v) {
        X = d
    } else {
        if(S[n].vy == v){ Y = -d}
        else if(S[n].vy == -v){Y = d}
    }
    S.push(new Box(S[n].x + X , S[n].y + Y , S[n].vx , S[n].vy))
    n++
}
class Food extends Box {
    InC = "yellow"
    OutC = "rgba(251,231,239,0.5)"
    constructor(){
        super(1500 * Math.random(),600 * Math.random(),0,0)
    }
    Eat(){
        Extend()
        this.Move(1500 * Math.random() , 600 * Math.random())
        score++
    }
}

document.addEventListener('keydown',function(event){
    if(event.key == "ArrowDown"){
        Dir(0,v)
    } else if (event.key == "ArrowUp") {
        Dir(0,-v)
    } else if (event.key == "ArrowLeft") {
        Dir(-v,0)
    } else if (event.key == "ArrowRight") {
        Dir(v,0)
    } else {
        alert("invalid key")
    }
})
