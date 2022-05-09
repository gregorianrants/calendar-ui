import getColumn from './getColumn.js';

function getColumns(number){
    const result = []
    for(let i=0;i<number;i++){
        result.push(getColumn())
    }
    return result.flat()

}

export default getColumns;


function main(){
    console.log(getColumns(1))
    console.log(getColumns(2))
}


// if (require.main === module){
//     main()
// }