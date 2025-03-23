import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  Users, 
  Globe, 
  Shield, 
  Cpu, 
  HardDrive, 
  BarChart4, 
  Search, 
  CloudRain,
  Network,
  Shuffle,
  ArrowRightLeft,
  X,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart,
  PieChart,
  Lock,
  Code,
  Cloud,
  GitBranch,
  Terminal,
  FileCode,
  Play,
  Settings,
  Repeat,
  Layers,
  AlignLeft,
  Workflow,
  Zap,
  Award,
  BookOpen,
  User,
  Briefcase
} from 'lucide-react';

const CloudDevOpsDashboard = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeConnection, setActiveConnection] = useState(null);
  const [dataPacket, setDataPacket] = useState({ visible: false, position: 0, path: null });
  const [activeTab, setActiveTab] = useState('infrastructure');
  const [deploymentStatus, setDeploymentStatus] = useState('stable'); // stable, deploying, rollback
  const [pipelineEvents, setPipelineEvents] = useState([
    { id: 1, type: 'success', message: 'Azure Function App CI/CD Pipeline completed successfully', time: '37 minutes ago', env: 'Production' },
    { id: 2, type: 'info', message: 'Kubernetes manifest updated for microservice-auth', time: '2 hours ago', env: 'Staging' },
    { id: 3, type: 'warning', message: 'High CPU utilization detected in API cluster', time: '4 hours ago', env: 'Production', resolved: true },
    { id: 4, type: 'info', message: 'Terraform plan executed for network infrastructure', time: '1 day ago', env: 'Dev' },
  ]);

  // Custom DevOps engineer profile based on your background
  const devOpsEngineerProfile = {
    name: "Your Name",
    title: "Cloud DevOps Engineer",
    avatar: "/api/placeholder/150/150",
    experience: "3 years 10 months of DevOps experience across Azure, AWS and on-premises environments",
    certifications: ["AZ-104", "AZ-500", "SC-100", "AZ-700", "AWS Solutions Architect Associate", "Cisco Certified"],
    expertise: ["CI/CD Pipelines", "Infrastructure as Code", "Kubernetes", "Cloud Security", "Python Development", "OpenShift"],
    education: {
      engineering: "Engineering Degree in Cybersecurity",
      masters: "Master's Degree in Computer Science with Cloud Specialization"
    },
    background: {
      azure: "1 year 8 months",
      aws: "1 year 3 months (with on-premises)",
      openshift: "11 months DevOps on-premises",
      development: "1 year Python & Angular development in startup",
      internship: "2 month internship as Python developer"
    },
    achievements: [
      "Implemented CI/CD pipelines reducing deployment time by 65%",
      "Migrated legacy applications to containerized microservices architecture",
      "Automated infrastructure deployment with Terraform saving 15+ hours weekly"
    ],
    currentFocus: "Enhancing multi-cloud security posture with infrastructure as code"
  };

  // DevOps metrics that highlight your impact
  const devOpsMetrics = {
    deploymentFrequency: "12/day",
    leadTime: "31 minutes",
    changeFailureRate: "4.2%",
    meanTimeToRecover: "18 minutes",
    infrastructureAsCodeCoverage: 92,
    automationRate: 87,
    securityComplianceRate: 96.4,
    resourceOptimization: {
      costReduction: "23%",
      performanceImprovement: "41%",
      resourceUtilization: "78%"
    }
  };

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
      id: 'containers', 
      name: 'Container Registry', 
      icon: Layers, 
      x: 450, 
      y: 300, 
      connections: ['app1', 'app2', 'cicd'], 
      description: 'Azure Container Registry',
      devOpsNotes: 'Set up vulnerability scanning for images',
      color: '#8B5CF6', // Purple
      status: 'operational',
      detailedInfo: {
        status: 'Secure',
        metrics: {
          repositories: 68,
          imageCount: 427,
          scanCoverage: '100%'
        },
        sections: [
          {
            title: 'Registry Management',
            content: 'Configured with geo-replication for high availability. Implemented image retention policies and automated cleanup of unused images.'
          },
          {
            title: 'Security',
            content: 'Integrated Defender for Container scanning with quarantine policy for vulnerable images. Enforced signed images with Azure Key Vault integration.'
          }
        ]
      }
    },
    { 
      id: 'functions', 
      name: 'Serverless', 
      icon: Zap, 
      x: 550, 
      y: 300, 
      connections: ['app1', 'storage'], 
      description: 'Azure Functions and Logic Apps',
      devOpsNotes: 'Implemented with Python for automation tasks',
      color: '#EC4899', // Pink
      status: 'operational',
      detailedInfo: {
        status: 'Scaling',
        metrics: {
          functions: 47,
          executions: '143K/day',
          avgDuration: '428ms'
        },
        sections: [
          {
            title: 'Serverless Architecture',
            content: 'Event-driven architecture with Azure Functions and Logic Apps for workflow automation. Custom Python runtime with dependency management.'
          },
          {
            title: 'DevOps Practices',
            content: 'CI/CD pipeline for serverless functions with automated testing. Deployment slots for zero-downtime updates and A/B testing capabilities.'
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
    <div className="flex flex-col items-center w-full max-w-6xl p-4 mx-auto">
      {/* DevOps Engineer Profile Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg mb-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-4">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="relative">
              <img 
                src={devOpsEngineerProfile.avatar} 
                alt="DevOps Engineer" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                <Cloud size={16} />
              </div>
            </div>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold">{devOpsEngineerProfile.name}</h1>
            <p className="text-indigo-100 font-medium">{devOpsEngineerProfile.title}</p>
            <p className="text-sm text-indigo-200 mt-1">{devOpsEngineerProfile.experience}</p>
            
            <div className="flex flex-wrap mt-2 justify-center md:justify-start">
              {devOpsEngineerProfile.certifications.map((cert, i) => (
                <span 
                  key={`cert-${i}`} 
                  className="text-xs bg-indigo-900 text-indigo-100 rounded-full px-2 py-1 m-1"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
          
          <div className="ml-auto flex-shrink-0 bg-indigo-900 bg-opacity-50 rounded-lg p-3 mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="text-xs text-indigo-200">Deployment Success</div>
                <div className="text-2xl font-bold">{100 - parseFloat(devOpsMetrics.changeFailureRate)}%</div>
              </div>
              <div className="h-16 w-16 relative">
                <svg viewBox="0 0 36 36" className="h-16 w-16">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4338CA"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray={`${100 - parseFloat(devOpsMetrics.changeFailureRate)}, 100`}
                  />
                </svg>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <GitBranch size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="w-full mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'infrastructure' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('infrastructure')}
          >
            <div className="flex items-center">
              <Network size={18} className="mr-2" />
              Cloud Infrastructure
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'devops' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('devops')}
          >
            <div className="flex items-center">
              <GitBranch size={18} className="mr-2" />
              DevOps Dashboard
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'profile' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              Professional Profile
            </div>
          </button>
        </div>
      </div>

      {/* Infrastructure Metrics Summary */}
      {activeTab === 'infrastructure' && (
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
      )}

      {activeTab === 'infrastructure' && (
        <>
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
        </>
      )}

      {/* DevOps Dashboard Tab */}
      {activeTab === 'devops' && (
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DORA Metrics Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart size={20} className="mr-2 text-indigo-600" />
                DORA Metrics
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Deployment Frequency</span>
                    <span className="text-sm font-medium">{devOpsMetrics.deploymentFrequency}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: '85%'}}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600">Elite performance level</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Lead Time for Changes</span>
                    <span className="text-sm font-medium">{devOpsMetrics.leadTime}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: '90%'}}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600">Elite performance level</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Change Failure Rate</span>
                    <span className="text-sm font-medium">{devOpsMetrics.changeFailureRate}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600">High performance level</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Mean Time to Recover</span>
                    <span className="text-sm font-medium">{devOpsMetrics.meanTimeToRecover}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: '80%'}}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600">Elite performance level</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Automation & Coverage Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings size={20} className="mr-2 text-indigo-600" />
                DevOps Automation
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="4"
                      strokeDasharray={`${devOpsMetrics.automationRate}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-3xl font-bold text-gray-800">{devOpsMetrics.automationRate}%</div>
                    <div className="text-sm text-gray-500">Automated</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-600">Infrastructure as Code</span>
                    <span className="font-medium">{devOpsMetrics.infrastructureAsCodeCoverage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{width: `${devOpsMetrics.infrastructureAsCodeCoverage}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-600">Test Automation</span>
                    <span className="font-medium">83%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{width: '83%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-600">CI/CD Coverage</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security & Compliance Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-indigo-600" />
                Security & Compliance
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-600">{devOpsMetrics.securityComplianceRate}%</div>
                <div className="text-sm text-gray-500">Compliance Score</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Passing</span>
                  </div>
                  <span className="font-medium">127</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Warning</span>
                  </div>
                  <span className="font-medium">8</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Critical</span>
                  </div>
                  <span className="font-medium">0</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm font-medium mb-2">Azure Policies</div>
                <div className="flex items-center text-gray-600">
                  <Shield size={16} className="mr-2 text-indigo-500" />
                  <span>Applied knowledge from AZ-500 and SC-100</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pipeline Events Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <GitBranch size={20} className="mr-2 text-indigo-600" />
              Recent Pipeline Events
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Environment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pipelineEvents.map((event, i) => (
                    <tr key={`event-${event.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {event.type === 'warning' && <AlertTriangle size={16} className="text-amber-500 mr-2" />}
                          {event.type === 'success' && <CheckCircle size={16} className="text-green-500 mr-2" />}
                          {event.type === 'info' && <Activity size={16} className="text-blue-500 mr-2" />}
                          <span className="text-sm text-gray-900">{event.message}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.env === 'Production' ? 'bg-indigo-100 text-indigo-800' : 
                          event.env === 'Staging' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.env}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.resolved ? 'bg-green-100 text-green-800' : 
                          event.type === 'warning' ? 'bg-amber-100 text-amber-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {event.resolved ? 'Resolved' : event.type === 'warning' ? 'Action Required' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Resource Optimization Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-indigo-600" />
              Resource Optimization
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="text-center mb-2">
                  <div className="text-3xl font-bold text-indigo-700">{devOpsMetrics.resourceOptimization.costReduction}</div>
                  <div className="text-sm text-indigo-600">Cost Reduction</div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Cost optimization through right-sizing, reserved instances, and automated scaling
                </p>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="text-center mb-2">
                  <div className="text-3xl font-bold text-indigo-700">{devOpsMetrics.resourceOptimization.performanceImprovement}</div>
                  <div className="text-sm text-indigo-600">Performance Improvement</div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Improved response times and throughput with optimized configurations
                </p>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="text-center mb-2">
                  <div className="text-3xl font-bold text-indigo-700">{devOpsMetrics.resourceOptimization.resourceUtilization}</div>
                  <div className="text-sm text-indigo-600">Resource Utilization</div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Efficient resource allocation with auto-scaling and capacity planning
                </p>
              </div>
            </div>
          </div>
          
          {/* DevOps Initiatives */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Workflow size={20} className="mr-2 text-indigo-600" />
              Current DevOps Initiatives
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-500">
                      <AlignLeft size={16} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-800">Multi-Cloud IaC Strategy</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Standardizing infrastructure as code practices across Azure and AWS environments for consistent deployments and governance.
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="text-xs text-gray-500 mr-2">Progress:</div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-indigo-500 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="ml-2 text-xs font-medium text-gray-700">75%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-500">
                      <GitBranch size={16} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-800">GitOps Implementation</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Moving to a GitOps workflow for Kubernetes resource management with declarative configurations and automated reconciliation.
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="text-xs text-gray-500 mr-2">Progress:</div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-indigo-500 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <div className="ml-2 text-xs font-medium text-gray-700">60%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-500">
                      <Shield size={16} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-800">DevSecOps Pipeline Enhancement</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Integrating enhanced security scanning in CI/CD pipelines and implementing policy-as-code with Azure Policy and OPA Gatekeeper.
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="text-xs text-gray-500 mr-2">Progress:</div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-indigo-500 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <div className="ml-2 text-xs font-medium text-gray-700">85%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Professional Profile Tab */}
      {activeTab === 'profile' && (
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-12 flex flex-col items-center text-white">
              <div className="relative mb-4">
                <img 
                  src={devOpsEngineerProfile.avatar} 
                  alt={devOpsEngineerProfile.name} 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-2 border-white">
                  <Cloud size={18} />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold">{devOpsEngineerProfile.name}</h2>
              <p className="text-indigo-100 font-medium">{devOpsEngineerProfile.title}</p>
              <p className="text-sm text-indigo-200 mt-1">{devOpsEngineerProfile.experience}</p>
              
              <div className="flex flex-wrap mt-2 justify-center">
                {devOpsEngineerProfile.certifications.map((cert, i) => (
                  <span 
                    key={`profile-cert-${i}`} 
                    className="text-xs bg-indigo-900 text-indigo-100 rounded-full px-2 py-1 m-1"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
                <p className="text-gray-700">
                  Passionate Cloud DevOps Engineer with expertise in Azure, AWS, and on-premises environments. Combining technical knowledge from cybersecurity background with practical DevOps experience to deliver secure, automated, and efficient cloud infrastructure. Focused on continuous improvement of deployment processes and infrastructure reliability.
                </p>
              </div>
              
              {/* Expertise */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Terminal size={20} className="mr-2 text-indigo-600" />
                  Areas of Expertise
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {devOpsEngineerProfile.expertise.map((item, i) => (
                    <div key={`expertise-${i}`} className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Work Experience */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase size={20} className="mr-2 text-indigo-600" />
                  Experience
                </h3>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">Azure Cloud DevOps Engineer</div>
                    <div className="text-sm text-gray-500">Current role • {devOpsEngineerProfile.background.azure}</div>
                    <ul className="mt-2 text-gray-700 space-y-1">
                      <li>• Managing multi-cloud infrastructure with Azure as primary platform</li>
                      <li>• Implementing IaC with Terraform and ARM templates</li>
                      <li>• Designing and maintaining CI/CD pipelines in Azure DevOps</li>
                      <li>• Implementing security controls based on AZ-500 and SC-100 knowledge</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">AWS & On-premises DevOps</div>
                    <div className="text-sm text-gray-500">Previous role • {devOpsEngineerProfile.background.aws}</div>
                    <ul className="mt-2 text-gray-700 space-y-1">
                      <li>• Managed hybrid cloud environments with AWS and on-premises infrastructure</li>
                      <li>• Implemented containerized workloads and CI/CD pipelines</li>
                      <li>• Automated infrastructure provisioning and configuration management</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">OpenShift DevOps Administrator</div>
                    <div className="text-sm text-gray-500">Previous role • {devOpsEngineerProfile.background.openshift}</div>
                    <ul className="mt-2 text-gray-700 space-y-1">
                      <li>• Managed on-premises OpenShift cluster and containerized applications</li>
                      <li>• Implemented CI/CD workflows for development teams</li>
                      <li>• Automated deployment and scaling of containerized workloads</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">Python & Angular Developer</div>
                    <div className="text-sm text-gray-500">Startup • {devOpsEngineerProfile.background.development}</div>
                    <ul className="mt-2 text-gray-700 space-y-1">
                      <li>• Developed backend services with Python</li>
                      <li>• Created frontend interfaces with Angular</li>
                      <li>• Collaborated in agile development environment</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">Python Developer Intern</div>
                    <div className="text-sm text-gray-500">Internship • {devOpsEngineerProfile.background.internship}</div>
                    <ul className="mt-2 text-gray-700 space-y-1">
                      <li>• Assisted in developing Python applications</li>
                      <li>• Learned software development best practices</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Key Achievements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award size={20} className="mr-2 text-indigo-600" />
                  Key Achievements
                </h3>
                
                <div className="space-y-4">
                  {devOpsEngineerProfile.achievements.map((achievement, i) => (
                    <div key={`achievement-${i}`} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-500">
                          {i + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-700">{achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Current Focus */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap size={20} className="mr-2 text-indigo-600" />
                  Current Focus
                </h3>
                
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-gray-700">{devOpsEngineerProfile.currentFocus}</p>
                </div>
              </div>
              
              {/* Education and Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2 text-indigo-600" />
                    Education
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">{devOpsEngineerProfile.education.masters}</h4>
                      <p className="text-sm text-gray-500">Master's Degree</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{devOpsEngineerProfile.education.engineering}</h4>
                      <p className="text-sm text-gray-500">Engineering Degree</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Award size={20} className="mr-2 text-indigo-600" />
                    Certifications
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="font-medium">Microsoft Azure Administrator (AZ-104)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="font-medium">Microsoft Azure Security Engineer (AZ-500)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="font-medium">Microsoft Cybersecurity Architect (SC-100)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="font-medium">Microsoft Azure Network Engineer (AZ-700)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>AWS Solutions Architect Associate</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Cisco Certified Network Associate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Component Legend for Infrastructure View */}
      {activeTab === 'infrastructure' && (
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
      )}

      {/* Footer with DevOps Engineer Notice */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>Cloud infrastructure managed by {devOpsEngineerProfile.name}, {devOpsEngineerProfile.title}</p>
        <p className="mt-1">Last deployment: February 27, 2025 | Next scheduled maintenance: March 10, 2025</p>
      </div>
    </div>
  );
};

export default CloudDevOpsDashboard;