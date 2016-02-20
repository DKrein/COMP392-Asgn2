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
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control() {
            //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
            this.planetNumber = 0;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.resetCamera = function () {
            this.planetNumber = 0;
        };
        Control.prototype.zoomPlanet1 = function () {
            this.planetNumber = 1;
        };
        Control.prototype.zoomPlanet2 = function () {
            this.planetNumber = 2;
        };
        Control.prototype.zoomPlanet3 = function () {
            this.planetNumber = 3;
        };
        Control.prototype.zoomPlanet4 = function () {
            this.planetNumber = 4;
        };
        Control.prototype.zoomPlanet5 = function () {
            this.planetNumber = 5;
        };
        Control.prototype.keepZoom = function () {
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
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map