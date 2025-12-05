export const chunkArray = (myArray: any[] , chunkSize: number)=>{ 
    const result =[];
    while(myArray.length){
        result.push(myArray.splice(0, chunkSize));
    }
    return result
}