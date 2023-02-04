const echartsDom: any[] = []; //所有echarts图表的数组
/**
 * 将echarts图表变为自适应
 */
export function echartsResize(eDom: any) {
  echartsDom.push(eDom);
  window.onresize = () => {
    echartsDom.forEach((it) => {
      it.resize();
    });
  };
}
