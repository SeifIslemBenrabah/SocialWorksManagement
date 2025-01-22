import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SpendingPieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 300;  // Reduced the width for a more compact chart
    const height = 300; // Matching height for a balanced aspect ratio
    const margin = 20;  // Increased margin for better spacing
    const radius = Math.min(width, height) / 2 - margin;

    // Data
    const data = [
      { category: 'Loans', value: 6000 },
      { category: 'Grants', value: 3000 },
      { category: 'Solidarity Services', value: 11000 },
    ];

    // Color scale
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(['#33aaff', '#00ccff', '#0000ff']);

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Pie and Arc generators
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(radius * 0.2).outerRadius(radius); // Reduced inner radius for thinner slices

    // Prepare data for pie chart
    const dataReady = pie(data);

    // Draw the arcs
    svg
      .selectAll('path')
      .data(dataReady)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '1px');

    // Add minimal and elegant labels
    svg
      .selectAll('text')
      .data(dataReady)
      .join('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')  // Smaller text size for a clean look
      .style('font-weight', 'bold') // Bold text for clarity
      .style('fill', '#fff') // White text for contrast
      .text((d) => d.data.category); // Display the category name

  }, []);

  return <svg ref={chartRef}></svg>;
};

export default SpendingPieChart;
