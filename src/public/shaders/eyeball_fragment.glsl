
uniform float uRadius;
uniform vec3 uColor;
uniform vec3 uStroke;
uniform float uStrokeWidth;
uniform vec2 uLookAt;
uniform float uTime;
uniform float uDepth;

varying vec2 vWorldPosition;
varying vec2 vFragCoord;

#define PULSE_SPEED 0.1
#define PULSE_SIZE 0.15
#define SCLARA_RATIO 0.6
#define IRIS_RATIO 0.38
#define WHITE vec3(1.0, 1.0, 1.0)
#define BLACK vec3(0.0, 0.0, 0.0)

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
    float t = sin((uTime / uRadius) * PULSE_SPEED);

    vec2 irisPos = uLookAt - vWorldPosition;

    float bodyRadius = uRadius * (1.0 + (t*t*t*t*t*t*t*t*t*t) * PULSE_SIZE);
    float strokeRadius = bodyRadius + uStrokeWidth;
    float sclaraRadius = uRadius * SCLARA_RATIO;
    float irisRadius = uRadius * IRIS_RATIO;

    clampVector(irisPos, 0.0, sclaraRadius - irisRadius);

    float bodyDist = length(vFragCoord);
    float irisDist = length(irisPos - vFragCoord);

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

    sdfCircle(color, uStroke, bodyDist, strokeRadius);
    sdfCircle(color, uColor, bodyDist, bodyRadius);
    sdfCircle(color, WHITE, bodyDist, sclaraRadius);
    sdfCircle(color, BLACK, irisDist, irisRadius);

//
    gl_FragColor = color;
}

