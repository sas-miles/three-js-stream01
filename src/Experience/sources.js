export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/nx.jpg',
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/ny.jpg',
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/nz.jpg',
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/px.jpg',
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/py.jpg',
            'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/environmentMap/px.jpg',
            
        ]
    }, 

    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/dirt/color.jpg'
    },

    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/dirt/normal.jpg'
    },

    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'https://webflow-public-assets.s3.amazonaws.com/three-projects/starter-files/Fox.glb'
    }

]