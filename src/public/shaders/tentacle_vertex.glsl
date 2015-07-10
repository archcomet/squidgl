
uniform vec3 uControlPoints[20];
uniform float uWidth;

void main()
{

	int i = int(position.y);

	vec3 cp = uControlPoints[i];

	float x = position.x * uWidth * 0.5 * (1.0-(position.y / 19.0)) + cp.x;
	float y = cp.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, 0.0, 1.0);
}