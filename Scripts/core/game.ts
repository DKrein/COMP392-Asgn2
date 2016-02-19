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
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var guiRotation: GUI;
var guiColor: GUI;
var stats: Stats;
var step: number = 0;
var cubeMaterial: LambertMaterial;
var cubeGeometry: CubeGeometry;
//BODY PARTS
var sun: Mesh;
var planet1: Mesh;
var planet2: Mesh;
var planet3: Mesh;
var planet3moon: Mesh;
var planet4: Mesh;
var planet5: Mesh;
var group: Mesh;

var defaultColor:string;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    
    // setup the default renderer
    setupRenderer(); 
	
    // setup the camera
    setupCamera(); 
	
    // add an axis helper to the scene
    /*
    axes = new AxisHelper(80);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
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
    sun = new gameObject(new SphereGeometry(30, 30, 30), new LambertMaterial({color: 0xFFFF00}), 0, 0, 300);
    
    planet1 = new gameObject(new SphereGeometry(8, 30, 30), new LambertMaterial({color: 0x123123}), 0, 0, -120);
    planet2 = new gameObject(new SphereGeometry(19, 30, 30), new LambertMaterial({color: 0x321321}), 0, 70, -180);
    
    planet3 = new gameObject(new SphereGeometry(15, 30, 30), new LambertMaterial({color: 0xff6666}), 0, 0, -330);
    planet3.rotation.x = .7;
    planet3moon = new gameObject(new SphereGeometry(8, 20, 20), new LambertMaterial({color: 0xff66ff}), 0, 0, 45);
    planet3.add(planet3moon);
    
    planet4 = new gameObject(new SphereGeometry(23, 30, 30), new LambertMaterial({color: 0xff6666}), 0, 0, -430);
    planet5 = new gameObject(new SphereGeometry(29, 30, 30), new LambertMaterial({color: 0xff6666}), 0, -40, -600);
    
    sun.add(planet1);
    sun.add(planet2);
    sun.add(planet3);
    sun.add(planet4);
    sun.add(planet5);
    
    scene.add(sun);
    console.log("Plantes added to the scene");
    
    spotLight = new SpotLight(0xffffff,5,500);
    spotLight.position.set(0, 0, -90);
    spotLight.castShadow = true;
    spotLight.target = planet5;
    sun.add(spotLight);
        
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
    window.addEventListener( 'mousewheel', mousewheel, false );
    //this.domElement.addEventListener( 'mousewheel', mousewheel, false );
}


function mousewheel(e) : void {
        //http://www.javascriptkit.com/javatutors/onmousewheel.shtml
        
		e.preventDefault();
		e.stopPropagation();
        var delta: number = 0;
        delta = e.wheelDelta * .02 ;
        
        camera.position.x += delta;
	}
    
// Change the Camera Aspect Ration according to Screen Size changes
function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    
    /*
    // Add Rotation Controls
    gui.add(controlObject,'rotationX',0, 1);
    gui.add(controlObject,'rotationY',0, 1);
    gui.add(controlObject,'rotationZ',0, 1);
    gui.add(controlObject,'resetPosition');
    
    //Controls used to change the colors
    gui.addColor(controlObject,'feetColor').onChange((color) =>{
       leftFoot.material.color = new Color(color);
       rightFoot.material.color = new Color(color);
   });
    gui.addColor(controlObject,'legsColor').onChange((color) =>{
       leftLeg.material.color = new Color(color);
       rightLeg.material.color = new Color(color);
   });
    gui.addColor(controlObject,'armsColor').onChange((color) =>{
       leftArm.material.color = new Color(color);
       rightArm.material.color = new Color(color);
   });
    gui.addColor(controlObject,'torsoColor').onChange((color) =>{
       torso.material.color = new Color(color);
   });
    gui.addColor(controlObject,'headColor').onChange((color) =>{
       head.material.color = new Color(color);
   });
   */
     
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
function gameLoop(): void {
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    planet3.rotation.y += 0.005;
    //sun.rotation.y += 0.01

	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer... black bg screen");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -400;
    camera.position.y = 60;
    camera.position.z = 10;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

