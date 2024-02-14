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

function fillBox(row, column) {
    const canvas = document.getElementById("canvas");
    const box = canvas.getContext("2d");
    box.fillStyle = "red";
    box.fillRect(column * 40, row * 40, 40, 40);
}

//calling the function above to fill boxes 
//fillBox(1, 2)
//fillBox(3, 4)
// fillBox(8, 1)

const jBlock = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
  
  const iBlock = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ]

  //arrow function


jBlock.forEach(function(row,rowIndex){
  console.log(row,rowIndex)
  row.forEach(function(item,index){
    if (item==1){
    fillBox(rowIndex,index)
  }
})
})

iBlock.forEach(function (row,rowIndex){
  //console.log(row,rowIndex)
  row.forEach(function(item,index){
    if (item==1){
      fillBox(rowIndex,index)
    }
  })
})

