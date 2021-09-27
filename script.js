class Light {
  constructor(colour, parent) {
    this.offColour = "gray";
    this.onColour = colour;
    this.currentColour = this.offColour;
    this.html = document.createElement("span");

    this.html.className = "light";
    parent.appendChild(this.html);
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
    // console.log(this.onColour + " light is: " + this.currentColour);
  }
}



class TrafficLight extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    
    const html = document.createElement("div");
    html.className = "ampel";

    this.redlight = new Light("red", html);
    this.yellowlight = new Light("yellow", html);
    this.greenlight = new Light("green", html);

    const style = document.createElement('style');

    style.textContent = `
    .light {
      height: 50px;
      width: 50px;
      background-color: gray;
      border-radius: 50%;
      display: inline-block;
      margin: 5px;
    }
    
    /* .light#redlight {
        background-color: red;
      } */
    
    .ampel {
      display: flex;
      flex-direction: column;
      background-color: black;
      width: fit-content;
      margin-bottom: 5px;
    }
    `;

    shadow.append(style, html);
  }

  connectedCallback() {
    this.onclick = this.run;
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

customElements.define("traffic-light", TrafficLight);

// let trafficLight1 = new TrafficLight("")
// trafficLight1.run()
