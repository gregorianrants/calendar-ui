module.exports = function autoCatch (handlers) {
    return Object.keys(handlers).reduce((autoHandlers, key) => {
        const handler = handlers[key]
        autoHandlers[key] = (req, res, next) =>
            Promise.resolve(handler(req, res, next)).catch(next)
        return autoHandlers
    }, {})
}


//do i need to wrap handler function in Promise.resolve to make sure it is an async function?
// module.exports = function wrapHandlers(handlers){
//         const wrapped = {}
//         for (const [handlerName,handlerFunction] of Object.entries(handlers)){
//             wrapped[handlerName] = (req,res,next) => Promise.resolve(next)
//
//         }
//         return wrapped
//     }





