const cloudinaryUrl = "/upload";
const cloudinaryUploadPreset = "";

let imgPreview = document.getElementById ("img-review");
let fileUpload = document.getElementById("file-uplaod");

fileUpload.addEventListener("change", function(event){
    console.log(event);
    let file = event.target.file[0];
    console.log(file);
    let formData = new FormData();
    formData.append('file', file):
    formData.append('upload_preset', cloudinaryUploadPreset):
    
    axios({
        ur: cloudinaryUrl,
        method: "POST",
        data: {
            'Conent-Type': 'application/x-www-form-urlencoded'
        },
        data: formData             
    }). then(function(res){
        console.log(res);
        imgPreview.src = res.dat.secure_url;
     }).catch(function(err){
        console.error(err)
     })

});