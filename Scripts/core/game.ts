/// <reference path="_reference.ts"/>

// MAIN GAME FILE

/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 03-02-2016
File description: 
- Controls the general game information, like creationg of solar system and controls.

Revision:
1 - planets created
2 - distance and position adjusted
3 - planets movment adjusted
4 - zommInOut and moveLeftRight added to controlles
5 - textures added
6 - lighting fixed
7 - added more moons
8 - added a plane with a space texture to the background
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
import ImageUtils = THREE.ImageUtils;

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
var planet5moon: Mesh;
var planet5moonMoon: Mesh;

var planetTest: Mesh;

var speedRotation1: number = 0;
var speedRotation2: number = 0;
var speedRotation3: number = 0;
var speedRotation4: number = 0;
var speedRotation5: number = 0;

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
    plane = new gameObject(
        new PlaneGeometry(6000, 3000, 1, 1),
        new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/space.jpg')}),
        500, 0, 0);
    plane.receiveShadow = false;
    plane.rotation.y = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
     // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x664200);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    
    // Add objects to the scene
    //length, height, width - color - front/back, up/down, left/rigth
    sun = new gameObject(new SphereGeometry(30, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/sun.jpg')}), 0, 0, 0);
    
    planet1 = new gameObject(new SphereGeometry(8, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/planet1.jpg')}), 0, 0, 0);
    planet2 = new gameObject(new SphereGeometry(19, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/planet2.jpg')}), 0, 0, 0);
    
    planet3 = new gameObject(new SphereGeometry(15, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/planet3.jpg')}), 0, 0, 0);
    planet3moon = new gameObject(new SphereGeometry(8, 20, 20), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/moon1.jpg')}), 0, 0, 45);
    planet4 = new gameObject(new SphereGeometry(23, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/planet4.png')}), 0, 0, 0);
    planet5 = new gameObject(new SphereGeometry(29, 30, 30), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/planet5.jpg')}), 0, 0, 0);
    
    planet5moon = new gameObject(new SphereGeometry(6, 20, 20), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/moon2.jpg')}), 0, 0, 55);
    planet5moonMoon = new gameObject(new SphereGeometry(3, 20, 20), new LambertMaterial({map: ImageUtils.loadTexture('../../Content/Images/moon3.jpg')}), 0, 0, 18);
    
    planet3.add(planet3moon);
    
    planet5moon.add(planet5moonMoon);
    planet5.add(planet5moon);
    
    scene.add(planet1);
    scene.add(planet2);
    scene.add(planet3);
    scene.add(planet4);
    scene.add(planet5);
    scene.add(sun);
    
    console.log("Plantes added to the scene");
    
    //here we set all the lights...
    //light for the sun
    spotLight = new SpotLight(0xffffff,.7,500,360,0,0);
    spotLight.position.set(-70, 0, 0);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    console.log("Added a SpotLight Light 360 to Scene");

    //lights for the sun
    spotLight = new SpotLight(0xffffff,3,60,120,0,0);
    spotLight.position.set(-60, 0, 0);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    
    spotLight = new SpotLight(0xffffff,3,60,120,0,0);
    spotLight.position.set(0, 0, -60);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    
    spotLight = new SpotLight(0xffffff,3,60,120,0,0);
    spotLight.position.set(0, 0, 60);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    
    spotLight = new SpotLight(0xffffff,3,60,120,0,0);
    spotLight.position.set(0, -60, 0);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    
    spotLight = new SpotLight(0xffffff,3,60,120,0,0);
    spotLight.position.set(0, 60, 0);
    spotLight.castShadow = true;
    spotLight.target = sun;
    scene.add(spotLight);
    console.log("Added a Sun's SpotLight to Scene");
       
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
    window.addEventListener( 'mousewheel', mousewheel, false );
}


function mousewheel(e) : void {
        //http://www.javascriptkit.com/javatutors/onmousewheel.shtml
        //not working, controlls take care about camera zoom
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
    
    // Add Rotation Controls
    gui.add(controlObject,'resetCamera');
    gui.add(controlObject,'zoomPlanet1');
    gui.add(controlObject,'zoomPlanet2');
    gui.add(controlObject,'zoomPlanet3');
    gui.add(controlObject,'zoomPlanet4');
    gui.add(controlObject,'zoomPlanet5');
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
    
    control.keepZoom();
    rotatePlanets();
    movePlanets();    
	    
    // render the scene
    renderer.render(scene, camera);
}

 function rotatePlanets(): void {
    
    sun.rotation.x += 0.001;
    sun.rotation.y += 0.0005;
    
    planet1.rotation.y += 0.005;
    planet1.rotation.x += 0.05;
    
    planet2.rotation.y += 0.1;
    
    planet3.rotation.y += 0.005;
    
    planet4.rotation.x += 0.05;
    
    planet5.rotation.y += 0.005;
    planet5.rotation.x += 0.0015;
    planet5.rotation.z += 0.0025;
    
    planet3moon.rotation.y += 0.002;
    planet3moon.rotation.z += 0.008;
    
    planet5moon.rotation.y += 0.1;
    planet5moon.rotation.z += 0.05;
    planet5moonMoon.rotation.x += 0.01;
 }

 function movePlanets(): void {
    
    var distanceFromSun: number;
    
    //watch?v=-86Ii85PSL8 rotate using sin cos
    
    //for planet 1
    distanceFromSun = 100;
    speedRotation1 += .003;
    planet1.position.set((sun.position.x + Math.cos(speedRotation1))*(distanceFromSun*.5), 0, (sun.position.y + Math.sin(speedRotation1)) * distanceFromSun);
    
    //for planet 2
    distanceFromSun = 250;
    speedRotation2 += .007;
    planet2.position.set((sun.position.x + Math.cos(speedRotation2))*(distanceFromSun*.5), 0, (sun.position.y + Math.sin(speedRotation2)) * distanceFromSun);
    
    //for planet 3
    distanceFromSun = 400;
    speedRotation3 += .01;
    planet3.position.set((sun.position.x + Math.cos(speedRotation3))*(distanceFromSun*.5), 0, (sun.position.y + Math.sin(speedRotation3)) * distanceFromSun);
    
    //for planet 4
    distanceFromSun = 590;
    speedRotation4 += .001;
    planet4.position.set((sun.position.x + Math.cos(speedRotation4))*(distanceFromSun*.5), 0, (sun.position.y + Math.sin(speedRotation4)) * distanceFromSun);
    
    //for planet 5   
    distanceFromSun = 800;
    speedRotation5 += .005;
    planet5.position.set((sun.position.x + Math.cos(speedRotation5))*(distanceFromSun*.5), 0, (sun.position.y + Math.sin(speedRotation5)) * distanceFromSun);
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
    camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -500;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.rotation.x = -45;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

