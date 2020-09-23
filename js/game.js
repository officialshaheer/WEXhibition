var player;

function loadGame() {
	// load the environment
	loadEnvironment();

	// load the player
	player = new Player( "1" );
	player.isMainPlayer = true;
	player.init();

}

function loadEnvironment() {
	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

	scene.add( sphere );
}