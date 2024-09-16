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

function ScreenspacetoWorld(Cam, Screenxy, Zdist){
    var CamObj = Cam;
    console.log("--Screenspacetoworld--");

    //get Screen dimensions
    var newx = renderer.getSize().x;
    var newy = renderer.getSize().y;

    //var 


    
    console.log(Cam);
    console.log(Screenxy[0]+ " | "+Screenxy[1]);
    console.log(Zdist);
    console.log(console.log(newx + " | "+ newy));
    
    
    var Worldpos = [0, 0, 0];
    return Worldpos;

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

    console.log(ScreenspacetoWorld(camera, [xcord, ycord], 5));

    
    


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