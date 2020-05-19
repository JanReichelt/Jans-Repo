look(walls) {
    // this.tempRays = [];

    this.rays.forEach((ray) => {
        ray.closest = null;
        ray.closest();
        // let record = Infinity;
        // walls.forEach((wall) => {
        //     const pt = ray.cast(wall);
        //     if (pt) {
        //         const d = p5.Vector.dist(this.pos, pt);
        //         if (d < record) {
        //             record = d;
        //             ray.closest = pt;
        //
        //             // reflektierte Strahlen hinzufügen
        //             if (ray.deg < this.highestDeg) {
        //                 let a = ray.getAngle(wall, pt);
        //                 let r = new Ray(pt, radians(a+wall.angle), ray.deg+1);
        //                 this.tempRays.push(r);
        //             }
        //         }
        //     }
        // });
        ray.draw();
    });


    // this.tempRays.forEach((ray) => {
    //
    //     ray.closest = null;
    //     let record = Infinity;
    //     walls.forEach((wall) => {
    //         const pt = ray.getIntersection(wall);
    //         if (pt) {
    //             const d = p5.Vector.dist(this.pos, pt);
    //             if (d < record) {
    //                 record = d;
    //                 ray.closest = pt;
    //
    //                 if (ray.deg < this.highestDeg) {
    //                     let a = ray.getAngle(wall, pt);
    //                     let r = new Ray(pt, radians(a+wall.angle), ray.deg+1);
    //                     this.tempRays.push(r);
    //                 }
    //             }
    //         }
    //     });
    //     ray.draw();
    // });
}

// Aus Ray.closest() - im wall foreach-loop
// das wäre eine mögliche Optimierung, indem die Betrachtung der Wände
// vermieden wird, die entgegengesetzt der ray.dir liegen - Das Problem ist,
// dass diese Optimierung nicht wirklich nötig ist, da ray.cast() nicht teuer ist

// if ((this.dir.x >= 0 && Math.max(wall.start.x, wall.end.x) >= this.pos.x ||
//     this.dir.x < 0 && Math.min(wall.start.x, wall.end.x) < this.pos.x)
//     &&
//     (this.dir.y >= 0 && Math.max(wall.start.y, wall.end.y) >= this.pos.y ||
//     this.dir.y < 0 && Math.min(wall.start.y, wall.end.y) < this.pos.y)) {
//
//     }


// aus Ray.getAngle();
// angleDiff *= wall.angle;
// let newRay = p5.Vector.fromAngle(radians(angleDiff+wall.angle), 500);
// push();
//     stroke('orange');
//     line(pt.x, pt.y, pt.x+newRay.x, pt.y+newRay.y);
// pop();


// cast aus dem Coding Train tutorial - die Mathematik dahinter verstehe ich nicht
// cast(wall) {
//     const x1 = wall.start.x;
//     const y1 = wall.start.y;
//     const x2 = wall.end.x;
//     const y2 = wall.end.y;
//
//     const x3 = this.pos.x;
//     const y3 = this.pos.y;
//     const x4 = this.pos.x + this.dir.x;
//     const y4 = this.pos.y + this.dir.y;
//
//     const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
//
//     if (den === 0) {
//         // console.log("Konnte keinen Punkt ermitteln", den);
//         return;
//     }
//
//     const t =  ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
//     const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
//
//     if (t < 1 && t > 0 && u > 0) {
//         let pt = createVector();
//         pt.x = x1 + (t * (x2 - x1));
//         pt.y = y1 + (t * (y2 - y1));
//         return pt;
//     }
//       // else if (t < 0)  console.log("t < 0", t);
//       // else if (u <= 0) console.log("u <= 0", u);
//       // else if (t >= 1) console.log("t >= 1", t);
//     else {
//         // console.log("Konnte keinen Punkt ermitteln");
//         return;
//     }
// }
