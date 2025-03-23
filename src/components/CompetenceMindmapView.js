import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Award, Briefcase, Server, Database, 
  Cloud, Lock, Terminal, GitBranch, Network, 
  Globe, Cpu, Shield, Activity, Clock,
  CheckCircle, AlertTriangle, X, ArrowUpRight,
  FileCode, BookOpen, Zap, Coffee, Layers, 
  Settings, Wrench, Brain, Workflow, Sparkles,
  BarChart
} from 'lucide-react';

// Import the competencies data from a separate file
import competenciesData from './competenciesData';

const CompetenceMindmap = ({ devOpsEngineerProfile }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeConnection, setActiveConnection] = useState(null);
  const [dataPacket, setDataPacket] = useState({ visible: false, position: 0, path: null });
  
  // For drag functionality
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  
  // For zoom and pan functionality
  const [zoom, setZoom] = useState(1.8);
  const [pan, setPan] = useState({ x: 0, y: 0 }); // Will be calculated dynamically
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });

  // Apply spacing and then center the view
  useEffect(() => {
    // First apply spacing to nodes
    const spacingFactor = 1.5;
    setCompetencies(prevCompetencies => 
      prevCompetencies.map(comp => ({
        ...comp,
        x: comp.x * spacingFactor,
        y: comp.y * spacingFactor
      }))
    );
    
    // Wait for state update before centering
    setTimeout(() => {
      // Center the view on the "devops" node
      const devopsNode = competencies.find(comp => comp.id === 'devops');
      if (devopsNode) {
        const svgWidth = 700;
        const svgHeight = 650;
        
        // Calculate the necessary pan to center on the devops node
        const panX = (svgWidth / 2) - (devopsNode.x * spacingFactor * zoom);
        const panY = (svgHeight / 2) - (devopsNode.y * spacingFactor * zoom);
        
        setPan({ x: panX, y: panY });
      }
    }, 100);
  }, []);

  // Definition of competencies (skills, certificates, experience)
  const [competencies, setCompetencies] = useState(competenciesData);

  // Find a competency by ID
  const getCompetency = (id) => competencies.find(comp => comp.id === id);

  // Get all connections as pairs
  const getConnections = () => {
    const connections = [];
    competencies.forEach(competency => {
      competency.connections.forEach(targetId => {
        const target = getCompetency(targetId);
        if (target) {
          connections.push({
            source: competency.id,
            target: targetId,
            path: generatePath(competency, target)
          });
        }
      });
    });
    return connections;
  };

  // Generate SVG path between two components with careful curve calculation
  const generatePath = (source, target) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;

    // For horizontal paths with a curve
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = source.x + dx / 2;
      return `M${source.x + 20} ${source.y} C${midX} ${source.y}, ${midX} ${target.y}, ${target.x - 20} ${target.y}`;
    } 
    // For vertical paths with a curve
    else {
      const midY = source.y + dy / 2;
      return `M${source.x} ${source.y + 20} C${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y - 20}`;
    }
  };

  // Animate data packets along connections with careful timing
  useEffect(() => {
    if (!activeConnection) return;

    const interval = setInterval(() => {
      if (dataPacket.visible) {
        if (dataPacket.position >= 1) {
          setDataPacket({ visible: false, position: 0, path: null });
        } else {
          setDataPacket(prev => ({ 
            ...prev, 
            position: prev.position + 0.04 // Careful speed adjustment
          }));
        }
      } else {
        // Wait a bit before sending next packet
        setTimeout(() => {
          const connections = getConnections();
          const randomConnection = connections[Math.floor(Math.random() * connections.length)];
          setDataPacket({ 
            visible: true, 
            position: 0,
            path: randomConnection?.path,
            sourceId: randomConnection?.source,
            targetId: randomConnection?.target
          });
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeConnection, dataPacket]);

  // Calculate position along a path with careful calculation
  const getPointAlongPath = (path, position) => {
    if (!path) return { x: 0, y: 0 };

    try {
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", path);
      const pathLength = pathElement.getTotalLength();
      const point = pathElement.getPointAtLength(position * pathLength);
      return { x: point.x, y: point.y };
    } catch (e) {
      return { x: 0, y: 0 };
    }
  };

  // Toggle active animation
  const toggleAnimation = () => {
    setActiveConnection(prev => !prev);
    if (!activeConnection) {
      setDataPacket({ visible: false, position: 0, path: null });
    }
  };

  // Get point for data packet
  const packetPoint = getPointAlongPath(dataPacket.path, dataPacket.position);

  // Get packet color based on source and target
  const getPacketColor = () => {
    if (!dataPacket.sourceId || !dataPacket.targetId) return "#3B82F6";

    const sourceComp = getCompetency(dataPacket.sourceId);
    const targetComp = getCompetency(dataPacket.targetId);

    return sourceComp ? sourceComp.color : targetComp.color;
  };

  // Handle component click
  const handleComponentClick = (componentId) => {
    if (selectedNode === componentId) {
      setSelectedNode(null); // Deselect if already selected
    } else {
      setSelectedNode(componentId);
    }
  };

  // Get status indicator color
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'expert':
      case 'advanced':
      case 'completed':
      case 'current':
      case 'operational':
        return '#10B981'; // Green
      case 'intermediate':
      case 'learning':
      case 'updating':
        return '#F59E0B'; // Amber
      case 'beginner':
      case 'planned':
      case 'past':
        return '#6366F1'; // Indigo
      case 'error':
      case 'critical':
      case 'offline':
        return '#EF4444'; // Red
      default:
        return '#3B82F6'; // Blue
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'expert':
      case 'advanced':
      case 'completed':
      case 'current':
        return CheckCircle;
      case 'intermediate':
      case 'learning':
      case 'updating':
        return Activity;
      case 'beginner':
      case 'planned':
      case 'past':
        return Clock;
      case 'error':
      case 'critical':
      case 'offline':
        return X;
      default:
        return Activity;
    }
  };

  // Calculate overall skills metrics
  const calculateSkillsMetrics = () => {
    // Count skills by type and proficiency level
    const skills = competencies.filter(comp => comp.type === 'skill');
    const certificates = competencies.filter(comp => comp.type === 'certificate');
    const experience = competencies.filter(comp => comp.type === 'experience');
    
    const expertSkills = skills.filter(skill => skill.status === 'expert').length;
    const advancedSkills = skills.filter(skill => skill.status === 'advanced').length;
    const intermediateSkills = skills.filter(skill => skill.status === 'intermediate').length;
    
    return {
      totalSkills: skills.length,
      expertSkills,
      advancedSkills,
      intermediateSkills,
      totalCertificates: certificates.length,
      totalExperience: experience.length
    };
  };

  const skillsMetrics = calculateSkillsMetrics();
  
  // Mouse event handlers for dragging nodes and panning
  const handleMouseDown = (event, id) => {
    if (selectedNode) return; // Don't initiate drag if a node is selected for details
    
    const node = getCompetency(id);
    if (!node) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - svgRect.left - pan.x) / zoom - node.x;
    const offsetY = (event.clientY - svgRect.top - pan.y) / zoom - node.y;
    
    setDraggedNode(id);
    setDragOffset({ x: offsetX, y: offsetY });
    event.preventDefault();
  };
  
  const handleMouseMove = (event) => {
    // Handling node dragging
    if (draggedNode) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const newX = (event.clientX - svgRect.left - pan.x) / zoom - dragOffset.x;
      const newY = (event.clientY - svgRect.top - pan.y) / zoom - dragOffset.y;
      
      // Update the node's position
      setCompetencies(prev => prev.map(comp => 
        comp.id === draggedNode 
          ? { ...comp, x: newX, y: newY } 
          : comp
      ));
      return;
    }
    
    // Handling canvas panning
    if (isPanning) {
      const dx = event.clientX - startPanPos.x;
      const dy = event.clientY - startPanPos.y;
      
      setPan(prevPan => ({
        x: prevPan.x + dx,
        y: prevPan.y + dy
      }));
      
      setStartPanPos({
        x: event.clientX,
        y: event.clientY
      });
    }
  };
  
  const handleMouseUp = () => {
    setDraggedNode(null);
    setIsPanning(false);
  };

  // Handle canvas panning start
  const handleSvgMouseDown = (event) => {
    // Only start panning if we're not interacting with a node and not clicking on details panel
    if (event.target.tagName === 'svg' || event.target.tagName === 'rect') {
      setIsPanning(true);
      setStartPanPos({
        x: event.clientX,
        y: event.clientY
      });
      event.preventDefault();
    }
  };
  
  // Handle zooming with mouse wheel
  const handleWheel = (event) => {
    event.preventDefault();
    
    // Get cursor position relative to SVG
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;
    
    // Calculate zoom
    const deltaY = event.deltaY;
    const scaleAmount = deltaY > 0 ? 0.9 : 1.1; // Zoom out (0.9) or in (1.1)
    const newZoom = Math.max(0.1, Math.min(5, zoom * scaleAmount)); // Limit zoom between 0.1 and 5
    
    // Calculate new pan position to zoom toward mouse cursor
    const newPanX = mouseX - ((mouseX - pan.x) * newZoom / zoom);
    const newPanY = mouseY - ((mouseY - pan.y) * newZoom / zoom);
    
    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Effect to add/remove global mouse event listeners
  useEffect(() => {
    if (draggedNode || isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, isPanning, dragOffset, startPanPos]);
  
  // Add wheel event listener for zooming
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        svgElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, [zoom, pan]);

  return (
    <div className="w-full">
      {/* Skills Metrics Summary */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="text-xs text-gray-500 uppercase">Expert Skills</div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800 mr-2">{skillsMetrics.expertSkills}</span>
            <span className="text-sm text-gray-500">of {skillsMetrics.totalSkills}</span>
          </div>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-1 bg-green-500 rounded-full" 
              style={{width: `${(skillsMetrics.expertSkills / skillsMetrics.totalSkills) * 100}%`}}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-amber-500">
          <div className="text-xs text-gray-500 uppercase">Key Skills</div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800 mr-2">{skillsMetrics.totalSkills}</span>
            <span className="text-sm text-gray-500">skills total</span>
          </div>
          <div className="mt-2 flex items-center">
            <Brain size={16} className="text-amber-500 mr-1" />
            <span className="text-xs">{skillsMetrics.advancedSkills + skillsMetrics.expertSkills} advanced/expert</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 uppercase">Certifications</div>
          <div className="text-2xl font-bold text-gray-800">{skillsMetrics.totalCertificates}</div>
          <div className="mt-2 flex items-center">
            <Award size={16} className="text-blue-500 mr-1" />
            <span className="text-xs">Professional certificates</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="text-xs text-gray-500 uppercase">Experience</div>
          <div className="text-2xl font-bold text-gray-800">{skillsMetrics.totalExperience}</div>
          <div className="mt-2 flex items-center">
            <Briefcase size={16} className="text-purple-500 mr-1" />
            <span className="text-xs">Professional roles</span>
          </div>
        </div>
      </div>

      <div className="mb-4 w-full flex justify-between">
        <div className="flex space-x-2">
          <button 
            onClick={toggleAnimation} 
            className={`px-4 py-2 rounded font-medium ${activeConnection ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {activeConnection ? 'Stop Knowledge Flow' : 'Start Knowledge Flow'}
          </button>
          
          <button 
            onClick={() => {
              // Find DevOps node and center on it
              const devopsNode = competencies.find(comp => comp.id === 'devops');
              if (devopsNode) {
                const svgWidth = 700;
                const svgHeight = 650;
                const panX = (svgWidth / 2) - (devopsNode.x * zoom);
                const panY = (svgHeight / 2) - (devopsNode.y * zoom);
                setZoom(1.8);
                setPan({ x: panX, y: panY });
              } else {
                // Fallback if node not found
                setZoom(1.8);
                setPan({ x: -200, y: -50 });
              }
            }}
            className="px-4 py-2 rounded font-medium bg-blue-500 text-white"
          >
            Reset View
          </button>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <Sparkles size={16} className="mr-1 text-amber-500" />
          <span>Drag nodes, scroll to zoom, drag background to pan</span>
        </div>
      </div>

      <div className="relative w-full h-96 border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 700 650" 
          onMouseDown={handleSvgMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Background rect to capture panning events */}
          <rect
            x="-5000"
            y="-5000"
            width="10000"
            height="10000"
            fill="transparent"
          />
          {/* Main content group with zoom and pan transformations */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Connections with semantic coloring */}
          {getConnections().map((conn, i) => {
            const sourceComp = getCompetency(conn.source);
            const targetComp = getCompetency(conn.target);
            const isHighlighted = 
              (hoveredNode && (hoveredNode === conn.source || hoveredNode === conn.target)) ||
              (selectedNode && (selectedNode === conn.source || selectedNode === conn.target));

            return (
              <path 
                key={`conn-${i}`}
                d={conn.path}
                stroke={isHighlighted ? (
                  hoveredNode === conn.source || selectedNode === conn.source 
                    ? sourceComp.color 
                    : targetComp.color
                ) : "#CBD5E1"}
                strokeWidth={isHighlighted ? "3" : "1.5"}
                fill="none"
                strokeDasharray={isHighlighted ? "5,5" : "none"}
                strokeLinecap="round"
                opacity={isHighlighted ? 1 : 0.7}
              />
            );
          })}

          {/* Animated data packet with pulsing effect */}
          {dataPacket.visible && dataPacket.path && (
            <>
              <circle
                cx={packetPoint.x}
                cy={packetPoint.y}
                r="4"
                fill={getPacketColor()}
              />
              <circle
                cx={packetPoint.x}
                cy={packetPoint.y}
                r="6"
                fill="none"
                stroke={getPacketColor()}
                strokeWidth="1"
                opacity="0.6"
              >
                <animate attributeName="r" from="6" to="10" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Competency nodes with semantic icons and careful styling */}
          {competencies.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedNode === comp.id;
            const isBeingDragged = draggedNode === comp.id;
            const StatusIcon = getStatusIcon(comp.status);
            
            // Different styling based on competency type
            let nodeBgColor = "#F8FAFC";
            let nodeSize = 20;
            
            if (comp.type === 'skill') {
              nodeSize = 22;
            } else if (comp.type === 'certificate') {
              nodeSize = 20;
            } else if (comp.type === 'experience') {
              nodeSize = 24;
            }
            
            return (
              <g
                key={comp.id}
                transform={`translate(${comp.x - nodeSize}, ${comp.y - nodeSize})`}
                onMouseEnter={() => setHoveredNode(comp.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleComponentClick(comp.id)}
                onMouseDown={(e) => handleMouseDown(e, comp.id)}
                className={`cursor-${isBeingDragged ? 'grabbing' : isSelected ? 'pointer' : 'grab'}`}
              >
                <circle
                  cx={nodeSize}
                  cy={nodeSize}
                  r={isSelected ? nodeSize + 4 : nodeSize}
                  fill={
                    isSelected 
                      ? `${comp.color}30` 
                      : hoveredNode === comp.id 
                        ? `${comp.color}20` 
                        : nodeBgColor
                  }
                  stroke={comp.color}
                  strokeWidth={isSelected || hoveredNode === comp.id || isBeingDragged ? "3" : "2"}
                  strokeDasharray={isBeingDragged ? "3,3" : "none"}
                >
                  {isSelected && (
                    <animate 
                      attributeName="r" 
                      values={`${nodeSize + 2};${nodeSize + 4};${nodeSize + 2}`} 
                      dur="2s" 
                      repeatCount="indefinite" 
                    />
                  )}
                </circle>
                
                <foreignObject 
                  x={nodeSize - 9} 
                  y={nodeSize - 9} 
                  width="18" 
                  height="18"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon 
                      size={comp.type === 'certificate' ? 14 : 16} 
                      strokeWidth={2.5}
                      color={comp.color}
                    />
                  </div>
                </foreignObject>
                
                {/* Status indicator */}
                <circle
                  cx={nodeSize * 1.7}
                  cy={nodeSize * 0.3}
                  r="8"
                  fill={getStatusColor(comp.status)}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <foreignObject 
                  x={nodeSize * 1.7 - 4} 
                  y={nodeSize * 0.3 - 4} 
                  width="8" 
                  height="8"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <StatusIcon size={6} color="#fff" />
                  </div>
                </foreignObject>
                
                {/* Type indicator for visual differentiation */}
                {comp.type === 'certificate' && (
                  <circle
                    cx={nodeSize * 0.3}
                    cy={nodeSize * 1.7}
                    r="8"
                    fill="#F8FAFC"
                    stroke={comp.color}
                    strokeWidth="1.5"
                  >
                    <foreignObject 
                      x={nodeSize * 0.3 - 4} 
                      y={nodeSize * 1.7 - 4} 
                      width="8" 
                      height="8"
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <Award size={6} color={comp.color} />
                      </div>
                    </foreignObject>
                  </circle>
                )}
                
                {comp.type === 'experience' && (
                  <circle
                    cx={nodeSize * 0.3}
                    cy={nodeSize * 1.7}
                    r="8"
                    fill="#F8FAFC"
                    stroke={comp.color}
                    strokeWidth="1.5"
                  >
                    <foreignObject 
                      x={nodeSize * 0.3 - 4} 
                      y={nodeSize * 1.7 - 4} 
                      width="8" 
                      height="8"
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <Briefcase size={6} color={comp.color} />
                      </div>
                    </foreignObject>
                  </circle>
                )}
              </g>
            );
          })}
                  </g>
        </svg>

        {/* Controls overlay */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button 
            onClick={() => setZoom(zoom * 1.2)}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
          <button 
            onClick={() => setZoom(Math.max(0.1, zoom * 0.8))}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button 
            onClick={() => setZoom(zoom * 1.2)}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
          <button 
            onClick={() => setZoom(Math.max(0.1, zoom * 0.8))}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>
        </div>

        {/* Tooltip when hovering - make it always visible even when another node is selected */}
        {hoveredNode && hoveredNode !== selectedNode && !draggedNode && (
          <div 
            className="absolute top-2 right-2 p-3 bg-white rounded-md shadow-md border-l-4 z-20 max-w-md" 
            style={{borderLeftColor: getCompetency(hoveredNode).color}}
          >
            <div className="flex items-center">
              <div 
                className="mr-2 w-6 h-6 flex items-center justify-center rounded-full" 
                style={{
                  backgroundColor: `${getCompetency(hoveredNode).color}15`, 
                  border: `2px solid ${getCompetency(hoveredNode).color}`
                }}
              >
                {React.createElement(getCompetency(hoveredNode).icon, {
                  size: 16,
                  strokeWidth: 2.5,
                  color: getCompetency(hoveredNode).color
                })}
              </div>
              <h3 
                className="font-bold" 
                style={{color: getCompetency(hoveredNode).color}}
              >
                {getCompetency(hoveredNode).name}
              </h3>
              <div 
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: getStatusColor(getCompetency(hoveredNode).status) + '20',
                  color: getStatusColor(getCompetency(hoveredNode).status)
                }}
              >
                {getCompetency(hoveredNode).status}
              </div>
              <div 
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: '#e5e7eb',
                  color: '#4b5563'
                }}
              >
                {getCompetency(hoveredNode).type}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{getCompetency(hoveredNode).description}</p>
            <p className="text-xs text-gray-500 mt-1 italic">{getCompetency(hoveredNode).devOpsNotes}</p>
            <p className="text-xs text-blue-500 mt-1">Click for detailed information</p>
          </div>
        )}
      </div>

      {/* Detailed Panel for Selected Competency */}
      {selectedNode && (
        <div className="mt-4 w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 flex justify-between items-center border-b"
            style={{backgroundColor: `${getCompetency(selectedNode).color}15`}}
          >
            <div className="flex items-center">
              <div 
                className="mr-3 w-10 h-10 flex items-center justify-center rounded-full" 
                style={{
                  backgroundColor: `${getCompetency(selectedNode).color}20`, 
                  border: `2px solid ${getCompetency(selectedNode).color}`
                }}
              >
                {React.createElement(getCompetency(selectedNode).icon, {
                  size: 24,
                  strokeWidth: 2,
                  color: getCompetency(selectedNode).color
                })}
              </div>
              <div>
                <div className="flex items-center">
                  <h2 
                    className="text-xl font-bold mr-2"
                    style={{color: getCompetency(selectedNode).color}}
                  >
                    {getCompetency(selectedNode).name}
                  </h2>
                  <div 
                    className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                    style={{
                      backgroundColor: getStatusColor(getCompetency(selectedNode).status) + '20',
                      color: getStatusColor(getCompetency(selectedNode).status)
                    }}
                  >
                    {getCompetency(selectedNode).status}
                  </div>
                  <div 
                    className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-700"
                  >
                    {getCompetency(selectedNode).type}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{getCompetency(selectedNode).description}</p>
                <p className="text-xs text-gray-500 italic mt-1">{getCompetency(selectedNode).devOpsNotes}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            {/* Status & Metrics Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div 
                  className="px-3 py-1 rounded-full flex items-center mr-4"
                  style={{
                    backgroundColor: `${getStatusColor(getCompetency(selectedNode).detailedInfo.status)}15`,
                    color: getStatusColor(getCompetency(selectedNode).detailedInfo.status),
                    border: `1px solid ${getStatusColor(getCompetency(selectedNode).detailedInfo.status)}`
                  }}
                >
                  {React.createElement(getStatusIcon(getCompetency(selectedNode).detailedInfo.status), { 
                    size: 14, 
                    className: "mr-1" 
                  })}
                  <span className="text-sm font-medium">{getCompetency(selectedNode).detailedInfo.status}</span>
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>Updated 5 days ago</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(getCompetency(selectedNode).detailedInfo.metrics).map(([key, value], i) => (
                  <div 
                    key={`metric-${i}`}
                    className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="flex items-end">
                      <span className="text-xl font-bold text-gray-800 mr-2">{value}</span>
                      {getCompetency(selectedNode).type === 'skill' && (
                        <span className="text-xs text-green-500 pb-1 flex items-center">
                          <ArrowUpRight size={12} className="mr-1" /> Growing
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Information Sections */}
            {getCompetency(selectedNode).detailedInfo.sections.map((section, i) => (
              <div key={`section-${i}`} className="mb-4">
                <h3 className="text-base font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}

            {/* DevOps Engineer Notes */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center text-indigo-700">
                <Terminal size={18} className="mr-2" />
                Personal Development Notes
              </h3>
              <div className="flex items-start">
                <img 
                  src={devOpsEngineerProfile.avatar} 
                  alt={devOpsEngineerProfile.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-indigo-800">{devOpsEngineerProfile.name}</div>
                  <p className="text-sm text-gray-700 mt-1">
                    {getCompetency(selectedNode).type === 'skill' && "Actively expanding knowledge in this area through hands-on projects and continuous learning. Planning to deepen expertise through practical application in upcoming projects."}
                    {getCompetency(selectedNode).type === 'certificate' && "Certification validates my practical knowledge and expertise in this domain. Regularly applying these skills in real-world scenarios to maintain proficiency."}
                    {getCompetency(selectedNode).type === 'experience' && "This role provided valuable hands-on experience and helped develop both technical skills and soft skills like collaboration and problem-solving in real-world environments."}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">Last updated: March 3, 2025</div>
                </div>
              </div>
            </div>

            {/* Connected Competencies */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Network size={18} className="mr-2" />
                Related Competencies
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {competencies
                  .filter(comp => 
                    comp.connections.includes(selectedNode) || 
                    getCompetency(selectedNode).connections.includes(comp.id)
                  )
                  .map((comp) => (
                    <div 
                      key={`connected-${comp.id}`}
                      className="flex items-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedNode(comp.id)}
                    >
                      <div 
                        className="mr-2 w-6 h-6 flex items-center justify-center rounded-full" 
                        style={{
                          backgroundColor: `${comp.color}15`, 
                          border: `2px solid ${comp.color}`
                        }}
                      >
                        {React.createElement(comp.icon, {
                          size: 14,
                          strokeWidth: 2,
                          color: comp.color
                        })}
                      </div>
                      <span className="text-sm">{comp.name}</span>
                      <div 
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{backgroundColor: getStatusColor(comp.status)}}
                      ></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 w-full">
        <h3 className="font-bold mb-2">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Expert skills</span>
          </div>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm">Intermediate skills</span>
          </div>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <Award size={14} className="text-blue-500 mr-2" />
            <span className="text-sm">Certifications</span>
          </div>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <Briefcase size={14} className="text-purple-500 mr-2" />
            <span className="text-sm">Work Experience</span>
          </div>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <Terminal size={14} className="text-indigo-500 mr-2" />
            <span className="text-sm">Technical Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetenceMindmap;