import gsap from "gsap";
import * as THREE from "three";



const initPlanet = () => {
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  };

  const canvas = document.querySelector(
    "canvas.planet-3D"
  ) as HTMLCanvasElement | null;

  if (!canvas) throw new Error("Canvas not Found");

  // scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(
    15,
    size.width / size.height,
    0.1,
    100
  );
  camera.position.set(0,0.1, 15);
  scene.add(camera);

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(size.pixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace

// Light
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(3, 3, 15);
scene.add(light);
// Texture
const texture = new THREE.TextureLoader().load("/earth/day.jpg");

// Geomentry && material

const earthGeomentry = new THREE.SphereGeometry(2,64,64);

const earthMaterial = new THREE.MeshStandardMaterial ({
  map: texture,
  metalness: 0,
  roughness: 0.7,
})

const earth = new THREE.Mesh(earthGeomentry, earthMaterial);
scene.add(earth);

earth.scale.set(3,3,3);
earth.position.set(0,-6.5,0);

// Background
// const textureLoader = new THREE.TextureLoader();
// const bgTexture = textureLoader.load("/background/space1.jpg");

// scene.background = bgTexture;

// animation loop 
gsap.ticker.add((time)=>{
    earth.rotation.y = time * 0.2;
    renderer.render(scene, camera);
})
gsap.ticker.lagSmoothing(0);

window.addEventListener("resize",()=>{
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    size.pixelRatio = window.devicePixelRatio;


    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.pixelRatio)
})



  return { scene};
};

export default initPlanet;