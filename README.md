# Traffic Lights Simulator

An experimental traffic light simulator in your browser. It will support a simulation of the logic of a road crossing.

## Features

- Showing a traffic light
- Swiching the traffic light from red to green and reverse on button click
- The traffic light switches the lights according to a state machine
- It shows all four traffic lights of a crossing and a controller switches the lights so the traffic would run smoothly

## Architecture

This section describes the pages architecture.

### Modules

**Light module:** 

- Describes a single light.

Properties: color  
Public methods: on, off

**Traffic light:**

- Describes a single traffic light.
- Contains the state machine to switch to Red/Green.

Members: redLight, yellowLight, greenLight  
Properties: timeYellow, (timeRedYellow)
Public methods: switchToGreen, switchToRed, (switchOff, switchOn)

**Controller:**

- Controls all traffic lights in the crossing.
- Contains the state machine for the crossing.

Members: trafficLight 1-4  
Properties: timeGreen, timeRed  
Public methods: start, stop

## Issue Tracker:

1: Traffic light does not implement switchToGreen and switchToRed

2: Controller does not exist.
