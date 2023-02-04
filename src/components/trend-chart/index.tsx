import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import { echartsResize } from '../../utils';
import { IProps } from './type';

const Index: React.FC<IProps> = (props) => {
  const chartRef: any = useRef(); //拿到DOM容器

  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    // 不存在echarts实例
    if (!chart) {
      chart = echarts.init(chartRef.current); //echart初始化容器
    }
    const option: echarts.EChartsCoreOption = {
      title: {
        text: props.seriesData?.length > 0 ? props.title : '暂无数据',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.xData,
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          data: props.seriesData,
          type: 'line',
          areaStyle: {},
        },
      ],
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#0099cd', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#26b384', // 100% 处的颜色
          },
        ],
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 18,
        },
      },
    };

    chart.setOption(option);

    // 将图表变为自适应
    echartsResize(chart);
  }, [props]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default Index;
