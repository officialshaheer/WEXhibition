var container, scene, camera, renderer;

var controls;

var sky, sun;

init();

animate();

function init() {
	// Setup
	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;
	camera.lookAt(0,0,0);

	renderer = new THREE.WebGLRenderer( { alpha: false} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight);
	// renderer.shadowMap.enabled = true; //For Shadows


	// Load Game world
	loadGame();

	// Events
	window.addEventListener("resize", onWindowResize, false);

	container.appendChild(renderer.domElement);
	document.body.appendChild( container );
 
}

function animate() {
	requestAnimationFrame( animate );

	if(controls){
		controls.update();
	}

	// Particle System Animation
    var particleSystem = scene.getObjectByName('particleSystem');
    particleSystem.rotation.y += 0.01;

	render();
}

function render() {

	renderer.clear();
	renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
}


	