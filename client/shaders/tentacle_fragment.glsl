
uniform float uWidth;
uniform vec3 uColor;
uniform vec3 uStroke;
uniform float uStrokeWidth;

varying float vWidth;
varying float vWidthT;

void main()
{
    float width = (vWidth / vWidthT) - vWidth;
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    color = mix(color, vec4(uStroke, 1.0), clamp(width - 0.25, 0.0, 1.0));
    color = mix(color, vec4(uColor, 1.0), clamp(width - uStrokeWidth, 0.0, 1.0));
    gl_FragColor = color;
}

