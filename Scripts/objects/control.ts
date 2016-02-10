/// <reference path="../../typings/tsd.d.ts"/>

/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 03-02-2016
File description: 
- Controls the variables of GUI for rotation and colors in the cubeman.

Revision:
1 - added variables for rotation
2 - set default rotation as zero
3 - added cubeman parts colors
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationX: number = 0;
        public rotationY: number = 0;
        public rotationZ: number = 0;
        public feetColor: string;
        public legsColor: string;
        public armsColor: string;
        public torsoColor: string;
        public headColor: string;
        public group: Mesh
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(defaultColor:string, group: Mesh) {
           this.feetColor = defaultColor;
           this.legsColor = defaultColor;
           this.armsColor = defaultColor;
           this.torsoColor = defaultColor;
           this.headColor = defaultColor;
           this.group = group;     
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public resetPosition(): void {
            group.rotation.x = 0;
            group.rotation.y = 0;
            group.rotation.z = 0;
        }
    }
}
