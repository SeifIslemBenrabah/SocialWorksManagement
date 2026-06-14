import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const COLORS = ['#0057E7', '#33aaff', '#00ccff', '#6366f1', '#8b5cf6', '#ec4899'];

const SpendingPieChart = ({ demands = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const catCounts = {};
    demands.forEach(d => {
      const name = d.Programme?.Categorie?.CategorieName || 'General';
      catCounts[name] = (catCounts[name] || 0) + 1;
    });

    const data = Object.entries(catCounts).map(([category, value]) => ({ category, value }));
    if (data.length === 0) data.push({ category: 'No Data', value: 1 });

    const width = 200, height = 200, margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(COLORS);

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value).sort(null);
    const arc = d3.arc().innerRadius(radius * 0.35).outerRadius(radius);

    svg.selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    svg.selectAll('text')
      .data(pie(data))
      .join('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '9px')
      .style('font-weight', 'bold')
      .style('fill', '#fff')
      .text(d => d.data.value > 0 && d.data.category !== 'No Data' ? d.data.category : '');

  }, [demands]);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <svg ref={chartRef} />
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {Object.entries(
          demands.reduce((acc, d) => {
            const name = d.Programme?.Categorie?.CategorieName || 'General';
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {})
        ).map(([cat], i) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingPieChart;
