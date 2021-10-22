export function getNumPixels(str) {
    return String(str).slice(0, str.length - 2) * 1
}

export function addToPixels(withPx, num) {
    return (getNumPixels(withPx) * 1 + num) + 'px'
}

export function fromTop(fromBottom,containerHeight){
    return containerHeight-fromBottom
}

export function fromBottom(fromTop,containerHeight){
    return containerHeight-fromTop
}

export const roundToNearest=(inputValue,nearest)=>{
    return Math.round(inputValue/nearest)*nearest
}
