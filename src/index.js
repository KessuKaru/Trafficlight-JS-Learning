// @ts-check

import "./trafficlight.js";

import { crossingController } from "./controller.js";

let trafficLight1 = document.createElement("traffic-light");
let trafficLight2 = document.createElement("traffic-light");
let trafficLight3 = document.createElement("traffic-light");
let trafficLight4 = document.createElement("traffic-light");

let container = document.getElementById("container");

container.appendChild(trafficLight1);
container.appendChild(trafficLight2);
container.appendChild(trafficLight3);
container.appendChild(trafficLight4);

let controller = new crossingController(
  trafficLight1,
  trafficLight2,
  trafficLight3,
  trafficLight4
);

controller.enable();
controller.startLoop();
