import CountryType from "./CountryType";

// sort country by Name
export const sortCountry=(des:string,list:any)=>{
    return list.sort((a:CountryType,b:CountryType)=>{
       return des=='DESC'||des=='desc'? b.name.official>a.name.official?1:-1
                                        :a.name.official>b.name.official?1:-1;
    })
}

// set pagination
export const pagination=(page:number,records:number,list:any)=>{
    if(list.length-1<=records) return list;
    const skip=records*(page-1);
    const take=list.filter((_:any,i:number)=>{
        return i>=skip&&i<page*records;
    });
    return take;
}


// search country by name
export const search=(str:string,list:any)=>{
    const fuzzySearch= fuzzy(list);
    return fuzzySearch(str);
}
//fuzzy search country by name
const fuzzy=(items:any)=>{
    return function(query:string){
        let words=query.toLocaleLowerCase().split(' ');
        return items.filter((v:CountryType)=>{
            let normalizedTerm=v.name.official.toLocaleLowerCase();

            return words.every((word:string)=>{
                return normalizedTerm.indexOf(word)>-1
            })
        })
    }
}