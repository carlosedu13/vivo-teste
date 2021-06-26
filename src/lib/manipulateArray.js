function manipulateArray(arr) {
    ({ start, done } = arr.executionPeriod);
    const startingDay = Number(start.slice(8,11));
    // const startingHour = Number(start.slice(11,13));

    const finishingDay = Number(done.slice(8,11));
    // const finishingHour = Number(done.slice(11,13));

    const days = finishingDay - startingDay + 1;

    let counterEstimatedTime = 0;
    let tempArray = [];
    let newAr = [];

    const newArr = arr.data.reduce(( acumulator, item, index, arr ) => {
        const iterateObjectDay = Number(item.maximumDate.slice(8,11));
        // const iterateObjectHour = Number(item.maximumDate.slice(11,13));
        // const iterateObjectEstimatedTime = Number(item.estimatedTime.slice(0,2));

        // Verifica se está dentro da janela de execução
        if (counterEstimatedTime === 8 || (arr.length - 1) === index) {
            counterEstimatedTime = 0;
            newAr.push(tempArray);
            tempArray = []
        }

        if (iterateObjectDay >= startingDay && iterateObjectDay <= finishingDay) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    // Primeira parte da validação verifica o dia e a segunda parte verifica o horário
                    if (Number(arr[i].maximumDate.slice(8,11)) < Number(arr[j].maximumDate.slice(8,11)) && Number(arr[i].maximumDate.slice(11,13)) === Number(arr[j].maximumDate.slice(11,13))) {
                        tempArray.push(arr[i].id);
                        counterEstimatedTime += Number(arr[i].estimatedTime.slice(0,2));
                    }
                    else if (Number(arr[i].maximumDate.slice(8,11)) === Number(arr[j].maximumDate.slice(8,11)) && Number(arr[i].maximumDate.slice(11,13)) > Number(arr[j].maximumDate.slice(11,13))) {
                        tempArray.push(arr[j].id);
                        counterEstimatedTime += Number(arr[j].estimatedTime.slice(0,2));
                    }
                    else if (Number(arr[i].maximumDate.slice(8,11)) === Number(arr[j].maximumDate.slice(8,11)) && Number(arr[i].maximumDate.slice(11,13)) < Number(arr[j].maximumDate.slice(11,13))) {
                        tempArray.push(arr[j].id);
                        counterEstimatedTime += Number(arr[j].estimatedTime.slice(0,2));
                    }
                }
            }
        }

        if ((arr.length - 1) === index) {
            // removendo qualquer ID duplicado
            const uniques = [...new Set(newAr[0])];

            function separate(base, max) {
                let result = [[]];
                let group = 0;
                for (let i = 0; i < base.length; i++) {
                    if (result[group] === undefined) {
                    result[group] = [];
                    }

                    result[group].push(base[i]);
    
                    if ((i + 1) % max === 0) {
                        group = group + 1;
                    }
                }
                return result;
            }

            newAr = separate(uniques, days);
        }

        return newAr;
    }, []);

    return newArr;
}

module.exports = manipulateArray;