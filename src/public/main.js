
// todo tentacle fragment AA/outline
// todo encapsulate current experiments
// todo basic IK for tentacle
// todo basic steering

require.config({
	paths: {
		'animate': 'libs/animate',
		'THREE': 'libs/three.min',
		'glsl': 'libs/glsl'
	},
	shim: {
		'THREE': {
			exports: 'THREE'
		}
	}
});

require([
	'THREE',
	'animate',
	'meshes/eyeballMesh',
	'glsl!shaders/curve_vertex',
	'glsl!shaders/curve_fragment',
	'glsl!shaders/curvefill_vertex',
	'glsl!shaders/curvefill_fragment',
	'glsl!shaders/tentacle_vertex',
	'glsl!shaders/tentacle_fragment'

], function (
	THREE, ANIM, EyeballMesh,
	curve_vertex, curve_fragment, curvefill_vertex, curvefill_fragment,
	tentacle_vertex, tentacle_fragment
) {

	var curveShaderMaterial, curveFillShaderMaterial, tentacleShaderMaterial;
	var renderer, scene, camera;

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	var input;

	var eyeballs = [];

	initScene();
	initMouse();
	initShaders();
	initEyeballs();
	//initCurveGeometry();
	//initCurveGeometry2();

	animate();

	function initScene() {

		camera = new THREE.OrthographicCamera(
			window.innerWidth * -0.5,
			window.innerWidth * 0.5,
			window.innerHeight * 0.5,
			window.innerHeight * -0.5,
			1.0, 1000.0
		);

		camera.position.z = 300.0;

		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0x022D52);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(WIDTH, HEIGHT);

		var container = document.getElementById('container');
		container.appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize, false);
	}

	function initMouse() {

		input = new THREE.Vector3();
		input.set(0.0, 0.0, 0.0);
		renderer.domElement.addEventListener('mousemove', function(event) {
			input.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
			input.y = ((event.clientY / window.innerHeight) * 2.0 - 1.0) * -1.0;
		});
	}

	function initShaders() {

		curveShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {type:'c', value: new THREE.Color(0xffaa00)}
			},
			vertexShader: curve_vertex,
			fragmentShader: curve_fragment,
			transparent: true
		});

		curveFillShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {type:'c', value: new THREE.Color(0xffaa00)}
			},
			vertexShader: curvefill_vertex,
			fragmentShader: curvefill_fragment
		});

		tentacleShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {type:'c', value: new THREE.Color(0xffaa00)},
				uWidth: {type:'f', value: 25.0 },
				uControlPoints: { type:'v3v', value:[]}
			},
			vertexShader: tentacle_vertex,
			fragmentShader: tentacle_fragment
		})
	}

	function randBetween (min, max) {

		return min + Math.random() * (max - min);
	}


	function initEyeballs() {

		var eyeball, i, radius, strokeWidth, pos = new THREE.Vector3(), color = new THREE.Color();

		for (i = 0; i < 200; ++i) {

			pos.x = Math.random() * 2 - 1;
			pos.y = Math.random() * 2 - 1;
			pos.normalize();
			pos.multiplyScalar(Math.random() * 800 - 400);

			radius = Math.random() * 30 + 10;

			strokeWidth = Math.random() * 5 + 3;

			color.setHSL(
				randBetween(0.0, 1.0),
				randBetween(0.7, 1.0),
				randBetween(0.3, 0.5)
			);

			eyeball = new EyeballMesh(radius, color, strokeWidth);
			eyeball.position.copy(pos);
			scene.add(eyeball);

			eyeballs.push(eyeball);
		}
	}

	function getSign(v1, v2, v3) {
		var z = (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x);
		return z / Math.abs(z);
	}

	function getIndex(offset, last, sign) {
		return last * ((offset*=sign)<0) + offset;
	}

	// Experiments in fragment shader based curves with limited tessellation
	function initCurveGeometry() {

		var points = [
			new THREE.Vector3(0.0, 	 0.0, 0.0),
			new THREE.Vector3(50.0,  50.0, 0.0),
			new THREE.Vector3(100.0, 50.0, 0.0),
			new THREE.Vector3(150.0, -15.0, 0.0),
			new THREE.Vector3(200.0, 0.0, 0.0),
			new THREE.Vector3(250.0, -50.0, 0.0),
			new THREE.Vector3(300.0, 0.0, 0.0),
			new THREE.Vector3(300.0, 100.0, 0.0),
			new THREE.Vector3(250.0, 35.0, 0.0),
			new THREE.Vector3(200.0, 70.0, 0.0),
			new THREE.Vector3(150.0, 40.0, 0.0),
			new THREE.Vector3(100.0, 90.0, 0.0),
			new THREE.Vector3(50.0, 75.0, 0.0),
			new THREE.Vector3(0.0, 0.0, 0.0)
		];

		var geometry = new THREE.Geometry(),
			material0 = curveShaderMaterial.clone(),
			material1 = curveFillShaderMaterial.clone(),
			materials = new THREE.MeshFaceMaterial([material0, material1]),
			mesh = new THREE.Mesh(geometry, materials);

		material0.side = THREE.DoubleSide;

		var a, b, c, d, e, fi, i, n, last, sign;

		geometry.vertices.push(points[0]);

		for (i = 1, n = points.length - 1; i < n; ++i) {

			fi = (i-1) * 2;
			a = points[i];
			b = points[i+1];

			if (i < n-1) {
				b = new THREE.Vector3((a.x + b.x) * 0.5, (a.y + b.y) * 0.5, 0);
			}

			geometry.vertices.push(a, b);
			geometry.faces.push(new THREE.Face3(fi, fi + 1, fi + 2, undefined, undefined, 0));
			geometry.faceVertexUvs[0].push([
				new THREE.Vector2(0.0, 0.0),
				new THREE.Vector2(0.5, 0.0),
				new THREE.Vector2(1.0, 1.0)
			]);
		}

		var vertices = geometry.vertices;

		i = 1;
		n = (vertices.length - 1) / 4 - 1;
		last = vertices.length - 1;
		sign = getSign(vertices[0], vertices[2], vertices[1]);

		a = getIndex(0, last, sign);
		b = getIndex(1, last, sign);
		c = getIndex(2, last, sign);
		d = getIndex(-2, last, sign);

			geometry.faces.push(new THREE.Face3(a, b, d, undefined, undefined, 1));
			geometry.faces.push(new THREE.Face3(b, c, d, undefined, undefined, 1));

		for (; i < n; ++i) {

			a = 2*i;
			b = a+1;
			c = -a;
			d = -(a+2);
			e = a+2;

			sign = getSign(vertices[a], vertices[e], vertices[b]);

			a = getIndex(a, last, sign);
			b = getIndex(b, last, sign);
			c = getIndex(c, last, sign);
			d = getIndex(d, last, sign);
			e = getIndex(e, last, sign);

			if (sign > 0) {
				geometry.faces.push(new THREE.Face3(a, b, c, undefined, undefined, 1));
				geometry.faces.push(new THREE.Face3(c, b, d, undefined, undefined, 1));
				geometry.faces.push(new THREE.Face3(d, b, e, undefined, undefined, 1));
			}
			else {
				geometry.faces.push(new THREE.Face3(a, c, b, undefined, undefined, 1));
				geometry.faces.push(new THREE.Face3(c, d, b, undefined, undefined, 1));
				geometry.faces.push(new THREE.Face3(d, e, b, undefined, undefined, 1));
			}
		}

		a = 2*i;
		b = 2*i + 2;
		c = 2*i + 4;

		geometry.faces.push(new THREE.Face3(a, b, c, undefined, undefined, 1));

		scene.add(mesh);

		//debugLines(mesh, points, 0x00ff00);
	}


	// experiments in tessellated curves

	function initCurveGeometry2() {

		var segments = 19, width = 50, length = 200.0;

		var geometry = new THREE.Geometry(),
			material = tentacleShaderMaterial.clone(),
			mesh = new THREE.Mesh(geometry, material);

		var i, n, t;
		var controlPoints = [];
		var animations = [];

		for (i = 0, n = segments+1; i < n; ++i) {
			t = i / (n-1);

			controlPoints[i] = new THREE.Vector3(0.0, length * t, 0.0);

			if (i === n-1) {
				geometry.vertices.push(
					new THREE.Vector3(0.0, i, 0.0)
				)
			}
			else {
				geometry.vertices.push(
					new THREE.Vector3(-1.0, i, 0.0),
					new THREE.Vector3(1.0, i, 0.0)
				);
			}

			// test animation
			animations[i] = ANIM(controlPoints[i])
				.from({
					x: 0
				})
				.to({
					x: 20 + 150 * t
				})
				.duration(700)
				.delay(300 * t*t)
				.using(ANIM.easing.bell5);
		}

		material.uniforms.uControlPoints.value = controlPoints;

		for (i = 0, n = segments-1; i < n; ++i) {
			geometry.faces.push(
				new THREE.Face3(i*2, i*2+1, i*2+2),
				new THREE.Face3(i*2+2, i*2+1, i*2+3)
			);
		}

		geometry.faces.push(
			new THREE.Face3(i*2, i*2+1, i*2+2)
		);

		scene.add(mesh);

		// animation
		var lineMesh = debugLines(scene, controlPoints, 0xffffff);
		lineMesh.geometry.dynamic = true;
		lineMesh.position.x = -200;

		ANIM.group(animations)
			.repeat(Infinity)
			.progress(function() {
				lineMesh.geometry.verticesNeedUpdate = true;
			})
			.start();
	}

	function debugLines(parent, vertices, color) {

		var lineGeometry = new THREE.Geometry(),
			lineMaterial = new THREE.LineBasicMaterial({ color: color }),
			lineMesh = new THREE.Line(lineGeometry, lineMaterial);

		lineGeometry.vertices.push.apply(lineGeometry.vertices, vertices);
		lineMesh.position.z = 1;

		parent.add(lineMesh);

		return lineMesh;

	}

	function onWindowResize() {

		camera.left = window.innerWidth * -0.5;
		camera.right = window.innerWidth * 0.5;
		camera.top = window.innerHeight * 0.5;
		camera.bottom = window.innerHeight * -0.5;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function animate() {

		requestAnimationFrame(animate);

		var vector = input.clone();
			vector.unproject(camera);

		var i = 0,
			n = eyeballs.length;

		var eyeball, now = window.performance.now();

		for (; i < n; ++i) {
			eyeball = eyeballs[i];
			eyeball.setTime(now);
			eyeball.lookAt(vector);
		}

		render();
	}

	function render() {

		renderer.render(scene, camera);
	}
});