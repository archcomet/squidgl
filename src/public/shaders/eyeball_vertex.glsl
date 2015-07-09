
varying vec2 vFragCoord;
varying vec2 vWorldPosition;

void main()
{
    vec4 worldPosition = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

    vFragCoord = position.xy;
    vWorldPosition = worldPosition.xy;
}