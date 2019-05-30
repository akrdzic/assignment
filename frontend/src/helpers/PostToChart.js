const THEME_COLORS = [
    '#8884d8',
    '#5b9bfe',
    '#82ca9d',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
];

export const generateChartColorsForPosts = (posts) => {
    return posts.reduce((colors, post, idx) => {
        colors[post.id] = THEME_COLORS[idx % THEME_COLORS.length];
        return colors;
    }, {});
};

export const generateChartDataForPosts = posts => {
    const chartXMax = Math.max(...(posts.map(p => p.content.count)));
    const chartData = [];
    for (let i = 0; i < chartXMax; i++) {
        chartData[i] = {};
        posts.forEach(p => {
            chartData[i][p.id] = p.content.data[i];
        });
    }
    return chartData;
};

export const generateChartNamesForPosts = posts => {
    return posts.reduce((names, post) => {
        names[post.id] = post.name;
        return names;
    }, {});
};

export const generateChartStatisticForPosts = posts => {
    return posts.map((post, idx) => ({
        id: `${post.id}_avg`,
        name: `${post.name} Average`,
        y: post.content.avg || 0,
        color:  THEME_COLORS[idx % THEME_COLORS.length],
    }));
};
