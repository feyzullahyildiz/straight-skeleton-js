export class Vector {
    constructor(start, end){
        if(!(start instanceof Point) || !(end instanceof Point)){
            throw new Error("'start' and 'end' has to be Point")
        }
        this.start = start
        this.end = end

    }

    giveMeAPointThatOnTheLineWithAMeasureValue(measure){
        let x = Math.sqrt(Math.pow(measure, 2) / (Math.pow(this.tan(), 2) + 1))
        let point = new Point(x, this.tan() * x)
        if(this.end.x - this.start.x >= 0){
            return point.add(this.start)
        }
        return Point.remove(this.start, point)
    }
    tan(){
        return Point.tan(this.start, this.end)
    }

    drawCanvas(_ctx){
        _ctx.strokeStyle = '#000'
        _ctx.beginPath()
        _ctx.moveTo(...this.start.toArray())
        _ctx.lineTo(...this.end.toArray())
        _ctx.stroke()
        _ctx.closePath()
        _ctx.stroke()
        // this.start.drawCanvas(_ctx)
        // this.end.drawCanvas(_ctx)
    }

    static angleBisectorVector(v1, v2, measure = 10){
        return Vector.add(v1, v2).end
    }

    static add(v1, v2){
        return new Vector(v1.start, new Point(v2.end.x + v1.end.x - v1.start.x, v2.end.y + v1.end.y - v1.start.y ))
    }

}

export class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    add(_point){
        return new Point(this.x + _point.x, this.y + _point.y)
    }
    remove(_point){
        return new Point(this.x - _point.x, this.y - _point.y)
    }

    drawCanvas(_ctx){
        // debugger
        _ctx.beginPath();
        _ctx.fillStyle = '#ff0'
        _ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, true);
        _ctx.closePath()
        _ctx.fill()
        _ctx.stroke();
    }
    toArray(){
        return [this.x, this.y]
    }
    static tan(p1, p2){
        return (p1.y - p2.y) / (p1.x - p2.x)
    }
    static add (p1, p2){
        return new Point(p1.x + p2.x, p1.y + p2.y)
    }
    static remove(p1, p2){
        return new Point(p1.x - p2.x, p1.y - p2.y)
    }
    static drawPoints(_ctx, points){
        _ctx.fillStyle = '#f005'
        _ctx.strokeStyle = '#000'
        _ctx.beginPath()
        _ctx.moveTo(...points[0].toArray())
        for(let i = 1; i < points.length; i++){
            _ctx.lineTo(...points[i].toArray())
        }
        _ctx.stroke()
        _ctx.closePath()
        _ctx.fill()
    }

}
