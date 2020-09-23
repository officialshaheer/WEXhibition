function loadGame() {
	// load the environment
	loadEnvironment();

}

function loadEnvironment() {
	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

	scene.add( sphere );
}