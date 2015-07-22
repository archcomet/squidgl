
uniform vec3 uColor;

varying float x;

void main()
{
    float c = x * 0.5 + 0.5;
    gl_FragColor = vec4(c, c, c, 1.0);
}

