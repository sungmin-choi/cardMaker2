
export default class Cloudinary{
    constructor() {
        this.cloud_url = process.env.REACT_APP_CLOUD_URL;         
    }

    uploadImage=async(files,setImgUrl,setImgName)=>{
        const formData = new FormData();
        let theFile = files[0];
        formData.append("file", theFile);
        formData.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET);
        await fetch(this.cloud_url, {
        method: "POST",
        body: formData
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setImgUrl(data.url);
            setImgName(data.original_filename);
        });
    }
}

