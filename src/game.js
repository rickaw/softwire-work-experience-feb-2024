var c = document.getElementById("canvas");
var line = c.getContext("2d");


for(let i = 40; i<400; i+=40) {
    line.moveTo(i,0);
    line.lineTo(i,800);
    line.stroke();
    console.log(i)
}

for(let i = 40; i<800; i+=40) {
    line.moveTo(0,i);
    line.lineTo(400,i);
    line.stroke();
    console.log(i)
}