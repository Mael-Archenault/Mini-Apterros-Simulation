
let chartsButton = document.querySelector(".chartsButton");
let coefficientsButton = document.querySelector(".coefficientsButton");
let centerOfMassButton = document.querySelector(".centerOfMassButton");
let shipAttributesButton = document.querySelector(".shipAttributesButton");
let ordersButton = document.querySelector(".ordersButton");

let chartsContainer = document.querySelector(".charts-container");
let coefficientsContainer = document.querySelector(".coefficients-container");
let centerOfMassContainer = document.querySelector(".center-of-mass-container");
let shipAttributesContainer = document.querySelector(".ship-attributes-container");
let ordersContainer = document.querySelector(".orders-container");

let openedSection = null;
let panelButtons = [chartsButton, coefficientsButton, centerOfMassButton, shipAttributesButton, ordersButton];
let panelContents = [chartsContainer, coefficientsContainer, centerOfMassContainer, shipAttributesContainer, ordersContainer];


////////////////////////////////////////////////////////////////
///////////////////// buttons handlers /////////////////////////
////////////////////////////////////////////////////////////////


chartsButton.onclick = ()=>{
    if (openedSection == chartsButton){
        openedSection =null;
        chartsButton.classList.remove("active");
        chartsContainer.classList.remove("opened");
    }
    else{
        openedSection = chartsButton;
        panelButtons.forEach((button)=>{button.classList.remove("active");});
        panelContents.forEach((content)=>{content.classList.remove("opened");});
        chartsButton.classList.add("active");
        chartsContainer.classList.add("opened");
    }
}

coefficientsButton.onclick = ()=>{
    if (openedSection == coefficientsButton){
        openedSection =null;
        coefficientsButton.classList.remove("active");
        coefficientsContainer.classList.remove("opened");
    }
    else{
        openedSection = coefficientsButton;
        panelButtons.forEach((button)=>{button.classList.remove("active");});
        panelContents.forEach((content)=>{content.classList.remove("opened");});
        coefficientsButton.classList.add("active");
        coefficientsContainer.classList.add("opened");
    }
}

centerOfMassButton.onclick = ()=>{
    if (openedSection == centerOfMassButton){
        openedSection =null;
        centerOfMassButton.classList.remove("active");
        centerOfMassContainer.classList.remove("opened");
    }
    else{
        openedSection = centerOfMassButton;
        panelButtons.forEach((button)=>{button.classList.remove("active");});
        panelContents.forEach((content)=>{content.classList.remove("opened");});
        centerOfMassButton.classList.add("active");
        centerOfMassContainer.classList.add("opened");
    }
}

shipAttributesButton.onclick = ()=>{
    if (openedSection == shipAttributesButton){
        openedSection =null;
        shipAttributesButton.classList.remove("active");
        shipAttributesContainer.classList.remove("opened");
    }
    else{
        openedSection = shipAttributesButton;
        panelButtons.forEach((button)=>{button.classList.remove("active");});
        panelContents.forEach((content)=>{content.classList.remove("opened");});
        shipAttributesButton.classList.add("active");
        shipAttributesContainer.classList.add("opened");
    }
}

ordersButton.onclick = ()=>{
    if (openedSection == ordersButton){
        openedSection =null;
        ordersButton.classList.remove("active");
        ordersContainer.classList.remove("opened");
    }
    else{
        openedSection = ordersButton;
        panelButtons.forEach((button)=>{button.classList.remove("active");});
        panelContents.forEach((content)=>{content.classList.remove("opened");});
        ordersButton.classList.add("active");
        ordersContainer.classList.add("opened");
    }
}


////////////////////////////////////////////////////////////////
///////////////////// slider/textbox synchronisation////////////
////////////////////////////////////////////////////////////////

let altitudeSlider = document.querySelector(".altitude-slider");
let altitudeBox = document.querySelector(".altitude-box");
let rollSlider = document.querySelector(".roll-slider");
let rollBox = document.querySelector(".roll-box");
let lateralSlider = document.querySelector(".lateral-slider");
let lateralBox = document.querySelector(".lateral-box");

let maxRollBox = document.querySelector(".max-roll-angle-box");



altitudeBox.addEventListener("input", (event)=>{
    if (!isNaN(altitudeBox.value)){
        altitudeSlider.value = altitudeBox.value;
    }
    }   
);

altitudeSlider.addEventListener("input", (event)=>{
    altitudeBox.value = altitudeSlider.value;
    
    }   
);

rollBox.addEventListener("input", (event)=>{
    if (!isNaN(rollBox.value)){
        rollSlider.value = rollBox.value;
    }
    }   
);

rollSlider.addEventListener("input", (event)=>{
    rollBox.value = rollSlider.value;
    }   
);

lateralBox.addEventListener("input", (event)=>{
    if (!isNaN(lateralBox.value)){
        lateralSlider.value = lateralBox.value;
    }
    }   
);

lateralSlider.addEventListener("input", (event)=>{
    lateralBox.value = lateralSlider.value;
    }   
);

/////////////////////////////////////////////////////////////
///////////////////// apply orders /////////////////////////
///////////////////////////////////////////////////////////
let ordersApplyButton = document.querySelector(".orders-apply-button");

ordersApplyButton.onclick = ()=>{
    spaceShip.hc = parseFloat(altitudeBox.value);
    spaceShip.thetac = parseFloat(rollBox.value);
    spaceShip.xc = parseFloat(lateralBox.value);
    spaceShip.maxRollAngle = parseFloat(maxRollBox.value);
}

/////////////////////////////////////////////////////////////
///////////////////// orders to activate////////////////////
///////////////////////////////////////////////////////////
let altitudeCheckbox = document.querySelector(".altitude-order-checkbox");
let rollCheckbox = document.querySelector(".roll-order-checkbox");
let lateralCheckbox = document.querySelector(".lateral-order-checkbox");

altitudeCheckbox.onclick = ()=>{
    altitudeControlActive = !altitudeControlActive;
}

rollCheckbox.onclick = ()=>{
    rollControlActive =!rollControlActive;
    if (!rollControlActive && lateralControlActive) {
        lateralControlActive = false;
        lateralCheckbox.checked =  false;
    }
}

lateralCheckbox.onclick = ()=>{
    lateralControlActive =!lateralControlActive;
    if (lateralControlActive) {
        rollControlActive = true;
        rollCheckbox.checked =  true;
    }
    else {
        spaceShip.thetac = parseFloat(rollBox.value);
    }
}



////////////////////////////////////////////////////////////////
///////////////////// apply attributes /////////////////////////
////////////////////////////////////////////////////////////////
let massBox = document.querySelector(".mass-box");
let momentOfInertiaBox = document.querySelector(".moment-of-inertia-box");
let maxPropulsionBox = document.querySelector(".max-propulsion-box");
let maxPlateAngleBox = document.querySelector(".max-plate-angle-box");
let frictionBox = document.querySelector(".friction-box");

let attributesApplyButton = document.querySelector(".attributes-apply-button");
let restoreAttributesButton = document.querySelector(".restore-attributes-button");


attributesApplyButton.onclick = ()=>{
    spaceShip.mass = parseFloat(massBox.value);
    spaceShip.J = parseFloat(momentOfInertiaBox.value);
    spaceShip.FMax = parseFloat(maxPropulsionBox.value);
    spaceShip.maxPlateAngle = parseFloat(maxPlateAngleBox.value);
    spaceShip.f = parseFloat(frictionBox.value);
}

restoreAttributesButton.onclick = ()=>{
    spaceShip.mass = 10;
    massBox.value = 10;
    spaceShip.J = 200;
    momentOfInertiaBox.value = 200;
    spaceShip.FMax = 147.15;
    maxPropulsionBox.value = 147.15;
    spaceShip.maxPlateAngle = 10;
    maxPlateAngleBox.value = 10;
    spaceShip.f = 10;
    frictionBox.value = 10;
}

////////////////////////////////////////////////////////////////
///////////////////// apply coefficients /////////////////////////
////////////////////////////////////////////////////////////////

let altitudekBox = document.querySelector('.altitude-k-box');
let altitudeTrBox = document.querySelector('.altitude-Tr-box');
let altitudeKpBox = document.querySelector('.altitude-Kp-box');
let altitudeTiBox = document.querySelector('.altitude-Ti-box');
let altitudeTdBox = document.querySelector('.altitude-Td-box');

let rollkBox = document.querySelector('.roll-k-box');
let rollTrBox = document.querySelector('.roll-Tr-box');
let rollKpBox = document.querySelector('.roll-Kp-box');
let rollTiBox = document.querySelector('.roll-Ti-box');
let rollTdBox = document.querySelector('.roll-Td-box');

let lateralkBox = document.querySelector('.lateral-k-box');
let lateralTrBox = document.querySelector('.lateral-Tr-box');
let lateralKpBox = document.querySelector('.lateral-Kp-box');
let lateralTiBox = document.querySelector('.lateral-Ti-box');
let lateralTdBox = document.querySelector('.lateral-Td-box');

let coefficientsApplyButton = document.querySelector(".coefficients-apply-button");
let restoreCoefficientButton = document.querySelector(".restore-coefficients-button");


coefficientsApplyButton.onclick = ()=>{
    kAltitude = parseFloat(altitudekBox.value);
    TrAltitude = parseFloat(altitudeTrBox.value);
    KpAltitude = parseFloat(altitudeKpBox.value);
    TiAltitude = parseFloat(altitudeTiBox.value);
    TdAltitude = parseFloat(altitudeTdBox.value);
    
    kRoll = parseFloat(rollkBox.value);
    TrRoll = parseFloat(rollTrBox.value);
    KpRoll = parseFloat(rollKpBox.value);
    TiRoll = parseFloat(rollTiBox.value);
    TdRoll = parseFloat(rollTdBox.value);

    kLateral = parseFloat(lateralkBox.value);
    TrLateral = parseFloat(lateralTrBox.value);
    KpLateral = parseFloat(lateralKpBox.value);
    TiLateral = parseFloat(lateralTiBox.value);
    TdLateral = parseFloat(lateralTdBox.value);


    PIDAltitude.changeCoefficients(KpAltitude, TiAltitude, TdAltitude);
    PIDRoll.changeCoefficients(KpRoll, TiRoll, TdRoll);
    PIDLateral.changeCoefficients(KpLateral, TiLateral, TdLateral);
}

restoreCoefficientButton.onclick = ()=>{
    kAltitude = 1;
    altitudekBox.value = 1;
    TrAltitude = 0.4;
    altitudeTrBox.value = 0.4;
    KpAltitude = 10;
    altitudeKpBox.value = 10;
    TiAltitude = 0.1;
    altitudeTiBox.value = 0.1;
    TdAltitude = 0.01;
    altitudeTdBox.value = 0.01;
    
    kRoll = 0.6;
    rollkBox.value = 0.6;
    TrRoll = 0.8;
    rollTrBox.value = 0.8;
    KpRoll = 5;
    rollKpBox.value = 5;
    TiRoll = 20;
    rollTiBox.value = 20;
    TdRoll = 0.01;
    rollTdBox.value = 0.01;

    kLateral = 1;
    lateralkBox.value = 1;
    TrLateral = 1;
    lateralTrBox.value = 1;
    KpLateral = 0.1;
    lateralKpBox.value = 0.1;
    TiLateral = 1000;
    lateralTiBox.value = 1000;
    TdLateral = 0;
    lateralTdBox.value = 0;

}



let massCenterCheckbox = document.querySelector(".show-mass-center-checkbox");
let massCenterXBox = document.querySelector(".mass-center-x-box");
let massCenterYBox = document.querySelector(".mass-center-y-box");

let massCenterApplyButton = document.querySelector(".mass-center-apply-button");
let restorMassCenterButton = document.querySelector(".restore-mass-center-button");

massCenterCheckbox.onclick = (event)=>{
    showMassCenter = !showMassCenter;
}

massCenterApplyButton.onclick = ()=>{
    spaceShip.setNewMassCenter(parseFloat(massCenterXBox.value), parseFloat(massCenterYBox.value));
}
restorMassCenterButton.onclick = () => {
    massCenterXBox.value = spaceShip.width/2;
    massCenterYBox.value = spaceShip.height/2;
}



