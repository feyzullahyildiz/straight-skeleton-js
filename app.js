import {Vector, Point} from './Classes' 
window.Vector = Vector
window.Point = Point
const firstCanvas = document.getElementById('first-canvas')
const secondCanvas = document.getElementById('second-canvas')

const context = firstCanvas.getContext("2d")
const secondContext = secondCanvas.getContext("2d")
window.context = context
window.secondContext = secondContext
context.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
secondContext.clearRect(0, 0, secondCanvas.width, secondCanvas.height);


const previousPoint = (_polygon, i) => {
    if(i === 0){
        return _polygon[_polygon.length -2]
    }
    return _polygon[i- 1]
}
const nextPoint = (_polygon, i) => {
    if(i === _polygon.length -1){
        return _polygon[1]
    }
    return _polygon[i + 1]
}


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
        let before = previousPoint(_polygon, i)
        let now = polygon[i]
        let next = nextPoint(_polygon, i)
        // console.log('findAngle', ((findAngle(before, now, next)* 180) / Math.PI))
        // console.log('findAngle', findAngle(before, now, next))
    }
}

const reset = document.querySelector('.btn-reset')

reset.addEventListener('click', () => {
    console.log('reset')
})


// const polygon2 = [
//     [10, 10],
//     [10, 90],
//     [150, 90],
//     [150, 10],
//     [10, 10]
// ]
const polygon = [
    [60, 55],
    [40, 90],
    [50, 150],
    [110, 90],
    [170, 90],
    [150, 50],
    [60, 55],
]

drawPolygon(polygon, context)
drawSkeleton(polygon, secondContext)

const drawLines = (_polygon, _ctx) => {
    const newPolygons = []
    for(let i = 0; i < _polygon.length; i++){
        let before = previousPoint(_polygon, i)
        let now = polygon[i]
        let next = nextPoint(_polygon, i)
        before = new Point(...before)
        now = new Point(...now)
        next = new Point(...next)
        // now.drawCanvas(_ctx)
        let firstVector = new Vector(now, before)
        let nearPoint = firstVector.giveMeAPointThatOnTheLineWithAMeasureValue(10)
        // nearPoint.drawCanvas(_ctx)

        let secondVector = new Vector(now, next)
        let farPoint = secondVector.giveMeAPointThatOnTheLineWithAMeasureValue(10)
        let v1 = new Vector(now, nearPoint)
        let v2 = new Vector(now, farPoint)
        
        let bisector = Vector.add(v1, v2)
        let bisectorPoint = bisector.giveMeAPointThatOnTheLineWithAMeasureValue(10)
        bisectorPoint.drawCanvas(_ctx)
        bisector = new Vector(now, bisectorPoint) 
        bisector.drawCanvas(_ctx)
        newPolygons.push(bisectorPoint)

        
        
    }
    Point.drawPoints(_ctx, newPolygons)
}

drawPolygon(polygon, secondContext)
drawLines(polygon, secondContext)

