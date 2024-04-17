import * as THREE from "three";

import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder("Environment");
    }

    this.setSunLight();
    this.setLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(0, 0.38, 8.156);
    this.scene.add(this.sunLight);

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Sun Light Intensity");

      this.debugFolder
        .add(this.sunLight.position, "x")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Sun X");

      this.debugFolder
        .add(this.sunLight.position, "y")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Sun Y");

      this.debugFolder
        .add(this.sunLight.position, "z")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Sun Z");
    }
  }

  setLight() {
    this.light = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.light);

    this.rectLight = new THREE.RectAreaLight(0xff2424, 1.3, 56, 56);
    this.rectLight.position.set(-10.62, -0.787, 26.253);
    this.scene.add(this.rectLight);

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.light, "intensity")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Ambient Light Intensity");

      this.debugFolder
        .add(this.rectLight, "intensity")
        .min(0)
        .max(10)
        .step(0.001)
        .name("Rect Light Intensity");

      this.debugFolder
        .add(this.rectLight.position, "x")
        .min(-10)
        .max(10)
        .step(0.001)
        .name("Rect X");

      this.debugFolder
        .add(this.rectLight.position, "y")
        .min(-10)
        .max(10)
        .step(0.001)
        .name("Rect Y");

      this.debugFolder
        .add(this.rectLight.position, "z")
        .min(-10)
        .max(10)
        .step(0.001)
        .name("Rect Z");
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environmentMap.updateMaterial();

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .min(0)
        .max(4)
        .step(0.001)
        .name("Env Map Intensity")
        .onChange(this.environmentMap.updateMaterial);
    }
  }
}
