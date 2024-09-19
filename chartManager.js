let altitudeCtx = document.getElementById("altitude-chart");
let rollCtx = document.getElementById("roll-chart");
let lateralCtx = document.getElementById("lateral-chart");

let displayTimeInterval = 100;
let displayTime = 10;
let time = displayTime;
let paused = false;


let altitudeData = [];
let rollData = [];
let lateralData = [];

let pauseButton = document.querySelector(".chart-pause-button");

pauseButton.onclick = ()=>{
    paused = !paused;

    if (paused) {
        pauseButton.value = "Resume";
    }
    else {
        pauseButton.value = "Pause";
    }
}

let altitudeCfg = {
  type: 'line',
  data: {
    datasets: [{
        label: "Altitude",
        data: altitudeData,
        parsing : {
            yAxisKey: 'h' 
        },
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        pointStyle: false
    },
    {
        label: "Altitude Order",
        data: altitudeData,
        parsing : {
            yAxisKey: 'hc' 
        },
        backgroundColor: 'red',
        borderColor:'red',
        borderWidth: 1,
        pointStyle: false
    }]
    
  },
  options: {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
                // Optional: Customize ticks if needed
                // You can define min and max to control the range
            },
            min: 0,
            max: 10
        },
        y: {
            beginAtZero: true,
            grace: '5%'
        }
    },
    animation : false,
}  
};

let rollCfg = {
    type: 'line',
    data: {
      datasets: [{
          label: "Angle",
          data: altitudeData,
          parsing : {
              yAxisKey: 'theta' 
          },
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
          pointStyle: false
      },
      {
          label: "Angle Order",
          data: altitudeData,
          parsing : {
              yAxisKey: 'thetac' 
          },
          backgroundColor: 'red',
          borderColor:'red',
          borderWidth: 1,
          pointStyle: false
      }]
      
    },
    options: {
      scales: {
          x: {
              type: 'linear',
              position: 'bottom',
              ticks: {
                  // Optional: Customize ticks if needed
                  // You can define min and max to control the range
              },
              min: 0,
              max: 10
          },
          y: {
              min : -45,
              max : 45,
          }
      },
      animation : false,
  }  
  };

let lateralCfg = {
    type: 'line',
    data: {
      datasets: [{
          label: "Lateral Distance",
          data: altitudeData,
          parsing : {
              yAxisKey: 'l' 
          },
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
          pointStyle: false
      },
      {
          label: "Lateral Distance Order",
          data: altitudeData,
          parsing : {
              yAxisKey: 'xc' 
          },
          backgroundColor: 'red',
          borderColor:'red',
          borderWidth: 1,
          pointStyle: false
      }]
      
    },
    options: {
      scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
                // Optional: Customize ticks if needed
                // You can define min and max to control the range
            },
            min: 0,
            max: 10
        },
        y: {
            min : -3,
            max : 3,
        }
      },
      animation : false,
  }  
  };

let altitudeChart = new Chart(altitudeCtx, altitudeCfg);
let rollChart = new Chart(rollCtx, rollCfg);
let lateralChart = new Chart(lateralCtx, lateralCfg);


createTimeList = (start, stop, num) => {
    return Array.from({ length: num }, (_, i) => start + i * (stop - start) / (num - 1));
  }
  

createAltitudeDataSet = (duration, number) => {
    let res = new Array();
    let point = {};
    let time = createTimeList(0,duration, number);
    for (let i = 0; i <time.length; i++) {
        point = {
            x: parseFloat(time[i].toFixed(1)),
            h: 0,
            hc: 0,
        }
        res.push(point);
    }
    return res;
}

createRollDataSet = (duration, number) => {
    let res = new Array();
    let point = {};
    let time = createTimeList(0,duration, number);
    for (let i = 0; i <time.length; i++) {
        point = {
            x: parseFloat(time[i].toFixed(1)),
            theta: 0,
            thetac: 0,
        }
        res.push(point);
    }
    return res;
}
createLateralDataSet = (duration, number) => {
    let res = new Array();
    let point = {};
    let time = createTimeList(0,duration, number);
    for (let i = 0; i <time.length; i++) {
        point = {
            x: parseFloat(time[i].toFixed(1)),
            l: 0,
            xc: 0,
        }
        res.push(point);
    }
    return res;
}





updateDataSet = ()=> {
    if (!paused) {
        altitudeData.shift();
        altitudeData.push({x:parseFloat((time).toFixed(1)), h: convertPixelToMeters(spaceShip.y,0), hc: spaceShip.hc});

        rollData.shift();
        rollData.push({x:parseFloat((time).toFixed(1)), theta: spaceShip.theta, thetac: spaceShip.thetac});

        lateralData.shift();
        lateralData.push({x:parseFloat((time).toFixed(1)), l: convertPixelToMeters(spaceShip.x,0), xc: spaceShip.xc});


        altitudeChart.data.datasets.forEach((element)=>{element.data = altitudeData});
        altitudeChart.options.scales.x.min = altitudeData[0].x;
        altitudeChart.options.scales.x.max = altitudeData[0].x +displayTime;

        rollChart.data.datasets.forEach((element)=>{element.data = rollData});
        rollChart.options.scales.x.min = rollData[0].x;
        rollChart.options.scales.x.max = rollData[0].x + displayTime;

        lateralChart.data.datasets.forEach((element)=>{element.data = lateralData});
        lateralChart.options.scales.x.min = lateralData[0].x;
        lateralChart.options.scales.x.max = lateralData[0].x + displayTime;



        //console.log(altitudeChart.options.scales.x.min, altitudeChart.options.scales.x.max);
    
        
        altitudeChart.update();
        rollChart.update();
        lateralChart.update();

        time += displayTimeInterval/1000;
    }
    
}





initializeDataSets = ()=>{
    altitudeData = createAltitudeDataSet(10,displayTime/displayTimeInterval*1000);
    rollData = createRollDataSet(10,displayTime/displayTimeInterval*1000);
    lateralData = createLateralDataSet(10,displayTime/displayTimeInterval*1000);

    altitudeChart.data.datasets.forEach(element => {
        element.data = altitudeData;
    });

    rollChart.data.datasets.forEach(element => {
        element.data = rollData;
    });

    lateralChart.data.datasets.forEach(element => {
        element.data = lateralData;
    });
    
    altitudeChart.update();
    rollChart.update();
    lateralChart.update();
}

initializeDataSets();
setInterval(updateDataSet, displayTimeInterval);