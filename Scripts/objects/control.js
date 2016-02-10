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
        function Control(defaultColor, group) {
            //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.feetColor = defaultColor;
            this.legsColor = defaultColor;
            this.armsColor = defaultColor;
            this.torsoColor = defaultColor;
            this.headColor = defaultColor;
            this.group = group;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.resetPosition = function () {
            group.rotation.x = 0;
            group.rotation.y = 0;
            group.rotation.z = 0;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map