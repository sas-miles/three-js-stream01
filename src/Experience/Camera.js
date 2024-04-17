import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    this.controls.minPolarAngle = THREE.MathUtils.degToRad(10);
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(80);

    this.controls.minAzimuthAngle = THREE.MathUtils.degToRad(-35);
    this.controls.maxAzimuthAngle = THREE.MathUtils.degToRad(35);

    this.controls.minDistance = 10;
    this.controls.maxDistance = 22;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
