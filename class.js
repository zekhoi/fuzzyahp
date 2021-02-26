class Fuzzy{
    constructor(matrix){
        this.matrix          = matrix;
        this.row             = matrix.length;
        this.col             = matrix[0].length;
        this.nvalue          = matrix[0][0].length;
        this.geomean         = [];
        this.gtotal          = [];
        this.ginverse        = [];
        this.fweight         = Array(this.row).fill().map(()=>Array(this.nvalue).fill());
        this.median          = [];
        this.mitotal         = 0;
        this.normalized      = [];
        this.normalizedtotal = 0;
    }

    getMatrix(){
        return this.matrix;
    }

    calcGmean () {
        for (let j=0;j<this.row;j++){
            let awal = this.matrix[j][0];
            for (let i=0;i<this.col-1; i++){
                let n = i+1;
                awal = awal.map((res, i) => res * this.matrix[j][n][i]);
            }

            this.geomean.push(awal)
            
            for (let i=0;i<this.nvalue; i++){
                this.geomean[j][i] = Math.pow(this.geomean[j][i],1/this.row);
            }
        }
        return this
    }
    
    calcGtotal () {
        for (let j=0;j<this.nvalue;j++){ 
            let up = 0;
            for (let i=0;i<this.row;i++){
                up += this.geomean[i][j]
            }      
            this.gtotal.push(up)
        }
        return this
    }
    
    calcInverse () {
        for (let i=0;i<this.nvalue;i++){
            this.ginverse[i] = 1/this.gtotal[i];
        }
        this.ginverse.reverse();
        return this
    }
    
    calcFweight () {
        for (let i=0;i<this.row;i++){
            for (let j=0;j<this.nvalue;j++){
                this.fweight[i][j] = this.geomean[i][j]*this.ginverse[j];
            }
        }
        return this
    }
    
    calcMedian () {
        for (let i=0;i<this.row;i++){
            let nilai = 0
            for (let j=0;j<this.nvalue;j++){
                nilai += this.fweight[i][j];
            }
            nilai = nilai/this.fweight[i].length;

            this.median.push(nilai)
            this.mitotal += this.median[i];
        }
        return this
    }
    
    normalize () {
        for (let i=0;i<this.row;i++){
            this.normalized.push(this.median[i]/this.mitotal) ;
            this.normalizedtotal += this.normalized[i];
        }
        return this
    }
}


let base = [
    [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],      [4,5,6]],
    [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],      [6,7,8]],
    [[1/6,1/5,1/4],[1/6,1/5,1/4],[1,1,1],      [1/4,1/3,1/2],[2,3,4]],
    [[1/8,1/7,1/6],[1/5,1/4,1/3],[2,3,4],      [1,1,1],      [1/6,1/5,1/4]],
    [[1/6,1/5,1/4],[1/8,1/7,1/6],[1/4,1/3,1/2],[4,5,6],      [1,1,1]]
]

// let base = [
//     [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],     ],
//     [[1,1,1],      [1,1,1],      [4,5,6],      [6,7,8],     ],
//     [[1/6,1/5,1/4],[1/6,1/5,1/4],[1,1,1],      [1/4,1/3,1/2]],
//     [[1/8,1/7,1/6],[1/5,1/4,1/3],[2,3,4],      [1,1,1],     ]
// ]

// let base = [
//     [[1,1,1],      [1,1,1],      [4,5,6]],
//     [[1,1,1],      [1,1,1],      [4,5,6]],
//     [[1/6,1/5,1/4],[1/6,1/5,1/4],[1,1,1]]
// ]

const fahp = new Fuzzy(base)
console.log(fahp)
console.log(fahp.calcGmean().calcGtotal().calcInverse().calcFweight().calcMedian().normalize())
