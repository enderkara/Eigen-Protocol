import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EigenResponse, NodeData, LinkData } from '../types';

interface EigenVisualizerProps {
  data: EigenResponse | null;
  loading: boolean;
}

const EigenVisualizer: React.FC<EigenVisualizerProps> = ({ data, loading }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous

    if (loading) {
      // Loading animation
      const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
      
      g.append("circle")
        .attr("r", 40)
        .attr("fill", "none")
        .attr("stroke", "#6366f1")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "10,5")
        .append("animateTransform")
        .attr("attributeName", "transform")
        .attr("attributeType", "XML")
        .attr("type", "rotate")
        .attr("from", "0 0 0")
        .attr("to", "360 0 0")
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");
        
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 60)
        .attr("fill", "#a1a1aa")
        .attr("class", "mono-font text-xs tracking-widest")
        .text("CALCULATING ISOMORPHISM...");
        
      return;
    }

    if (!data) return;

    // Prepare Graph Data
    const nodes: NodeData[] = [];
    const links: LinkData[] = [];

    // Domain A Nodes (Left side)
    data.domainAConcepts.forEach(c => nodes.push({ id: c, group: 'A', radius: 8 }));
    // Domain B Nodes (Right side)
    data.domainBConcepts.forEach(c => nodes.push({ id: c, group: 'B', radius: 8 }));
    // Shared Nodes (Center)
    data.sharedConcepts.forEach(c => nodes.push({ id: c, group: 'Bridge', radius: 12 }));

    // Create Links
    // Connect A nodes to Bridge nodes
    data.domainAConcepts.forEach(a => {
      data.sharedConcepts.forEach(s => {
        links.push({ source: a, target: s, value: 1 });
      });
    });
    // Connect B nodes to Bridge nodes
    data.domainBConcepts.forEach(b => {
      data.sharedConcepts.forEach(s => {
        links.push({ source: b, target: s, value: 1 });
      });
    });

    // Internal links for stability within groups
    for (let i = 0; i < data.domainAConcepts.length - 1; i++) {
        links.push({ source: data.domainAConcepts[i], target: data.domainAConcepts[i+1], value: 0.5 });
    }
    for (let i = 0; i < data.domainBConcepts.length - 1; i++) {
        links.push({ source: data.domainBConcepts[i], target: data.domainBConcepts[i+1], value: 0.5 });
    }


    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(60))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 5));

    // Pull groups somewhat apart based on score logic? 
    // Actually, visually merging is better for "Success".
    // If score is high, we tighten the bridge. If low, we separate them.
    const scoreFactor = Math.max(0.1, data.resonanceScore);
    
    simulation.force("x", d3.forceX((d: NodeData) => {
      if (d.group === 'A') return width * 0.2;
      if (d.group === 'B') return width * 0.8;
      return width * 0.5;
    }).strength(0.1 * (1 - scoreFactor))); // Stronger separation if low score

    // Drawing
    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: any) => {
         // Gradient-like effect logic or simple color based on target
         return "#52525b";
      })
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => {
        if (d.group === 'A') return "#0ea5e9"; // Sky 500
        if (d.group === 'B') return "#ec4899"; // Pink 500
        return "#8b5cf6"; // Violet 500
      })
      .call(drag(simulation) as any);

    // Labels
    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", d => d.group === 'Bridge' ? 12 : 10)
      .attr("fill", "#e4e4e7")
      .attr("dx", 15)
      .attr("dy", 4)
      .style("pointer-events", "none")
      .style("font-family", "JetBrains Mono");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
      
      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    // Helper for dragging
    function drag(sim: d3.Simulation<NodeData, LinkData>) {
      function dragstarted(event: any) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) sim.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };

  }, [data, loading]);

  return (
    <div className="w-full h-full min-h-[400px] relative bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800">
       <svg ref={svgRef} className="w-full h-full absolute top-0 left-0" />
       {!data && !loading && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-zinc-500 font-mono text-sm">[ WAITING FOR INPUT ]</p>
         </div>
       )}
    </div>
  );
};

export default EigenVisualizer;
