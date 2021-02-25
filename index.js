console.time('time')

const geometricMean = (matrix) => {
    let him = [];
    let m = matrix.length;
    for (j=0;j<m;j++){
        awal = matrix[j][0];
        for (i=0;i<matrix[0].length-1; i++){
            let n = i+1;
            awal = awal.map((res, i) => res * matrix[j][n][i]);
        }
        him.push(awal)
        for (i=0;i<3; i++){
            him[j][i] = Math.pow(him[j][i],1/m);
        }
    }
    return him
}

const gmTotal = (matrix) => {
    for (j=0;j<matrix.length;j++){        
        awal = awal.map((res, i) => res + matrix[j][i]);
    }
    return awal
}

const gmInverse = (matrix) => {
    for (i=0;i<matrix.length;i++){
        matrix[i] = 1/matrix[i];
    }
    matrix.reverse();
    return matrix
}

const fuzzyWeight = (matrix,inverse) => {
    for (i=0;i<matrix.length;i++){
        for (j=0;j<inverse.length;j++){
            matrix[i][j] = matrix[i][j]*inverse[j];
        }
    }
    return matrix
}

const median = (matrix) => {
    let mi = []
    for (i=0;i<matrix.length;i++){
        let nilai = 0
        for (j=0;j<matrix[i].length;j++){
            nilai += matrix[i][j];
        }
        nilai = nilai/matrix[i].length;
        mi.push(nilai)
    }
    let total = 0 
    for (k=0;k<mi.length;k++){
        total += mi[k];
    }
    return {mi, total}
}

const normalize = (mi,total) => {
    for (i=0;i<mi.length;i++){
        mi[i] = mi[i]/total;
    }

    let tot = 0 
    for (j=0;j<mi.length;j++){
        tot += mi[j];
    }
    return {mi,tot}
}

let base = [
    [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],      [4,5,6]],
    [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],      [6,7,8]],
    [[1/6,1/5,1/4],[1/6,1/5,1/4],[1,1,1],      [1/4,1/3,1/2],[2,3,4]],
    [[1/8,1/7,1/6],[1/5,1/4,1/3],[2,3,4],      [1,1,1],      [1/6,1/5,1/4]],
    [[1/6,1/5,1/4],[1/8,1/7,1/6],[1/4,1/3,1/2],[4,5,6],      [1,1,1]]
]

// let base = [[[1,1,1]]]

let gmean = geometricMean(base);
let gmtot = gmTotal(gmean);
let inverse = gmInverse(gmtot);
let weight = fuzzyWeight(gmean,inverse);
let mi = median(weight);
let norm = normalize(mi['mi'],mi['total']);
console.log(norm)
console.timeEnd('time')
