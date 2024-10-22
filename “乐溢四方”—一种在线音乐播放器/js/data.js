// import * as echarts from 'echarts';

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross',
//       crossStyle: {
//         color: '#999'
//       }
//     }
//   },
//   toolbox: {
//     feature: {
//       dataView: { show: true, readOnly: false },
//       magicType: { show: true, type: ['line', 'bar'] },
//       restore: { show: true },
//       saveAsImage: { show: true }
//     }
//   },
//   legend: {
//     data: ['Evaporation', 'Precipitation', 'Temperature']
//   },
//   xAxis: [
//     {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       axisPointer: {
//         type: 'shadow'
//       }
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value',
//       name: 'Precipitation',
//       min: 0,
//       max: 250,
//       interval: 50,
//       axisLabel: {
//         formatter: '{value} ml'
//       }
//     },
//     {
//       type: 'value',
//       name: 'Temperature',
//       min: 0,
//       max: 25,
//       interval: 5,
//       axisLabel: {
//         formatter: '{value} °C'
//       }
//     }
//   ],
//   series: [
//     {
//       name: 'Evaporation',
//       type: 'bar',
//       tooltip: {
//         valueFormatter: function (value) {
//           return value + ' ml';
//         }
//       },
//       data: [
//         2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
//       ]
//     },
//     {
//       name: 'Precipitation',
//       type: 'bar',
//       tooltip: {
//         valueFormatter: function (value) {
//           return value + ' ml';
//         }
//       },
//       data: [
//         2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
//       ]
//     },
//     {
//       name: 'Temperature',
//       type: 'line',
//       yAxisIndex: 1,
//       tooltip: {
//         valueFormatter: function (value) {
//           return value + ' °C';
//         }
//       },
//       data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
//     }
//   ]
// };

// option && myChart.setOption(option);

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

const updateFrequency = 2000;
const dimension = 0;
const countryColors = {
  Australia: '#00008b',
  Canada: '#f00',
  China: '#ffde00',
  Cuba: '#002a8f',
  Finland: '#003580',
  France: '#ed2939',
  Germany: '#000',
  Iceland: '#003897',
  India: '#f93',
  Japan: '#bc002d',
  'North Korea': '#024fa2',
  'South Korea': '#000',
  'New Zealand': '#00247d',
  Norway: '#ef2b2d',
  Poland: '#dc143c',
  Russia: '#d52b1e',
  Turkey: '#e30a17',
  'United Kingdom': '#00247d',
  'United States': '#b22234'
};
$.when(
  $.getJSON('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
  $.getJSON(ROOT_PATH + '/data/asset/data/life-expectancy-table.json')
).done(function (res0, res1) {
  const flags = res0[0];
  const data = res1[0];
  const years = [];
  for (let i = 0; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }
  function getFlag(countryName) {
    if (!countryName) {
      return '';
    }
    return (
      flags.find(function (item) {
        return item.name === countryName;
      }) || {}
    ).emoji;
  }
  let startIndex = 10;
  let startYear = years[startIndex];
  option = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: function (n) {
          return Math.round(n) + '';
        }
      }
    },
    dataset: {
      source: data.slice(1).filter(function (d) {
        return d[4] === startYear;
      })
    },
    yAxis: {
      type: 'category',
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value) {
          return value + '{flag|' + getFlag(value) + '}';
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5
          }
        }
      },
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: function (param) {
            return countryColors[param.value[3]] || '#5470c6';
          }
        },
        encode: {
          x: dimension,
          y: 3
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace'
        }
      }
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: 'bolder 80px monospace',
            fill: 'rgba(100, 100, 100, 0.25)'
          },
          z: 100
        }
      ]
    }
  };
  // console.log(option);
  myChart.setOption(option);
  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }
  function updateYear(year) {
    let source = data.slice(1).filter(function (d) {
      return d[4] === year;
    });
    option.series[0].data = source;
    option.graphic.elements[0].style.text = year;
    myChart.setOption(option);
  }
});

option && myChart.setOption(option);