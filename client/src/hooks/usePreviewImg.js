import { useState } from "react"
import useShowToast from "./useShowToast"


const usePreviewImg = () => {
    
    const [selectedfile,setSelectedfile] = useState(null)
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024 //2MB

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB", "error")
                setSelectedfile(null)
                return
            }
            
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedfile(reader.result)
            }

            reader.readAsDataURL(file)
            
        } else {
            showToast("Error", "Please select an image file", "error")
            setSelectedfile(null)
        }
    }

  return {selectedfile, handleImageChange, setSelectedfile} 
}

export default usePreviewImg
