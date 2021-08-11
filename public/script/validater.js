exports.getValid = function(email , pass){
  if(email === "" || pass === ""){
    var ts = false;
  }else{
    var ts = true;
  }
  return ts;
}
