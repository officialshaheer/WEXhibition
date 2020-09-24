var fbRef = new Firebase("https://wexhibition-b92d8.firebaseio.com/data");

var otherPlayers = {};

var playerID;
var player;

function loadGame() {
	// load the environment
	loadEnvironment();

	// load the player
	initMainPlayer();

	// Listen to other players
	listenToOtherPlayers()

	// deleting the player on unload
	window.onunload = function() {
		fbRef.child("Players").child( playerID ).remove();
	};

	window.onbeforeunload = function() {
		fbRef.child("Players").child(playerID).remove();
	};

}

function listenToPlayer( playerData ) {

	if(playerData.val() ) {
		otherPlayers[playerData.key()].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation);
	}

}

// refer Tutorial 3 - 12:51
function listenToOtherPlayers() {
	// When a player is added, do something
	fbRef.child("Players").on("child_added", function( playerData ) {

		if( playerData.val() ) {

			if (playerID != playerData.key() && !otherPlayers[playerData.key()] ) {

				otherPlayers[playerData.key()] = new Player( playerData.key() );
				otherPlayers[playerData.key()].init();
				fbRef.child("Players").child(playerData.key() ).on("value", listenToPlayer );
			}
		}
	});

	// When a player is removed, do something
	fbRef.child("Players").on( "child_removed", function( playerData ) {
		
		if ( playerData.val() ) {
			fbRef.child("Players").child( playerData.key() ).off("value", listenToPlayer );
			scene.remove(otherPlayers[playerData.key()].mesh );
			delete otherPlayers[playerData.key()];
		}

	});

}

function initMainPlayer(){
	// This code explained in Tutorial 3 - 3:52
	playerID = fbRef.child("Players").push().key();

	fbRef.child("Players").child( playerID ).child("orientation").set({
		position: {x:0, y:0, z:0},
		rotation: {x:0, y:0, z:0}
	});

	player = new Player( playerID );
	player.isMainPlayer = true;
	player.init();
}

function loadEnvironment() {

	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

	var plane = getPlane(10,50);
	var pointLight = getPointLight(0.75);
	pointLight.position.x = 0;
    pointLight.position.z = 0;
    pointLight.position.y = 4;

	// Basic Scene
	// scene.add( sphere ); //disabled for the time being

	scene.add(plane);
	plane.rotation.x = Math.PI/2;
	plane.position.y = 0;

	scene.add(pointLight);

	// Main Object
        let loader = new THREE.GLTFLoader();
        loader.load('/3dobjects/ust.gltf', function(gltf){
          var ust = gltf.scene.children[0];
          gltf.scene.scale.multiplyScalar(1 / 500);
          gltf.scene.traverse( function( child ){ child.castShadow = true; } );
          gltf.scene.traverse( function( child ){ child.receiveShadow = true; } );
          scene.add(gltf.scene);
        });

    //Particle System
        var particleGeo = new THREE.SphereGeometry(10, 64, 64);
        var particleMat = new THREE.PointsMaterial({
        color: 'rgb(255, 255, 255)',
        size: 0.01,
        map: new THREE.TextureLoader().load('/textures/particle.jpg'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
        });
        particleGeo.vertices.forEach(function(vertex) {
            vertex.x += (Math.random() - 0.9);
            vertex.y += (Math.random() - 0.9);
            vertex.z += (Math.random() - 0.9);
        });

        var particleSystem = new THREE.Points(particleGeo,particleMat);
        particleSystem.position.y = 0;
        particleSystem.name = 'particleSystem';

        scene.add(particleSystem);
        
}

		// Including Scene objects through functions below
		// Plane
        function getPlane(radius,size) {
            var geometry = new THREE.CircleGeometry(radius, size);
            var material = new THREE.MeshStandardMaterial({
                color:'rgb(255,255,255)',
                side: THREE.DoubleSide,                
                roughness: 0.0,
                metalness: 0.0
            });
            var mesh = new THREE.Mesh(geometry,material);
            mesh.receiveShadow = true; // For recieving Shadows
            return mesh;
        }

        // Point Light for Shadows 
        function getPointLight(intensity) {
            var light = new THREE.PointLight(0xFFFFFF, intensity);
            light.castShadow = true;
            return light;
        }
   