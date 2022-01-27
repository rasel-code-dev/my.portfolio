import React from 'react';
import  "./File.scss"
import Button from "src/components/Button/Button";
import blobToBase64 from "src/utils/blobToBase64";


const File = (props) => {
  
  const { name, values, multiple=false, onChange, coverPhoto, initialImages=[], baseURL } = props
  
  const [state, setState] = React.useState({
    images: [
      { type: "link", url: "", id: 1, cover_image: "" },
      { type: "base64", url: "", id: 2, file: null, cover_image: null },
    ]
  })
  const [deletedItem, setDeletedItem] = React.useState([])
  
  const fileRef = React.useRef()
  const imagePreviewDiv_ref = React.useRef()
  
  React.useEffect(()=>{
    
    // make initial image to link image ==> {id: string, type: 'link', url: 'im/sd/d.jpg', cover_image: link || undefined }[]
    let initImg = []
    initialImages && initialImages.forEach((link, i) => {
      if(link === coverPhoto){
        initImg.push({id: i, type: 'link', url: link, cover_image: coverPhoto})
      } else {
        initImg.push({id: i, type: 'link', url: link, cover_image: undefined})
      }
    })
    setState({...state, images: initImg})
   
  }, [initialImages])
  
  function chooseFile(e){
    e.preventDefault()
    fileRef.current?.click()
  }
  
  function changeHandler(e){
    let files = e.target.files
    if(multiple){
      props.onChange && props.onChange({target: { files: files, name: e.target.name, type: e.target.type }})
      // setState({...state, images: files})
      for (let i=0; i<files.length; i++){
        blobToBase64(files[i], (base64)=>{
          let img = document.createElement("img")
          img.src = base64
          imagePreviewDiv_ref.current?.appendChild(img)
        })
      }
      
    } else{
      
      blobToBase64(e.target.files[0], (base64)=>{
        let updatedImagesList = [...state.images, {id: Date.now(), type: "base64", url: base64, file: files[0]} ]
        setState({
          ...state,
          images: updatedImagesList
        })
        trackChange(updatedImagesList, [])
      })
    }
  }
  function changeRatio(e){
    let imgs = imagePreviewDiv_ref.current?.querySelectorAll("img")
    if(e.target.checked){
      for (let i=0; i<imgs.length; i++){
        imgs[i].style.width = "100%"
      }
    } else {
      for (let i=0; i<imgs.length; i++){
        imgs[i].style.width = ""
      }
    }
  }
  function removeImage(item){
    let deleteItem = state.images.find(i=>i.id === item.id)
    let updatedDeletedItems = []

      // if this comes from database, then remove this and store as array,
      // so that backend track this. orphan images
      if(item.type === "link" && deleteItem.url) {
        updatedDeletedItems = [...deletedItem, deleteItem.url]
        setDeletedItem(updatedDeletedItems)
      }
      
    // remove rendered images
    let updatedImages = state.images.filter(i=>i.id !== item.id )
    setState({...state, images: updatedImages})
  
    // send it inside parent component
    trackChange(updatedImages, updatedDeletedItems)
  }
  
  
  
  
  function makeCoverPhoto(item) {
    
    /** ---------- 1 ----------
     *  make cover photo if this image from database (link image)
     *
     * */
    
    let upState = [...state.images]
    let findSelectedImageIndex = upState.findIndex(i=>i.id === item.id)
    
    if(upState[findSelectedImageIndex].type === "link"){
      if(upState[findSelectedImageIndex].cover_image){
        upState[findSelectedImageIndex].cover_image = undefined
      } else {
        upState[findSelectedImageIndex].cover_image = upState[findSelectedImageIndex].url
      }
    } else {
      if(upState[findSelectedImageIndex].cover_image){
        upState[findSelectedImageIndex].cover_image = undefined
      } else{
        upState[findSelectedImageIndex].cover_image = upState[findSelectedImageIndex].file.name
      }
    }
    
    // only one image for product photo cover
    upState.forEach(i=>{
      if(i.id !== item.id){
        i.cover_image = undefined
      }
    })
    
    setState({
      ...state,
      images: upState
    })
  
    // send it inside parent component
    trackChange(upState, [])
    
  }
  
  function trackChange(images, deletedItems){
    let blobImages = []      // handle via multer then push it in to database
    let linkImages = []      // simply push database
    
    let coverImage = { name: undefined, url: undefined };
    images.forEach(item=>{
      if(item.type === "base64"){
        blobImages.push(item.file)
        if(item.cover_image){
          coverImage = { name: item.cover_image, url: undefined }
        }
      }
      if (item.type === "link"){
        linkImages.push(item.url)
        if(item.cover_image){
          coverImage = { url: item.cover_image, name: undefined }
        }
      }
    })

    
    props.onChange && props.onChange({target: {
        blobImages: blobImages,
        linkImages: linkImages,
        coverImage: coverImage,
        deletedItems: deletedItems,
        name: name,
        type: "file"
      }
    })
  }
  
  
  return (
    <div className="image-upload-form">
      <input multiple={multiple} ref={fileRef} onChange={changeHandler} hidden={true} type="file" name={name} id={name} />
      
      <input type="checkbox"  onChange={changeRatio} />
      
      <div ref={imagePreviewDiv_ref} className="file-preview-image">
        <Button onClick={chooseFile} className="image-uplaod-button img_wrapper" >
          <i className="far fa-cloud-upload-alt" />
        </Button>
        { state.images.length > 0 && state.images.map(item=>{
          return (
            <div className="img_wrapper">
              <img src={ item.type === "link" ? (baseURL + "/" + item.url) : item.url } alt={item.url} />
              <span onClick={()=>removeImage(item)} className="remove-image" >x</span>
              <span onClick={()=>makeCoverPhoto(item)} className={["cover-image", item.cover_image ? "active-cover-image" : "" ].join(" ")} >
                <i className="fa fa-heart" />
              </span>
            </div>
          )
        }) }
      </div>
    </div>
  );
};

export default File;