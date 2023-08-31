var canvas = document.createElement('canvas');
var ismobile = 0;

if(window.innerWidth < '768') { 
  ismobile = 1; 
  throw new Error("Can't run on mobile");
}
if(ismobile == 0) {
  if(document.querySelector('.navbar').getBoundingClientRect().height < 1) {
    throw new Error("Navbar not found");
  }
}



canvas.id = "sphere2";
canvas.style.position = 'fixed';
canvas.style.left = '50%';
canvas.style.top = '0px';
canvas.style.translateX = '-50%';  //not working
canvas.style.zIndex = '1021';
canvas.style.width = '300px';
canvas.style.height = '300px';
document.body.appendChild(canvas);


let box2 = document.querySelector('#sphere2');


const box_width = box2.offsetWidth;
const box_height = box2.offsetHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#sphere2'),
  alpha: true,
});
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( box_width / - 2, box_width / 2, box_height / 2, box_height / - 2, 1, 1000 );
renderer.setSize(box_width, box_height);
if(ismobile){
    camera.position.setZ(/* 150 */300);
}else{
    camera.position.setZ(300);
}

const pointLight = new THREE.PointLight(0xaaaaaa);
pointLight.position.set(60, 60, 200);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight);

var textureUrl = 'static files/sphere_map.png';

if(!imageExists(textureUrl)){
    //console.log('image not found');
    textureUrl = '../static files/sphere_map.png';
}
var moonTexture = new THREE.TextureLoader().load(textureUrl);

var moon;
if(ismobile == 0){
    moon = new THREE.Mesh(
        new THREE.SphereGeometry(110, 64, 64),
        new THREE.MeshStandardMaterial({
        map: moonTexture,
        })
    );
}else{
    moon = new THREE.Mesh(
        new THREE.SphereGeometry(/* 60 */110, 64, 64),
        new THREE.MeshStandardMaterial({
        map: moonTexture,
        })
    );
}

scene.add(moon);
renderer.render(scene, camera);

if(ismobile){
  var new_box_height = 66.4;
  box2.style.top = '8px';
}else{
  var new_box_height = document.querySelector('.navbar').getBoundingClientRect().height;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.x += 0.006;
  renderer.render(scene, camera);
}
animate();


box2.style.width = new_box_height.toString() + 'px';
box2.style.height = new_box_height.toString() + 'px';


function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}