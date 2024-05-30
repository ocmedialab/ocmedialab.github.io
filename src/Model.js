import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MeshBasicMaterial,
  Points,
  ShaderMaterial,
  Vector3,
} from "three";
import {
  GLTFLoader,
  DRACOLoader,
  MeshSurfaceSampler,
} from "three/examples/jsm/Addons.js";
import { gsap } from "gsap";
import vertexShader from "./shader/vertexShader.glsl";
import fragmentShader from "./shader/fragmentShader.glsl";
const rangeNegOneToOne = (rangeEnd = 2) => Math.random() * rangeEnd - 1;

class Model {
  constructor({ name, file, scene, uColor1, uColor2, uColor3, isActive }) {
    this.name = name;
    this.file = file;
    this.scene = scene;
    this.uColor1 = uColor1;
    this.uColor2 = uColor2;
    this.uColor3 = uColor3;
    this.isActive = isActive;

    // Draco is an open-source library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderConfig({ type: "js" });
    this.dracoLoader.setDecoderPath("/draco/gltf/");
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(this.dracoLoader);
    this.init();
  }

  init() {
    this.loader.load(
      this.file,
      (data) => {
        // mesh /  material
        this.mesh = data.scene.children[0];
        this.material = new MeshBasicMaterial({
          wireframe: true,
        });
        this.mesh.material = this.material;

        //  geo
        this.geometry = this.mesh.geometry;

        // material
        this.particlesMaterial = new ShaderMaterial({
          uniforms: {
            uColor1: {
              value: new Color(this.uColor1),
            },
            uColor2: {
              value: new Color(this.uColor2),
            },
            uColor3: {
              value: new Color(this.uColor3),
            },
            uTime: { value: 0 },
            uScale: { value: 0 },
          },
          vertexShader, // takes care of managing positoin of verticies
          fragmentShader, // used to color each pixel of the mesh
          transparent: true,
          depthTest: false,
          depthWrite: false,
          blending: AdditiveBlending,
        });

        const particleCount = 40000;
        const particleM = 3;
        const mss = new MeshSurfaceSampler(this.mesh).build();
        this.particlesGeometry = new BufferGeometry();
        const particlesPos = new Float32Array(particleCount * particleM);
        const particlesRand = new Float32Array(particleCount * particleM);
        for (let i = 0; i < particleCount; i++) {
          const newPos = new Vector3();
          mss.sample(newPos);
          particlesPos.set([newPos.x, newPos.y, newPos.z], i * particleM);
          particlesRand.set(
            [rangeNegOneToOne(), rangeNegOneToOne(), rangeNegOneToOne()],
            i * particleM
          );
        }
        this.particlesGeometry.setAttribute(
          "position",
          new BufferAttribute(particlesPos, particleM)
        );
        this.particlesGeometry.setAttribute(
          "aRandom",
          new BufferAttribute(particlesRand, particleM)
        );
        this.particles = new Points(
          this.particlesGeometry,
          this.particlesMaterial
        );
        this.add();
      },
      undefined,
      (error) => {
        console.log(error);
      }
    );
  }

  add() {
    this.scene.add(this.particles);
    this.isActive = true;

    gsap.to(this.particlesMaterial.uniforms.uScale, {
      value: 1,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      // onStart: () => {},
    });

    gsap.to("canvas", {
      background: "purple",
      duration: 0.8,
    });
  }

  remove() {
    gsap.to(this.particlesMaterial.uniforms.uScale, {
      value: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        this.scene.remove(this.particles);
        this.isActive = false;
      },
    });

    gsap.to("canvas", {
      background: "black",
      duration: 0.8,
    });
  }
}
export { Model };
