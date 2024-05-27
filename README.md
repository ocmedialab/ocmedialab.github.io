# ocmedialab.github.io

A starter repo three.js / fiber

## 🤓

- [Node.js](https://nodejs.org/it/)
- [Parcel.js](https://parceljs.org/)
- [parcel-plugin-static-files-copy](https://www.npmjs.com/package/parcel-plugin-static-files-copy)
- [Three.js](https://threejs.org/)
- [Particles Example](https://threejs.org/examples/?q=particles#webgl_buffergeometry_custom_attributes_particles)
- [MeshSurfaceSampler](https://threejs.org/docs/#examples/en/math/MeshSurfaceSampler)
- [Gsap](https://greensock.com/gsap/)
- [VisualCode](https://code.visualstudio.com/)
- [Shader languages support for VS Code - Extension](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)
- [github-pages-domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [github-pages](https://docs.github.com/en/pages)
<!-- - [jsorg](https://js.org) -->
- [ReactThreeFiber-pmndrs.docs](https://docs.pmnd.rs)
- [heroku-maintence](https://devcenter.heroku.com/articles/error-pages#testing)

## 🗿

- [Blender](https://www.blender.org/)
- [Free3d](https://free3d.com/)
- [Skull 3D Model](https://free3d.com/3d-model/skull-v3--785914.html)
- [Horse 3D Model](https://free3d.com/3d-model/american-paint-horse-nuetral-v1--575385.html)

## 🪄

- [The Book of Shaders](https://thebookofshaders.com/)
- [Three.js Foundamentals](https://threejsfundamentals.org/)
- [WebGL Foundamentals](https://webglfundamentals.org/)

## Vertex Shader Sample

```js
void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 8.0 / -mvPosition.z;
}
```

## Fragment Shader Sample

```js
void main() {
 gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
```
