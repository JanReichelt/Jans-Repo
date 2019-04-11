class Group{
    constructor(intersection){
        this.members = new Set();
        this.members.add(intersection);

        this.groupIndex; // Index der Gruppe im Groups-Array.

        this.groupColor;     // Farbe der Gruppe.
        if (intersection.state != 'empty') {
            this.groupColor = intersection.state;
        }
    }

    setIndex() {
        this.groupIndex = groups.indexOf(this);
        this.members.forEach(function(memb){
            memb.groupIndex = groups.indexOf(this)
        }, this);
    }

    get liberties() {
        // Anzahl der Freiheiten einer Gruppe. Wird direkt beim setzen ermittelt. Beim setzen werden auch direkt die Freiheiten der angrenzenden Gruppen angepasst.
        let lib = 0;
        const counted = [];

        this.members.forEach(memb => {
            const n = Object.entries(memb.neighbors);
            for (const [direction, neighbor] of n) {
                if (neighbor && neighbor.state == 'empty'
                && !(counted.includes(neighbor))){
                    lib++;
                    counted.push(neighbor);
                }
            }
        });
        return lib;
    }

    takeGroup() {
        // Fängt die Gruppe (Darstellung des leeren Feldes und Löschen aus groups)
        this.members.forEach(memb => {
            if (memb.state == 'white') {
                captured.white++;
            } else if (memb.state == 'black') {
                captured.black++;
            }

            memb.state = 'empty';
            c.clearRect(memb.x, memb.y, w, w);
            memb.showIntersection();
        });

        groups.splice(groups.indexOf(this), 1);
        groups.forEach(group => group.setIndex());
    }
}
