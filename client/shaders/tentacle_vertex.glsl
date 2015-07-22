#ifndef SEGMENTS
	#define SEGMENTS 40.0
#endif

#ifndef DEFLECTION
	#define DEFLECTION 0.15
#endif

uniform vec2 uControlPoints[int(SEGMENTS) + 1];
uniform float uWidth;

varying float x;

void main()
{
	int idx = int(position.z);
 	int next = int(position.x + 1.0 - abs(position.x));

	vec2 a = uControlPoints[idx];
	vec2 b = uControlPoints[idx+next];

	float aHeight = 0.5 * uWidth * (1.0 - float(idx) / SEGMENTS) * position.y;
	float bHeight = 0.5 * uWidth * (1.0 - float(idx+next) / SEGMENTS) * position.y;
	float cHeight = DEFLECTION * (bHeight - aHeight) + aHeight;

	vec2 ab = (b-a);
	float abLength = length(ab);

	vec2 u = ab / abLength;
	vec2 v = u.yx * cHeight * float(next);

	v.y *= -1.0;
	u *= DEFLECTION * abLength * position.x * position.x;

	x = position.x;

	gl_Position = projectionMatrix * viewMatrix *  vec4(a + u + v, 0.0, 1.0);

}