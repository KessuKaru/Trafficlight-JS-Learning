// @ts-check

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
    this.renderToDOM();
  }

  off() {
    this.currentColour = this.offColour;
    this.renderToDOM();
  }

  renderToDOM() {
    this.html.style.backgroundColor = this.currentColour;
    // console.log(this.onColour + " light is: " + this.currentColour);
  }
}

export class TrafficLight extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const lightBox = document.createElement("div");
    const style = document.createElement("style");

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
      margin: 5px;
    }
    `;
    lightBox.className = "ampel";

    this.redlight = new Light("red", lightBox);
    this.yellowlight = new Light("yellow", lightBox);
    this.greenlight = new Light("green", lightBox);

    shadow.append(style, lightBox);

    this.state = "OFF";
    this.busy = false;
    this.timeoutID;
    this.timeout = 2000;
  }

  // If in RED state, switches to redYellow state
  // and then after timeYellow to green state.
  switchToGreen() {
    this.advanceStatemachine("switchToGreen");
  }

  // If in GREEN state, switches to Yellow state
  // and then after timeYellow to green state.
  switchToRed() {
    this.advanceStatemachine("switchToRed");
  }

  enable() {
    this.advanceStatemachine("enable");
  }

  disable() {
    this.advanceStatemachine("disable");
  }

  // This state machine controls the trafic light colour changes
  advanceStatemachine(event) {
    /* Inputs: switchToGreen, switchToRed, timerDone, enable, disable
     * Outputs: redlight on/off, yellowlight on/off, greenlight on/off, timerTrigger, busy, enable
     * States: OFF, RED, REDYELLOW, GREEN, YELLOW
     */

    let oldSate = this.state;

    /* Handle the state transitions based on the input event and the current state */
    if (event === "disable") {
      this.state = "OFF";
    } else {
      switch (this.state) {
        case "RED":
          if (event === "switchToGreen") {
            this.state = "REDYELLOW";
          }
          break;

        case "REDYELLOW":
          if (event === "timerDone") {
            this.state = "GREEN";
          }
          break;

        case "GREEN":
          if (event === "switchToRed") {
            this.state = "YELLOW";
          }
          break;

        case "YELLOW":
          if (event === "timerDone") {
            this.state = "RED";
          }
          break;

        case "OFF":
          if (event === "enable") {
            this.state = "RED";
          }
          break;

        default:
          break;
      }
    }

    // Only process outputs on state change.
    if (oldSate !== this.state)
      /* Handle the outputs (lights on and off) based on the state after the transition */
      switch (this.state) {
        case "RED":
          this.redlight.on();
          this.yellowlight.off();
          this.greenlight.off();
          this.busy = false;
          break;

        case "REDYELLOW":
          this.redlight.on();
          this.yellowlight.on();
          this.greenlight.off();
          this.busy = true;
          this.timeoutID = setTimeout(
            this.timerCallback.bind(this),
            this.timeout
          );
          break;

        case "GREEN":
          this.redlight.off();
          this.yellowlight.off();
          this.greenlight.on();
          this.busy = false;
          break;

        case "YELLOW":
          this.redlight.off();
          this.yellowlight.on();
          this.greenlight.off();
          this.busy = true;
          this.timeoutID = setTimeout(
            this.timerCallback.bind(this),
            this.timeout
          );
          break;

        case "OFF":
          this.redlight.off();
          this.yellowlight.off();
          this.greenlight.off();
          this.busy = false;
          break;

        default:
          break;
      }
  }

  timerCallback() {
    this.advanceStatemachine("timerDone");
  }
}

customElements.define("traffic-light", TrafficLight);

