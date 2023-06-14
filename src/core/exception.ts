


function NotFoundException(message) {
  this.message = message;
}   
NotFoundException.prototype = new Error;


function InvalidSignatureException(message) {
  this.message = message;
}   
InvalidSignatureException.prototype = new Error;

export {
  NotFoundException,
  InvalidSignatureException
}
