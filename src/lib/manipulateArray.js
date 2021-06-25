function manipulateArray(arr) {
    ({ start, done } = arr.executionPeriod);
    const startingDay = Number(start.slice(8,11));
    const startingHour = Number(start.slice(11,13));

    const finishingDay = Number(done.slice(8,11));
    const finishingHour = Number(done.slice(11,13));

    let tempCounter = 0;
    let tempArray = [];
    const newAr = [];
    let tempId;
    let previousEstimatedTime;
    let previousHour;

    const newArr = arr.data.reduce(( acumulator, item, index, arr ) => {
        const id = item.id;
        const tempDay = Number(item.maximumDate.slice(8,11));
        const tempHour = Number(item.maximumDate.slice(11,13));
        const tempEstimatedTime = Number(item.estimatedTime.slice(0,2));

        if (startingDay === tempDay && tempHour >= startingHour && tempEstimatedTime <= 8) {
            tempCounter += tempEstimatedTime;
            tempArray.push(id);
        }
        else if (finishingDay === tempDay && tempHour <= finishingHour && tempEstimatedTime <= 8) {
            if (tempHour < previousHour) {
                tempCounter += tempEstimatedTime;
                tempArray.push(id);
            } else {
                tempId = id;
                previousEstimatedTime = tempEstimatedTime;
                previousHour = tempHour;
            }
        }

        if (tempCounter >= 8) {
            tempCounter = 0;
            newAr.push(tempArray);
            tempArray = []
            tempArray.push(tempId);
            tempCounter += previousEstimatedTime;
        }

        if ((arr.length - 1) === index)
            newAr.push(tempArray);

        return newAr;
    }, []);

    console.log(newArr);
    return newArr;
}

module.exports = manipulateArray;