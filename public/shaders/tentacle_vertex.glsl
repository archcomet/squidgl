
uniform vec2 uControlPoints[21];
uniform float uWidth;

void main()
{
	// Get the CP index that is nearest the vertex
	int idx = int(position.z);
 	int next = int(position.x);
	next += int(1.0 - abs(position.x));

	vec4 pos;

	if (position.x == 0.0) {

		vec2 a = uControlPoints[idx];
		vec2 b = uControlPoints[idx+next];

		float aHeight = 0.5 * uWidth * (1.0 - float(idx) / 20.0);

		vec2 u = normalize(b - a) * aHeight * position.y;
		vec2 v = u.yx;
		v.y *= -1.0;

		pos = vec4(a + v, 0.0, 1.0);
	}
	else {




	}


	gl_Position = projectionMatrix * viewMatrix * pos;

//	// Get the direction vector and length between the CPs
//	vec2 a = uControlPoints[idx];
//	vec2 b = uControlPoints[idx+next];
//	vec2 u = b - a;
//	float length = length(u);
//
//	// Get the heights at the two CPs
//	float aHeight = 0.5 * uWidth * (1.0 - float(idx) / 20.0);
//	float bHeight = 0.5 * uWidth * (1.0 - (float(idx+next)) / 20.0);
//
//	// Work out v
//	float pOffset = length * 0.15 * (position.x);
//	float pHeight = position.y * ((bHeight - aHeight) * pOffset / length + aHeight);
//
//	vec2 norm = u / length;
//
//	vec2 pX = norm * pOffset;
//	vec2 pY = (norm * pHeight).yx;
//	pY.y *= -1.0;
//
//	vec2 pos = a + pX + pY;
//
//    gl_Position = projectionMatrix * viewMatrix * vec4(pos, 0.0, 1.0);
}