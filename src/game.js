var c = document.getElementById("canvas");
var line = c.getContext("2d");
//line.strokeStyle='rgba(0,0,0,0.2)' -- > dont work 

//for loops for drawing the grid 
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



function fillBoxes(x, y) {
    const canvas = document.getElementById("canvas");
    const box = canvas.getContext("2d");
    box.fillStyle = "red";
    box.fillRect(y, x, 40, 40);
}

//calling the function above to fill boxes 
fillBoxes(40,80)
fillBoxes(120,160)
fillBoxes(320,40)
fillBoxes(400,400)

