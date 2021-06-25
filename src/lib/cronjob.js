function mockJob(ids, data) {
    const descriptionsArr = [];

    ids.reduce((acumulator, item) => {
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < data.data.length; j++) {
                if (item[i] === data.data[j].id) {
                    descriptionsArr.push(data.data[j].description);
                }
            }
        }
    }, []);
    
    for (let i = 0; i < descriptionsArr.length; i++) {
        setTimeout(() => console.log(descriptionsArr[i]), 5000);
    }
}

module.exports = mockJob;