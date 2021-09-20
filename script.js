class Light {
  constructor(colour) {
    this.offColour = "gray";
    this.onColour = colour;
    this.currentColour = this.offColour;
    this.html = document.getElementById(this.onColour + "light");
  }

  swichOn() {
    this.currentColour = this.onColour;
    this.renderToDOM()
  }

  swichOff() {
    this.currentColour = this.offColour;
    this.renderToDOM()
  }

  renderToDOM() {
    this.html.style.backgroundColor = this.currentColour;
    console.log(this.onColour + " light is: " + this.currentColour);
  }
}



class TrafficLight {
  constructor(htmlId) {
    this.redlight = new Light("red");
    this.yellowlight = new Light("yellow");
    this.greenlight = new Light("green");
  }

  run() {
    this.enterRedState();
  }

  enterRedState() {
    this.redlight.swichOn();
    this.yellowlight.swichOff();
    this.greenlight.swichOff();

    setTimeout(this.enterRedYellowState.bind(this), 5000);
  }

  enterRedYellowState() {
    this.redlight.swichOn();
    this.yellowlight.swichOn();
    this.greenlight.swichOff();

    setTimeout(this.enterGreenState.bind(this), 2000);
  }
  enterGreenState() {
    this.redlight.swichOff();
    this.yellowlight.swichOff();
    this.greenlight.swichOn();

    setTimeout(this.enterYellowState.bind(this), 5000);
  }
  enterYellowState() {
    this.redlight.swichOff();
    this.yellowlight.swichOn();
    this.greenlight.swichOff();

    setTimeout(this.enterRedState.bind(this), 2000);
  }
}

let trafficLight1 = new TrafficLight("")
trafficLight1.run()
