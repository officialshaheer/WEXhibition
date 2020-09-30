
var Player = function( playerID ) {
	this.playerID = playerID;
	this.isMainPlayer = false;
	this.mesh;

	// Box
	// var cube_geometry = new THREE.BoxGeometry (1,1,1);
	// var cube_material = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: false});
	var tireGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16);
	var material = new THREE.MeshBasicMaterial({color: 0xccffff, wireframe: true,castShadows: true});
	var tires = new THREE.Mesh(tireGeo, material);
	tires.rotation.z = 0.5*Math.PI;
	tires.position.set(0,-0.58,1);

	var tire2Geo = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16);
	var material2 = new THREE.MeshBasicMaterial({color: 0xccffff, wireframe: false});
	var tires2 = new THREE.Mesh(tire2Geo, material2);
	tires2.rotation.z = 0.5*Math.PI;
	tires2.position.set(0,-0.58,-1);

	var boxGeo = new THREE.BoxGeometry (1,1,2.5);
	tires.updateMatrix();
	tires2.updateMatrix();

	boxGeo.merge(tires.geometry, tires.matrix);
	boxGeo.merge(tires2.geometry, tires2.matrix);

	
	var scope = this;

	this.init = function() {
          
        scope.mesh = new THREE.Mesh(boxGeo,material);
		scene.add(scope.mesh);
		scope.mesh.position.x = 190;
		scope.mesh.position.y = 0.85;
		scope.mesh.position.z = 470;

		if (scope.isMainPlayer) {
			// Give player control of this mesh
			controls = new THREE.PlayerControls(camera, scope.mesh);
			controls.init();
		}
    	
	};
	// placing the next player
	this.setOrientation = function(position, rotation) {
		if (scope.mesh) {
			scope.mesh.position.copy(position);
			// scope.mesh.rotation.copy(rotation);
			scope.mesh.rotation.x = rotation.x;
			scope.mesh.rotation.y = rotation.y;
			scope.mesh.rotation.z = rotation.z;
		}
	};
};