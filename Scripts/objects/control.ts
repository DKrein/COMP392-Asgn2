/// <reference path="../../typings/tsd.d.ts"/>

/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 19-02-2016
File description: 
- Controls the variables of GUI for zoomInOut, moveLeftRight and resetCamera

Revision:
1 - added variables for zoom and position
2 - added zoom to the planets
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public planetNumber: number = 0;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor() {
           
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public resetCamera(): void {
            this.planetNumber=0;
        }
        
        public zoomPlanet1(): void {
            this.planetNumber=1;
        }
        
        public zoomPlanet2(): void {
            this.planetNumber=2;
        }
        
        public zoomPlanet3(): void {
            this.planetNumber=3;
        }
        
        public zoomPlanet4(): void {
            this.planetNumber=4;
        }
        
        public zoomPlanet5(): void {
            this.planetNumber=5;
        }
        
        public keepZoom(): void {
            
            switch (this.planetNumber) {
                case 1:
                    camera.position.x = planet1.position.x - 30;
                    camera.position.z = planet1.position.z;
                break;
                case 2:
                    camera.position.x = planet2.position.x - 50;
                    camera.position.z = planet2.position.z;
                break;
                case 3:
                    camera.position.x = planet3.position.x - 30;
                    camera.position.z = planet3.position.z;
                break;
                case 4:
                    camera.position.x = planet4.position.x - 50;
                    camera.position.z = planet4.position.z;
                break;
                case 5:
                    camera.position.x = planet5.position.x - 70;
                    camera.position.z = planet5.position.z;
                break;
                default:
                    camera.position.x = -500;  
                    camera.position.z = 0;
                break;
            }
                     
        }        
                
    }
}
