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

        this.sensor = new Sensor(this);
        this.controls = new Control();
        this.damaged = false;
        
    }

    
    uptade(roadBorders){
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();

            //To detec if there is a colission with the borders of the road.
            this.damaged = this.#assesDamage(roadBorders);
        } 

        this.sensor.update(roadBorders);
    }

    //Methods
    #assesDamage(roadBorders){
        for(let i = 0;i<roadBorders.length;i++){
            if(polyIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }

        return false;
    }

    #createPolygon(){
        const points = [];
        //Distance from the middle of the car to a corner
        const rad = Math.hypot(this.width,this.height)/2;
        //Angle of the rad  
        const alpha = Math.atan2(this.width,this.height);
         
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });

        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });

        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });

        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });

        return points;
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

    draw(ctx){
        if(this.damaged){
            ctx.fillStyle="red";
        }
        else{
            ctx.fillStyle="green";
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y)

        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }

        //Drwa pixels rectangles
        ctx.fill();

        this.sensor.draw(ctx);
    }
}