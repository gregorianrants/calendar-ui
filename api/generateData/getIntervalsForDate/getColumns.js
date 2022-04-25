const getColumn = require('./getColumn')

function getColumns(number){
    const result = []
    for(let i=0;i<number;i++){
        result.push(getColumn())
    }
    return result.flat()

}

module.exports = getColumns


function main(){
    console.log(getColumns(1))
    console.log(getColumns(2))
}


if (require.main === module){
    main()
}