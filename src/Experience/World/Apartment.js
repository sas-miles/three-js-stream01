import * as THREE from "three";

import Experience from "../Experience.js";

export default class Apartment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    //Setup
    this.resource = this.resources.items.apartmentModel;
    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.8, 0.8, 0.8);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
}
