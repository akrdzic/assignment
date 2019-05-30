import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    ResponsiveContainer, LineChart, Line, YAxis, XAxis, CartesianGrid, Legend, ReferenceLine
} from 'recharts';
import {
    generateChartDataForPosts,
    generateChartColorsForPosts,
    generateChartNamesForPosts,
    generateChartStatisticForPosts,
} from '../../helpers/PostToChart';

const PostChart = props => {
    const { data, colors, names, statistics } = props;
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <XAxis />
                {
                    Object.keys(data[0]).map((key) => {
                        const isAvg = key.indexOf('avg') > 0;
                        const isCount = key.indexOf('count') > 0;

                        return (<Line
                            key={key}
                            name={names[key]}
                            type='monotone'
                            dataKey={key}
                            stroke={colors[key]}
                            fill={colors[key]}
                            strokeDasharray={ isAvg && isCount ? '5 5' : undefined }
                        />);
                    })
                }
                {
                    statistics.map(st => <ReferenceLine key={st.id} label={st.name} y={st.y} stroke="red" />)
                }
                <Legend verticalAlign="bottom" height={36}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

PostChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    colors: PropTypes.object,
    names: PropTypes.object,
    statistics: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  const { post, selectedComparablePostsList } = state.postSelection;

  const allPosts = [post].concat(selectedComparablePostsList);

  return {
      data: generateChartDataForPosts(allPosts),
      colors: generateChartColorsForPosts(allPosts),
      names: generateChartNamesForPosts(allPosts),
      statistics: generateChartStatisticForPosts(allPosts),
  };
};

export default connect(mapStateToProps)(PostChart);
