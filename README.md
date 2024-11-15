## Description of the project

In my first year of engineering school, I spent a month working as an intern to build an electric-powered spaceship and develop control for every axis. In the aftermath, I had the idea to recreate a simulation about that project and see how it would turn. I decided to write it in HTML/CSS/JavaScript since I did not practice them a lot. I spent about 20h on the project.

## Content of the project

Here is the description of the content of files :

-Assets: contains all PNG files to display spaceship and buttons

-index.html: contains the main structure of the page

-style.css: set styles for every object on the page

-script.js: main program, it manages the physics, positions updates, display, etc...

-mouseControl.js: everything that relates to the mouse reading is put in this file

-keyboardControl.js: everything that relates to the keyboard reading is put in this file

-correctors.js: creates the corrector class, very useful

-sidebar.js: everything that relates to the left sidebar is put in this file

-particle.js: creates a basic particle system used in script.js

## User manual

Download all files and keep them in the same repertory 
Open index.html with your Internet browser (tested with Chrome, I don't know if it works for others)
OR 
go to https://mael-archenault.github.io/Mini_Apterros_Simulation/

By default your on Manual mode:
  - you can control the ship with right, left, up, down arrows.

On the sidebar (left):
  - you can change a lot of characteristics
  - just discover all of them
  - WARNING : the chart section needs an internet connection

On the panel (right):
  - you can see speed, angle, and commands for both propulsion and plate angle

There is three buttons on top-right corner:
  - "V": for "view", toggle the spaceship-centered view.
  - "R": for "reset", reset the speed, angle, commands, etc... of the ship.
  - "F": for "follow", enable the following mode, the ship will go where your mouse is.

Have fun with this simulation
