// @ts-check

import { TrafficLight } from "./trafficlight.js";

export class crossingController {
  #Steve;
  #Isabella;
  #Marvin;
  #Eleanor;
  #state;
  #timeoutID;
  #enabled;

  /**
   * @param {TrafficLight} tl1
   * @param {TrafficLight} tl2
   * @param {TrafficLight} tl3
   * @param {TrafficLight} tl4
   */
  constructor(tl1, tl2, tl3, tl4) {
    this.#Steve = tl1;
    this.#Isabella = tl2;
    this.#Marvin = tl3;
    this.#Eleanor = tl4;
    this.#state = "OFF";
    this.#timeoutID = undefined;
    this.#enabled = false;
  }

  enable() {
    this.#Steve.enable();
    this.#Isabella.enable();
    this.#Marvin.enable();
    this.#Eleanor.enable();
    this.#enabled = true;
  }

  disable() {
    this.#Steve.disable();
    this.#Isabella.disable();
    this.#Marvin.disable();
    this.#Eleanor.disable();
    this.#enabled = false;
  }

  switchLaneGo(lane) {
    switch (lane) {
      case 1:
        this.#Isabella.switchToGreen();
        this.#Eleanor.switchToGreen();
        break;
      case 2:
        this.#Steve.switchToGreen();
        this.#Marvin.switchToGreen();
        break;

      default:
        break;
    }
  }

  switchLaneHalt(lane) {
    switch (lane) {
      case 1:
        this.#Isabella.switchToRed();
        this.#Eleanor.switchToRed();
        break;
      case 2:
        this.#Steve.switchToRed();
        this.#Marvin.switchToRed();
        break;

      default:
        break;
    }
  }

  startLoop() {
    if (this.#enabled) this.advanceStatemachine("enable");
  }

  disableLoop() {
    this.advanceStatemachine("disable");
  }

  advanceStatemachine(event) {
    let oldSate = this.#state;

    if (event === "disable") {
      this.#state = "OFF";
    } else {
      switch (this.#state) {
        case "OFF":
          if (event === "enable") {
            this.#state = "GR";
          }
          break;
        case "GR":
          if (event === "TIME") {
            this.#state = "RR1";
          }
          break;

        case "RR1":
          if (event === "TIME") {
            this.#state = "RG";
          }
          break;

        case "RG":
          if (event === "TIME") {
            this.#state = "RR2";
          }
          break;

        case "RR2":
          if (event === "TIME") {
            this.#state = "GR";
          }
          break;

        default:
          break;
      }
    }

    if (oldSate !== this.#state)
      switch (this.#state) {
        case "GR":
          this.switchLaneGo(1);
          this.switchLaneHalt(2);
          this.#timeoutID = setTimeout(this.timerCallback.bind(this), 13000);
          break;

        case "RR1":
          this.switchLaneHalt(1);
          this.switchLaneHalt(2);
          this.#timeoutID = setTimeout(this.timerCallback.bind(this), 8000);
          break;

        case "RG":
          this.switchLaneGo(2);
          this.switchLaneHalt(1);
          this.#timeoutID = setTimeout(this.timerCallback.bind(this), 13000);
          break;

        case "RR2":
          this.switchLaneHalt(1);
          this.switchLaneHalt(2);
          this.#timeoutID = setTimeout(this.timerCallback.bind(this), 8000);
          break;

        default:
          break;
      }
  }
  timerCallback() {
    this.advanceStatemachine("TIME");
  }
}
