import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3-force'; // Import d3-force
import * as d3Force from 'd3-force'; // Keep existing d3-force import
import { polygonHull } from 'd3-polygon'; // Import hull function
import { line as d3Line, curveBasisClosed as d3CurveBasisClosed } from 'd3-shape'; // Import line generator and curve
import { 
  Code, Award, Briefcase, Server, Database, 
  Cloud, Lock, Terminal, GitBranch, Network, 
  Globe, Cpu, Shield, Activity, Clock,
  CheckCircle, AlertTriangle, X, ArrowUpRight,
  FileCode, BookOpen, Zap, Coffee, Layers, 
  Settings, Wrench, Brain, Workflow, Sparkles,
  BarChart
} from 'lucide-react';

// Remove the import for competenciesData
// import competenciesData from './competenciesData';

// --- NEW Mind Map Data ---
// Map vis.js groups to component types and assign icons/status/shapes
const typeMapping = {
  area: { type: 'area', icon: Brain, status: 'core', shape: 'ellipse' },
  tech: { type: 'technology', icon: Cpu, status: 'advanced', shape: 'dot' }, // Default dot
  tool: { type: 'tool', icon: Wrench, status: 'advanced', shape: 'box' },
  lang: { type: 'language', icon: Code, status: 'advanced', shape: 'hexagon' },
  framework: { type: 'framework', icon: Layers, status: 'intermediate', shape: 'database' },
  os: { type: 'os', icon: Terminal, status: 'advanced', shape: 'triangle' },
  cert: { type: 'certificate', icon: Award, status: 'completed', shape: 'diamond' },
};

// Specific icon overrides
const iconOverrides = {
  cloud: Cloud,
  devops: Workflow,
  iac: FileCode,
  containers: Layers,
  programming: Code,
  linux: Terminal,
  security: Shield,
  certs: Award,
  azure: Cloud,
  aws: Cloud,
  k8s: Layers,
  aks: Layers,
  openshift: Layers,
  docker: Layers,
  terraform: FileCode,
  bicep: FileCode,
  ansible: FileCode,
  azDevops: Workflow,
  jenkins: Workflow,
  git: GitBranch,
  python: Code,
  powershell: Code,
  fastapi: Code,
  django: Code,
  angular: Code,
  redhat: Terminal,
  azureSec: Lock,
  azureNet: Network,
  azureAdmin: Settings,
  // Certs use default Award
};

// Status overrides (examples)
const statusOverrides = {
  aws: 'intermediate', // Marked as Exposure
  angular: 'intermediate', // Marked as Exposure
  certAwsArch: 'completed',
  certAwsFound: 'completed',
};

// Color overrides (from vis.js data) - hex codes from the script
const colorOverrides = {
  aws: '#4DB6AC',
  aks: '#B2DFDB',
  openshift: '#B2DFDB',
  bicep: '#FFE082',
  azDevops: '#FFE082',
  powershell: '#B2DFDB',
  azureSec: '#FF8F00',
  azureNet: '#FF8F00',
  azureAdmin: '#FF8F00',
  certTerraform: '#C5A8E8',
};

// Add the necessary vis.js options.groups structure for color fallbacks
const options = {
    groups: {
         area: {
            color: { background: '#1976D2', border: '#0D47A1' }, // primaryColor, primaryDark
         },
         tech: {
            color: { background: '#009688', border: '#00796B' }, // accentColor, teal700
         },
         tool: {
            color: { background: '#FFC107', border: '#FFA000' }, // amberAccent, amber700
         },
         lang: {
            color: { background: '#009688', border: '#00796B' }, // accentColor, teal700
         },
         framework: {
             color: { background: '#4DB6AC', border: '#009688' }, // lighterTeal, accentColor
         },
         os: {
            color: { background: '#009688', border: '#00796B' }, // accentColor, teal700
         },
         cert: {
            color: { background: '#64B5F6', border: '#1976D2' }, // primaryLight, primaryColor
         }
    }
};

// --- Helper function to get contrasting color (simple version) ---
const getContrastColor = (hexColor) => {
    if (!hexColor) return '#000000'; // Default to black if no color
    // Remove # if present
    const hex = hexColor.replace('#', '');
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance (simple formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Original Nodes from vis.js data
const originalNodes = [
  { id: 'cloud', label: 'Cloud Platforms', group: 'area', title: 'Cloud computing services & infrastructure' },
  { id: 'devops', label: 'DevOps Practices', group: 'area', title: 'Methodologies and tools for automation & collaboration' },
  { id: 'iac', label: 'Infrastructure as Code', group: 'area', title: 'Managing infrastructure through code' },
  { id: 'containers', label: 'Containers & Orchestration', group: 'area', title: 'Packaging and managing applications' },
  { id: 'programming', label: 'Programming & Scripting', group: 'area', title: 'Languages for development and automation'},
  { id: 'linux', label: 'Linux Admin', group: 'area', title: 'Operating System Administration'},
  { id: 'security', label: 'Security', group: 'area', title: 'Security principles and tools'},
  { id: 'certs', label: 'Certifications', group: 'area', title: 'Professional Certifications', shape: 'star', color: { background: '#0D47A1', border: '#0D47A1' } },
  { id: 'azure', label: 'Microsoft Azure', group: 'tech', title: 'Primary cloud platform experience' },
  { id: 'aws', label: 'AWS', group: 'tech', title: 'Amazon Web Services (Exposure)' },
  { id: 'k8s', label: 'Kubernetes', group: 'tech', title: 'Container orchestration system' },
  { id: 'aks', label: 'AKS', group: 'tech', title: 'Azure Kubernetes Service' },
  { id: 'openshift', label: 'OpenShift', group: 'tech', title: 'Red Hat Kubernetes Distribution' },
  { id: 'docker', label: 'Docker', group: 'tech', title: 'Containerization platform' },
  { id: 'terraform', label: 'Terraform', group: 'tool', title: 'IaC tool for multi-cloud provisioning' },
  { id: 'bicep', label: 'Bicep', group: 'tool', title: 'Domain-specific language for deploying Azure resources' },
  { id: 'ansible', label: 'Ansible', group: 'tool', title: 'Configuration management and automation tool' },
  { id: 'azDevops', label: 'Azure DevOps', group: 'tool', title: 'Microsoft suite for DevOps' },
  { id: 'jenkins', label: 'Jenkins', group: 'tool', title: 'CI/CD automation server' },
  { id: 'git', label: 'Git', group: 'tool', title: 'Version control system' },
  { id: 'python', label: 'Python', group: 'lang', title: 'Versatile programming language' },
  { id: 'powershell', label: 'PowerShell', group: 'lang', title: 'Command-line shell and scripting language' },
  { id: 'fastapi', label: 'FastAPI', group: 'framework', title: 'Python web framework for APIs' },
  { id: 'django', label: 'Django', group: 'framework', title: 'Python web framework' },
  { id: 'angular', label: 'Angular', group: 'framework', title: 'Front-end framework (Exposure)' },
  { id: 'redhat', label: 'RedHat/Linux', group: 'os', title: 'Linux distributions and administration' },
  { id: 'azureSec', label: 'Azure Security', group: 'tech', title: 'Security services and practices within Azure' },
  { id: 'azureNet', label: 'Azure Networking', group: 'tech', title: 'Networking services and concepts in Azure' },
  { id: 'azureAdmin', label: 'Azure Administration', group: 'tech', title: 'Core Azure administration tasks' },
  { id: 'certTerraform', label: 'Cert: Terraform Associate', group: 'cert', title: 'HashiCorp Certified: Terraform Associate (003)' },
  { id: 'certCSK', label: 'Cert: CCSK v.5', group: 'cert', title: 'Certificate of Cloud Security Knowledge v.5' },
  { id: 'certAzNet', label: 'Cert: Azure Network Eng.', group: 'cert', title: 'Microsoft Certified: Azure Network Engineer Associate' },
  { id: 'certAzArch', label: 'Cert: Cybersecurity Arch.', group: 'cert', title: 'Microsoft Certified: Cybersecurity Architect Expert' },
  { id: 'certAzSec', label: 'Cert: Azure Security Eng.', group: 'cert', title: 'Microsoft Certified: Azure Security Engineer Associate' },
  { id: 'certAzAdmin', label: 'Cert: Azure Admin Assoc.', group: 'cert', title: 'Microsoft Certified: Azure Administrator Associate' },
  { id: 'certAwsArch', label: 'Cert: AWS Architecting', group: 'cert', title: 'AWS Academy Graduate - Cloud Architecting' },
  { id: 'certAwsFound', label: 'Cert: AWS Foundations', group: 'cert', title: 'AWS Academy Graduate - Cloud Foundations' },
];

// Original Edges from vis.js data - add dashes info
const originalEdges = [
  { from: 'cloud', to: 'azure' }, { from: 'cloud', to: 'aws' }, { from: 'cloud', to: 'security', dashes: true }, // Added dash
  { from: 'devops', to: 'iac' }, { from: 'devops', to: 'containers' }, { from: 'devops', to: 'git' },
  { from: 'devops', to: 'azDevops' }, { from: 'devops', to: 'jenkins' }, { from: 'devops', to: 'programming', dashes: true }, // Added dash
  { from: 'iac', to: 'terraform' }, { from: 'iac', to: 'ansible' }, { from: 'iac', to: 'bicep' },
  { from: 'containers', to: 'k8s' }, { from: 'containers', to: 'docker' },
  { from: 'programming', to: 'python' }, { from: 'programming', to: 'powershell' },
  { from: 'linux', to: 'redhat' }, { from: 'linux', to: 'ansible', dashes: true }, // Added dash
  { from: 'security', to: 'azureSec' },
  { from: 'azure', to: 'azureNet' }, { from: 'azure', to: 'azureAdmin' },
  { from: 'azure', to: 'aks', dashes: true }, { from: 'azure', to: 'azDevops', dashes: true }, { from: 'azure', to: 'bicep', dashes: true }, // Added dashes
  { from: 'azure', to: 'powershell', dashes: true }, { from: 'azure', to: 'azureSec', dashes: true }, // Added dashes
  { from: 'k8s', to: 'aks', dashes: true }, { from: 'k8s', to: 'openshift', dashes: true }, { from: 'k8s', to: 'docker', dashes: true }, // Added dashes
  { from: 'terraform', to: 'azure', dashes: true }, { from: 'terraform', to: 'aws', dashes: true }, // Added dashes
  { from: 'python', to: 'fastapi', dashes: true }, { from: 'python', to: 'django', dashes: true }, { from: 'python', to: 'ansible', dashes: true }, // Added dashes
  { from: 'certs', to: 'certTerraform' }, { from: 'certs', to: 'certCSK' }, { from: 'certs', to: 'certAzNet' },
  { from: 'certs', to: 'certAzArch' }, { from: 'certs', to: 'certAzSec' }, { from: 'certs', to: 'certAzAdmin' },
  { from: 'certs', to: 'certAwsArch' }, { from: 'certs', to: 'certAwsFound' },
  // Edges with arrows: 'from' or specific labels (represent these as standard connections for now)
  { from: 'certTerraform', to: 'terraform', dashes: true }, { from: 'certCSK', to: 'security', dashes: true }, { from: 'certAzNet', to: 'azureNet', dashes: true }, // Added dashes
  { from: 'certAzArch', to: 'security', dashes: true }, { from: 'certAzArch', to: 'azureSec', dashes: true }, { from: 'certAzSec', to: 'azureSec', dashes: true }, // Added dashes
  { from: 'certAzAdmin', to: 'azureAdmin', dashes: true }, { from: 'certAwsArch', to: 'aws', dashes: true }, { from: 'certAwsFound', to: 'aws', dashes: true }, // Added dashes
];

// Create a map for quick edge lookup including dashes and labels
const edgeInfoMap = new Map();
originalEdges.forEach(edge => {
    const key = `${edge.from}->${edge.to}`;
    edgeInfoMap.set(key, { dashes: !!edge.dashes, label: edge.label });
    // Assuming undirected effective connections for now, store info for reverse if needed
    const reverseKey = `${edge.to}->${edge.from}`;
    if (!edgeInfoMap.has(reverseKey)) { // Avoid overwriting if edge explicitly defined both ways
       edgeInfoMap.set(reverseKey, { dashes: !!edge.dashes, label: edge.label });
    }
});

// Transform data
const newCompetenciesData = originalNodes.map(node => {
  const mapping = typeMapping[node.group] || typeMapping.tech; // Default to tech if group unknown
  const icon = iconOverrides[node.id] || mapping.icon;
  const status = statusOverrides[node.id] || mapping.status;
  // Use override, vis.js node color (if object), vis.js group color, or default
  let color = colorOverrides[node.id];
  if (!color) {
      if (typeof node.color === 'object' && node.color !== null && node.color.background) {
          color = node.color.background;
      } else if (typeof node.color === 'string') { // Handle case where node.color is just a string
          color = node.color;
      } else { // Fallback to group color or default blue
          const groupOptions = options.groups[node.group];
          color = groupOptions?.color?.background || '#3B82F6'; 
      }
  }

  // Find connections for this node
  const connections = originalEdges
    .filter(edge => edge.from === node.id)
    .map(edge => ({ 
        targetId: edge.to, 
        dashes: !!edge.dashes // Explicitly add dash status
    }));

  // Add reverse connections (for edges that were originally arrows: 'from')
  originalEdges.forEach(edge => {
      if (edge.to === node.id && edge.from.startsWith('cert')) { // Simple check for cert -> skill validation edges
          // Check if this connection already exists (from the forward direction)
          const existingConnection = connections.find(c => c.targetId === edge.from);
          if (!existingConnection) {
                connections.push({ 
                    targetId: edge.from, 
                    dashes: !!edge.dashes // Add dash status for reverse connection too
                });
          } else {
              // If connection exists, ensure dash status is updated if needed
              existingConnection.dashes = existingConnection.dashes || !!edge.dashes;
          }
      }
      // Consider adding other reverse connections if needed based on vis.js edge definitions
  });


  return {
    id: node.id,
    name: node.label, // Use 'name' as expected by the component
    type: mapping.type,
    shape: mapping.shape, // Add shape property
    description: node.title,
    status: status, // Overall status for the node icon/tooltip
    icon: icon,
    color: color,
    connections: connections,
    x: 0, // Add default coordinates
    y: 0,
    // Add other potential fields if needed by the component (e.g., devOpsNotes, years)
    devOpsNotes: `Notes for ${node.label}`, // Placeholder
    years: node.group === 'cert' ? null : Math.floor(Math.random() * 5) + 1, // Placeholder years
    // Add placeholder detailedInfo to prevent runtime errors
    detailedInfo: {
        status: status, // Use the same overall status for the detailed view for now
        metrics: { // Placeholder metrics - adjust structure as needed
            proficiencyEstimate: Math.floor(Math.random() * 70 + 30) + '%',
            projectInvolvement: Math.floor(Math.random() * 10),
            learningFocus: ['Active', 'Maintenance', 'Planned'][Math.floor(Math.random() * 3)],
        },
        sections: [ // Placeholder sections - adjust structure as needed
            { title: 'Core Concept', content: `This section would detail the core concept of ${node.label}.` },
            { title: 'Practical Use Cases', content: `Examples of how ${node.label} is used in projects.` },
        ],
    },
    // Add font properties from vis.js options
    font: {
        size: options.groups[node.group]?.font?.size || 14, // Default 14
        color: getContrastColor(color), // Use contrast color for label on node
        face: 'Roboto' // From vis.js options
    },
  };
});

// --- START OF LAYOUT CALCULATION ---
/* // Remove the entire calculateRadialLayout function
function calculateRadialLayout(nodes, edges, rootId) {
  const positions = {};
  const visited = new Set();
  const nodesById = new Map(nodes.map(n => [n.id, n]));
  const adjacency = new Map();

  // Build adjacency list (undirected)
  edges.forEach(({ from, to }) => {
    if (nodesById.has(from) && nodesById.has(to)) { // Ensure nodes exist in our data
      if (!adjacency.has(from)) adjacency.set(from, []);
      if (!adjacency.has(to)) adjacency.set(to, []);
      adjacency.get(from).push(to);
      adjacency.get(to).push(from); // Undirected graph
    }
  });

  const rootNodeExists = nodesById.has(rootId);
  const queue = [];

  if (rootNodeExists) {
    positions[rootId] = { x: 0, y: 0 };
    visited.add(rootId);
    queue.push({ id: rootId, level: 0 });
  } else {
    console.error('Root node for layout not found:', rootId, '. Using fallback layout.');
    // Fallback: simple grid layout if root is missing
    nodes.forEach((node, index) => {
        positions[node.id] = { 
            x: (index % 10) * 150, // Simple grid
            y: Math.floor(index / 10) * 150 
        };
    });
    // Apply positions and return early
    return nodes.map(node => ({
        ...node,
        x: positions[node.id]?.x || 0,
        y: positions[node.id]?.y || 0,
    }));
  }

  let head = 0;
  // Adjust radius based on vis.js springLength
  const baseRadius = 160; // Directly use springLength from vis.js options
  let maxLevel = 0;

  while (head < queue.length) {
    const { id: currentId, level } = queue[head++];
    maxLevel = Math.max(maxLevel, level);
    
    const parentPosition = positions[currentId];
    const neighbors = (adjacency.get(currentId) || [])
                        .filter(nId => !visited.has(nId)); // Only unvisited neighbors
    
    const angleStep = neighbors.length > 0 ? (2 * Math.PI) / neighbors.length : 0;
    // Add a slight offset to the starting angle per level to prevent direct overlaps
    const angleOffset = level * (Math.PI / 8); 
    const radius = (level + 1) * baseRadius;

    neighbors.forEach((neighborId, index) => {
      if (!visited.has(neighborId)) { // Double check visited here
        visited.add(neighborId);
        const angle = angleOffset + (angleStep * index);
        
        const x = parentPosition.x + radius * Math.cos(angle);
        const y = parentPosition.y + radius * Math.sin(angle);
        
        positions[neighborId] = { x, y };
        queue.push({ id: neighborId, level: level + 1 });
      }
    });
  }

  // Position any nodes not reached by BFS (disconnected components)
  let unpositionedIndex = 0;
  const gridSpacing = 250; // Increased grid spacing
  nodes.forEach(node => {
    if (!positions[node.id]) {
        console.warn('Node not reached by BFS, placing in fallback grid:', node.id);
        // Place them in a fallback grid below the main graph
        const gridX = (unpositionedIndex % 5) * gridSpacing - (2 * gridSpacing); 
        const gridY = baseRadius * (maxLevel + 2) + Math.floor(unpositionedIndex / 5) * gridSpacing; 
        positions[node.id] = { x: gridX, y: gridY };
        unpositionedIndex++;
    }
  });

  // Apply calculated positions back to the nodes array
  return nodes.map(node => ({
    ...node,
    x: positions[node.id]?.x || 0, // Ensure fallback to 0,0 if something went wrong
    y: positions[node.id]?.y || 0,
  }));
}
*/
// const layoutAppliedData = calculateRadialLayout(newCompetenciesData, originalEdges, 'devops'); // Remove this call
// --- END OF REMOVAL ---

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
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 }); // Will be calculated dynamically
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });
  const [groupElasticBands, setGroupElasticBands] = useState({}); // State for elastic band paths

  // Definition of competencies - Initialize with pre-layout data
  const [competencies, setCompetencies] = useState(newCompetenciesData.map(n => ({...n, x: Math.random()*100 - 50, y: Math.random()*100 - 50}))); // Add small random initial positions
  const simulationRef = useRef(); // Ref to store the simulation

  // Find a competency by ID
  const getCompetency = (id) => competencies.find(comp => comp.id === id);

  // Get all connections as pairs including dash info and labels
  const getConnections = () => {
    const connections = [];
    competencies.forEach(competency => {
      // Ensure competency.connections is an array of objects
      if (Array.isArray(competency.connections)) {
          competency.connections.forEach(connInfo => {
              // Check if connInfo has targetId
              if (connInfo && connInfo.targetId) { 
                  const target = getCompetency(connInfo.targetId);
                  if (target) {
                      const edgeInfo = edgeInfoMap.get(`${competency.id}->${connInfo.targetId}`) || edgeInfoMap.get(`${connInfo.targetId}->${competency.id}`) || {};
                      connections.push({
                          source: competency.id,
                          target: connInfo.targetId,
                          dashes: edgeInfo.dashes || false, // Use map for dash info
                          label: edgeInfo.label || null, // Use map for label info
                          path: generatePath(competency, target)
                      });
                  }
              } else {
                  // Handle older format if necessary (simple array of strings)
                  // console.warn('Old connection format found for:', competency.id);
                  // const target = getCompetency(connInfo); // Assuming connInfo is targetId string
                  // if (target) {
                  //     connections.push({
                  //         source: competency.id,
                  //         target: connInfo,
                  //         dashes: edgeDashMap.get(`${competency.id}->${connInfo}`) || edgeDashMap.get(`${connInfo}->${competency.id}`),
                  //         path: generatePath(competency, target)
                  //     });
                  // }
              }
          });
      }
    });
    return connections;
  };

  // Generate SVG path between two components, stopping short for arrows
  const generatePath = (source, target) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Define node radius/size approximation (use average of source/target sizes)
    const sourceNodeSize = getNodeSize(source);
    const targetNodeSize = getNodeSize(target);
    const targetRadius = (targetNodeSize * 0.8); // Stop shorter based on actual size
    const scale = dist > 0 ? Math.max(0, (dist - targetRadius)) / dist : 0; // Ensure scale is not negative

    const endX = source.x + dx * scale;
    const endY = source.y + dy * scale;

    // For horizontal paths with a curve
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = source.x + dx / 2;
      // Stop the path at endX, endY
      return `M${source.x + 20} ${source.y} C${midX} ${source.y}, ${midX} ${endY}, ${endX} ${endY}`;
    } 
    // For vertical paths with a curve
    else {
      const midY = source.y + dy / 2;
      // Stop the path at endX, endY
      return `M${source.x} ${source.y + 20} C${source.x} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
    }
  };

  // --- Helper function to get node size (consistent with rendering logic) ---
  const getNodeSize = (comp) => {
        if (!comp) return 18; // Default if component not found
        let nodeSize = 18; 
        let nodeShape = comp.shape || 'dot';
        switch (comp.id) {
            case 'cloud': case 'devops': case 'iac': case 'containers': 
            case 'programming': case 'linux': case 'security': case 'certs':
                 nodeSize = 30; nodeShape = 'ellipse'; break;
        }
        switch (nodeShape) {
            case 'dot': nodeSize = 20; break;
            case 'box': nodeSize = 17; break;
            case 'hexagon': nodeSize = 18; break;
            case 'database': nodeSize = 17; break;
            case 'triangle': nodeSize = 18; break;
            case 'diamond': nodeSize = 20; break;
        }
        return nodeSize;
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
  
  // Mouse event handlers for dragging nodes and panning - Integrate with D3
  const handleMouseDown = (event, id) => {
    if (selectedNode) return; 
    
    const node = competencies.find(comp => comp.id === id);
    const simNode = simulationRef.current?.nodes().find(n => n.id === id);
    if (!node || !simNode) return;

    // Fix the node\'s position and reheat simulation
    simNode.fx = node.x; 
    simNode.fy = node.y;
    simulationRef.current.alphaTarget(0.3).restart(); 
    
    const svgRect = svgRef.current.getBoundingClientRect();
    // Calculate offset relative to node center, not top-left of svg group
    const offsetX = (event.clientX - svgRect.left - pan.x) / zoom - node.x;
    const offsetY = (event.clientY - svgRect.top - pan.y) / zoom - node.y;
    
    setDraggedNode(id);
    setDragOffset({ x: offsetX, y: offsetY });
    event.preventDefault();
  };
  
  const handleMouseMove = (event) => {
    // Handling node dragging
    if (draggedNode) {
      const simNode = simulationRef.current?.nodes().find(n => n.id === draggedNode);
      if (!simNode) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      // Calculate new fixed position based on mouse movement
      const newFx = (event.clientX - svgRect.left - pan.x) / zoom - dragOffset.x;
      const newFy = (event.clientY - svgRect.top - pan.y) / zoom - dragOffset.y;

      // Update the fixed position for D3
      simNode.fx = newFx;
      simNode.fy = newFy;
      
      // // We don\'t need to call setCompetencies here anymore, D3 tick handler does it
      // setCompetencies(prev => 
      //   prev.map(comp => 
      //     comp.id === draggedNode 
      //       ? { ...comp, x: newFx, y: newFy } 
      //       : comp
      //   )
      // );
      return;
    }
    
    // Handling canvas panning
    if (isPanning) {
      const dx = event.clientX - startPanPos.x;
      const dy = event.clientY - startPanPos.y;
      
      // Decrease sensitivity further for even slower panning
      const panSensitivity = 0.4; 

      setPan(prevPan => ({
        // Multiply dx/dy by sensitivity factor
        x: prevPan.x + dx * panSensitivity,
        y: prevPan.y + dy * panSensitivity
      }));
      
      // Update start position for the next movement calculation
      setStartPanPos({
        x: event.clientX,
        y: event.clientY
      });
    }
  };
  
  const handleMouseUp = () => {
    if (draggedNode) {
        const simNode = simulationRef.current?.nodes().find(n => n.id === draggedNode);
        if (simNode) {
            // Release the fixed position
            simNode.fx = null;
            simNode.fy = null;
        }
        // Cool down the simulation
        simulationRef.current?.alphaTarget(0);
    }
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

  // --- Setup D3 Force Simulation --- 
  useEffect(() => {
    if (!competencies || competencies.length === 0) return;

    // Make copies for D3 simulation to avoid direct state mutation outside setters
    const nodes = competencies.map(d => ({...d})); // Use current state positions as starting points
    // Transform edges to use 'source' and 'target' properties as expected by d3.forceLink
    const links = originalEdges.map(d => ({ 
        source: d.from, 
        target: d.to,
        // Copy other potential edge properties if needed
        dashes: d.dashes, 
        label: d.label 
    })); 

    const svgElement = svgRef.current;
    const width = svgElement?.clientWidth || 700;
    const height = svgElement?.clientHeight || 650;

    // Initialize the simulation
    simulationRef.current = d3.forceSimulation(nodes)
        // Increase link distance for more space
        .force("link", d3.forceLink(links).id(d => d.id).distance(150).strength(0.5)) 
        // Increase repulsion force further
        .force("charge", d3.forceManyBody().strength(-800)) 
        .force("center", d3.forceCenter(width / 2, height / 2)) 
        // Increase collision radius significantly to push close nodes apart
        .force("collide", d3.forceCollide().radius(d => getNodeSize(d) * 2.2).strength(0.7)) 
        .on("tick", () => {
            // Update state with new positions calculated by the simulation
            // Important: Create new objects/arrays for state update
            setCompetencies(prev => 
                prev.map(p => {
                    const simNode = nodes.find(n => n.id === p.id);
                    return simNode ? {...p, x: simNode.x, y: simNode.y } : p;
                })
            );
        });
        
    // Cleanup function to stop simulation when component unmounts
    return () => {
        simulationRef.current?.stop();
    };

  }, []); // Run only once on mount

  // --- Calculate Group Elastic Bands --- 
  // useEffect(() => {  // <<< COMMENT OUT START
  //   if (competencies.length === 0) return;

  //   const areaNodes = competencies.filter(c => c.type === 'area');
  //   const bands = {};
  //   const allNodesById = new Map(competencies.map(n => [n.id, n]));

  //   // Simplified logic for finding direct neighbors (from previous step)
  //   const getDirectNeighbors = (areaNodeId) => {
  //       const neighbors = new Set();
  //       neighbors.add(areaNodeId); // Include the area node itself
  //       originalEdges.forEach(({ from, to }) => {
  //           if (from === areaNodeId && allNodesById.has(to)) neighbors.add(to);
  //           if (to === areaNodeId && allNodesById.has(from)) neighbors.add(from);
  //       });
  //       return Array.from(neighbors).map(id => allNodesById.get(id)).filter(Boolean);
  //   };

  //   // Define the line generator for smooth closed curves
  //   const lineGenerator = d3Line()
  //       .x(d => d.x)
  //       .y(d => d.y)
  //       .curve(d3CurveBasisClosed);

  //   areaNodes.forEach(areaNode => {
  //     const clusterNodes = getDirectNeighbors(areaNode.id);
  //     // Get current positions of cluster nodes
  //     const clusterPoints = clusterNodes.map(node => ({ x: node.x, y: node.y }));

  //     if (clusterPoints.length >= 3) { // Need at least 3 points for a hull
  //       const hullPoints = polygonHull(clusterPoints.map(p => [p.x, p.y])); // d3.polygonHull expects [[x,y], ...]
        
  //       if (hullPoints) {
  //         // Convert hull back to [{x,y}, ...] for line generator and add padding
  //         const padding = 25; // Adjust padding for the band
  //         const paddedHull = hullPoints.map(([x, y]) => {
  //             // Calculate vector from center (approximate)
  //             const dx = x - areaNode.x;
  //             const dy = y - areaNode.y;
  //             const dist = Math.sqrt(dx*dx + dy*dy);
  //             const scale = dist > 0 ? (dist + padding) / dist : 1;
  //             return { x: areaNode.x + dx * scale, y: areaNode.y + dy * scale };
  //         });
          
  //         bands[areaNode.id] = {
  //           path: lineGenerator(paddedHull), // Generate smooth closed path
  //           // Store a very transparent fill color instead of a stroke color
  //           fillColor: areaNode.color + '0A' // Semi-transparent fill (~6% opacity)
  //         };
  //       }
  //     }
  //   });
  //   setGroupElasticBands(bands);

  // }, [competencies]); // Recalculate when node positions change // <<< COMMENT OUT END

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
            <Briefcase size={16} className="text-purple-500 mr-2" />
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

      {/* Revert width back to w-full, parent controls width now */}
      <div className="relative w-full h-[34rem] border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
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
          {/* ---- SVG Definitions ---- */} 
          <defs>
            {/* Arrowhead Marker Definition */}
            <marker 
              id="arrowhead" 
              viewBox="0 0 10 10" 
              refX="8" // Position arrowhead slightly before the end of the path
              refY="5" 
              markerUnits="strokeWidth" 
              markerWidth="6.4" // 8 * 0.8 
              markerHeight="4.8" // 6 * 0.8
              orient="auto"
            >
              {/* Use dividerColor for arrow by default */}
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#BDBDBD" /> 
            </marker>
            {/* Drop Shadow Filter Definition */} 
            <filter id="dropshadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/> {/* Shadow opacity */}
                </feComponentTransfer>
                <feMerge> 
                    <feMergeNode/>{/* Offset blurred shadow */}
                    <feMergeNode in="SourceGraphic"/> {/* Original element on top */} 
                </feMerge>
            </filter>
          </defs>
          {/* ---- End SVG Definitions ---- */}

          {/* Main content group with zoom and pan transformations */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          
          {/* ---- Group Background Fills ---- */} 
          {Object.values(groupElasticBands).map((band, index) => (
              <path 
                key={`band-${index}`}
                d={band.path}
                // Use fill instead of stroke
                fill={band.fillColor}
                stroke="none" // No stroke for the background shape
                // Remove stroke-specific attributes
                // strokeWidth="15"
                // strokeLinejoin="round"
                // strokeLinecap="round"
                // Adjust opacity if needed, but color alpha handles most of it
                opacity="1" 
              />
          ))}
          {/* ---- End Group Background Fills ---- */}
          
          {/* Connections with semantic coloring and dash style */}
          {getConnections().map((conn, i) => {
            const sourceComp = getCompetency(conn.source);
            const targetComp = getCompetency(conn.target);
            const isHighlighted = 
              (hoveredNode && (hoveredNode === conn.source || hoveredNode === conn.target)) ||
              (selectedNode && (selectedNode === conn.source || selectedNode === conn.target));

            // Use dividerColor (#BDBDBD) as default, primaryColor (#1976D2) for highlight
            let strokeColor = "#BDBDBD"; 
            if (isHighlighted) {
                strokeColor = "#1976D2"; // primaryColor
                // Optionally use primaryLight (#64B5F6) on hover if tracked
            }

            // Calculate midpoint for label
            let midX = 0, midY = 0;
            if (conn.path && conn.label) {
                try {
                    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pathElement.setAttribute("d", conn.path);
                    const midPoint = pathElement.getPointAtLength(pathElement.getTotalLength() * 0.5);
                    midX = midPoint.x;
                    midY = midPoint.y;
                } catch(e) { /* Ignore path errors */ }
            }

            return (
              <React.Fragment key={`conn-frag-${i}`}>
                <path 
                  key={`conn-${i}`}
                  d={conn.path}
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? "2.5" : "1.5"} 
                  fill="none"
                  strokeDasharray={conn.dashes ? "5,5" : "none"}
                  strokeLinecap="round"
                  opacity={isHighlighted ? 1 : 0.8} // Match vis.js opacity
                  markerEnd="url(#arrowhead)"
                />
                {/* Render Edge Label if it exists */} 
                {conn.label && midX !== 0 && (
                    <text
                        x={midX}
                        y={midY}
                        dy="-4" // Offset slightly above the line
                        fontFamily="Roboto"
                        fontSize="11" // Match vis.js edge font size
                        fill="#757575" // textSecondary color
                        textAnchor="middle"
                        // Add white stroke for readability like vis.js
                        stroke="#FFFFFF" 
                        strokeWidth="3"
                        paintOrder="stroke"
                    >
                        {conn.label}
                    </text>
                )}
              </React.Fragment>
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

          {/* Competency nodes with semantic icons and SHAPES */}
          {competencies.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedNode === comp.id;
            const isBeingDragged = draggedNode === comp.id;
            const StatusIcon = getStatusIcon(comp.status);
            
            // --- Node Size Calculation (based on vis.js groups) ---
            let nodeSize = 18; // Default vis.js node size
            let nodeShape = comp.shape || 'dot'; // Use shape from data
            // Adjust sizes slightly based on vis.js options
            switch (comp.id) { // Use ID for specific overrides like area nodes
                case 'cloud': case 'devops': case 'iac': case 'containers': 
                case 'programming': case 'linux': case 'security': case 'certs':
                     nodeSize = 30; nodeShape = 'ellipse'; break; // Make area nodes distinctly large ellipses
            }
            switch (nodeShape) { // General shape size adjustments
                // case 'ellipse': nodeSize = 30; break; // Already handled above
                case 'dot': nodeSize = 20; break; // tech group size slightly smaller than area
                case 'box': nodeSize = 17; break; // tools slightly smaller
                case 'hexagon': nodeSize = 18; break; // langs
                case 'database': nodeSize = 17; break; // frameworks
                case 'triangle': nodeSize = 18; break; // os
                case 'diamond': nodeSize = 20; break; // certs slightly larger
                // default: nodeSize = 18; // Handled by initial value
            }
            const iconSize = Math.max(12, nodeSize * 0.55); // Icon size relative to node
            const statusIndicatorSize = Math.max(6, nodeSize * 0.25);
            const typeIndicatorSize = 8;
            const iconColor = getContrastColor(comp.color); // Calculate contrast color for icon

            // --- Node Rendering Logic ---
            const renderNodeShape = () => {
                const commonProps = {
                    // Use node color for fill, maybe slightly transparent normally
                    fill: isSelected ? `${comp.color}E0` : hoveredNode === comp.id ? `${comp.color}C0` : `${comp.color}`, 
                    stroke: comp.color, 
                    strokeWidth: isSelected || hoveredNode === comp.id || isBeingDragged ? "2.5" : "2", // Match vis.js borderWidth
                    strokeDasharray: isBeingDragged ? "3,3" : "none",
                };

                switch (nodeShape) {
                    case 'ellipse':
                        // Make ellipse slightly wider than tall
                        return <ellipse cx={nodeSize} cy={nodeSize} rx={nodeSize * 1.2} ry={nodeSize * 0.8} {...commonProps} />;
                    case 'box':
                        return <rect x={nodeSize*0.1} y={nodeSize*0.1} width={nodeSize * 1.8} height={nodeSize * 1.8} rx="3" ry="3" {...commonProps} />;
                    case 'diamond':
                        const dPath = `M${nodeSize} 0 L${nodeSize * 2} ${nodeSize} L${nodeSize} ${nodeSize * 2} L0 ${nodeSize} Z`;
                        return <path d={dPath} {...commonProps} />;
                    case 'triangle':
                        const tPath = `M${nodeSize} 0 L${nodeSize * 2} ${nodeSize * 1.732} L0 ${nodeSize * 1.732} Z`; // Equilateral triangle
                        // Adjust transform to better center the triangle visually within the allocated space
                        return <path d={tPath} transform={`translate(0, ${nodeSize * 0.1})`} {...commonProps} />;
                    case 'hexagon':
                         const h = nodeSize * 1.7; // Adjusted height/width for hexagon
                         const w = nodeSize * 1.9;
                         const hexPath = `M${w/2} 0 L${w} ${h/4} L${w} ${3*h/4} L${w/2} ${h} L0 ${3*h/4} L0 ${h/4} Z`;
                         return <path d={hexPath} transform={`translate(${nodeSize - w/2}, ${nodeSize - h/2}) scale(0.9)`} {...commonProps} />; // Scale slightly to fit icon better
                    case 'database': // Represent database shape
                        const dbWidth = nodeSize * 2.2;
                        const dbHeight = nodeSize * 1.8; // Adjusted database shape slightly
                        const dbCurve = dbHeight * 0.2;
                        const dbPath = `M0 ${dbCurve} C0 ${-dbCurve*0.3}, ${dbWidth} ${-dbCurve*0.3}, ${dbWidth} ${dbCurve} L${dbWidth} ${dbHeight - dbCurve} C${dbWidth} ${dbHeight+dbCurve*0.3}, 0 ${dbHeight+dbCurve*0.3}, 0 ${dbHeight - dbCurve} Z`;
                        return (
                             <g transform={`translate(${(nodeSize * 2 - dbWidth)/2}, ${nodeSize*0.1})`}>
                                <path d={dbPath} {...commonProps} />
                                {/* Add top ellipse */} 
                                <ellipse cx={dbWidth/2} cy={dbCurve} rx={dbWidth/2} ry={dbCurve} {...commonProps} stroke={comp.color} />
                            </g>
                        );
                    case 'dot':
                    default:
                        return <circle cx={nodeSize} cy={nodeSize} r={nodeSize} {...commonProps} />;
                }
            };

            return (
              <g
                key={comp.id}
                // Center the group on comp.x, comp.y regardless of node size/shape
                transform={`translate(${comp.x - nodeSize}, ${comp.y - nodeSize})`}
                onMouseEnter={() => setHoveredNode(comp.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleComponentClick(comp.id)}
                onMouseDown={(e) => handleMouseDown(e, comp.id)}
                className={`cursor-${isBeingDragged ? 'grabbing' : isSelected ? 'pointer' : 'grab'}`}
              >
                {/* Render the shape based on type */} 
                {renderNodeShape()}
                {/* Apply drop shadow filter */} 
                <g filter="url(#dropshadow)">
                  {renderNodeShape()} 
                </g>
                
                {/* Icon centered within the node bounds */} 
                <foreignObject 
                  x={nodeSize * 0.45}
                  y={nodeSize * 0.45}
                  width={nodeSize * 1.1} 
                  height={nodeSize * 1.1}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon 
                      size={iconSize}
                      strokeWidth={2} // Slightly thinner stroke for icons
                      // Use calculated contrast color for the icon
                      color={iconColor} 
                    />
                  </div>
                </foreignObject>
                
                {/* Node Label Text */} 
                <text
                    x={nodeSize} // Center horizontally relative to node center (nodeSize, nodeSize)
                    y={nodeSize * 2 + 5} // Position below the node shape
                    textAnchor="middle"
                    fontFamily={comp.font?.face || 'Roboto'}
                    fontSize={comp.font?.size || 14}
                    fill={'#212121'} // Use textPrimary color always for visibility off-node
                    // stroke={getContrastColor(comp.color)} // Optional: outline in contrast color? 
                    // strokeWidth={0.5}
                >
                    {comp.name}
                </text>

                {/* Status indicator (top-right) - adjust positioning based on nodeSize */}
                <circle
                  cx={nodeSize * 1.8} // Adjusted positioning relative to node center (nodeSize, nodeSize)
                  cy={nodeSize * 0.2}
                  r={statusIndicatorSize}
                  fill={getStatusColor(comp.status)}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <foreignObject 
                  x={nodeSize * 1.8 - statusIndicatorSize * 0.5} 
                  y={nodeSize * 0.2 - statusIndicatorSize * 0.5} 
                  width={statusIndicatorSize} 
                  height={statusIndicatorSize}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <StatusIcon size={statusIndicatorSize * 0.75} color="#fff" />
                  </div>
                </foreignObject>
                
                {/* Type indicator (bottom-left) - adjust positioning */}
                {(comp.type === 'certificate' || comp.type === 'experience') && (
                  <circle
                    cx={nodeSize * 0.2} 
                    cy={nodeSize * 1.8}
                    r={typeIndicatorSize}
                    fill="#F8FAFC"
                    stroke={comp.color}
                    strokeWidth="1.5"
                  >
                    <foreignObject 
                      x={nodeSize * 0.2 - typeIndicatorSize * 0.5} 
                      y={nodeSize * 1.8 - typeIndicatorSize * 0.5} 
                      width={typeIndicatorSize} 
                      height={typeIndicatorSize}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        {comp.type === 'certificate' ? 
                            <Award size={typeIndicatorSize * 0.75} color={comp.color} /> : 
                            <Briefcase size={typeIndicatorSize * 0.75} color={comp.color} />
                        }
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

        {/* Tooltip when hovering - Style closer to vis.js */}
        {hoveredNode && hoveredNode !== selectedNode && !draggedNode && (
          <div 
            // Style closer to vis-tooltip: dark background, white text, roboto font
            className="absolute top-2 right-2 p-2.5 px-3.5 bg-gray-800 bg-opacity-90 text-white rounded shadow-lg z-20 max-w-md text-sm font-[Roboto,sans-serif]"
            // Remove border-l style
            // style={{borderLeftColor: getCompetency(hoveredNode).color}}
          >
            <div className="flex items-center mb-1">
              {/* Optional: Keep icon but style differently? */}
              {/* <div 
                className="mr-2 w-5 h-5 flex items-center justify-center rounded-full bg-opacity-20" 
                style={{backgroundColor: getCompetency(hoveredNode).color}}
              >
                {React.createElement(getCompetency(hoveredNode).icon, {
                  size: 12,
                  strokeWidth: 2,
                  color: 'white' // Icon color on dark background
                })}
              </div> */} 
              <h3 className="font-medium text-base mr-2">
                {getCompetency(hoveredNode).name}
              </h3>
              {/* Status chip - dark theme */}
              <div 
                className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: getStatusColor(getCompetency(hoveredNode).status) + '40', // Darker background
                  color: '#FFFFFFE0' // Brighter text on dark
                }}
              >
                {getCompetency(hoveredNode).status}
              </div>
               {/* Type chip - dark theme */}
              <div 
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-600 text-gray-200"
              >
                {getCompetency(hoveredNode).type}
              </div>
            </div>
            {/* Description - slightly lighter text */}
            <p className="text-gray-200 text-sm mt-1">{getCompetency(hoveredNode).description}</p>
            {/* Optional notes - keep or remove */} 
            {/* <p className="text-xs text-gray-400 mt-1 italic">{getCompetency(hoveredNode).devOpsNotes}</p> */}
            {/* Remove "Click for detailed info" prompt? Vis.js doesn't usually have this */} 
             {/* <p className="text-xs text-blue-400 mt-1">Click for detailed information</p> */}
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