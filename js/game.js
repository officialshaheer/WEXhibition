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

	var plane = getPlane(400,100);
	var pointLight = getPointLight(0.01);
	pointLight.position.x = 0;
    pointLight.position.z = 0;
    pointLight.position.y = 400;

    // Hemi Light
 //    hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.5);
	// scene.add( hemiLight );

	// Rect Light
	var rectLight = getRectLight(1,200,200); //Realistic Light
	function getRectLight(i,w,h) {
            var rectLight = new THREE.RectAreaLight( 'rgb(255, 255, 255)', i, w, h );
            rectLight.position.set( 0,100,-50);
            // rectLight.lookAt( box.position);
            // rectLight.castShadow = true;
            return rectLight;
        }

        scene.add(rectLight);

    var rectLight2 = getRectLight(1,200,200);
    rectLight2.position.set(0,100,50);
    rectLight2.rotation.x = Math.PI * -.5;
    scene.add(rectLight2);




	// Floor Material
	floorMat = new THREE.MeshStandardMaterial( {
					roughness: 0.8,
					color: 0xffffff,
					metalness: 0.2,
					bumpScale: 0.0005
				} );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "textures/hardwood2_diffuse.jpg", function ( map ) {

					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 10, 24 );
					map.encoding = THREE.sRGBEncoding;
					floorMat.map = map;
					floorMat.needsUpdate = true;

	} );
				textureLoader.load( "textures/hardwood2_bump.jpg", function ( map ) {

					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 10, 24 );
					floorMat.bumpMap = map;
					floorMat.needsUpdate = true;

	} );
				textureLoader.load( "textures/hardwood2_roughness.jpg", function ( map ) {

					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 10, 24 );
					floorMat.roughnessMap = map;
					floorMat.needsUpdate = true;

	} );

				cubeMat = new THREE.MeshStandardMaterial( {
					roughness: 0.7,
					color: 0xffffff,
					bumpScale: 0.002,
					metalness: 0.2
				} );
				textureLoader.load( "textures/brick_diffuse.jpg", function ( map ) {

					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 1, 1 );
					map.encoding = THREE.sRGBEncoding;
					cubeMat.map = map;
					cubeMat.needsUpdate = true;

	} );
				textureLoader.load( "textures/brick_bump.jpg", function ( map ) {

					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 1, 1 );
					cubeMat.bumpMap = map;
					cubeMat.needsUpdate = true;

	} );
	var floorGeometry = new THREE.PlaneBufferGeometry( 400, 400 );
	var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
	floorMesh.receiveShadow = true;
	floorMesh.rotation.x = - Math.PI / 2.0;
	scene.add( floorMesh );

	// PointBulb
	var bulbGeometry = new THREE.SphereBufferGeometry( 20, 16, 8 );
				bulbLight = new THREE.PointLight( 0xffee88, 5, 100, 1 );

				bulbMat = new THREE.MeshStandardMaterial( {
					emissive: 0xffffee,
					emissiveIntensity: 1,
					color: 0x000000
				} );
				bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
				bulbLight.position.set( 0, 50, 60);
				bulbLight.castShadow = true;
				scene.add( bulbLight );

	var bulbGeometry2 = new THREE.SphereBufferGeometry( 20, 16, 8 );
				bulbLight2 = new THREE.PointLight( 0xffee88, 5, 100, 1 );

				bulbMat2 = new THREE.MeshStandardMaterial( {
					emissive: 0xffffee,
					emissiveIntensity: 1,
					color: 0x000000
				} );
				bulbLight2.add( new THREE.Mesh( bulbGeometry2, bulbMat2 ) );
				bulbLight2.position.set( 0, 50, -60);
				bulbLight2.castShadow = true;
				scene.add( bulbLight2 );			

	// Basic Scene
	// scene.add( sphere ); //disabled for the time being

	scene.add(plane);
	plane.rotation.x = Math.PI/2;
	plane.position.y = 0.2;

	// scene.add(pointLight);

	// Main Object
        let loader = new THREE.GLTFLoader();
        loader.load('/3dobjects/iust.gltf', function(gltf){
          var ust = gltf.scene.children[0];
          gltf.scene.scale.multiplyScalar(1 / 10);
          gltf.scene.castShadow = true;
          gltf.scene.receiveShadow = true;
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
        particleSystem.position.y = 15;
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
   