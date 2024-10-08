


//define constants
const CamvasContainerElement = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);


//create test material
const TestMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    flatShading: false,
    shininess: 150,
});


function init(){

    document.getElementById('canvas-container').appendChild(renderer.domElement);



    // Einfache Geometrie hinzufügen
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animationsschleife
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }
    animate();
}


function loadscene(url){
    const loader = new THREE.ObjectLoader();

    loader.load(
        // resource URL
        url,

        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            // Add the loaded object to the scene
            scene.add( obj );
            console.log(obj);
            
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            console.log(xhr);
            
        },

        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
    );
}



function Spawncube(){
    const geometry = new THREE.BoxGeometry(5, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }
    animate();

}

function NewScreenspacetoWorld(Cam, Screenxy, Zdist){
    var CamObj = Cam;

    //get Campos
    var campos = CamObj.position;
    var camrot = CamObj.rotation;
    var camfov = camera.fov;

    //get 2D Center
    var cx = renderer.getSize().x/2;
    var cy = renderer.getSize().y/2;



}

function ScreenspacetoWorld(Cam, Screenxy, Zdist){
    var scalefac = 100; //this is still wrong and temporary
    var CamObj = Cam;
    //console.log("--Screenspacetoworld--");

    //get Screen dimensions
    var cx = renderer.getSize().x/2;
    var cy = renderer.getSize().y/2;

    var newx = (Screenxy[0]-cx)/scalefac;
    var newy = (Screenxy[1]-cy)/scalefac*-1;


    //console.log(Cam);
    //console.log(Screenxy[0]+ " | "+Screenxy[1]);
    //console.log(Zdist);
    //console.log(console.log(newx + " | "+ newy));
    
    
    var Worldpos = [newx, newy, Zdist];
    return Worldpos;

}

function testtext(Text){
    var parameters = ""; //TODO: Implement
    new THREE.TextGeometry( Text, parameters );
}

function Cubeonmouseevent(Event){
    console.log("Rclick");
        var xcord = Event.clientX;
        var ycord = Event.clientY;
        //console.log(xcord + " | " + ycord);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const otherCUbe = new THREE.Mesh(geometry, material);

        //set Cube Pos to Mouse Pos 
        //TODO: Proper Project


        var worldspace = ScreenspacetoWorld(camera, [xcord, ycord], 5);

        //console.log(worldspace);

        otherCUbe.position.x = worldspace[0];
        otherCUbe.position.y = worldspace[1];





    /*     0,0 is in the middle
        y axis goes up
        x axis goes right */

        scene.add(otherCUbe);
        //console.log(otherCUbe);


        function animate() {
            requestAnimationFrame(animate);
            otherCUbe.position.x += 0.01;
            otherCUbe.position.y -= 0.01;


            renderer.render(scene, camera);
        }
        animate();
}

//##############   Events   ##############
//Input devices
onkeydown = (keydonwevent) => {
    console.log(keydonwevent);


    if(keydonwevent.code == "Space"){
        Spawncube();
    }
    if(keydonwevent.code == "KeyM"){
        const newcubegeogeometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const newcube = new THREE.Mesh(newcubegeogeometry, material);
        scene.add(newcube);

        addEventListener("mousemove", function(e){

            var xcord = e.clientX;
            var ycord = e.clientY;
            var worldspace = ScreenspacetoWorld(camera, [xcord, ycord], 5);

            newcube.position.x = worldspace[0];
            newcube.position.y = worldspace[1];
        })
    }
    if(keydonwevent.code == "KeyL"){
        loadscene("Scenes/Scene.json");
    }
    if(keydonwevent.code == "KeyS"){
        var returnvalue = loadscene("Scenes/skull.json");
        console.log(returnvalue);


        //IDK implement Callback

        //animate after 100ms
        setTimeout(() => {
            console.log("Anim FUnce");
            
            scene.children.forEach(element => {
                console.log(element.name);
                setInterval(function () {scene.children[1].rotateY(0.005)}, 1);
            });
        }, 1000);

        
        
        //animate
        //get scene.children.find name("12140_Skull_v3_L2[1].obj")
        //scene.children[1].rotateY(0.02);
    }
}
onmousedown = (mousedownevent) => {
    mousedownevent.preventDefault();
    console.log(mousedownevent);
    switch (mousedownevent.button){
        case 0:
            console.log("Left");
            break;
        case 1:
            console.log("Middle");
            Cubeonmouseevent(mousedownevent);
            break;
        case 2:
            console.log("Right"); //Somehow prevent default here
    }


}
onmousewheel = (wheelevent) => {
    console.log(wheelevent);
    var ScollValue = wheelevent.deltaY;
    console.log(ScollValue);

    camera.translateZ(ScollValue/100);
}

