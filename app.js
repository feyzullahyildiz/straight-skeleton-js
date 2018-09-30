const firstCanvas = document.getElementById('first-canvas')
const secondCanvas = document.getElementById('second-canvas')

const context = firstCanvas.getContext("2d")
const secondContext = secondCanvas.getContext("2d")
window.context = context

const drawPolygon = (_polygon, _cxt) => {
    _cxt.fillStyle = '#f005'
    _cxt.strokeStyle = '#000'
    
    _cxt.beginPath()
    _cxt.moveTo(..._polygon[0])
    for(let i = 1; i < _polygon.length; i++){
        _cxt.lineTo(..._polygon[i])
    }
    _cxt.stroke()
    _cxt.closePath()
    _cxt.fill()
}

const findAngle = (A, B, C) => {
    const AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
    const BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
    const AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
const drawSkeleton = (_polygon, _cxt) => {
    for(let i = 0; i < _polygon.length -1; i++){
        // debugger
        let before = polygon[(polygon.length -1 + i) % polygon.length]
        let now = polygon[i]
        let next = polygon[i + 1]
        console.log('findAngle', ((findAngle(before, now, next)* 180) / Math.PI))
    }
}

const reset = document.querySelector('.btn-reset')

reset.addEventListener('click', () => {
    console.log('reset')
})


const polygon2 = [
    [10, 10],
    [10, 90],
    [150, 90],
    [150, 10],
    [10, 10]
]
const polygon = [
    [10, 10],
    [10, 90],
    [110, 90],
    [170, 60],
    [150, 10],
    [10, 10]
]

drawPolygon(polygon, context)
drawPolygon(polygon2, secondContext)
drawSkeleton(polygon, secondContext)


