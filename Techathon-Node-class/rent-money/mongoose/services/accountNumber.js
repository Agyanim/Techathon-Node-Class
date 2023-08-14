exports.generateAccountNumber=()=>{
    const length=10;
    let accountNumber='';
    for(let i=0;i<length;i++){
        const number=Math.floor(Math.random()*length) 
        accountNumber+=number
    }
    return accountNumber
}

