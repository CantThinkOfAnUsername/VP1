var dB;
var dog, happyDog,foodS,foodStock,sadDog

function preload()
{
  sadDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dB = firebase.database();
  dog = createSprite(250,250);
  dog.addImage(sadDog);
  dog.scale=0.5
  foodStock=dB.ref("Food");
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
textSize(20);
fill("white")
stroke(1)
text("food:" + foodS, 350,50)
}
function readStock(data){
  foodS=data.val()

}
function writeStock(x){
  if(x<=0){
    x=0;
  }else {
    x=x-1
  }
  dB.ref('/').update({
    'Food': x
  })
}
