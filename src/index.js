import {
  // BoxGeometry,
  // MeshBasicMaterial,
  // Mesh,
  GridHelper,
  AxesHelper,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Model } from "./Model.js";
import gsap from "gsap";

const helpers = (s) => {
  const gridHelper = new GridHelper(10, 10);
  s.add(gridHelper);
  const axesHelper = new AxesHelper(5);
  s.add(axesHelper);
};

const init = (w) => {
  const d = w.document;
  // Renderer
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(w.innerWidth, w.innerHeight);
  d.body.appendChild(renderer.domElement);

  // Scene & Camera
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    50,
    w.innerWidth / w.innerHeight,
    0.1,
    100
  );
  camera.position.z = 5;
  camera.position.y = 1;

  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;

  // Helpers
  // helpers(scene);

  // Models
  const s = new Model({
    name: "skull",
    file: "/models/skull.glb",
    scene: scene,
    uColor1: "#CC64FF", // 204, 100, 225;
    uColor2: "#8B61D3", // 139, 97, 211;
    uColor3: "#53CDDF", // 83, 205, 223;
  });

  // Controllers
  const btn = d.getElementById("toggle");
  btn.addEventListener("click", (event) => {
    const t = event.target;
    const h = t.dataset.hidden;
    t.setAttribute("data-hidden", !h ? "hidden" : "");
    !h ? s.remove() : s.add();
  });

  // Loop
  const clock = new Clock();
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (s.isActive) {
      s.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  };
  animate();

  // Resize
  function onWindowResize() {
    camera.aspect = w.innerWidth / w.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(w.innerWidth, w.innerHeight);
  }
  w.addEventListener("resize", onWindowResize, false);

  const onMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    gsap.to(scene.rotation, {
      y: gsap.utils.mapRange(0, w.innerWidth, 0.2, -0.2, x),
      x: gsap.utils.mapRange(0, w.innerHeight, 0.2, -0.2, y),
    });
  };
  w.addEventListener("mousemove", onMouseMove);
};

if (typeof window !== "undefined") {
  init(window);
}
