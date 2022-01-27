


function blobToBase64(file, callback ){
  let reader = new FileReader()
  reader.onload = function(e){
    let base64 = e.target.result
    callback(base64)
  }
  reader.readAsDataURL(file)
}

export default blobToBase64