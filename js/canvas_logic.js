//define constants
const CamvasContainerElement = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

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


onkeydown = (keydonwevent) => {
    console.log(keydonwevent);
    if(keydonwevent.code == "Space"){
        Spawncube();
    }
}

function ScreenspacetoWorld(Cam, screenX, screenY, Zdist){
    var CamObj = Cam;
    console.log("--Screenspacetoworld--");

    //get Screen dimensions
    var newx = renderer.getSize().x;
    var newy = renderer.getSize().y;


    
    console.log(Cam);
    console.log(screenX+ " | "+screenY);
    console.log(Zdist);
    
    
    

}

function screenToWorld(camera, screenPosition, zValue) {
    // Create a vector from the screen position
    const vector = new THREE.Vector3(
        (screenPosition.x / window.innerWidth) * 2 - 1,
        -(screenPosition.y / window.innerHeight) * 2 + 1,
        zValue
    );

    // Unproject the vector from screen space to world space
    vector.unproject(camera);

    // Calculate the direction from the camera to the vector
    const dir = vector.sub(camera.position).normalize();

    // Calculate the distance from the camera to the plane at zValue
    const distance = (zValue - camera.position.z) / dir.z;

    // Calculate the world position
    const worldPosition = camera.position.clone().add(dir.multiplyScalar(distance));

    console.log(worldPosition);
    return worldPosition;
    
    
}

onmousedown = (mousedownevent) => {
    console.log(mousedownevent);
    var xcord = mousedownevent.clientX;
    var ycord = mousedownevent.clientY;
    console.log(xcord + " | " + ycord);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const otherCUbe = new THREE.Mesh(geometry, material);

    //set Cube Pos to Mouse Pos 
    //TODO: Proper Project
    otherCUbe.position.x = mousedownevent.clientX;
    otherCUbe.position.y = mousedownevent.clientY;

    console.log(screenToWorld(camera, [xcord, ycord], 5));
    


/*     0,0 is in the middle
    y axis goes up
    x axis goes right */

    scene.add(otherCUbe);
    
    function animate() {
        requestAnimationFrame(animate);
        otherCUbe.position.x += 0.01;
        otherCUbe.position.y -= 0.01;
        

        renderer.render(scene, camera);
    }
    animate();
}