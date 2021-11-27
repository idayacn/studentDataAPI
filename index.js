const {fork} = require("child_process");
let counter = 1;

function createProcess(data){
    const worker =  fork("./batchData");    
    worker.send(data);   
}

function bulkData(records) {

    const batchCount = 100;
    const batchData = Math.ceil(records/batchCount);
    let data = {};

    for(let i = 1; i <= batchData; i++) { 

        if((counter-i)==0 || i==1){

            data.startCount = (batchCount * i) + 1;
            data.endCount = batchCount * (i+1) ;
  
            createProcess(data);
        }   
        counter++;  
    }
} 

bulkData(1000);