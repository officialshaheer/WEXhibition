var container, scene, camera, renderer;

var css_renderer, scene2;

var controls;

init();
             
animate();

function init() {
	// Setup
	// container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.z = 100;
	camera.lookAt(0,0,0);

	scene = new THREE.Scene();
    scene2 = new THREE.Scene();

    	// CSS Element creation
        var element = document.createElement( 'div' );
            element.innerHTML = '<h4>Submit your votes!</h4>' + '<input type=text placeholder="Enter Photograph ID"></input><br><br>'+
           '<button onclick="myFunction()"><span>Vote</span></button>';
            element.style.background = 'white';
            element.style.width = '250px';
            element.style.height = '150px';
            element.style.color = 'black';
            element.style.textAlign = 'center';
            element.style.paddingTop = '5px';
            element.style.borderRadius = '12px';
            element.style.top = 0;
            element.style.opacity = 1;

        var domCSSObject = new THREE.CSS3DObject( element );
            // domCSSObject.position.set(1900,25,4700);
            domCSSObject.position.set(0,25,0);
            domCSSObject.scale.set(0.15,0.15,0.15);
            scene2.add( domCSSObject );

    // Load Game world
	loadGame();        

	// CSS Renderer
	css_renderer = new THREE.CSS3DRenderer();
    css_renderer.setSize( window.innerWidth, window.innerHeight );
    css_renderer.domElement.style.position = 'absolute';
    css_renderer.domElement.style.top = 0;

    // WEBGL Renderer for 3D objects
	renderer = new THREE.WebGLRenderer( {alpha:true} );
	renderer.setClearColor( 0x000000, 1 );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.top = 0;
    // renderer.shadowMap.enabled = true; //For Shadows

    css_renderer.domElement.appendChild(renderer.domElement);

    document.body.appendChild(css_renderer.domElement);
	

	// Events
	window.addEventListener("resize", onWindowResize, false);

}

function animate() {
	requestAnimationFrame( animate );

	if(controls){
		controls.update();
	}

	// controls2.update();
	
	// camera.position.x += 0.1;

	// Particle System Animation
    var particleSystem = scene.getObjectByName('particleSystem');
    particleSystem.rotation.y += 0.01;

	render();
}

function render() {

	renderer.clear();
	renderer.render( scene, camera );
	css_renderer.render( scene2, camera );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	css_renderer.setSize( window.innerWidth, window.innerHeight );
}


	