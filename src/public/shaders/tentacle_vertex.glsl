
uniform vec2 uControlPoints[21];
uniform float uWidth;

void main()
{
	int i = int(position.y);
	vec2 pos = uControlPoints[i];
	vec2 cp = uControlPoints[i+1];
	vec2 d0 = normalize(cp - pos) * (uWidth * (1.0-(position.y/19.0))) * position.x;

	d0 = d0.yx;
	d0.y *= -1.0;
	pos += d0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
}