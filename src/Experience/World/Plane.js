import * as THREE from 'three'

import Experience from '../Experience.js'

import planeVertexShader from '../shaders/plane/vertex.glsl'
import planeFragmentShader from '../shaders/plane/fragment.glsl'


export default class Plane {   
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug  
        this.planeVertexShader = planeVertexShader
        this.planeFragmentShader = planeFragmentShader

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Plane')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()        

    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(5,5, 64, 64)
    }

    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: this.planeVertexShader,
            fragmentShader: this.planeFragmentShader,
        })

    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        if(this.debug.active){
            this.debugFolder.add(this.mesh.position, 'x')
            .min(-5)
            .max(5)
            .step(0.001)
            .name('Plane X')   

            this.debugFolder.add(this.mesh.position, 'y')
            .min(-5)
            .max(5)
            .step(0.001)
            .name('Plane Y')

            this.debugFolder.add(this.mesh.position, 'z')
            .min(-5)
            .max(5)
            .step(0.001)
            .name('Plane Z')


        }
    }
}