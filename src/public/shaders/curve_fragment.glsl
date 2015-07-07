
#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uColor;

varying vec2 vUv;

void main()
{
    float t = vUv.x * vUv.x - vUv.y;
    float a = float(gl_FrontFacing && t < 0.0) + float(!gl_FrontFacing && t > 0.0);
    gl_FragColor = vec4(uColor, a);
}

