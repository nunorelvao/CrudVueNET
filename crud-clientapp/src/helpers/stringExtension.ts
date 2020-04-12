interface String {
    toBoolean(): boolean;
  }
  
  String.prototype.toBoolean = function (): boolean {
    switch (this) {
      case 'true':
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }