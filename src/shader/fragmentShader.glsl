varying vec3 vPosition;
uniform vec3 uColor1; 
uniform vec3 uColor2;
uniform vec3 uColor3;


void main() {
  vec3 color = vec3(1.0,1.0,1.0);
  float depth = vPosition.z * 0.5 + 0.5;
  // float depth = fract( vPosition.z * 0.5 + 0.5);
  color = mix(uColor1, uColor2, depth);
  color = mix(uColor2, uColor3, depth);
  gl_FragColor = vec4(color, depth * 0.1 + 0.2);
}