
let colors = ["rgb(250,110,15)","rgb(250,20,10)","rgb(240,250,15)"]

class ParticleEmitter {
    constructor(x, y, density, duration, direction, span, initialVelocity){
        this.x = x;
        this.y = y;

        this.density = density;
        this.duration = duration;
        this.initialVelocity = initialVelocity;

        this.direction = direction;
        this.span = span;

        this.particles = [];

        this.frameBetweenLastSpawn = 0;
        this.spawnInterval = -1.9*this.density+200;

        setInterval(this.spawnParticle, this.spawnInterval);

        
        

    }
    // one particle is described by an hash table  of {"x": number, "y": number,
    //                                                 "vx": number,"vy": number,
    //                                                 "ax" : number, "ay" : number,
    //                                                 "theta" : number,
    //                                                 "lifetime": number,
    //                                                 "color": string,
    //                                                 "duration": number
    //                                                 }
    update = ()=>{

        let index = 0;
        let flag = true;
        while (flag && this.particles.length >0){
            if (this.particles[0].lifetime > this.duration){
                this.particles.shift();
            }
            else {
                flag = false;
            }
        }
        

        for (var i=0;i<this.particles.length;i++){
            this.particles[i].x += this.particles[i].vx / framerate;
            this.particles[i].y += this.particles[i].vy / framerate;
            this.particles[i].lifetime += 1;
            if (this.particles[i].y < 10){
                this.particles[i].vy = 0;
            }
        }
    }
    updateEmittingPosition = (newX, newY)=>{
        this.x = newX;
        this.y = newY;
    }

    spawnParticle = ()=>{
        let particleInitialVelocity = this.initialVelocity + getRandomNumber(-this.initialVelocity*0.1,this.initialVelocity*0.1);
        particleInitialVelocity = Math.max(100, particleInitialVelocity);
        let particleDirection = this.direction + getRandomNumber(-this.span, this.span);
        
        let particle = {};
        particle.x = this.x;
        particle.y = this.y;
        particle.vx = particleInitialVelocity * Math.cos(particleDirection*Math.PI/180);
        particle.vy = particleInitialVelocity * Math.sin(particleDirection*Math.PI/180);
        particle.ax = 0;
        particle.ay = 0;
        particle.theta = particleDirection;
        particle.lifetime = 0;
        particle.color = colors[Math.floor(Math.random()*colors.length)];
        particle.duration = this.duration;
        
        this.particles.push(particle);

        this.frameBetweenLastSpawn = 0;

        
    }

    display = ()=> {
        // mainCanvasCtx.fillStyle = "rgb(0,0,0)";
        // mainCanvasCtx.fillRect(cameraX +this.x,cameraY -this.y, 100,100);

        let width;
        let height;
        for (var i=0;i<this.particles.length;i++){
            width = 10/Math.log(this.particles[i].lifetime/2);
            height = 10/Math.log(this.particles[i].lifetime/2)
            particleCanvasCtx.fillStyle = this.particles[i].color;
            particleCanvasCtx.fillRect(cameraX + this.particles[i].x - width/2, cameraY - this.particles[i].y-height/2, width, height);
        }
        
    }


}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;

}

