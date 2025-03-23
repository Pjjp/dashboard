import React, { useState, useEffect } from 'react';
// Make sure all icons are imported correctly
import { 
  Server, Database, Users, Globe, Shield, Cpu, 
  HardDrive, BarChart4, Search, CloudRain, Network,
  Shuffle, ArrowRightLeft, X, Activity, Clock,
  CheckCircle, AlertTriangle, Repeat, FileCode, 
  GitBranch, Terminal
} from 'lucide-react';

// Rest of the component remains the same

const CloudInfrastructureView = ({ devOpsEngineerProfile, devOpsMetrics, pipelineEvents }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeConnection, setActiveConnection] = useState(null);
  const [dataPacket, setDataPacket] = useState({ visible: false, position: 0, path: null });
  const [deploymentStatus, setDeploymentStatus] = useState('stable'); // stable, deploying, rollback

  // Definition of infrastructure components with DevOps focus
  const components = [
    { 
      id: 'users', 
      name: 'End Users', 
      icon: Users, 
      x: 50, 
      y: 100, 
      connections: ['gateway'], 
      description: 'End users accessing cloud services',
      devOpsNotes: 'Monitoring user experience with Application Insights',
      color: '#8B5CF6', // Purple
      status: 'operational',
      detailedInfo: {
        status: 'Active',
        metrics: {
          activeUsers: 2483,
          avgResponseTime: '1.2s',
          userSatisfaction: '94%'
        },
        sections: [
          {
            title: 'Monitoring',
            content: 'Real-time user experience monitoring with Azure Application Insights and custom dashboards for tracking user engagement patterns.'
          },
          {
            title: 'Access Patterns',
            content: 'Traffic analysis shows peak usage between 9AM-5PM GMT with secondary peaks across APAC time zones.'
          }
        ]
      }
    },
    { 
      id: 'gateway', 
      name: 'API Gateway', 
      icon: ArrowRightLeft, 
      x: 150, 
      y: 100, 
      connections: ['lb', 'securityGateway'], 
      description: 'Azure API Management Service',
      devOpsNotes: 'IaC deployed through ARM templates',
      color: '#EC4899', // Pink
      status: 'operational',
      detailedInfo: {
        status: 'Operational',
        metrics: {
          throughput: '3240 req/min',
          avgLatency: '45ms',
          p95Latency: '127ms'
        },
        sections: [
          {
            title: 'Infrastructure as Code',
            content: 'Deployed and managed via ARM templates with automated CI/CD pipeline for configuration changes. Security policies enforced through policy expressions.'
          },
          {
            title: 'Observability',
            content: 'Instrumented with Azure Monitor and Log Analytics workspace for comprehensive telemetry and alerting.'
          }
        ]
      }
    },
    { 
      id: 'securityGateway', 
      name: 'Security Layer', 
      icon: Shield, 
      x: 150, 
      y: 170, 
      connections: ['gateway'], 
      description: 'Security policies and WAF',
      devOpsNotes: 'Applied AZ-500 knowledge for security configuration',
      color: '#14B8A6', // Teal
      status: 'operational',
      detailedInfo: {
        status: 'Protected',
        metrics: {
          threatsPrevented: 342,
          vulnerabilities: 0,
          complianceScore: '98%'
        },
        sections: [
          {
            title: 'Security Implementation',
            content: 'Web Application Firewall configured according to OWASP guidelines. Implemented security headers and TLS 1.3 enforcement through custom policies.'
          },
          {
            title: 'DevSecOps',
            content: 'Security as Code implementation with automated scanning in CI/CD pipeline. Vulnerability assessment integrated in the deployment workflow.'
          }
        ]
      }
    },
    { 
      id: 'lb', 
      name: 'Load Balancer', 
      icon: Shuffle, 
      x: 250, 
      y: 100, 
      connections: ['web1', 'web2'], 
      description: 'Azure Load Balancer with health probes',
      devOpsNotes: 'Configured through Terraform modules',
      color: '#F97316', // Orange
      status: 'operational',
      detailedInfo: {
        status: 'Active',
        metrics: {
          healthyBackends: '4/4',
          throughput: '1.7 GB/s',
          connectionCount: 12653
        },
        sections: [
          {
            title: 'Infrastructure as Code',
            content: 'Provisioned through custom Terraform modules with health probes and traffic distribution rules. Auto-scaling based on traffic patterns.'
          },
          {
            title: 'Networking',
            content: 'Integrated with Azure Virtual Network and NSGs for enhanced security. Route tables configured for optimal traffic flow.'
          }
        ]
      }
    },
    { 
      id: 'web1', 
      name: 'Web Cluster 1', 
      icon: Globe, 
      x: 350, 
      y: 50, 
      connections: ['app1', 'app2'], 
      description: 'Primary web application cluster',
      devOpsNotes: 'Deployed through Azure DevOps pipeline',
      color: '#0EA5E9', // Blue
      status: 'operational',
      detailedInfo: {
        status: 'Online',
        metrics: {
          cpu: '42%',
          memory: '3.2 GB / 8 GB',
          requests: '1254/sec'
        },
        sections: [
          {
            title: 'CI/CD Pipeline',
            content: 'Automated deployment through Azure DevOps with Blue/Green deployment strategy. Configured with auto-rollback on failing health checks.'
          },
          {
            title: 'Scaling',
            content: 'Horizontal pod autoscaling based on CPU and memory metrics with custom scaling rules for handling traffic spikes.'
          }
        ]
      }
    },
    { 
      id: 'web2', 
      name: 'Web Cluster 2', 
      icon: Globe, 
      x: 350, 
      y: 150, 
      connections: ['app1', 'app2'], 
      description: 'Secondary web application cluster',
      devOpsNotes: 'Configured for high availability',
      color: '#0EA5E9', // Blue
      status: 'operational',
      detailedInfo: {
        status: 'Online',
        metrics: {
          cpu: '38%',
          memory: '2.9 GB / 8 GB',
          requests: '1187/sec'
        },
        sections: [
          {
            title: 'High Availability',
            content: 'Configured as part of multi-region deployment for disaster recovery and high availability. Regularly tested with chaos engineering practices.'
          },
          {
            title: 'Configuration Management',
            content: 'Configuration synced through Azure Key Vault and ConfigMaps with versioned updates and audit trail.'
          }
        ]
      }
    },
    { 
      id: 'app1', 
      name: 'Microservices 1', 
      icon: Cpu, 
      x: 450, 
      y: 50, 
      connections: ['db', 'cache'], 
      description: 'Primary microservices cluster on AKS',
      devOpsNotes: 'Kubernetes manifests managed in Git',
      color: '#10B981', // Green
      status: 'operational',
      detailedInfo: {
        status: 'Running',
        metrics: {
          pods: '42',
          deployments: '12',
          servicesHealth: '100%'
        },
        sections: [
          {
            title: 'Kubernetes Management',
            content: 'AKS cluster with GitOps workflow using Azure DevOps and Flux for continuous deployment. Manifest versioning and rollback capability.'
          },
          {
            title: 'Monitoring',
            content: 'Prometheus and Grafana stack with custom dashboards for microservices metrics and distributed tracing with Jaeger.'
          }
        ]
      }
    },
    { 
      id: 'app2', 
      name: 'Microservices 2', 
      icon: Cpu, 
      x: 450, 
      y: 150, 
      connections: ['db', 'cache'], 
      description: 'Secondary microservices cluster',
      devOpsNotes: 'Set up with Helm charts for deployment',
      color: '#10B981', // Green
      status: 'updating',
      detailedInfo: {
        status: 'Updating',
        metrics: {
          pods: '38',
          deployments: '11',
          deploymentProgress: '86%'
        },
        sections: [
          {
            title: 'Deployment Strategy',
            content: 'Using Helm for package management with custom charts and values for different environments. Canary deployment strategy for critical services.'
          },
          {
            title: 'Service Mesh',
            content: 'Istio service mesh implementation for advanced traffic management, resilience features, and enhanced observability across services.'
          }
        ]
      }
    },
    { 
      id: 'db', 
      name: 'Database Cluster', 
      icon: Database, 
      x: 550, 
      y: 100, 
      connections: ['storage'], 
      description: 'Azure SQL and Cosmos DB services',
      devOpsNotes: 'Automated backups and geo-replication',
      color: '#F59E0B', // Amber
      status: 'operational',
      detailedInfo: {
        status: 'Healthy',
        metrics: {
          qps: '3450',
          dataSize: '1.2 TB',
          replicationLag: '12ms'
        },
        sections: [
          {
            title: 'Data Management',
            content: 'Cosmos DB with multi-region write configured for global distribution. Azure SQL with Always On availability groups and automated backups.'
          },
          {
            title: 'Operations',
            content: 'Automated index management and query optimization with performance monitoring through custom Azure Monitor workbooks.'
          }
        ]
      }
    },
    { 
      id: 'cache', 
      name: 'Redis Cache', 
      icon: BarChart4, 
      x: 550, 
      y: 200, 
      connections: [], 
      description: 'Azure Redis Cache for performance',
      devOpsNotes: 'Configured memory policies via Terraform',
      color: '#6366F1', // Indigo
      status: 'operational',
      detailedInfo: {
        status: 'Optimized',
        metrics: {
          hitRate: '94.2%',
          memoryUsage: '78%',
          connectedClients: 842
        },
        sections: [
          {
            title: 'Performance Tuning',
            content: 'Configured optimal memory policies and data eviction strategies. Implemented data persistence and replication for high availability.'
          },
          {
            title: 'Metrics',
            content: 'Custom monitoring dashboard with cache effectiveness metrics and alerts for connection saturation and memory pressure.'
          }
        ]
      }
    },
    { 
      id: 'storage', 
      name: 'Cloud Storage', 
      icon: HardDrive, 
      x: 650, 
      y: 100, 
      connections: [], 
      description: 'Azure Blob and File Storage',
      devOpsNotes: 'Lifecycle management policies implemented',
      color: '#8B5CF6', // Purple
      status: 'operational',
      detailedInfo: {
        status: 'Available',
        metrics: {
          totalSize: '43.7 TB',
          objectCount: '28.5M',
          costOptimization: '27%'
        },
        sections: [
          {
            title: 'Storage Management',
            content: 'Automated lifecycle management policies for cost optimization. Implemented secure access with SAS tokens and Managed Identities.'
          },
          {
            title: 'Data Protection',
            content: 'Configured soft delete, immutable storage, and point-in-time restore capabilities. Regular backup verification and recovery testing.'
          }
        ]
      }
    },
    { 
      id: 'monitoring', 
      name: 'Monitoring Stack', 
      icon: Search, 
      x: 400, 
      y: 250, 
      connections: ['web1', 'web2', 'app1', 'app2', 'db', 'cache'], 
      description: 'Azure Monitor and Log Analytics',
      devOpsNotes: 'Set up comprehensive dashboards and alerts',
      color: '#EF4444', // Red
      status: 'operational',
      detailedInfo: {
        status: 'Active',
        metrics: {
          dataIngestion: '12 GB/day',
          activeAlerts: 3,
          dashboards: 17
        },
        sections: [
          {
            title: 'Observability',
            content: 'Centralized logging with Log Analytics workspace and custom Kusto queries. Application Insights for APM with end-to-end transaction monitoring.'
          },
          {
            title: 'Alerting',
            content: 'Multi-stage alert system with severity-based routing and automated remediation for common issues. Incident management integration with ServiceNow.'
          }
        ]
      }
    },
    { 
      id: 'cicd', 
      name: 'CI/CD Pipeline', 
      icon: GitBranch, 
      x: 250, 
      y: 250, 
      connections: ['app1', 'app2', 'web1', 'web2', 'iac'], 
      description: 'Azure DevOps Pipelines',
      devOpsNotes: 'Implemented full automation for deployments',
      color: '#3B82F6', // Blue
      status: 'operational',
      detailedInfo: {
        status: 'Active',
        metrics: {
          deployments: '12/day',
          successRate: '97.8%',
          avgDeployTime: '4.2 min'
        },
        sections: [
          {
            title: 'Pipeline Architecture',
            content: 'Multi-stage YAML pipelines with environment-specific approval gates. Quality gates include static code analysis, unit tests, and security scanning.'
          },
          {
            title: 'Automation',
            content: 'Fully automated build, test, and deployment process with customized deployment strategies per service. Integration with Microsoft Teams for notifications.'
          }
        ]
      }
    },
    { 
      id: 'iac', 
      name: 'Infrastructure as Code', 
      icon: FileCode, 
      x: 150, 
      y: 300, 
      connections: ['cicd', 'cloud'], 
      description: 'Terraform and ARM Templates',
      devOpsNotes: 'Created modular Terraform structure for reuse',
      color: '#14B8A6', // Teal
      status: 'operational',
      detailedInfo: {
        status: 'Managed',
        metrics: {
          resourcesCovered: '92%',
          moduleCount: 37,
          stateFiles: 12
        },
        sections: [
          {
            title: 'IaC Practice',
            content: 'Terraform used for multi-cloud resources with modular structure. ARM templates for Azure-specific services with parameter files per environment.'
          },
          {
            title: 'State Management',
            content: 'Remote state management in Azure Storage with state locking. Implemented detailed naming conventions and tagging strategy for governance.'
          }
        ]
      }
    },
    { 
      id: 'cloud', 
      name: 'Multi-Cloud', 
      icon: CloudRain, 
      x: 250, 
      y: 350, 
      connections: ['monitoring', 'network'], 
      description: 'Azure and AWS resources',
      devOpsNotes: 'Implementing hybrid cloud best practices',
      color: '#3B82F6', // Blue
      status: 'operational',
      detailedInfo: {
        status: 'Optimized',
        metrics: {
          azureResources: 187,
          awsResources: 94,
          costEfficiency: '83%'
        },
        sections: [
          {
            title: 'Cloud Strategy',
            content: 'Hybrid cloud architecture with workload-appropriate placement. Centralized identity management with Azure AD and federated access.'
          },
          {
            title: 'Governance',
            content: 'Cloud Center of Excellence practices with standardized landing zones. Cost management and optimization through tagging and rightsizing.'
          }
        ]
      }
    },
    { 
      id: 'network', 
      name: 'Network Fabric', 
      icon: Network, 
      x: 350, 
      y: 350, 
      connections: ['cloud'], 
      description: 'Virtual Networks and Connectivity',
      devOpsNotes: 'Applied AZ-700 knowledge for design',
      color: '#64748B', // Slate
      status: 'operational',
      detailedInfo: {
        status: 'Secured',
        metrics: {
          latency: '1.8ms',
          throughput: '4.7 Gbps',
          securityGroups: 42
        },
        sections: [
          {
            title: 'Network Architecture',
            content: 'Hub and spoke topology with transit gateway connectivity. Microsegmentation using NSGs and Azure Firewall for enhanced security.'
          },
          {
            title: 'Connectivity',
            content: 'ExpressRoute for on-premises connectivity with redundant circuits. VPN backup with automated failover and SD-WAN integration.'
          }
        ]
      }
    },
    { 
      id: 'security', 
      name: 'Security Center', 
      icon: Shield, 
      x: 350, 
      y: 200, 
      connections: ['network', 'cicd', 'cloud'], 
      description: 'Microsoft Defender for Cloud',
      devOpsNotes: 'Implemented based on SC-100 knowledge',
      color: '#14B8A6', // Teal
      status: 'operational',
      detailedInfo: {
        status: 'Vigilant',
        metrics: {
          secureScore: 92,
          remediatedFindings: 73,
          complianceControls: '98%'
        },
        sections: [
          {
            title: 'Security Posture',
            content: 'Microsoft Defender for Cloud with advanced protection enabled across resources. Regular security posture reviews and compliance assessments.'
          },
          {
            title: 'DevSecOps',
            content: 'Security built into the CI/CD pipeline with automated scanning and policy enforcement. Threat protection integrated with alerting system.'
          }
        ]
      }
    },
  ];

  // Find a component by ID
  const getComponent = (id) => components.find(comp => comp.id === id);

  // Get all connections as pairs
  const getConnections = () => {
    const connections = [];
    components.forEach(component => {
      component.connections.forEach(targetId => {
        const target = getComponent(targetId);
        if (target) {
          connections.push({
            source: component.id,
            target: targetId,
            path: generatePath(component, target)
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
            path: randomConnection.path,
            sourceId: randomConnection.source,
            targetId: randomConnection.target
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

    const sourceComp = getComponent(dataPacket.sourceId);
    const targetComp = getComponent(dataPacket.targetId);

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
      case 'active':
      case 'healthy':
      case 'operational':
      case 'online':
      case 'available':
      case 'secure':
      case 'running':
      case 'protected':
      case 'hardened':
      case 'encrypted':
      case 'enforced':
      case 'vigilant':
      case 'optimized':
      case 'managed':
      case 'scaling':
        return '#10B981'; // Green
      case 'warning':
      case 'degraded':
      case 'updating':
        return '#F59E0B'; // Amber
      case 'error':
      case 'critical':
      case 'offline':
      case 'vulnerable':
      case 'breached':
        return '#EF4444'; // Red
      default:
        return '#3B82F6'; // Blue
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'operational':
      case 'active':
      case 'healthy':
      case 'available':
        return CheckCircle;
      case 'updating':
      case 'warning':
      case 'degraded':
        return AlertTriangle;
      case 'error':
      case 'critical':
      case 'offline':
        return X;
      default:
        return Activity;
    }
  };

  // Calculate overall infrastructure metrics
  const calculateInfraMetrics = () => {
    // Count components by status
    const statusCounts = components.reduce((acc, component) => {
      acc[component.status] = (acc[component.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      operational: statusCounts.operational || 0,
      updating: statusCounts.updating || 0,
      warning: statusCounts.warning || 0,
      error: statusCounts.error || 0,
      total: components.length
    };
  };

  const infraStats = calculateInfraMetrics();

  return (
    <div className="w-full">
      {/* Infrastructure Metrics Summary */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="text-xs text-gray-500 uppercase">Operational Services</div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800 mr-2">{infraStats.operational}</span>
            <span className="text-sm text-gray-500">of {infraStats.total}</span>
          </div>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-1 bg-green-500 rounded-full" 
              style={{width: `${(infraStats.operational / infraStats.total) * 100}%`}}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-amber-500">
          <div className="text-xs text-gray-500 uppercase">Updating Services</div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800 mr-2">{infraStats.updating}</span>
            <span className="text-sm text-gray-500">components</span>
          </div>
          <div className="mt-2 flex items-center">
            <Repeat size={16} className="text-amber-500 mr-1" />
            <span className="text-xs">Deployment in progress</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 uppercase">Pipeline Events</div>
          <div className="text-2xl font-bold text-gray-800">{pipelineEvents.length}</div>
          <div className="mt-2 flex items-center">
            <Activity size={16} className="text-blue-500 mr-1" />
            <span className="text-xs">{pipelineEvents.filter(e => e.type === 'warning').length} warnings</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="text-xs text-gray-500 uppercase">IaC Coverage</div>
          <div className="text-2xl font-bold text-gray-800">{devOpsMetrics.infrastructureAsCodeCoverage}%</div>
          <div className="mt-2 flex items-center">
            <FileCode size={16} className="text-purple-500 mr-1" />
            <span className="text-xs">Terraform & ARM Templates</span>
          </div>
        </div>
      </div>

      <div className="mb-4 w-full">
        <button 
          onClick={toggleAnimation} 
          className={`px-4 py-2 rounded font-medium ${activeConnection ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {activeConnection ? 'Stop Data Flow Simulation' : 'Start Data Flow Simulation'}
        </button>
      </div>

      <div className="relative w-full h-96 border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 700 400">
          {/* Connections with semantic coloring */}
          {getConnections().map((conn, i) => {
            const sourceComp = getComponent(conn.source);
            const targetComp = getComponent(conn.target);
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

          {/* Components with semantic icons and careful styling */}
          {components.map((component) => {
            const Icon = component.icon;
            const isSelected = selectedNode === component.id;
            const StatusIcon = getStatusIcon(component.status);
            return (
              <g
                key={component.id}
                transform={`translate(${component.x - 20}, ${component.y - 20})`}
                onMouseEnter={() => setHoveredNode(component.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleComponentClick(component.id)}
                className="cursor-pointer"
              >
                <circle
                  cx="20"
                  cy="20"
                  r={isSelected ? "24" : "20"}
                  fill={
                    isSelected 
                      ? `${component.color}30` 
                      : hoveredNode === component.id 
                        ? `${component.color}20` 
                        : "#F8FAFC"
                  }
                  stroke={component.color}
                  strokeWidth={isSelected || hoveredNode === component.id ? "3" : "2"}
                >
                  {isSelected && (
                    <animate 
                      attributeName="r" 
                      values="22;24;22" 
                      dur="2s" 
                      repeatCount="indefinite" 
                    />
                  )}
                </circle>
                <foreignObject x="5" y="5" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon 
                      size={18} 
                      strokeWidth={2.5}
                      color={component.color}
                    />
                  </div>
                </foreignObject>
                
                {/* Status indicator */}
                <circle
                  cx="35"
                  cy="5"
                  r="8"
                  fill={getStatusColor(component.status)}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <foreignObject x="31" y="1" width="8" height="8">
                  <div className="flex items-center justify-center w-full h-full">
                    <StatusIcon size={6} color="#fff" />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Tooltip when hovering */}
        {hoveredNode && !selectedNode && (
          <div 
            className="absolute top-2 left-2 p-3 bg-white rounded-md shadow-md border-l-4" 
            style={{borderLeftColor: getComponent(hoveredNode).color}}
          >
            <div className="flex items-center">
              <div 
                className="mr-2 w-6 h-6 flex items-center justify-center rounded-full" 
                style={{
                  backgroundColor: `${getComponent(hoveredNode).color}15`, 
                  border: `2px solid ${getComponent(hoveredNode).color}`
                }}
              >
                {React.createElement(getComponent(hoveredNode).icon, {
                  size: 16,
                  strokeWidth: 2.5,
                  color: getComponent(hoveredNode).color
                })}
              </div>
              <h3 
                className="font-bold" 
                style={{color: getComponent(hoveredNode).color}}
              >
                {getComponent(hoveredNode).name}
              </h3>
              <div 
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: getStatusColor(getComponent(hoveredNode).status) + '20',
                  color: getStatusColor(getComponent(hoveredNode).status)
                }}
              >
                {getComponent(hoveredNode).status.toUpperCase()}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{getComponent(hoveredNode).description}</p>
            <p className="text-xs text-gray-500 mt-1 italic">{getComponent(hoveredNode).devOpsNotes}</p>
            <p className="text-xs text-blue-500 mt-1">Click for detailed information</p>
          </div>
        )}
      </div>

      {/* Detailed Panel for Selected Component */}
      {selectedNode && (
        <div className="mt-4 w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 flex justify-between items-center border-b"
            style={{backgroundColor: `${getComponent(selectedNode).color}15`}}
          >
            <div className="flex items-center">
              <div 
                className="mr-3 w-10 h-10 flex items-center justify-center rounded-full" 
                style={{
                  backgroundColor: `${getComponent(selectedNode).color}20`, 
                  border: `2px solid ${getComponent(selectedNode).color}`
                }}
              >
                {React.createElement(getComponent(selectedNode).icon, {
                  size: 24,
                  strokeWidth: 2,
                  color: getComponent(selectedNode).color
                })}
              </div>
              <div>
                <div className="flex items-center">
                  <h2 
                    className="text-xl font-bold mr-2"
                    style={{color: getComponent(selectedNode).color}}
                  >
                    {getComponent(selectedNode).name}
                  </h2>
                  <div 
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: getStatusColor(getComponent(selectedNode).status) + '20',
                      color: getStatusColor(getComponent(selectedNode).status)
                    }}
                  >
                    {getComponent(selectedNode).status.toUpperCase()}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{getComponent(selectedNode).description}</p>
                <p className="text-xs text-gray-500 italic mt-1">{getComponent(selectedNode).devOpsNotes}</p>
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
                    backgroundColor: `${getStatusColor(getComponent(selectedNode).detailedInfo.status)}15`,
                    color: getStatusColor(getComponent(selectedNode).detailedInfo.status),
                    border: `1px solid ${getStatusColor(getComponent(selectedNode).detailedInfo.status)}`
                  }}
                >
                  <CheckCircle size={14} className="mr-1" />
                  <span className="text-sm font-medium">{getComponent(selectedNode).detailedInfo.status}</span>
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>Updated 5 minutes ago</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(getComponent(selectedNode).detailedInfo.metrics).map(([key, value], i) => (
                  <div 
                    key={`metric-${i}`}
                    className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="flex items-end">
                      <span className="text-xl font-bold text-gray-800 mr-2">{value}</span>
                      <span className="text-xs text-green-500 pb-1 flex items-center">
                        <Activity size={12} className="mr-1" /> Live
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Information Sections */}
            {getComponent(selectedNode).detailedInfo.sections.map((section, i) => (
              <div key={`section-${i}`} className="mb-4">
                <h3 className="text-base font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}

            {/* DevOps Engineer Notes */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center text-indigo-700">
                <Terminal size={18} className="mr-2" />
                DevOps Engineer Notes
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
                    {getComponent(selectedNode).id === 'cicd' && "Built a robust CI/CD pipeline with multi-stage deployment and quality gates. Integrated security scanning in the pipeline to shift security checks left in the process."}
                    {getComponent(selectedNode).id === 'security' && "Implemented security controls based on my SC-100 certification knowledge. Created automated compliance checks to maintain security posture across all environments."}
                    {getComponent(selectedNode).id === 'db' && "Set up automated database backups and disaster recovery procedures. Implemented infrastructure as code for database provisioning and configuration management."}
                    {getComponent(selectedNode).id === 'network' && "Applied knowledge from AZ-700 certification to design a robust network architecture with proper segmentation and security controls."}
                    {getComponent(selectedNode).id === 'functions' && "Leveraged my Python development experience to create efficient serverless functions for automation and integration tasks."}
                    {getComponent(selectedNode).id !== 'cicd' && getComponent(selectedNode).id !== 'security' && getComponent(selectedNode).id !== 'db' && getComponent(selectedNode).id !== 'network' && getComponent(selectedNode).id !== 'functions' && "Optimized this component for both performance and cost efficiency. Implemented monitoring and alerting to ensure reliability and quick incident response."}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">Last updated: February 24, 2025</div>
                </div>
              </div>
            </div>

            {/* Connected Components */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Network size={18} className="mr-2" />
                Connected Components
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {components
                  .filter(comp => 
                    comp.connections.includes(selectedNode) || 
                    getComponent(selectedNode).connections.includes(comp.id)
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

      {/* Component Legend */}
      <div className="mt-4 w-full">
        <h3 className="font-bold mb-2">Component Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {components.map((component) => {
            const Icon = component.icon;
            const StatusIcon = getStatusIcon(component.status);
            return (
              <div 
                key={`legend-${component.id}`}
                className={`flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer ${selectedNode === component.id ? 'bg-gray-100 border-l-4' : ''}`}
                style={{
                  borderLeftColor: selectedNode === component.id ? component.color : 'transparent',
                  borderLeftWidth: selectedNode === component.id ? '4px' : '0px'
                }}
                onMouseEnter={() => setHoveredNode(component.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleComponentClick(component.id)}
              >
                <div 
                  className="mr-2 w-6 h-6 flex items-center justify-center rounded-full relative" 
                  style={{
                    backgroundColor: `${component.color}15`, 
                    border: `2px solid ${component.color}`
                  }}
                >
                  <Icon size={16} strokeWidth={2.5} color={component.color} />
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white"
                    style={{backgroundColor: getStatusColor(component.status)}}
                  >
                  </div>
                </div>
                <span className="text-sm">{component.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CloudInfrastructureView;