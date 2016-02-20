/// <reference path="../../typings/tsd.d.ts"/>

/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 19-02-2016
File description: 
- Controls the variables of GUI for zoomInOut, moveLeftRight and resetCamera

Revision:
1 - added variables for zoom and position
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public zoomInOut: number = -400;
        public moveLeftRight: number = 0;
        public camera: Object;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(camera:Object) {
            this.camera = camera;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public resetCamera(): void {
            this.zoomInOut = -500;  
            this.moveLeftRight = 0;
            
            camera.position.x = -500;
            camera.position.y = 0;
            camera.position.z = 0;
        }
    }
}
