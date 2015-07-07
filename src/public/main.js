
require.config({
	paths: {
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
	'glsl!shaders/eyeball_vertex',
	'glsl!shaders/eyeball_fragment',
	'glsl!shaders/curve_vertex',
	'glsl!shaders/curve_fragment'

], function (THREE, eyeball_vertex, eyeball_fragment, curve_vertex, curve_fragment) {

	var eyeballShaderMaterial, curveShaderMaterial;
	var renderer, scene, camera;

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	var input;

	var eyeballUniforms = [];

	initScene();
	initMouse();
	initShaders();
	initEyeballs();
	//initCurveGeometry();

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

		eyeballShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uRadius: {type: 'f', value: 30.0},
				uStrokeWidth: {type: 'f', value: 4.0},
				uTime: {type: 'f', value: 0.0},
				uDepth: {type: 'f', value: 1.0},
				uColor: {type: 'c', value: new THREE.Color() },
				uStroke: {type: 'c', value: new THREE.Color() },
				uLookAt: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)}
			},
			vertexShader: eyeball_vertex,
			fragmentShader: eyeball_fragment,
			transparent: true
		});

		curveShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {type:'c', value: new THREE.Color(0xffaa00)}
			},
			vertexShader: curve_vertex,
			fragmentShader: curve_fragment,
			transparent: true
		});
	}

	function createEyeball(position, radius, strokeWidth, color) {

		var geometrySize = (radius + strokeWidth)* 2.0 * 1.17;

		var geometry = new THREE.PlaneBufferGeometry(geometrySize, geometrySize, 1.0, 1.0),
			material = eyeballShaderMaterial.clone(),
			mesh = new THREE.Mesh(geometry, material);

		var uniforms = material.uniforms;

		uniforms.uRadius.value = radius;
		uniforms.uStrokeWidth.value = strokeWidth;
		uniforms.uColor.value.copy(color);
		uniforms.uStroke.value.copy(color);
		uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);

		mesh.position.copy(position);

		scene.add(mesh);

		eyeballUniforms.push(uniforms);
	}

	function randBetween (min, max) {

		return min + Math.random() * (max - min);
	}


	function initEyeballs() {

		var i, radius, strokeWidth, pos = new THREE.Vector3(), color = new THREE.Color();

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

			createEyeball(pos, radius, strokeWidth, color);
		}
	}

	function initCurveGeometry() {

		var points = [

			// 0
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
			material = curveShaderMaterial.clone(),
			mesh = new THREE.Mesh(geometry, material);


		var cps = [points[0]];


		material.side = THREE.DoubleSide;

		var a, b, fi, i, n;

		geometry.vertices.push(points[0]);

		for (i = 1, n = points.length - 1; i < n; ++i) {

			fi = (i-1) * 2;

			a = points[i];
			b = points[i+1];

			if (i < n-1) {
				b = new THREE.Vector3((a.x + b.x) * 0.5, (a.y + b.y) * 0.5, 0);
				cps.push(b);
			}

			geometry.vertices.push(a, b);
			geometry.faces.push(new THREE.Face3(fi, fi + 1, fi + 2));
			geometry.faceVertexUvs[0].push([
				new THREE.Vector2(0.0, 0.0),
				new THREE.Vector2(0.5, 0.0),
				new THREE.Vector2(1.0, 1.0)
			]);
		}

		cps.push(points[0]);
		scene.add(mesh);

		debugLines(mesh, points, 0x00ff00);
		debugLines(mesh, cps, 0xff0000);
	}

	function debugLines(parent, vertices, color) {

		var lineGeometry = new THREE.Geometry(),
			lineMaterial = new THREE.LineBasicMaterial({ color: color }),
			lineMesh = new THREE.Line(lineGeometry, lineMaterial);

		lineGeometry.vertices.push.apply(lineGeometry.vertices, vertices);
		lineMesh.position.z = 1;

		parent.add(lineMesh);

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
			n = eyeballUniforms.length;

		var uniforms;

		for (; i < n; ++i) {
			uniforms = eyeballUniforms[i];
			uniforms.uTime.value = window.performance.now();
			uniforms.uLookAt.value.copy(vector);
		}

		render();
	}

	function render() {

		renderer.render(scene, camera);
	}
});