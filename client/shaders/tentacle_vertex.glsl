#ifndef SEGMENTS
	#define SEGMENTS 40.0
#endif

#ifndef DEFLECTION
	#define DEFLECTION 0.15
#endif

uniform vec2 uControlPoints[int(SEGMENTS) + 1];
uniform float uWidth;

varying float vWidth;
varying float vWidthT;

void main()
{
	int idx = int(position.z);
 	int dir = int(position.x + 1.0 - abs(position.x));

	vec2 a = uControlPoints[idx];
	vec2 b = uControlPoints[idx+dir];

	float aHeight = 0.5 * uWidth * (1.0 - float(idx) / SEGMENTS) * position.y;
	float bHeight = 0.5 * uWidth * (1.0 - float(idx+dir) / SEGMENTS) * position.y;
	float cHeight = DEFLECTION * (bHeight - aHeight) + aHeight;

	vec2 ab = (b-a);
	vec2 u = normalize(ab);
	vec2 v = u.yx * cHeight * float(dir);

	v.y *= -1.0;
	u *= DEFLECTION * length(ab) * position.x * position.x;

	vec2 pos = a + u + v;

	vWidth = abs(cHeight);
	vWidthT = abs(position.y);

	gl_Position = projectionMatrix * viewMatrix *  vec4(pos, 0.0, 1.0);

}