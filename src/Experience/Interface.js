import gsap from "gsap";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/Addons.js";

import Experience from "./Experience.js";

export default class Interface {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera.instance;

    if (this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder("Interface");
      this.debugFolder.open();
    }

    this.labelTarget = document.querySelectorAll(".label");

    this.setLabels();
    this.LabelRenderer();
  }

  setLabels() {
    this.labelTarget.forEach((item) => {
      //get dom elements and values from data attributes
      const label = item.getAttribute("data-label");
      const labelX = item.getAttribute("label-x");
      const labelY = item.getAttribute("label-y");
      const labelZ = item.getAttribute("label-z");

      //create css 2d elements and add them to the scene
      const labelObject = new CSS2DObject(item);
      labelObject.position.set(labelX, labelY, labelZ);

      this.scene.add(labelObject);

      //add debug

      if (this.debug.active) {
        const labelFolder = this.debugFolder.addFolder(label);
        labelFolder.open();

        labelFolder
          .add(labelObject.position, "x")
          .min(-10)
          .max(10)
          .step(0.001)
          .name("position x");

        labelFolder
          .add(labelObject.position, "y", -10, 10, 0.001)
          .name("position y");

        labelFolder
          .add(labelObject.position, "z")
          .min(-10)
          .max(10)
          .step(0.001)
          .name("position z");
      }
    });

    this.modalOpenClose();
  }

  modalOpenClose() {
    const parentElement = document.body;

    parentElement.addEventListener("click", (event) => {
      if (event.target.matches(".label")) {
        const label = event.target.getAttribute("data-label");
        const modalTarget = document.querySelector(
          `div.modal-target[data-label="${label}"]`
        );

        const modalBgOverlay = modalTarget.querySelector(
          ".modal2_background-overlay"
        );

        const modalContent = modalTarget.querySelector(
          ".modal2_content-wrapper"
        );

        gsap.set(modalBgOverlay, { opacity: 0 });
        gsap.set(modalContent, { opacity: 0, x: "100%" });

        gsap
          .timeline({
            onStart: () => {
              modalTarget.style.display = "block";
            },
          })
          .to(modalBgOverlay, { opacity: 1, duration: 0.5, ease: "power2.out" })
          .to(modalContent, {
            opacity: 1,
            x: "0%",
            duration: 0.5,
            ease: "power2.out",
          });
      }

      if (
        event.target.matches(".modal2_close-button, .modal2_background-overlay")
      ) {
        const modalTarget = event.target.closest(".modal-target");
        const modalContent = modalTarget.querySelector(
          ".modal2_content-wrapper"
        );
        const modalBgOverlay = modalTarget.querySelector(
          ".modal2_background-overlay"
        );

        gsap
          .timeline({
            onComplete: () => {
              modalTarget.style.display = "none";
            },
          })
          .to(modalContent, {
            opacity: 0,
            x: "100%",
            duration: 0.5,
            ease: "power2.out",
          })
          .to(modalBgOverlay, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
      }
    });
  }

  LabelRenderer() {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    this.labelRenderer.domElement.style.position = "fixed";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.labelRenderer.domElement);
  }

  resize() {
    this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    if (this.labelRenderer) this.labelRenderer.render(this.scene, this.camera);
  }
}
