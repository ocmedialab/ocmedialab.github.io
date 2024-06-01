import gsap from "gsap";
import {
  // BoxGeometry,
  // MeshBasicMaterial,
  // Mesh,
  // GridHelper,
  // AxesHelper,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Clock,
  Raycaster,
  // Vector3,
  // Mesh,
  Vector2,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Model } from "./Model.js";

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
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  const clock = new Clock();
  const { W, H } = getWindowProps(w);

  // Scene & Camera
  const scene = new Scene({ background: "red" });

  // camera's en.wikipedia.org/wiki/Viewing_frustum
  const camera = new PerspectiveCamera( //
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
  const C = renderer.domElement;
  renderer.setSize(W, H);
  renderer.setAnimationLoop(animate);
  d.body.appendChild(C);

  // start
  // camera.position.y = 1;
  // camera.position.z = 5;

  // fin
  camera.position.x = 0;
  camera.position.y = 35;
  camera.position.z = 0;

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

  // Resize
  function onWindowResize() {
    const { W, H } = getWindowProps(w);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  function click() {
    raycaster.setFromCamera(pointer, camera);

    // .computeBoundingBox()
    // s.particles;

    // console.log(s.particlesGeometry);
    // const intersects = raycaster.intersectObjects(scene.children[0]);
    // console.log(intersects);

    // for (let i = 0; i < intersects.length; i++) {
    //   if (intersects[i]) {
    //     console.log("HIT ------");

    //     break;
    //   }
    // }
  }

  // s.particlesMaterial.uniforms.uHide.value = true;

  // camera.position.z = 100;
  // camera.aspect = W / H;
  // camera.updateProjectionMatrix();

  const onMouseMove = (event) => {
    console.log("onMouseMove() -----------");
    const x = event.clientX;
    const y = event.clientY;
    const { W, H } = getWindowProps(w);
    pointer.x = (x / W) * 2 - 1;
    pointer.y = -(y / H) * 2 + 1;
    // gsap.to(scene.rotation, {
    //   x: gsap.utils.mapRange(0, w.innerHeight, 0.2, -0.2, y),
    //   y: gsap.utils.mapRange(0, w.innerWidth, 0.2, -0.2, x),
    // });
  };

  // function onPointerMove(event) {
  //   console.log("onPointerMove() -----------");
  //   // calculate pointer position in normalized device coordinates
  //   // (-1 to +1) for both components
  //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // }

  // ANIMATION LOOP
  function animate() {
    renderer.render(scene, camera);
    if (s.isActive) {
      s.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  }

  w.addEventListener("resize", onWindowResize, false);
  w.addEventListener("click", click, false);
  w.addEventListener("mousemove", onMouseMove);
  // w.addEventListener("pointermove", onPointerMove);
  // document.addEventListener("mousedown", mousedown, false);
};

if (typeof window !== "undefined") {
  window.onload = function () {
    init(window);
  };
}
