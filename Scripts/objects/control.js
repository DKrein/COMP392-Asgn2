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
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(camera) {
            //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
            this.zoomInOut = -500;
            this.moveLeftRight = 0;
            this.camera = camera;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.resetCamera = function () {
            this.zoomInOut = -500;
            this.moveLeftRight = 0;
            camera.position.x = -500;
            camera.position.y = 0;
            camera.position.z = 0;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map