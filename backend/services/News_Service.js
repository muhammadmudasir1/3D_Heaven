import news from "../Models/news.js"


export const InsertNews=async (data)=>{
    const instance =await news.create(data)
    return instance
}

export const getNews= async ()=>{
    const instances = await news.findAll({
        attributes: ['newsId', 'Title','description','image']
    })
    return instances
}

export const getNewsById=async (Id)=>{
    const instance = await news.findByPk(Id)
    return instance
}

export const removeNews= async(Id)=>{
    await news.destroy({
        where:{
            newsId:Id
        }
    })
    return true
} 

export const updateNews = async(Id,data)=>{
    const instance=await news.update(data,{
        where:{
            newsId:Id
        }
    })
    return instance
}

export const removeImageFromNews = async(Id)=>{
    const instance=await news.update({
        "image":""
    },{
        where:{
            newsId:Id
        }
    })
    return instance
}