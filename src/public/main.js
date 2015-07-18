
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
	'meshes/tentacleMesh'

], function (
	THREE, ANIM, EyeballMesh, TentacleMesh
) {

	var renderer, scene, camera;

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	var input;

	var eyeballs = [];
	var tentacles = [];

	initScene();
	initMouse();
//	initEyeballs();
	initTentacles();


	update();

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

	function randBetween (min, max) {
		return min + Math.random() * (max - min);
	}

	function initEyeballs() {

		var eyeball, i, radius, strokeWidth, pos = new THREE.Vector3(), color = new THREE.Color();

		for (i = 0; i < 20; ++i) {

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

	function initTentacles() {
		var tentacle = new TentacleMesh(30, 200, new THREE.Color(0xffaa00), 20);

		tentacles.push(tentacle);
		scene.add(tentacle);
	}

	// experiments in tessellated curves

	function onWindowResize() {

		camera.left = window.innerWidth * -0.5;
		camera.right = window.innerWidth * 0.5;
		camera.top = window.innerHeight * 0.5;
		camera.bottom = window.innerHeight * -0.5;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function update() {
		requestAnimationFrame(update);

		var vector = input.clone();
			vector.unproject(camera);

		var i = 0,
			n = eyeballs.length;

		var eyeball, tentacle, now = window.performance.now();

		for (; i < n; ++i) {
			eyeball = eyeballs[i];
			eyeball.setTime(now);
			eyeball.lookAt(vector);
		}


		for (i = 0, n = tentacles.length; i < n; ++i) {
			//var x = Math.cos(now/1000) * 250;
			//var y = Math.sin(now/1000) * 250;

			tentacle = tentacles[i];
			tentacle.update(vector);


		}

		render();
	}

	function render() {
		renderer.render(scene, camera);
	}
});