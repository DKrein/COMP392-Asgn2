/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 03-02-2016
File description:
- Controls the general game information, like creationg of cubeman and controls.

Revision:
1 - camera modified
2 - cube parts added
3 - colors changed
4 - code changed to create cubes in one line
5 - added control to rotate the cube man
6 - added control to change the colors
*/
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var guiRotation;
var guiColor;
var stats;
var step = 0;
var cubeMaterial;
var cubeGeometry;
//BODY PARTS
var sun;
var planet1;
var planet2;
var planet3;
var planet3moon;
var planet4;
var planet5;
var group;
var speedRotation1 = 0;
var speedRotation2 = 0;
var speedRotation3 = 0;
var speedRotation4 = 0;
var speedRotation5 = 0;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    // setup the default renderer
    setupRenderer();
    // setup the camera
    setupCamera();
    // add an axis helper to the scene
    axes = new AxisHelper(80);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    /*
    plane = new gameObject(
        new PlaneGeometry(40, 80, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    */
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    //scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // Add objects to the scene
    //length, height, width - color - front/back, up/down, left/rigth
    sun = new gameObject(new SphereGeometry(30, 30, 30), new LambertMaterial({ color: 0xFFFF00 }), 0, 0, 0);
    sun.receiveShadow = false;
    sun.castShadow = false;
    planet1 = new gameObject(new SphereGeometry(8, 30, 30), new LambertMaterial({ color: 0x123123 }), 0, 0, 0);
    planet2 = new gameObject(new SphereGeometry(19, 30, 30), new LambertMaterial({ color: 0x321321 }), 0, 0, 0);
    planet3 = new gameObject(new SphereGeometry(15, 30, 30), new LambertMaterial({ color: 0xff6666 }), 0, 0, 0);
    planet3.rotation.x = .7;
    planet3moon = new gameObject(new SphereGeometry(8, 20, 20), new LambertMaterial({ color: 0xff66ff }), 0, 0, 45);
    planet4 = new gameObject(new SphereGeometry(23, 30, 30), new LambertMaterial({ color: 0xff6666 }), 0, 0, 0);
    planet5 = new gameObject(new SphereGeometry(29, 30, 30), new LambertMaterial({ color: 0xff6666 }), 0, 0, 0);
    planet3.add(planet3moon);
    scene.add(planet1);
    scene.add(planet2);
    scene.add(planet3);
    scene.add(planet4);
    scene.add(planet5);
    scene.add(sun);
    console.log("Plantes added to the scene");
    spotLight = new SpotLight(0xffffff, 1, 500, 90, 0, 0);
    spotLight.position.set(0, 0, -90);
    spotLight.castShadow = true;
    spotLight.target = planet5;
    sun.add(spotLight);
    // add controls
    gui = new GUI();
    control = new Control();
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
    window.addEventListener('mousewheel', mousewheel, false);
}
function mousewheel(e) {
    //http://www.javascriptkit.com/javatutors/onmousewheel.shtml
    e.preventDefault();
    e.stopPropagation();
    var delta = 0;
    delta = e.wheelDelta * .02;
    camera.position.x += delta;
}
// Change the Camera Aspect Ration according to Screen Size changes
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    // Add Rotation Controls
    gui.add(controlObject, 'zoomInOut', -500, -100);
    gui.add(controlObject, 'moveLeftRight', -300, 300);
    gui.add(controlObject, 'resetCamera');
}
// Add Stats Object to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    camera.position.x = control.zoomInOut;
    camera.position.z = control.moveLeftRight;
    rotatePlanets();
    movePlanets();
    // render the scene
    renderer.render(scene, camera);
}
function rotatePlanets() {
    planet1.rotation.y += 0.005;
    planet1.rotation.x += 0.05;
    planet2.rotation.y += 0.1;
    planet3.rotation.y += 0.005;
    planet4.rotation.x += 0.05;
    planet5.rotation.y += 0.05;
    planet5.rotation.x += 0.015;
    planet5.rotation.z += 0.025;
}
function movePlanets() {
    var distanceFromSun;
    //watch?v=-86Ii85PSL8 rotate using sin cos
    //for planet 1
    distanceFromSun = 100;
    speedRotation1 += .003;
    planet1.position.set((sun.position.x + Math.cos(speedRotation1)) * (distanceFromSun * .5), 0, (sun.position.y + Math.sin(speedRotation1)) * distanceFromSun);
    //for planet 2
    distanceFromSun = 250;
    speedRotation2 += .007;
    planet2.position.set((sun.position.x + Math.cos(speedRotation2)) * (distanceFromSun * .5), 0, (sun.position.y + Math.sin(speedRotation2)) * distanceFromSun);
    //for planet 3
    distanceFromSun = 400;
    speedRotation3 += .01;
    planet3.position.set((sun.position.x + Math.cos(speedRotation3)) * (distanceFromSun * .5), 0, (sun.position.y + Math.sin(speedRotation3)) * distanceFromSun);
    //for planet 4
    distanceFromSun = 590;
    speedRotation4 += .001;
    planet4.position.set((sun.position.x + Math.cos(speedRotation4)) * (distanceFromSun * .5), 0, (sun.position.y + Math.sin(speedRotation4)) * distanceFromSun);
    //for planet 5   
    distanceFromSun = 800;
    speedRotation5 += .005;
    planet5.position.set((sun.position.x + Math.cos(speedRotation5)) * (distanceFromSun * .5), 0, (sun.position.y + Math.sin(speedRotation5)) * distanceFromSun);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer... black bg screen");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -500;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map