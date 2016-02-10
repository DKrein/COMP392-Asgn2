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
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
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
var head;
var torso;
var leftArm;
var rightArm;
var leftLeg;
var rightLeg;
var leftFoot;
var rightFoot;
var group;
var defaultColor;
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
    plane = new gameObject(new PlaneGeometry(40, 80, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // Add objects to the scene
    //length, height, width - color - front/back, up/down, left/rigth
    head = new gameObject(new CubeGeometry(4, 3, 4), new LambertMaterial({ color: 0xffcc99 }), 0, 14, 0);
    torso = new gameObject(new CubeGeometry(4, 6, 7), new LambertMaterial({ color: 0xff6666 }), 0, 9, 0);
    rightLeg = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({ color: 0x6666ff }), 0, 3, 2);
    leftLeg = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({ color: 0x6666ff }), 0, 3, -2);
    rightFoot = new gameObject(new CubeGeometry(3, 2, 1), new LambertMaterial({ color: 0x000000 }), -2, 1, 2);
    leftFoot = new gameObject(new CubeGeometry(3, 2, 1), new LambertMaterial({ color: 0x000000 }), -2, 1, -2);
    rightArm = new gameObject(new CubeGeometry(2, 1, 5), new LambertMaterial({ color: 0xffcccc }), 0, 10.5, 6.3);
    leftArm = new gameObject(new CubeGeometry(2, 1, 5), new LambertMaterial({ color: 0xffcccc }), 0, 10.5, -6.3);
    console.log("Cubeman parts created");
    group = new THREE.Object3D();
    group.add(head);
    group.add(torso);
    group.add(leftArm);
    group.add(rightArm);
    group.add(leftLeg);
    group.add(rightLeg);
    //Feet added for bonus mark :)
    group.add(leftFoot);
    group.add(rightFoot);
    scene.add(group);
    console.log("Cubeman added to the scene");
    // add controls
    defaultColor = "#000000";
    gui = new GUI();
    control = new Control(defaultColor, group);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
// Change the Camera Aspect Ration according to Screen Size changes
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    // Add Rotation Controls
    gui.add(controlObject, 'rotationX', 0, 1);
    gui.add(controlObject, 'rotationY', 0, 1);
    gui.add(controlObject, 'rotationZ', 0, 1);
    gui.add(controlObject, 'resetPosition');
    //Controls used to change the colors
    gui.addColor(controlObject, 'feetColor').onChange(function (color) {
        leftFoot.material.color = new Color(color);
        rightFoot.material.color = new Color(color);
    });
    gui.addColor(controlObject, 'legsColor').onChange(function (color) {
        leftLeg.material.color = new Color(color);
        rightLeg.material.color = new Color(color);
    });
    gui.addColor(controlObject, 'armsColor').onChange(function (color) {
        leftArm.material.color = new Color(color);
        rightArm.material.color = new Color(color);
    });
    gui.addColor(controlObject, 'torsoColor').onChange(function (color) {
        torso.material.color = new Color(color);
    });
    gui.addColor(controlObject, 'headColor').onChange(function (color) {
        head.material.color = new Color(color);
    });
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
    //group.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    group.rotation.x += control.rotationX;
    group.rotation.y += control.rotationY;
    group.rotation.z += control.rotationZ;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 20;
    camera.position.z = 5;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map