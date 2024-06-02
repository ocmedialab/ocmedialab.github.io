import gsap from "gsap";
import { WebGLRenderer, Scene, PerspectiveCamera, Clock, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Model } from "./Model.js";
// import Stats from "three/examples/jsm/libs/stats.module.js";

// const helpers = (s) => {
//   const gridHelper = new GridHelper(10, 10);
//   s.add(gridHelper);
//   const axesHelper = new AxesHelper(5);
//   s.add(axesHelper);
// };

const getWindowProps = (w) => {
  const W = w.innerWidth;
  const H = w.innerHeight;
  return {
    W,
    H,
  };
};

const init = (w) => {
  const d = w.document;
  // const stats = new Stats();
  // const raycaster = new Raycaster();
  const pointer = new Vector2();
  const clock = new Clock();
  const { W, H } = getWindowProps(w);

  // Scene & Camera
  const scene = new Scene();

  // camera's en.wikipedia.org/wiki/Viewing_frustum
  const camera = new PerspectiveCamera(
    50, // fov — Camera frustum vertical field of view. Default 50.
    W / H, // aspect — Camera frustum aspect ratio. Default 1.
    0.1, // near — Camera frustum near plane. Default 0.1.
    100 // far — Camera frustum far plane. Default 2000.
  );

  // Renderer
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(w.devicePixelRatio);
  renderer.setSize(W, H);
  renderer.setAnimationLoop(animate);
  const C = renderer.domElement;
  d.body.appendChild(C);

  // start
  // camera.position.y = 1;
  // camera.position.z = 5;

  // fin
  camera.position.set(0, 35, 0);

  // OrbitControls
  const controls = new OrbitControls(camera, C);
  // controls.enabled = false;

  // Helpers
  // helpers(scene);

  // Logo
  const s = new Model({
    name: "logo",
    file: "/models/logo.glb",
    scene: scene,
    uColor1: "#CC64FF", // 204, 100, 225;
    uColor2: "#8B61D3", // 139, 97, 211;
    uColor3: "#53CDDF", // 83, 205, 223;
  });

  function resize() {
    const { W, H } = getWindowProps(w);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  function click() {
    console.log("click() -----------");
    // console.log("pointer", pointer);
    // raycaster.setFromCamera(pointer, camera);
    // .computeBoundingBox()
    // const intersects = raycaster.intersectObjects();
    // for (let i = 0; i < intersects.length; i++) {
    //   if (intersects[i]) {
    //     console.log("HIT ------");
    //     break;
    //   }
    // }
  }

  function pointermove(event) {
    console.log("pointermove() -----------");
    // document.body.style.cursor = "pointer";
    const X = event.clientX;
    const Y = event.clientY;
    // const { W, H } = getWindowProps(w);
    // pointer.x = (X / W) * 2 - 1;
    // pointer.y = -(Y / H) * 2 + 1;
    gsap.to(scene.rotation, {
      x: gsap.utils.mapRange(0, w.innerHeight, 0.6, -0.6, Y),
      y: gsap.utils.mapRange(0, w.innerWidth, 0.6, -0.6, X),
    });
  }

  function animate() {
    renderer.render(scene, camera);
    // stats.update();
    if (s.particlesMaterial) {
      s.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  }

  w.addEventListener("resize", resize, false);
  C.addEventListener("click", click, false);
  C.addEventListener("pointermove", pointermove, false);
};

if (typeof window !== "undefined") {
  window.onload = function () {
    init(window);
  };
}
