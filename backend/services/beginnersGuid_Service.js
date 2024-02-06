import beginnersGuid from "../Models/beginnersGuid.js"


export const InsertBeginnersGuid=async (data)=>{
    const instance =await beginnersGuid.create(data)
    return instance
}

export const getBeginnersGuid= async ()=>{
    console.log("Beginners Guid")
    const instances = await beginnersGuid.findAll()
    return instances
}

export const getBeginnersGuidById=async (Id)=>{
    const instance = await beginnersGuid.findByPk(Id)
    return instance
}

export const removeBeginnersGuid= async(Id)=>{
    await beginnersGuid.destroy({
        where:{
            newsId:Id
        }
    })
    return true
} 

export const updateBeginnersGuid = async(Id,data)=>{
    const instance=await beginnersGuid.update(data,{
        where:{
            newsId:Id
        }
    })
    return instance
}

export const removeImageFromBeginnersGuid = async(Id)=>{
    const instance=await beginnersGuid.update({
        "image":""
    },{
        where:{
            newsId:Id
        }
    })
    return instance
}