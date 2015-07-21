
uniform float uRadius;
uniform float uStrokeWidth;
uniform float uTime;

varying vec2 vFragCoord;
varying vec2 vWorldPosition;

varying float vBodyRadius;
varying float vStrokeRadius;

void main()
{
    float t = sin((uTime / uRadius) * PULSE_SPEED);

    vBodyRadius = uRadius * (1.0 + (t*t*t*t*t*t*t*t*t*t) * PULSE_SIZE);
    vStrokeRadius = vBodyRadius + uStrokeWidth;
    vFragCoord = (position * (vStrokeRadius + 2.0)).xy;
    vWorldPosition = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xy;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vFragCoord, 0.0, 1.0);
}