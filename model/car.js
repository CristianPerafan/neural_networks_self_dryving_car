class Car{

    //Constructor
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle=0;

        this.controls = new Control();
    }

    //Methods
    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );

        ctx.fill();

        ctx.restore();
    }

    uptade(){
        this.#move();
    }

    #move(){
        //To move forward
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }

        //To move reverse
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed = this.maxSpeed;
        }

        /*
        When the car is reversing the speed is less
        than when it is forwarding.
        */
        if(this.speed<-this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }

        //To stop the car for the friction
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }


        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
        
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
            
        }


        
        /*
        In base of the unit circle whe use Sen an Co to move
        the car.
        https://postimg.cc/68K0LV7Z
        */
        
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }
}