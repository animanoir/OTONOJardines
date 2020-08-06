/* --------------------------- Manager del loading -------------------------- */

var loadingManager = new THREE.LoadingManager();
const loadingScreen = document.getElementById('loading-screen');

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log('Started loading file: ' + url + '.\nLoaded' + itemsLoaded + 'of' + itemsTotal + 'files.');
}

loadingManager.onLoad = function () {
  console.log('Carga completa.');
  RESOURCES_LOADED = true;
  loadingScreen.classList.add('fade-out');
  loadingScreen.addEventListener('transitionend', onTransitionEnd);
}

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
}

loadingManager.onError = function (url) {

  console.log('There was an error loading ' + url);

};

var RESOURCES_LOADED = false;

/* ------------------------------ Configuraciones ------------------------------ */

var camera;
var canvas = document.querySelector('#c');
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setClearColor('white')

var controls;

var spheres = [];


/* ------------------------------ Main program ------------------------------ */

function main() {
  const scene = new THREE.Scene();

  var esferaMaterial = new THREE.MeshLambertMaterial()
  // esferaMaterial.emissive(new THREE.Color('0xff0000'));
  var esfera = new THREE.SphereBufferGeometry(10, 32, 16);
  for (var i = 0; i < 1500; i++) {
    var esferaMesh = new THREE.Mesh(esfera, esferaMaterial);
    esferaMesh.position.x = Math.random() * 2000;
    esferaMesh.position.y = Math.random() * 2000;
    esferaMesh.position.z = Math.random() * 2000;
    esferaMesh.scale.x = esferaMesh.scale.y = esferaMesh.scale.z = Math.random() * 2;
    scene.add(esferaMesh);
    spheres.push(esferaMesh);
  }

  renderer.autoClearColor = false;

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 500;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const fogNear = 1;
  const fogFar = 500;
  const color = 'white';
  scene.fog = new THREE.Fog(color, fogNear, fogFar);
  scene.background = new THREE.Color('white');

  // const controls = new THREE.OrbitControls(camera, canvas);
  // camera.position.set( 0, 0, 1 );
  // controls.update();

  //----------------------------------------------------------------------------------------
  // AudioSources
  //----------------------------------------------------------------------------------------
  var audioLoader = new THREE.AudioLoader(loadingManager);
  var listener = new THREE.AudioListener();
  camera.add(listener);

  var audioSource = new THREE.SphereBufferGeometry(20, 32, 16);
  var audioSourceMaterial = new THREE.MeshPhongMaterial({
    color: 0x01eaca,
    flatShading: true,
    shininess: 0
  });
  var mesh1 = new THREE.Mesh(audioSource, audioSourceMaterial);
  mesh1.position.set(100, 30, 0);
  scene.add(mesh1);

  var sound1 = new THREE.PositionalAudio(listener);
  audioLoader.load('audioAferra.mp3', function (buffer) {

    sound1.setBuffer(buffer);
    sound1.setLoop(true);
    sound1.setRefDistance(20);
    sound1.play();

  });
  mesh1.add(sound1);

  var audioLoader2 = new THREE.AudioLoader(loadingManager);
  var listener2 = new THREE.AudioListener();
  camera.add(listener2);

  var audioSource2 = new THREE.SphereBufferGeometry(20, 32, 16);
  var audioSourceMaterial2 = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: true,
    shininess: 0
  });
  var mesh2 = new THREE.Mesh(audioSource2, audioSourceMaterial2);
  mesh2.position.set(650, 60, 0);
  scene.add(mesh2);

  var sound2 = new THREE.PositionalAudio(listener2);
  audioLoader2.load('audioAqui.mp3', function (buffer) {

    sound2.setBuffer(buffer);
    sound2.setLoop(true);
    sound2.setRefDistance(20);
    sound2.play();

  });
  mesh2.add(sound2);

  var audioLoader3 = new THREE.AudioLoader(loadingManager);
  var listener3 = new THREE.AudioListener();
  camera.add(listener3);

  var audioSource3 = new THREE.SphereBufferGeometry(20, 32, 16);
  var audioSourceMaterial3 = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    flatShading: true,
    shininess: 0
  });
  var mesh3 = new THREE.Mesh(audioSource3, audioSourceMaterial3);
  mesh3.position.set(-650, 60, 0);
  scene.add(mesh3);

  var sound3 = new THREE.PositionalAudio(listener3);
  audioLoader3.load('audioAlquitran.mp3', function (buffer) {

    sound3.setBuffer(buffer);
    sound3.setLoop(true);
    sound3.setRefDistance(20);
    sound3.play();

  });
  mesh3.add(sound3);

  var audioLoader4 = new THREE.AudioLoader(loadingManager);
  var listener4 = new THREE.AudioListener();
  camera.add(listener4);

  var audioSource4 = new THREE.SphereBufferGeometry(20, 32, 16);
  var audioSourceMaterial4 = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    flatShading: true,
    shininess: 0
  });
  var mesh4 = new THREE.Mesh(audioSource4, audioSourceMaterial4);
  mesh4.position.set(-1300, 260, 0);
  scene.add(mesh4);

  var sound4 = new THREE.PositionalAudio(listener4);
  audioLoader4.load('audioApo.mp3', function (buffer) {

    sound4.setBuffer(buffer);
    sound4.setLoop(true);
    sound4.setRefDistance(20);
    sound4.play();

  });
  mesh4.add(sound4);

  controls = new THREE.FirstPersonControls(camera, renderer.domElement);
  camera.position.z = 0;
  camera.position.x = 0;
  camera.position.y = 0;
  controls.movementSpeed = 81;
  controls.lookSpeed = .045;
  controls.domElement = renderer.domElement;
  controls.autoForward = false;
  controls.dragToLook = false;
  {
    const color = 0xFFFFFF;
    const intensity = 5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  //El (gltf) => { } es otra manera de escribir function(){}.
  var loader = new THREE.GLTFLoader(loadingManager);
  loader.load('zen.gltf', (gltf) => {
    gltf.scene.scale.set(500, 500, 500) // scale here
    // gltf.scene.rotation.set( 0.8, 0, 0)
    scene.add(gltf.scene);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  renderer.setClearColor(0xffffff);

  /* ----------------------------- Render function ---------------------------- */

  function render(time) {
    var delta = clock.getDelta();
    time *= 0.0001;
    controls.update(delta);
    if (camera.position.z <= -1300) {
      camera.position.z = 1800;
      camera.position.x = 0;
      camera.position.y = 5;
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();

function onTransitionEnd(event) {
  event.target.remove();
}