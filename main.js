
//Basic configuration of the road structure 

const canvas=document.getElementById("myCanvas");
canvas.height=window.innerHeight;
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
const car =new Car(100,100,30,50);
car.draw(ctx);
