
// Simple interest calculator
// rate in percentage
// duration in month
exports.interestCalculator=(rate,amount,duration)=>{
    const interest= (rate*amount*duration)/100
    return interest
}