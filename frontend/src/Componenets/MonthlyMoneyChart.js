import * as d3 from 'd3';
import React, { useEffect } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyMoneyChart = ({ demands = [] }) => {
  useEffect(() => {
    const counts = new Array(12).fill(0);
    demands.forEach(d => {
      const m = new Date(d.createdAt).getMonth();
      if (m >= 0 && m < 12) counts[m]++;
    });

    const data = MONTHS.map((month, i) => ({ month, value: counts[i] }));
    const maxVal = Math.max(...counts, 1);

    const width = 400, height = 200, margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select('#monthlyMoney').selectAll('*').remove();

    const svg = d3.select('#monthlyMoney')
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.25);

    const y = d3.scaleLinear()
      .domain([0, maxVal]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#9ca3af');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format('d')))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove())
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#9ca3af');

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', '#0057E7')
      .attr('rx', 3);
  }, [demands]);

  return <div id="monthlyMoney" className="w-full" />;
};

export default MonthlyMoneyChart;
