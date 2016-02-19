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