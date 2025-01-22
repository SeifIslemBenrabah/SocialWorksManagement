import * as d3 from 'd3';
import React, { useEffect } from 'react';

const MonthlyMoneyChart = () => {
  useEffect(() => {
    const data = [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 200 },
      { month: 'Mar', value: 150 },
      { month: 'Apr', value: 250 },
      { month: 'May', value: 300 },
      { month: 'Jun', value: 200 },
      { month: 'Jul', value: 350 },
      { month: 'Aug', value: 400 },
      { month: 'Sep', value: 300 },
      { month: 'Oct', value: 250 },
      { month: 'Nov', value: 150 },
      { month: 'Dec', value: 200 },
    ];

    const width = 400, height = 200, margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Clear existing SVG
    d3.select('#monthlyMoney').selectAll('*').remove();

    const svg = d3.select('#monthlyMoney')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', '#0057E7');
  }, []);

  return <div id="monthlyMoney"></div>;
};

export default MonthlyMoneyChart;
