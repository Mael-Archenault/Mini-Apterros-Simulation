const keys = {}; // Track the state of keys
const keyIntervals = {}; // Track intervals for each key

document.addEventListener('keydown', function(event) {
    // Check if the key is already held down (to prevent multiple intervals)
    if (!keys[event.key]) {
        keys[event.key] = true; // Mark the key as pressed
        handleKeyPress(event.key); // Trigger the initial action

        // Start a custom repeat interval
        keyIntervals[event.key] = setInterval(() => {
            handleKeyPress(event.key);
        }, 50); // Adjust the interval to your needs (e.g., 100ms)
    }
});

document.addEventListener('keyup', function(event) {
    if (keys[event.key]) {
        clearInterval(keyIntervals[event.key]); // Stop the interval
        keys[event.key] = false; // Mark the key as released
        delete keyIntervals[event.key]; // Clean up the interval reference
    }
});

function handleKeyPress(key) {
    if (key === 'ArrowRight'&& !rollControlActive) {

        spaceShip.uPlate = Math.min(1, spaceShip.uPlate + 0.1);
        // Perform action for "Up" arrow key
    }
    if (key === 'ArrowLeft'&& !rollControlActive) {
        
        spaceShip.uPlate = Math.max(-1, spaceShip.uPlate - 0.1);
    }
    if (key === 'ArrowUp'&& !altitudeControlActive) {

      spaceShip.uPropulsion = Math.min(1, spaceShip.uPropulsion + 0.01);
      // Perform action for "Up" arrow key
  }
  if (key === 'ArrowDown'&& !altitudeControlActive) {
      
      spaceShip.uPropulsion = Math.max(0, spaceShip.uPropulsion - 0.01);
  }
}