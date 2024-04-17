import * as three from 'three';
import gsap from 'gsap';

import Experience from '../Experience.js'
import loadVertexShader from '../shaders/loader/vertex.glsl'
import loadFragmentShader from '../shaders/loader/fragment.glsl'
import EventEmitter from '../Utils/EventEmitter.js';

export default class Loader{
    constructor(){
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.loaderDiv = document.querySelector('.loader-wrapper')
        this.loadingBar = document.querySelector('.loading-bar')
        this.loadingCounter = document.querySelector('.loading-counter_text')

        this.resources.on('progress', (progress) => {
            console.log(`Loading progress: ${progress}%`);
            this.loadingBar.style.transform = `translateX(${progress * 100 - 100}%)`;
            this.loadingCounter.textContent = `${Math.round(progress * 100)}%`;
        });

        this.setupGeometry()
        this.setupMaterial()
        this.setupPlane()

        this.setupLoad()
    }

    setupGeometry(){
        this.overlayGeometry = new three.PlaneGeometry(2, 2, 1, 1)
    }

    setupMaterial() {
        this.overlayMaterial = new three.ShaderMaterial({ 
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 },
                uTime: { value: 0 }
            },
            vertexShader: loadVertexShader,
            fragmentShader: loadFragmentShader
        });
    }

    setupPlane() {

        this.overlay = new three.Mesh(this.overlayGeometry, this.overlayMaterial);
        this.experience.scene.add(this.overlay);
    }

    setupLoad(){
        
            this.resources.on('ready', () => {
                gsap.timeline({
                    onComplete: () => {
                        this.scene.remove(this.overlay)
                        this.loaderDiv.remove();
                    }
                })
                .to(this.overlayMaterial.uniforms.uAlpha, {
                    value: 0,
                    duration: 2,
                    ease: 'power2.out'
                })
                .to(this.loaderDiv, {
                    opacity: 0, 
                    duration: 1,
                    ease: 'power2.out',
                })
                
        })    
        
    }

}

