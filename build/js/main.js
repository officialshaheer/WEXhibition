var scene, camera, renderer;

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
            element.setAttribute('contenteditable', '');
            element.style.top = 0;
            element.style.opacity = 1;

        var domCSSObject = new THREE.CSS3DObject( element );
            // domCSSObject.position.set(1900,25,4700);
            domCSSObject.position.set(0,25,0);
            domCSSObject.scale.set(0.15,0.15,0.15);
            scene2.add( domCSSObject );


        var iframeElement = document.createElement('iframe');
        	iframeElement.src = 'https://www.ust-global.com/';
            iframeElement.style.width = '100%';
            iframeElement.style.height = '100%';
            iframeElement.style.top = 0;
            iframeElement.style.opacity = 1;  
        
         var domCSSObject3 = new THREE.CSS3DObject( iframeElement );
            // domCSSObject.position.set(1900,25,4700);
            domCSSObject3.position.set(0,50,2000);
            domCSSObject3.scale.set(0.2,0.2,0.2);
            domCSSObject3.rotation.y= 1;
            scene2.add( domCSSObject3 );

        var iframeYoutube = document.createElement('iframe');
        	iframeYoutube.src = 'https://www.youtube.com/embed/fasEwDsqR9Y';
            iframeYoutube.style.width = '100%';
            iframeYoutube.style.height = '100%';
            iframeYoutube.style.top = 0;
            iframeYoutube.style.opacity = 1;  
        
         var domCSSObject4 = new THREE.CSS3DObject( iframeYoutube );
            // domCSSObject.position.set(1900,25,4700);
            domCSSObject4.position.set(1850,300,-1290);
            domCSSObject4.scale.set(0.2,0.2,0.2);
            // domCSSObject4.rotation.y= 1;
            scene2.add( domCSSObject4 );


    // Load Game world
	loadGame();        

	// CSS Renderer
	css_renderer = new THREE.CSS3DRenderer();
    css_renderer.setSize( window.innerWidth, window.innerHeight );
    css_renderer.domElement.style.position = 'absolute';
    css_renderer.domElement.style.top = 0;

    // WEBGL Renderer for 3D objects
	renderer = new THREE.WebGLRenderer( {alpha:true,antialias: true } );
	renderer.setClearColor( 0x000000, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);
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