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
        cube.rotation.y += 0.01;
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