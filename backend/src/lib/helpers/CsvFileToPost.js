const csv = require('csvtojson');

const csvFileToPost = async (filePath) => {
    try {
        const rows = await csv({
            noheader:true,
            ignoreEmpty: true,
            checkType: true
        })
            .fromFile(filePath);

        const json = rows[0];

        if (json) {
            const data = Object.values(json);
            const avg = data.reduce((prev, curr) => prev + curr, 0) / data.length;

            return {
                data,
                avg,
                count: data.length
            };
        }

    } catch (err) {
        return {
            data: [],
            avg: 0,
            count: 0,
        };
    }
};

module.exports = csvFileToPost;
