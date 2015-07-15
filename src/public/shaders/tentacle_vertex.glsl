
uniform vec2 uControlPoints[21];
uniform float uWidth;

void main()
{
	int i = int(position.y);
	vec2 curr = uControlPoints[i];
	vec2 next = uControlPoints[i+1];
	vec2 d0 = normalize(next - curr) * (uWidth * (1.0-(position.y/19.0))) * position.x;

	d0 = d0.yx;
	d0.y *= -1.0;
	curr += d0;

    gl_Position = projectionMatrix * viewMatrix * vec4(curr, 0.0, 1.0);
}