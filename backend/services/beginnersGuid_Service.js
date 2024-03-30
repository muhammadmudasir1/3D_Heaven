import beginnersGuid from "../Models/beginnersGuid.js"


export const InsertBeginnersGuid=async (data)=>{
    const instance =await beginnersGuid.create(data)
    return instance
}

export const getBeginnersGuid= async ()=>{
    console.log("Beginners Guid")
    const instances = await beginnersGuid.findAll({
        attributes: ['guidId', 'Title','description','image']
    })
    return instances
}

export const getBeginnersGuidById=async (Id)=>{
    const instance = await beginnersGuid.findByPk(Id)
    return instance
}

export const removeBeginnersGuid= async(Id)=>{
    await beginnersGuid.destroy({
        where:{
            guidId:Id
        }
    })
    return true
} 

export const updateBeginnersGuid = async(Id,data)=>{
    const instance=await beginnersGuid.update(data,{
        where:{
            guidId:Id
        }
    })
    return instance
}

export const removeImageFromBeginnersGuid = async(Id)=>{
    const instance=await beginnersGuid.update({
        "image":""
    },{
        where:{
            guidId:Id
        }
    })
    return instance
}