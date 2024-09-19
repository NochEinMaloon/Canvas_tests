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

//##############   Events   ##############
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
}





onmousedown = (mousedownevent) => {
    //console.log(mousedownevent);
    var xcord = mousedownevent.clientX;
    var ycord = mousedownevent.clientY;
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

