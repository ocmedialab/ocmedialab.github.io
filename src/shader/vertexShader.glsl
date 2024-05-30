// lowercase naming convention for imported vars from three.js
// vertexShader > fragmentShader > main()
attribute vec3 aRandom;
varying vec3 vPosition;
uniform float uTime;
uniform float uScale;

void main() {
  
  vPosition = position; // this.particlesGeometry.attributes.position 
  float particleSize = 1.0;
  float circularuRadiusModifier = 0.01;
  float time = uTime * 4.0;
  vec3 pos = position;
  float b = 4.0;
  float ZERO = 0.0;
 
  pos.x += sin(time * aRandom.x) * circularuRadiusModifier;
  pos.y += cos(time * aRandom.y) * circularuRadiusModifier;
  pos.z += cos(time * aRandom.z) * circularuRadiusModifier;
  

  // Effect: FLATTEN_X
  // pos.x*=0;  
  // Effect: EXPAND_PROPORTIONALLY (1.5 bigger)
  // pos*=1.5;

  // Effect: IN_OUT
  // pos.x *= uScale + sin(pos.y * b + time) * ZERO;
  // pos.y *= uScale + cos(pos.z * b + time) * ZERO;
  // pos.z *= uScale + sin(pos.x * b + time) * ZERO;

  // Effect: MORPH
  // pos.x *= uScale + sin(pos.y * b + time) * (1.0 - uScale);
  // pos.y *= uScale + cos(pos.z * b + time) * (1.0 - uScale);
  // pos.z *= uScale + sin(pos.x * b + time) * (1.0 - uScale);


  pos.x *= uScale + sin(pos.y * b + time) * (1.0 - uScale);
  pos.y *= uScale + cos(pos.z * b + time) * (1.0 - uScale);
  pos.z *= uScale + sin(pos.x * b + time) * (1.0 - uScale);

  pos *= uScale;

  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  // resize according to  distance from camera
  gl_Position = projectionMatrix * mvPosition; //result of cals to evry vertex 
  // resize according to  distance from camera
  gl_PointSize = particleSize / -mvPosition.z;
}


