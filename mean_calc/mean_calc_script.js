let currentDataset = [ ];

function addValue() {
let addedNumber = document.getElementById("numberField");
let number = parseFloat(addedNumber.value);

if (isNaN(number)){
    alert("Please enter a number!")
}
else {
    currentDataset.push(number)
    document.getElementById("output").innerHTML = currentDataset.join(", ");
    addedNumber.value = "";
}
}

function deleteValue() {
    deletedNumber = document.getElementById("numberField").value;
    let numberToDelete = parseFloat(deletedNumber);

    if (isNaN(numberToDelete)) {
        alert("Please enter a number!")
}
    else if (!currentDataset.includes(numberToDelete)) {
        alert("Number not found in dataset.")

}
    else {
        currentDataset = currentDataset.filter(num => num !== numberToDelete);
        document.getElementById("output").innerHTML = currentDataset.join(", ");
}
document.getElementById("numberField").value = "";
}

function calcMean() {
    let sum = 0;
    for (let i = 0; i < currentDataset.length; i++) {
        sum += currentDataset[i];
    }

    let mean = sum / currentDataset.length;

    document.getElementById("calcMeanOutput").innerHTML = "Mean: " +  mean;

}