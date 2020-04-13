"use strict";
String.prototype.toBoolean = function () {
    switch (this) {
        case 'true':
        case '1':
        case 'on':
        case 'yes':
            return true;
        default:
            return false;
    }
};
//# sourceMappingURL=stringExtension.js.map