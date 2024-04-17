uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {

    float color = 1.0 - vUv.y * vUv.x;

    gl_FragColor = vec4(color, 0.5, color * 0.1, 1.0);

    #include <colorspace_fragment>
}

