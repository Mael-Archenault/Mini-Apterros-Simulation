//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

document.addEventListener('keydown', handleKeyDown);



let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;



//----------------------------------------------------------------
// Variables to track mouse state
//----------------------------------------------------------------
let isMouseDown = false;
let hasMoved = false;
let startX, startY;


//----------------------------------------------------------------
// Handle Mouse Events
//----------------------------------------------------------------
function handleMouseDown(event) {
    
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
    
    
}

function handleMouseMove(event) {
        

    
    // transmit the mouse movement to the originCursor object
    if (isMouseDown == true) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        // Update start position
        startX = event.clientX;
        startY = event.clientY;
        if (deltaX != 0 && deltaY != 0) {
            hasMoved = true;
        }
        // Do something with the mouse slide 
        
        cameraX += deltaX;
        cameraY += deltaY;

        


        floor.top += deltaY;
    }

    if (followModeActive){
        console.log(convertPixelToMeters(-cameraX - spaceShip.width/2 + event.clientX,0), convertPixelToMeters(cameraY - event.clientY,0))
        spaceShip.hc = Math.max(0, convertPixelToMeters(cameraY - event.clientY-spaceShip.height/2,0));
        spaceShip.xc = convertPixelToMeters(-cameraX - spaceShip.width/2 + event.clientX,0);
    }
    // if (event.clientX < windowWidth/2)
    //     spaceShip.plateAngle = Math.max(-1*spaceShip.maxPlateAngle, (event.clientX - windowWidth/2)/10);
    // else {
    //     spaceShip.plateAngle = Math.min(spaceShip.maxPlateAngle, (event.clientX - windowWidth/2)/10);
    // }

    
    
}


function handleMouseUp() {
    if (isMouseDown == true){
        
        hasMoved = false;     
        isMouseDown = false;
    }
    

}

function handleKeyDown(event){
    if (event.key == "v"){
        viewChangerButton.classList.toggle("active")
        viewLockedOnShip = !viewLockedOnShip;
        if (followModeActive) {
            followModeButton.classList.remove("active");
            followModeActive = false;
        }
   }
   if (event.key == "r"){
        spaceShip.reset();
        PIDAltitude.reset();
        PIDRoll.reset();
        PIDLateral.reset();
   }
   if (event.key == "f"){
    followModeButton.classList.toggle("active")
    viewChangerButton.classList.remove("active");
    viewLockedOnShip = false;
    followModeActive = !followModeActive;
}

}


