let box = document.querySelector('#sphere');
var ismobile = 0;

if(window.innerWidth < '768'){
  box.style.width = box.offsetHeight.toString() + 'px';
  ismobile = 1;
}else{
  const box_hw = (document.getElementById("title").offsetHeight)*0.70 + 'px';
  box.style.width = box_hw.toString();
  box.style.height = box_hw.toString();
}

let box_width = box.offsetWidth;
let box_height = box.offsetHeight;
let box_ratio = box_width/box_height;


document.getElementById("bg_image").height = (document.querySelector("main").offsetHeight).toString() + "px";
var title = document.getElementById("title").getBoundingClientRect();
var initial_top = 100 * (title.top + title.height/2 - box_height /2 + title.height*0.035) / window.innerHeight;
box.style.top = initial_top.toString() + '%';


var pointerX = 0;
var pointerY = 0;
onmousemove = function(e){
    pointerX = e.clientX;
    pointerY = e.clientY;
}

// Setup

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( box_width / - 2, box_width / 2, box_height / 2, box_height / - 2, 1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#sphere'),
  alpha: true ,
});

renderer.setSize(box_width, box_height);
if(ismobile){
  camera.position.setZ(150);
}else{
  camera.position.setZ(300);
}
renderer.render(scene, camera);


 // Lights
const pointLight1 = new THREE.PointLight(0xaaaaaa);
pointLight1.position.set(60, 60, 200);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight1, ambientLight);


// Moon
const moonTexture = new THREE.TextureLoader().load('static files/sphere_map.png');

var moon;
if(ismobile == 0){
  var sphere_rad = 2*box_width/5;
  moon = new THREE.Mesh(
    new THREE.SphereGeometry(sphere_rad, 64, 64),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
}else{
  moon = new THREE.Mesh(
    new THREE.SphereGeometry(60, 64, 64),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
}

scene.add(moon);
renderer.render(scene, camera);



var bottom_sphere_box = document.querySelector('.bottom_sphere_cont');
var max_y = 100* (
    /* document.querySelector('#events').getBoundingClientRect().top - */
    document.querySelector('#register').getBoundingClientRect().top + document.querySelector('#register').getBoundingClientRect().height -
    document.querySelector("body").getBoundingClientRect().top
    )/window.innerHeight;
if(max_y == 0){
  var max_y = 100* (
    /* document.querySelector('#speakers').getBoundingClientRect().top -
    document.querySelector("body").getBoundingClientRect().top */
    window.innerHeight * 0.9
    )/window.innerHeight;
}
//console.log('max_y' ,max_y, document.querySelector('#events').getBoundingClientRect().top);
//var max_y = 100;
//var new_box_height = 66.4;
if(ismobile){
  var new_box_height = 100;
}else{
  var new_box_height = document.querySelector('.navbar').getBoundingClientRect().height;
}
var sphere_zindex = 1;
var sphere_positioned_at_bottom = false;
var sphere_positioned_at_top = false;
function scrollAnimation() {
  var y = (window.scrollY/window.innerHeight)*100;
  //console.log('y',y);
  if(y>60){
      document.getElementById("sphere").style.zIndex = "4"; sphere_zindex=4;

  }
  if(y<60){
    if(sphere_positioned_at_top == true){
        document.getElementById("sphere").style.zIndex = "1"; sphere_zindex=1;
        sphere_positioned_at_top = false;
    }
  }
  if(y>max_y){
      if(sphere_positioned_at_top==false){
        y = max_y;
        sphere_positioned_at_top = true;
      }
  }
  if(y<=max_y){
    moon.rotation.x += 0.05 * -1;

    box.style.top = (initial_top - y*initial_top/max_y).toString() + '%';    
    
    var w = (box_width - ((box_width-box_ratio*new_box_height) * y/max_y)).toString() + 'px';
    var h = (box_height - ((box_height-new_box_height) * y/max_y)).toString() + 'px';
    box.style.width = w;
    box.style.height = h;
  }

  if(-1 * bottom_sphere_box.getBoundingClientRect().top > -400){
      if(sphere_positioned_at_bottom == false){
        var new_top = (bottom_sphere_box.getBoundingClientRect().top + bottom_sphere_box.getBoundingClientRect().height/2 - box_height/2).toString()+"px";
        //console.log(new_top);
        $("#sphere").animate(
            {top: new_top, width: box_width, height: box_height}
            ,400,"swing");
        sphere_positioned_at_bottom = true;
        sphere_positioned_at_top = false;
      }
      
      if(sphere_zindex==4){
        document.getElementById("sphere").style.zIndex = "1";
        sphere_zindex=1;
      }
  }

  if(-1 * bottom_sphere_box.getBoundingClientRect().top < -400 && sphere_positioned_at_bottom == true){
        $("#sphere").animate(
            {top: "0px", width: new_box_height*box_ratio, height: new_box_height}
            ,400,"swing");
      document.getElementById("sphere").style.zIndex = "3";
      sphere_positioned_at_bottom = false;
      sphere_positioned_at_top = true;
      //console.log("ratio",box_ratio);
  }
    
}

document.body.onscroll = scrollAnimation;
scrollAnimation();

let headers = document.querySelectorAll('strong');
const navbar_height = document.querySelector('.navbar').getBoundingClientRect().height;
const header_tops = [];
headers.forEach(function(header) {
  header_tops.push(header.getBoundingClientRect().top);
});

// Animation Loop
var headers_below_old = 0;
var headers_below = 0;
var rotations_needed = 0;
var to_rotate = 0;
function animate() {
  headers_below = 0;
  if(sphere_positioned_at_bottom == true){
    document.getElementById("sphere").style.top = (bottom_sphere_box.getBoundingClientRect().top + bottom_sphere_box.getBoundingClientRect().height/2 - box_height/2).toString()+"px";
  }
  header_tops.forEach(function (item) {
    if(item < window.pageYOffset + navbar_height*1.6) {
      headers_below++;
    }
  });
  if(headers_below > headers_below_old){
    rotations_needed += 30;
  }else if(headers_below < headers_below_old){
    //rotations_needed += 20;
  }
  headers_below_old = headers_below;
  requestAnimationFrame(animate);

  //moon.rotation.y = -3.14/2;
  if(rotations_needed > 0){
    rotations_needed--;
    to_rotate = 1;

  }

  moon.rotation.x += 0.006 + to_rotate*0.1;

  to_rotate = 0;
  renderer.render(scene, camera);
}

animate();

document.querySelector('.bottom_sphere_cont').addEventListener("mousemove", function( event ) {
    // highlight the mouseover target
    moveArrows();
  }, false);

document.querySelector('.bottom_sphere_cont').addEventListener("mousein", function( event ) {
  console.log("mouse in");
});

document.querySelector('.bottom_sphere_cont').addEventListener("mouseout", function( event ) {
    // highlight the mouseover target
    var x1 = document.getElementsByClassName("left_arrows");
    for (var i = 0; i < x1.length; i++) {
        x1[i].style.transform = "rotate(" + 0 + "deg)";
    }
    var x2 = document.getElementsByClassName("right_arrows");
    for (var i = 0; i < x2.length; i++) {
        x2[i].style.transform = "rotate(" + 180 + "deg)";
    }
  }, false);


function moveArrows() {
    var x = document.getElementsByClassName("arrow_img");
    for (var i = 0; i < x.length; i++) {
        var x_bound = x[i].getBoundingClientRect();
        var horz = pointerX - (x_bound.left + x_bound.width/2);
        var vert = pointerY - (x_bound.top + x_bound.height/2);
        var angle = Math.atan2(vert, horz);
        x[i].style.transform = "rotate(" + angle + "rad)";
    }
} 