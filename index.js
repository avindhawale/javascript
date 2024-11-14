const chunks = ((array, n) => {
    let chunked = [];
    let temp = [];
    let count = 0;
    for (let i = 0; i < array.length; i++) {        //3
        if(count == n || i == array.length){                             //true - count = 3
            chunked.push(temp);                     //chunked = [[1,4,12], [3,2,6]]
            temp = [];                              //temp[]
            count = 0;                              //count =0
        }   
        temp.push(array[i]);                    //temp=[]
        count++;                                //count = 0    
    }
    console.log(chunked)
    return chunked;
  })([1, 4, 12, 3, 2, 6, -9, 0], 3);