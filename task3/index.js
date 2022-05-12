const data = require('./data');

const cleanData = data.map((developer) => {
    const userId = developer.user._id;
    const name = developer.user.name;
    const startDate = developer.startDate;
    const endDate = developer.endDate;
    const weekendDates = { startDate, endDate };

    return { userId, name, weekendDates };
});

const aggData = cleanData.reduce((acc, curr) => {
    const value = acc.find((el) => el.userId === curr.userId);

    if (value) {
        value.weekendDates.push(curr.weekendDates);
    } else {
        curr.weekendDates = [curr.weekendDates];
        acc.push(curr);
    }

    return acc;
}, []);

console.log(JSON.stringify(aggData, null, 2));
