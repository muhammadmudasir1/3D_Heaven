import sharp from 'sharp'
import { unlink } from "fs"

export async function reduce(imageName){
    let fileName=''
    const dotIndex = imageName.lastIndexOf('.');
    if (dotIndex !== -1 && dotIndex > 0) {
        fileName=imageName.substring(0, dotIndex);
    } else {
        fileName=imageName;
    }
    try {
        await sharp(`./upload/${imageName}`).resize(720,576).toFile(`./upload/s${fileName}.webp`)
        await sharp(`./upload/${imageName}`).toFormat('webp').toFile(`./upload/${fileName}.webp`)
    
        unlink(`./upload/${imageName}`,(err)=>{
            console.log(err)
        })

        return `${fileName}.webp`
        
    } catch (error) {
        return error
    }
}