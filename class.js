class Fuzzy{
    constructor(matrix){
        this.matrix = matrix;
        this.geomean = [];
        this.gtotal = [];
        this.ginverse =[];
        this.fweight = Array(this.matrix.length).fill().map(()=>Array(this.matrix[0][0].length).fill());
        this.median = [];
        this.mitotal = 0;
        this.normalized =Array(this.matrix.length);
        this.normalizedtotal = 0;
    }

    getMatrix(){
        return this.matrix;
    }

    calcGmean () {
        let m = this.matrix.length;
        for (let j=0;j<m;j++){
            let awal = this.matrix[j][0];
            for (let i=0;i<this.matrix[0].length-1; i++){
                let n = i+1;
                awal = awal.map((res, i) => res * this.matrix[j][n][i]);
            }
            this.geomean.push(awal)
            for (let i=0;i<3; i++){
                this.geomean[j][i] = Math.pow(this.geomean[j][i],1/m);
            }
        }
        return this
    }
    
    calcGtotal () {
        for (let j=0;j<this.geomean[0].length;j++){ 
            let up = 0;
            for (let i=0;i<this.geomean.length;i++){
                up += this.geomean[i][j]
            }      
            this.gtotal.push(up)
        }
        return this
    }
    
    calcInverse () {
        for (let i=0;i<this.gtotal.length;i++){
            this.ginverse[i] = 1/this.gtotal[i];
        }
        this.ginverse.reverse();
        return this
    }
    
    calcFweight () {
        for (let i=0;i<this.geomean.length;i++){
            for (let j=0;j<this.ginverse.length;j++){
                this.fweight[i][j] = this.geomean[i][j]*this.ginverse[j];
            }
        }
        return this
    }
    
    calcMedian () {
        for (let i=0;i<this.fweight.length;i++){
            let nilai = 0
            for (let j=0;j<this.fweight[i].length;j++){
                nilai += this.fweight[i][j];
            }
            
            nilai = nilai/this.fweight[i].length;
            this.median.push(nilai)
        }
        for (let k=0;k<this.median.length;k++){
            this.mitotal += this.median[k];
        }
        return this
    }
    
    normalize () {
        for (let i=0;i<this.median.length;i++){
            this.normalized[i] = this.median[i]/this.mitotal;
        }
        for (let j=0;j<this.median.length;j++){
            this.normalizedtotal += this.normalized[j];
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
const fahp = new Fuzzy(base)
console.log(fahp.calcGmean().calcGtotal().calcInverse().calcFweight().calcMedian().normalize())
