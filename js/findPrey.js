var chasingDict;
export function GetClosestPrey(to, care_about_dibs, preyName) {
    let best_dist_so_far = 9999999;
    let closest = null;
    chasingDict[closest].
    ;
    let f = null;
    let cur_dist;
    //console.log("looking for prey");
    for (const e of GameElements) {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name == preyName) {
            f = e;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(care_about_dibs)) {
                //console.log("available!")
                cur_dist = DistanceObjects(f, to);
                if (cur_dist < best_dist_so_far) {
                    //console.log("new best");
                    closest = f;
                    best_dist_so_far = cur_dist;
                }
            }
        }
    }
    //console.log("found",closest);
    return closest;
}
export function GetClosestPlant(to, plantTypes) {
    let closest_plant = null;
    let best_dist_so_far = 999999999;
    //may have optimization potential here
    for (let i = 0; i < plant_cols; i++)
        for (let j = 0; j < plant_rows; j++) {
            if (!(Plants[i][j] === null) && plantTypes.includes(Plants[i][j].Name)) {
                let g = Plants[i][j];
                if (g.Available) {
                    let dist = DistanceObjects(to, g);
                    if (dist < best_dist_so_far) {
                        best_dist_so_far = dist;
                        closest_plant = g;
                    }
                }
            }
        }
    //console.log(closest_plant, best_dist_so_far);
    return closest_plant;
}
//# sourceMappingURL=findPrey.js.map