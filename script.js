class Light {
  constructor(colour, parent) {
    this.offColour = "gray";
    this.onColour = colour;
    this.currentColour = this.offColour;
    this.html = document.createElement("span");

    this.html.className = "light";
    parent.appendChild(this.html);
  }

  on() {
    this.currentColour = this.onColour;
    this.renderToDOM()
  }

  off() {
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

    // TODO: Move light style to lights
    style.textContent = `
    .light {
      height: 50px;
      width: 50px;
      background-color: gray;
      border-radius: 50%;
      display: inline-block;
      margin: 5px;
    }

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

  // TODO: Remove, not necessary right now
  connectedCallback() {
    this.onclick = this.run;
  }

  run() {
    // TODO: Should not force switch states!
    this.enterRedState();
  }

  // If in RED state, switches to redYellow state
  // and then after timeYellow to green state.
  switchToGreen() {
    // If in state red:
    // ?

    // State RedYellow
    this.redlight.on();
    this.yellowlight.on();
    this.greenlight.off();

    // Wait for timeYellow
    // ?

    // State Green
    this.redlight.off();
    this.yellowlight.off();
    this.greenlight.on();
  }

  // If in GREEN state, switches to Yellow state
  // and then after timeYellow to green state.
  switchToRed() {
    

    
  }





  enterRedState() {
    this.redlight.on();
    this.yellowlight.off();
    this.greenlight.off();

    setTimeout(this.enterRedYellowState.bind(this), 5000);
  }

  enterRedYellowState() {
    this.redlight.on();
    this.yellowlight.on();
    this.greenlight.off();

    setTimeout(this.enterGreenState.bind(this), 2000);
  }
  enterGreenState() {
    this.redlight.off();
    this.yellowlight.off();
    this.greenlight.on();

    setTimeout(this.enterYellowState.bind(this), 5000);
  }
  enterYellowState() {
    this.redlight.off();
    this.yellowlight.on();
    this.greenlight.off();

    setTimeout(this.enterRedState.bind(this), 2000);
  }
}

customElements.define("traffic-light", TrafficLight);

// let trafficLight1 = new TrafficLight("")
// trafficLight1.run()
