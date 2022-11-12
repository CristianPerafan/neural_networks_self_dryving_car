
//Basic configuration of the road structure 

const canvas=document.getElementById("myCanvas");
canvas.width=200;

/*
Returns a context of a draw, in this case it represents
a two-dimensional rendering context.
*/
const ctx = canvas.getContext("2d");

/*
Creating a car in the position 100x 100y with a width of 
30 px and height of 50 px.
*/
const road = new Road(canvas.width/2,canvas.width*0.9);
const car =new Car(road.getLaneCenter(0),100,30,50);

animate();

function animate(){
    car.uptade(road.borders);

    //This refresh the canvas 
    canvas.height=window.innerHeight;
    ctx.save();

    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    car.draw(ctx);
   

    /*
    This method calls the animate method again and again many
    times per seconds
    */
   ctx.restore();
   requestAnimationFrame(animate);
}
