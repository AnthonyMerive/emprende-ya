import {useState} from 'react'
import { fileUpload } from '../helpers/FileUpload'

export const useImages = (initialState) => {
    
    const [images, setImages] = useState(initialState)

    const handleFileChange = (e) => {
            const files = e.target.files
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                console.log(i)
                fileUpload(file)
                    .then(resp => {
                        console.log(resp)
                        images[i] = resp
                    }).catch(err => {
                        console.log(err.message)
                    })
            }    
    }
    console.log(images)



    return [ images, handleFileChange, setImages ];
}
