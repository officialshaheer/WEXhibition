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
		position: {x:0,y:0,z:0},
		rotation: {x:0,y:0,z:0}
	});

	player = new Player( playerID );
	player.isMainPlayer = true;
	player.init();
}

function loadEnvironment() {
	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

	scene.add( sphere );
}