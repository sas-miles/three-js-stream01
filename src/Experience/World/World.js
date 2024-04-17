import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Apartment from "./Apartment.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      console.log("Resources ready");

      //Setup
      this.apartment = new Apartment();
      this.environment = new Environment();
    });
  }

  update() {}
}
