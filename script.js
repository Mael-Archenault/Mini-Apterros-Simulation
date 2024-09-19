

// canvas initializations

let mainCanvas = document.querySelector(".mainCanvas");
let mainCanvasCtx = mainCanvas.getContext("2d");

let particleCanvas = document.querySelector(".particleCanvas");
let particleCanvasCtx = particleCanvas.getContext("2d");

mainCanvas.setAttribute("width", window.innerWidth); mainCanvas.setAttribute("height", window.innerHeight);
particleCanvas.setAttribute("width", window.innerWidth); particleCanvas.setAttribute("height", window.innerHeight);


// objects for top right corner buttons

let viewChangerButton = document.querySelector(".view-changer");
let resetButton = document.querySelector(".reset");
let followModeButton = document.querySelector(".follow-mode");


// objects for the right panel

let speedDisplay = document.querySelector(".speed");
let altitudeDisplay = document.querySelector(".altitude");
let lateralDisplay = document.querySelector(".lateral");
let angleDisplay = document.querySelector(".angle");
let uAltitudeDisplay = document.querySelector(".uAltitude");
let uPlateDisplay = document.querySelector(".uPlate");
let uLateralDisplay = document.querySelector(".uLateral");


// coefficients for altitude regulation

let kAltitude = 1;
let TrAltitude = 0.4;
let KpAltitude = 10;
let TiAltitude = 0.1;
let TdAltitude = 0.01;

let kRoll = 0.6;
let TrRoll = 0.8;
let KpRoll = 5;
let TiRoll = 20;
let TdRoll = 0.01;

let kLateral = 1;
let TrLateral = 1
let KpLateral = 0.1;
let TiLateral = 1000;
let TdLateral = 0;

// values for sky color changes
const skyColors = [
    "rgb(30, 221, 255)",
    "rgb(0, 128, 255)",
    "rgb(0, 64, 129)",
    "rgb(29, 10, 38)",
    "rgb(10, 5, 20)",
    "rgb(0, 0, 10)"
];
let skyColor = "";

// booleans for modes activations

let viewLockedOnShip = true;
let followModeActive = false;
let showMassCenter = false;

let altitudeControlActive = false;
let rollControlActive = false;
let lateralControlActive = false;


// Initialization of the virtual camera

let cameraX = 0, cameraY = 500 ;





// class definitions

class SpaceShip {
    constructor (){

        ////////////////////////////////
        //Real Characteristics  (body)//
        ////////////////////////////////

        // position
        this.x = 0;
        this.y = 0;
        // velocity
        this.vx = 0;
        this.vy = 0;
        // acceleration
        this.ax = 0;
        this.ay = 0;

        // angle
        this.theta = 0;
        //angular velocity
        this.omega = 0;
        // angular acceleration
        this.alpha = 0;

        this.mass = 10; 
        this.J = 200; // Moment of inertia


        this.F = 100; // Propulsion force
        this.f = 10; // Friction coefficient
        

        // Max values
        this.FMax = 1.5*10*9.81;
        this.maxRollAngle = 30;

        

        /////////////////////////////////
        //      Commands and orders    //
        /////////////////////////////////
        this.uPropulsion = 0; // between 0 and 1
        this.uPlate = 0;    // between -1 and 1
        this.uLateral = 0;  // between -1 and 1

        this.hc = 0; // altitude order
        this.thetac = 0; // angle order
        this.xc =0; // lateral order
        
        /////////////////////////////////
        //Real Characteristics  (plate)//
        /////////////////////////////////

        this.plateAngle = 0;
        this.maxPlateAngle = 10;

        ////////////////////////////////
        // Display Characteristics    //
        ////////////////////////////////

        this.HTMLObject = document.querySelector(".spaceShip");

        this.plateObject = document.querySelector(".shipPlate");

        this.height = 262;
        this.width = 257;


        this.jetDistanceVertical = 80; // vertical distance between the center of the ship and the center of the plate
        this.jetDistanceHorizontal = 105; // horizontal distance between the center of the plate and one jet

        this.centerX = 0; // x coordinate center of the ship
        this.centerY = 0; // y coordinate center of the ship
        this.plateCenterX = 0; // x coordinate center of the plate
        this.plateCenterY = 0; // y coordinate center of the plate

        this.massCenterX = this.width / 2;  // x coordinate of the mass center relative to the top left corner of the ship
        this.massCenterY = this.height/2;  // y coordinate of the mass center relative to the top left corner of the ship

        this.setNewMassCenter(this.massCenterX, this.massCenterY);
        

        // coordinates of both left and right jets

        this.leftJetX = 0;
        this.leftJetY = 0;

        this.rightJetX = 0;
        this.rightJetY = 0;
        
        // list of particle emitters (one for each jet)
        this.particleEmitters = [new ParticleEmitter(0,0, 1000, 200, 0, 10,1000),new ParticleEmitter(0,0, 1000, 200, 0, 10,1000)];
        
    }
    reset = ()=>{
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        this.theta = 0;
        this.omega = 0;
        this.alpha = 0;

        this.plateAngle = 0;

        this.uPlate = 0;
        this.uPropulsion = 0;

    }
    setNewMassCenter = (x,y)=>{
        this.massCenterX = x;  
        this.massCenterY = y;
        
        this.massCenterToPlateCenterAngle = Math.atan((this.height/2+this.jetDistanceVertical-this.massCenterY)/(this.width/2-this.massCenterX))*180/Math.PI;
        this.massCenterToPlateCenterDistance = Math.sqrt((this.massCenterX - this.width/2)**2+(this.massCenterY - this.height/2-this.jetDistanceVertical)**2);
        
        this.massCenterToCenterAngle = Math.atan((this.height/2-this.massCenterY)/(this.width/2-this.massCenterX))*180/Math.PI;
        this.massCenterToCenterDistance = Math.sqrt((this.massCenterX - this.width/2)**2+(this.massCenterY - this.height/2)**2);


        if (this.massCenterX > this.width/2){
            this.massCenterToCenterAngle += 180;
            this.massCenterToPlateCenterAngle += 180;
        }
        if (isNaN(this.massCenterToPlateCenterAngle)){
            this.massCenterToPlateCenterAngle = 0;
        }
        if (isNaN(this.massCenterToCenterAngle)){
            this.massCenterToCenterAngle = 0;
        }
        
        this.massCenterToPlateCenterAngle -= 90;
        this.massCenterToCenterAngle -= 90;
        
    }

}

class Floor {
    constructor () {
        ////////////////////////////////
        //    Real Characteristics    //
        ////////////////////////////////
        this.y = 0

        ////////////////////////////////
        // Display Characteristics    //
        ////////////////////////////////

        this.HTMLObjectFront= document.querySelector(".floor");
        this.HTMLObjectBG1 = document.querySelector(".bg1");
        this.HTMLObjectBG2 = document.querySelector(".bg2");
        this.HTMLObjectBG3 = document.querySelector(".bg3");
       
    }
}

let framerate = 60;
let gravity = 9.8;

let epsilon = 0;
update = ()=>{
    ////// Update commands
    
    if (altitudeControlActive){
        epsilon = kAltitude*(spaceShip.hc-convertPixelToMeters(spaceShip.y, 0))-TrAltitude*spaceShip.vy;
        spaceShip.uPropulsion = PIDAltitude.update(epsilon, 1/framerate);
        spaceShip.uPropulsion = Math.min(1, Math.max(0,spaceShip.uPropulsion));
    }

    if (lateralControlActive){
        epsilon = kLateral*(spaceShip.xc-convertPixelToMeters(spaceShip.x, 0))-TrLateral*spaceShip.vx;
        spaceShip.uLateral = PIDLateral.update(epsilon, 1/framerate);
        spaceShip.uLateral = Math.min(1, Math.max(-1,spaceShip.uLateral));
        spaceShip.thetac = spaceShip.maxRollAngle*spaceShip.uLateral;
    }
    
    if (rollControlActive) {
        epsilon = kRoll*(spaceShip.thetac-spaceShip.theta)-TrRoll*spaceShip.omega;
        spaceShip.uPlate = PIDRoll.update(epsilon, 1/framerate);
        spaceShip.uPlate *= -1;
        spaceShip.uPlate = Math.min(1, Math.max(-1,spaceShip.uPlate));
    }

    
    spaceShip.F = spaceShip.FMax * spaceShip.uPropulsion;
    spaceShip.plateAngle = spaceShip.maxPlateAngle*spaceShip.uPlate;


    ////// Update accelerations

    // Rotation
    let l =  spaceShip.massCenterToPlateCenterDistance*Math.sin((-spaceShip.massCenterToPlateCenterAngle+spaceShip.plateAngle)*Math.PI/180)
    spaceShip.alpha = -l* spaceShip.F/spaceShip.J;
    spaceShip.omega += spaceShip.alpha * 1/framerate;
    spaceShip.theta += spaceShip.omega * 1/framerate;

    // Translation

    spaceShip.ax =spaceShip.F * Math.sin((spaceShip.theta + spaceShip.plateAngle)/180*Math.PI)/spaceShip.mass - spaceShip.f * spaceShip.vx/spaceShip.mass;
    spaceShip.vx += spaceShip.ax*1/framerate;
    
    spaceShip.ay = -1*gravity + spaceShip.F * Math.cos((spaceShip.theta + spaceShip.plateAngle)/180*Math.PI)/spaceShip.mass- spaceShip.f * spaceShip.vy/spaceShip.mass;
    spaceShip.vy += spaceShip.ay*1/framerate;
    
    spaceShip.x += convertPixelToMeters(0, spaceShip.vx*1/framerate );
    spaceShip.y += convertPixelToMeters(0, spaceShip.vy*1/framerate );

    console.log(spaceShip.vx, spaceShip.vy)
    
    // spaceship touching the ground
    if (spaceShip.y < 0){
        spaceShip.ay = 0;
        spaceShip.vy = 0 ;
        spaceShip.y = 0;
    }
   
    
    ////// Update points of emission of particles
    
    spaceShip.centerX = spaceShip.x + spaceShip.width/2;
    spaceShip.centerY = spaceShip.y + spaceShip.height/2;

    spaceShip.plateCenterX = spaceShip.centerX - spaceShip.jetDistanceVertical*Math.sin((spaceShip.theta)/180*Math.PI);
    spaceShip.plateCenterY = spaceShip.centerY - spaceShip.jetDistanceVertical*Math.cos((spaceShip.theta)/180*Math.PI);
    
    // updating particle emitter of left jet

    let emitter = spaceShip.particleEmitters[0];
    emitter.direction = -spaceShip.theta -spaceShip.plateAngle -90;
    
    spaceShip.leftJetX = spaceShip.plateCenterX - spaceShip.jetDistanceHorizontal*Math.cos((spaceShip.theta + spaceShip.plateAngle)*Math.PI/180);
    spaceShip.leftJetY = spaceShip.plateCenterY + spaceShip.jetDistanceHorizontal*Math.sin((spaceShip.theta + spaceShip.plateAngle)*Math.PI/180);

    emitter.updateEmittingPosition(spaceShip.leftJetX ,spaceShip.leftJetY);
    

    emitter.span = 45*spaceShip.uPropulsion;
    emitter.initialVelocity = 1000*spaceShip.uPropulsion;
    emitter.update();

    
    // updating particle emitter of right jet

    emitter = spaceShip.particleEmitters[1];
    emitter.direction = -spaceShip.theta - spaceShip.plateAngle - 90;

    spaceShip.rightJetX = spaceShip.plateCenterX + spaceShip.jetDistanceHorizontal*Math.cos((spaceShip.theta + spaceShip.plateAngle)*Math.PI/180);
    spaceShip.rightJetY = spaceShip.plateCenterY - spaceShip.jetDistanceHorizontal*Math.sin((spaceShip.theta + spaceShip.plateAngle)*Math.PI/180);

    emitter.updateEmittingPosition(spaceShip.rightJetX, spaceShip.rightJetY);

    emitter.span = 45*spaceShip.uPropulsion;
    emitter.initialVelocity = 1000*spaceShip.uPropulsion;
    emitter.update();
   
}

display= ()=> {


    if (viewLockedOnShip){
        cameraX = -spaceShip.x + windowWidth / 2-spaceShip.width/2;
        cameraY = spaceShip.y + spaceShip.height/2 + windowHeight / 2;
    }
    let altitude = convertPixelToMeters(cameraY, 0)/1000
    
    //console.log(getColorBetweenRGB(skyColors[Math.floor(altitude)],skyColors[Math.floor(altitude)+1],0));
    if (altitude < 5 ){
        skyColor = getColorBetweenRGB(skyColors[Math.floor(altitude)],skyColors[Math.floor(altitude)+1], altitude%1);
           
    }
    else {
        skyColor = skyColors[5];
    }

    mainCanvasCtx.fillStyle = skyColor;
    mainCanvasCtx.fillRect(0, 0, mainCanvas.width,mainCanvas.height);
    


    spaceShip.HTMLObject.style.top = (cameraY - spaceShip.y - spaceShip.height) + "px";
    spaceShip.HTMLObject.style.left = (cameraX + spaceShip.x) + "px";

    spaceShip.HTMLObject.style.rotate = spaceShip.theta + "deg";
    spaceShip.plateObject.style.rotate = spaceShip.plateAngle + "deg";

    floor.HTMLObjectFront.style.top = cameraY + "px";
    floor.HTMLObjectBG1.style.top = 470 + (cameraY-500)/2 + "px";
    floor.HTMLObjectBG2.style.top = 460 + (cameraY-500)/4 + "px";
    floor.HTMLObjectBG3.style.top = 450 + (cameraY-500)/8+ "px";
    

    particleCanvasCtx.clearRect(0, 0, windowWidth, windowHeight);
    for (i=0; i<spaceShip.particleEmitters.length; i++){
        spaceShip.particleEmitters[i].display();
    }
    speedDisplay.textContent = "Speed: " + (Math.sqrt(spaceShip.vx**2 + spaceShip.vy**2)).toFixed(2) + " m/s";
    altitudeDisplay.textContent = "Altitude: " + convertPixelToMeters(spaceShip.y,0).toFixed(2) + "m";
    lateralDisplay.textContent = "Lateral distance: " + convertPixelToMeters(spaceShip.x,0).toFixed(2) + "m";
    angleDisplay.textContent = "Angle: " + spaceShip.theta.toFixed(2) + "°";
    uAltitudeDisplay.textContent = "uPropulsion: " + spaceShip.uPropulsion.toFixed(2);
    uPlateDisplay.textContent = "uPlate: " + spaceShip.uPlate.toFixed(2);
    uLateralDisplay.textContent = "uLateral: " + spaceShip.uLateral.toFixed(2);
    if (showMassCenter){
        particleCanvasCtx.fillStyle = "red";
        particleCanvasCtx.fillRect(cameraX + spaceShip.x + spaceShip.width/2 + spaceShip.massCenterToCenterDistance*Math.sin((spaceShip.theta+spaceShip.massCenterToCenterAngle)*Math.PI/180) -3, cameraY - spaceShip.y - spaceShip.height/2 -spaceShip.massCenterToCenterDistance*Math.cos((spaceShip.theta+spaceShip.massCenterToCenterAngle)*Math.PI/180)-3, 6,6);
    }
}

runFrame = ()=>{
    update();
    display();
}

convertPixelToMeters = (pixels, meters) => {
    if (pixels != 0){
        return pixels / 262;
    }
    else {
        return meters*262;
    }
}

function getColorBetweenRGB(color1, color2, percentage) {
    let rgb1 = color1.split("(")[1].split(")")[0].split(",");
    let rgb2 = color2.split("(")[1].split(")")[0].split(",");

    let r1 = parseInt(rgb1[0]);
    let g1 = parseInt(rgb1[1]);
    let b1 = parseInt(rgb1[2]);

    let r2 = parseInt(rgb2[0]);
    let g2 = parseInt(rgb2[1]);
    let b2 = parseInt(rgb2[2]);

    let r = Math.floor(r1 + (r2-r1)*(percentage));
    let g = Math.floor(g1 + (g2-g1)*(percentage));
    let b = Math.floor(b1 + (b2-b1)*(percentage));

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

let spaceShip = new SpaceShip();
let PIDAltitude = new PID(KpAltitude, TiAltitude, TdAltitude);
let PIDRoll = new PID(KpRoll, TiRoll, TdRoll);
let PIDLateral = new PID(KpLateral, TiLateral, TdLateral);
let floor = new Floor();




setInterval(runFrame,100/6);







