#ifndef WHITE
    #define WHITE vec3(1.0, 1.0, 1.0)
#endif

#ifndef BLACK
    #define BLACK vec3(0.0, 0.0, 0.0)
#endif

#ifndef SCLARA_RATIO
    #define SCLARA_RATIO 0.6
#endif

#ifndef IRIS_RATIO
    #define IRIS_RATIO 0.38
#endif

uniform float uRadius;
uniform vec3 uColor;
uniform vec3 uStroke;
uniform float uStrokeWidth;
uniform vec2 uLookAt;
uniform float uTime;
uniform float uDepth;

varying float vBodyRadius;
varying float vStrokeRadius;
varying vec2 vWorldPosition;
varying vec2 vFragCoord;

void clampVector(inout vec2 v, in float min, in float max)
{
    v = normalize(v) * clamp(length(v), min, max);
}

void sdfCircle(inout vec4 color, vec3 mixColor, float d, float radius)
{
    color = mix(color, vec4(mixColor, 1.0), 1.0 - clamp(d - radius, 0.0, 1.0));
}

void main()
{
    vec2 irisPos = uLookAt - vWorldPosition;

    float sclaraRadius = uRadius * SCLARA_RATIO;
    float irisRadius = uRadius * IRIS_RATIO;

    clampVector(irisPos, 0.0, sclaraRadius - irisRadius);

    float bodyDist = length(vFragCoord);
    float irisDist = length(irisPos - vFragCoord);

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

    sdfCircle(color, uStroke, bodyDist, vStrokeRadius);
    sdfCircle(color, uColor, bodyDist, vBodyRadius);
    sdfCircle(color, WHITE, bodyDist, sclaraRadius);
    sdfCircle(color, BLACK, irisDist, irisRadius);

    gl_FragColor = color;
}

