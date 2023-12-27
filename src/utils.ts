const formatDate =(date:Date)=>{
    const options:Intl.DateTimeFormatOptions = {year:"numeric",month:"long",day:"numeric"}
    return new Date(date).toLocaleDateString(undefined,options)
}


export {formatDate}