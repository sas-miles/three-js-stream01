import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Floor from './Floor.js'
import Plane from './Plane.js'


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            console.log('Resources ready')

            //Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
            
        }) 

        this.plane = new Plane()

    }

    update() {
        if(this.fox)
            this.fox.update()
    }   
}