// vertexShader > fragmentShader > main()
attribute vec3 aRandom;
varying vec3 vPosition;
uniform float uTime;
uniform float uScale;
uniform bool uHide;

void main() {
  vPosition = position; // this.particlesGeometry.attributes.position 
  float particleSize = 3.0;
  // float circularuRadiusModifier = 0.05;
  float b = 4.0;
  float time = uTime * b;
  // float ZERO = 0.0;
  float ONE = 1.0;
  vec3 pos = position;

  // pos.x += sin(time * aRandom.x) * circularuRadiusModifier;
  // pos.y += cos(time * aRandom.y) * circularuRadiusModifier;
  // pos.z += cos(time * aRandom.z) * circularuRadiusModifier;

  // Effect: FLATTEN_X
  // pos.x*=0;  
  
  // Effect: EXPAND_PROPORTIONALLY
  // pos*=4.5;

  // Effect: IN_OUT
  // pos.x *= uScale + sin(pos.y * b + time) * ZERO;
  // pos.y *= uScale + cos(pos.z * b + time) * ZERO;
  // pos.z *= uScale + sin(pos.x * b + time) * ZERO;

  // Effect: oscillation  
  // pos.x *= uScale + sin(pos.y * b + time);
  // pos.y *= uScale + cos(pos.z * b);
  // pos.z *= uScale + sin(pos.x * b + time);  

  pos.x *= uScale + sin(pos.y * b + time) * (ONE - uScale);
  pos.y *= uScale + cos(pos.z * b) * (ONE - uScale);
  pos.z *= uScale + sin(pos.x * b + time) * (ONE - uScale);


  pos *= uScale;

  
  vec4 mvPosition = modelViewMatrix * vec4(pos, ONE);
  // resize according to  distance from camera
  gl_Position = projectionMatrix * mvPosition; //result of cals to evry vertex 
  // resize according to  distance from camera
  gl_PointSize = particleSize / -mvPosition.z;
}


