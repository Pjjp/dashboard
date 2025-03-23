import { 
    Code, Award, Briefcase, Server, Database, 
    Cloud, Lock, Terminal, GitBranch, Network, 
    Globe, Cpu, Shield, Activity, Clock,
    CheckCircle, AlertTriangle, X, ArrowUpRight,
    FileCode, BookOpen, Zap, Coffee, Layers, 
    Settings, Wrench, Brain, Workflow, Sparkles,
    BarChart
  } from 'lucide-react';
  
  // Initial competencies data structure
  const competenciesData = [
    // Core skills
    { 
      id: 'devops', 
      name: 'DevOps Practices', 
      icon: Workflow, 
      x: 350, 
      y: 200, 
      connections: ['cicd', 'iac', 'cloud-architecture', 'kubernetes', 'monitoring'], 
      type: 'skill',
      description: 'DevOps methodology and practices',
      devOpsNotes: 'Core expertise in continuous integration and delivery',
      color: '#8B5CF6', // Purple
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          experience: '5+ years',
          projects: '20+',
          tooling: 'Complete ecosystem'
        },
        sections: [
          {
            title: 'Core Competencies',
            content: 'Implementing CI/CD pipelines, Infrastructure as Code, containerization, and automation for streamlined software delivery and operations.'
          },
          {
            title: 'Notable Achievements',
            content: 'Reduced deployment time by 65% and infrastructure provisioning from days to minutes with fully automated pipelines.'
          }
        ]
      }
    },
    { 
      id: 'cicd', 
      name: 'CI/CD Pipelines', 
      icon: GitBranch, 
      x: 250, 
      y: 100, 
      connections: ['azure-devops', 'github-actions', 'jenkins'], 
      type: 'skill',
      description: 'Continuous Integration and Deployment',
      devOpsNotes: 'Implemented pipelines in Azure DevOps and GitHub Actions',
      color: '#3B82F6', // Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          pipelinesBuilt: '50+',
          automationRate: '95%',
          deploymentFrequency: 'Multiple daily'
        },
        sections: [
          {
            title: 'Capabilities',
            content: 'Design and implementation of end-to-end CI/CD pipelines with multiple environments, quality gates, and automated testing.'
          },
          {
            title: 'Tools',
            content: 'Azure DevOps, GitHub Actions, Jenkins, CircleCI, GitLab CI, ArgoCD'
          }
        ]
      }
    },
    { 
      id: 'azure-devops', 
      name: 'Azure DevOps', 
      icon: Cloud, 
      x: 150, 
      y: 50, 
      connections: ['azure'], 
      type: 'skill',
      description: 'Azure DevOps platform expertise',
      devOpsNotes: 'Used for end-to-end CI/CD implementation',
      color: '#0EA5E9', // Sky Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          yearsExperience: '3+',
          projectsImplemented: '15+',
          pipelinesCreated: '30+'
        },
        sections: [
          {
            title: 'Services Used',
            content: 'Azure Repos, Azure Pipelines, Azure Boards, Azure Artifacts, Azure Test Plans'
          },
          {
            title: 'Implementation Details',
            content: 'Set up organization-wide CI/CD practices using YAML pipelines, integrated security scanning, and artifact management.'
          }
        ]
      }
    },
    { 
      id: 'github-actions', 
      name: 'GitHub Actions', 
      icon: GitBranch, 
      x: 150, 
      y: 150, 
      connections: [], 
      type: 'skill',
      description: 'GitHub Actions workflows',
      devOpsNotes: 'Created automated workflows for GitHub repos',
      color: '#3B82F6', // Blue
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          workflowsCreated: '20+',
          reposManaged: '15+',
          customActionsBuilt: '5'
        },
        sections: [
          {
            title: 'Workflow Types',
            content: 'CI/CD pipelines, automated testing, dependency updates, scheduled tasks, issue management'
          },
          {
            title: 'Custom Actions',
            content: 'Built custom GitHub Actions for specialized deployment and notification tasks'
          }
        ]
      }
    },
    { 
      id: 'jenkins', 
      name: 'Jenkins', 
      icon: Settings, 
      x: 150, 
      y: 250, 
      connections: [], 
      type: 'skill',
      description: 'Jenkins CI server expertise',
      devOpsNotes: 'Experience with Jenkins pipelines and plugins',
      color: '#3B82F6', // Blue
      status: 'intermediate',
      detailedInfo: {
        status: 'Intermediate',
        metrics: {
          yearsExperience: '2',
          jobsConfigured: '15+',
          pipelinesCreated: '10+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Jenkinsfile pipeline as code, agents configuration, plugin management, and integration with various tools.'
          },
          {
            title: 'Use Cases',
            content: 'Legacy system integration, on-premises deployments, complex build scenarios requiring specific plugins.'
          }
        ]
      }
    },
    { 
      id: 'iac', 
      name: 'Infrastructure as Code', 
      icon: FileCode, 
      x: 450, 
      y: 100, 
      connections: ['terraform', 'arm-templates', 'ansible'], 
      type: 'skill',
      description: 'Automated infrastructure provisioning',
      devOpsNotes: 'Terraform and ARM templates expert',
      color: '#14B8A6', // Teal
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          resourcesManaged: '500+',
          deploymentTime: 'Minutes vs days',
          infrastructureCoverage: '95%'
        },
        sections: [
          {
            title: 'Core Practices',
            content: 'Infrastructure versioning, modular design, state management, and secure variable handling for complete cloud environments.'
          },
          {
            title: 'Benefits Delivered',
            content: 'Standardized environments, reduced provisioning time from days to minutes, and consistent infrastructure across all environments.'
          }
        ]
      }
    },
    { 
      id: 'terraform', 
      name: 'Terraform', 
      icon: FileCode, 
      x: 550, 
      y: 50, 
      connections: ['azure', 'aws'], 
      type: 'skill',
      description: 'HashiCorp Terraform expertise',
      devOpsNotes: 'Created modular Terraform structure for reuse',
      color: '#7C3AED', // Purple
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          modulesCreated: '35+',
          resourcesManaged: '300+',
          statesManaged: '15+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Modular design, state management in backend storage, workspaces for multi-environment deployments, and custom provider configurations.'
          },
          {
            title: 'Advanced Usage',
            content: 'Created reusable modules, implemented complex state management, and integrated with CI/CD for automated infrastructure deployment.'
          }
        ]
      }
    },
    { 
      id: 'arm-templates', 
      name: 'ARM Templates', 
      icon: FileCode, 
      x: 550, 
      y: 150, 
      connections: ['azure'], 
      type: 'skill',
      description: 'Azure Resource Manager templates',
      devOpsNotes: 'Deep knowledge of ARM template syntax and deployment',
      color: '#0EA5E9', // Sky Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          templatesCreated: '50+',
          resourcesManaged: '200+',
          parametersManaged: '100+'
        },
        sections: [
          {
            title: 'Template Design',
            content: 'Nested templates, linked templates, parameter files per environment, and complex deployments with dependencies.'
          },
          {
            title: 'Integration',
            content: 'Integrated with Azure DevOps for automated deployments and with Azure Policy for governance and compliance.'
          }
        ]
      }
    },
    { 
      id: 'ansible', 
      name: 'Ansible', 
      icon: Terminal, 
      x: 550, 
      y: 250, 
      connections: [], 
      type: 'skill',
      description: 'Configuration management with Ansible',
      devOpsNotes: 'Used for configuration management across environments',
      color: '#EF4444', // Red
      status: 'intermediate',
      detailedInfo: {
        status: 'Intermediate',
        metrics: {
          playbooksCreated: '20+',
          rolesCreated: '10+',
          serversManaged: '50+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Playbooks, roles, inventory management, and integration with CI/CD for configuration as code.'
          },
          {
            title: 'Use Cases',
            content: 'Server configuration, application deployment, patch management, and infrastructure orchestration.'
          }
        ]
      }
    },
    { 
      id: 'cloud-architecture', 
      name: 'Cloud Architecture', 
      icon: Cloud, 
      x: 350, 
      y: 300, 
      connections: ['azure', 'aws', 'kubernetes', 'security'], 
      type: 'skill',
      description: 'Multi-cloud architecture design',
      devOpsNotes: 'Designed scalable and secure cloud solutions',
      color: '#F59E0B', // Amber
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          architecturesDesigned: '12+',
          enterpriseProjects: '5+',
          cloudPlatforms: '3'
        },
        sections: [
          {
            title: 'Design Principles',
            content: 'Scalability, high availability, security-first approach, cost optimization, and operational excellence.'
          },
          {
            title: 'Architecture Types',
            content: 'Microservices, event-driven, serverless, hybrid cloud, and multi-region deployments with disaster recovery.'
          }
        ]
      }
    },
    { 
      id: 'azure', 
      name: 'Microsoft Azure', 
      icon: Cloud, 
      x: 450, 
      y: 400, 
      connections: ['az104', 'az500', 'az700', 'sc100'], 
      type: 'skill',
      description: 'Azure platform expertise',
      devOpsNotes: '1 year 8 months professional experience',
      color: '#0EA5E9', // Sky Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          yearsExperience: '3+',
          servicesUsed: '30+',
          certificationsHeld: '4'
        },
        sections: [
          {
            title: 'Core Services',
            content: 'Azure Virtual Machines, App Services, Azure Functions, Azure Kubernetes Service, SQL Database, Cosmos DB, Storage, Monitor, and more.'
          },
          {
            title: 'Implementation',
            content: 'Production-grade solutions for enterprise applications, including networking, security, databases, compute, and DevOps services.'
          }
        ]
      }
    },
    { 
      id: 'aws', 
      name: 'AWS', 
      icon: Cloud, 
      x: 250, 
      y: 400, 
      connections: ['aws-saa'], 
      type: 'skill',
      description: 'Amazon Web Services expertise',
      devOpsNotes: '1 year 3 months experience',
      color: '#F59E0B', // Amber
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          yearsExperience: '1.5+',
          servicesUsed: '15+',
          certificationsHeld: '1'
        },
        sections: [
          {
            title: 'Core Services',
            content: 'EC2, ECS, S3, RDS, Lambda, CloudFormation, IAM, VPC, CloudWatch, and more essential AWS services.'
          },
          {
            title: 'Implementation',
            content: 'Infrastructure automation with CloudFormation and Terraform, serverless applications, and secure network design.'
          }
        ]
      }
    },
    { 
      id: 'kubernetes', 
      name: 'Kubernetes', 
      icon: Cpu, 
      x: 450, 
      y: 200, 
      connections: ['openshift', 'aks', 'helm'], 
      type: 'skill',
      description: 'Container orchestration expertise',
      devOpsNotes: 'Experience with various K8s distributions',
      color: '#10B981', // Emerald
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          clustersManaged: '8+',
          applicationsDeployed: '20+',
          yearsExperience: '2+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Cluster setup, namespace management, workload deployment, security policies, networking, and storage configuration.'
          },
          {
            title: 'Distributions',
            content: 'Azure Kubernetes Service (AKS), Amazon EKS, OpenShift, and self-managed clusters using kubeadm.'
          }
        ]
      }
    },
    { 
      id: 'openshift', 
      name: 'OpenShift', 
      icon: Cpu, 
      x: 550, 
      y: 350, 
      connections: [], 
      type: 'skill',
      description: 'Red Hat OpenShift expertise',
      devOpsNotes: '11 months DevOps on-premises',
      color: '#EF4444', // Red
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          yearsExperience: '1+',
          clustersManaged: '3',
          applicationsDeployed: '15+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'On-premises clusters, developer workflows, CI/CD integration, and security context constraints.'
          },
          {
            title: 'Features Used',
            content: 'Routes, DeploymentConfigs, ImageStreams, BuildConfigs, and integration with on-premises CI/CD.'
          }
        ]
      }
    },
    { 
      id: 'aks', 
      name: 'Azure Kubernetes Service', 
      icon: Cpu, 
      x: 650, 
      y: 250, 
      connections: [], 
      type: 'skill',
      description: 'AKS expertise',
      devOpsNotes: 'Managed Kubernetes clusters in Azure',
      color: '#0EA5E9', // Sky Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          clustersManaged: '5+',
          applicationsDeployed: '15+',
          integrations: 'Complete Azure ecosystem'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Cluster provisioning with Terraform, integration with Azure AD, Azure Monitor, and Azure Policy for governance.'
          },
          {
            title: 'Advanced Features',
            content: 'Azure CNI networking, network policies, pod identity, secret store CSI driver, and Azure DevOps integration.'
          }
        ]
      }
    },
    { 
      id: 'helm', 
      name: 'Helm', 
      icon: Layers, 
      x: 650, 
      y: 150, 
      connections: [], 
      type: 'skill',
      description: 'Kubernetes package manager',
      devOpsNotes: 'Created custom Helm charts for deployments',
      color: '#10B981', // Emerald
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          chartsCreated: '10+',
          chartsCustomized: '15+',
          repositoriesManaged: '3'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Custom chart development, values files per environment, and integration with CI/CD for automated deployments.'
          },
          {
            title: 'Advanced Usage',
            content: 'Helm hooks, templating functions, subcharts, and dependency management for complex applications.'
          }
        ]
      }
    },
    { 
      id: 'monitoring', 
      name: 'Monitoring & Observability', 
      icon: Activity, 
      x: 250, 
      y: 300, 
      connections: ['prometheus', 'grafana', 'azure-monitor'], 
      type: 'skill',
      description: 'Full-stack monitoring solutions',
      devOpsNotes: 'Implemented comprehensive monitoring',
      color: '#EF4444', // Red
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          dashboardsCreated: '25+',
          alertRules: '100+',
          systemsCovered: '95%'
        },
        sections: [
          {
            title: 'Stack Components',
            content: 'Metrics collection, logging, tracing, alerting, and visualization for full-stack observability.'
          },
          {
            title: 'Tools',
            content: 'Prometheus, Grafana, Azure Monitor, Log Analytics, Application Insights, ELK stack, and custom solutions.'
          }
        ]
      }
    },
    { 
      id: 'prometheus', 
      name: 'Prometheus', 
      icon: Activity, 
      x: 150, 
      y: 350, 
      connections: [], 
      type: 'skill',
      description: 'Metrics collection and alerting',
      devOpsNotes: 'Set up Prometheus for Kubernetes monitoring',
      color: '#EF4444', // Red
      status: 'intermediate',
      detailedInfo: {
        status: 'Intermediate',
        metrics: {
          instancesManaged: '5+',
          alertRules: '50+',
          retentionPeriod: '15 days'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Service discovery, scraping configuration, alert manager setup, and integration with Kubernetes.'
          },
          {
            title: 'Query Language',
            content: 'PromQL for metrics querying, alerting conditions, and dashboard visualizations.'
          }
        ]
      }
    },
    { 
      id: 'grafana', 
      name: 'Grafana', 
      icon: BarChart, 
      x: 50, 
      y: 300, 
      connections: [], 
      type: 'skill',
      description: 'Data visualization platform',
      devOpsNotes: 'Created dashboards for real-time monitoring',
      color: '#F59E0B', // Amber
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          dashboardsCreated: '20+',
          dataSources: '5+',
          usersSupported: '50+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Dashboard creation, data source configuration, alerting, and user access management.'
          },
          {
            title: 'Integrations',
            content: 'Prometheus, Azure Monitor, Log Analytics, and custom data sources for comprehensive visualization.'
          }
        ]
      }
    },
    { 
      id: 'azure-monitor', 
      name: 'Azure Monitor', 
      icon: Activity, 
      x: 50, 
      y: 400, 
      connections: [], 
      type: 'skill',
      description: 'Azure monitoring solution',
      devOpsNotes: 'Implemented complete monitoring for Azure resources',
      color: '#0EA5E9', // Sky Blue
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          workspacesManaged: '5+',
          queriesCreated: '100+',
          dashboardsBuilt: '15+'
        },
        sections: [
          {
            title: 'Components Used',
            content: 'Log Analytics, Application Insights, Metrics, Alerts, Workbooks, and Insights for comprehensive monitoring.'
          },
          {
            title: 'Implementation',
            content: 'Centralized logging, custom KQL queries, action groups for alerts, and dashboard visualizations.'
          }
        ]
      }
    },
    { 
      id: 'security', 
      name: 'Cloud Security', 
      icon: Shield, 
      x: 550, 
      y: 400, 
      connections: ['az500', 'sc100', 'devsecops'], 
      type: 'skill',
      description: 'Cloud security expertise',
      devOpsNotes: 'Implemented security best practices',
      color: '#14B8A6', // Teal
      status: 'expert',
      detailedInfo: {
        status: 'Expert',
        metrics: {
          securityControls: '100+',
          complianceFrameworks: '3+',
          vulnerabilitiesMitigated: '50+'
        },
        sections: [
          {
            title: 'Focus Areas',
            content: 'Identity management, network security, data protection, secure CI/CD, and threat protection.'
          },
          {
            title: 'Implementations',
            content: 'Defense in depth strategies, Zero Trust architecture, and continuous security monitoring and assessment.'
          }
        ]
      }
    },
    { 
      id: 'devsecops', 
      name: 'DevSecOps', 
      icon: Shield, 
      x: 650, 
      y: 350, 
      connections: [], 
      type: 'skill',
      description: 'Security integration in DevOps',
      devOpsNotes: 'Built security into CI/CD pipelines',
      color: '#14B8A6', // Teal
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          securityGates: '5+',
          vulnerabilityScanners: '3+',
          pipelines: '10+'
        },
        sections: [
          {
            title: 'Implementation',
            content: 'Security scanning in CI/CD, automated compliance checks, and policy as code for infrastructure.'
          },
          {
            title: 'Tools',
            content: 'SonarQube, OWASP dependency checks, container scanning, and infrastructure security scanning.'
          }
        ]
      }
    },
    { 
      id: 'python', 
      name: 'Python', 
      icon: Code, 
      x: 150, 
      y: 200, 
      connections: ['automation'], 
      type: 'skill',
      description: 'Python programming expertise',
      devOpsNotes: '1 year Python development in startup',
      color: '#3B82F6', // Blue
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          yearsExperience: '3+',
          projectsCompleted: '10+',
          librariesUsed: '20+'
        },
        sections: [
          {
            title: 'Focus Areas',
            content: 'Automation scripts, API development, data processing, and DevOps tooling integration.'
          },
          {
            title: 'Libraries',
            content: 'Requests, Flask, FastAPI, Pandas, Boto3, Azure SDK, and custom libraries for automation tasks.'
          }
        ]
      }
    },
    { 
      id: 'automation', 
      name: 'Process Automation', 
      icon: Zap, 
      x: 50, 
      y: 200, 
      connections: [], 
      type: 'skill',
      description: 'Workflow and task automation',
      devOpsNotes: 'Created scripts for routine tasks',
      color: '#8B5CF6', // Purple
      status: 'advanced',
      detailedInfo: {
        status: 'Advanced',
        metrics: {
          processesAutomated: '15+',
          hoursAnnuallySaved: '1000+',
          toolsIntegrated: '8+'
        },
        sections: [
          {
            title: 'Automation Types',
            content: 'Infrastructure provisioning, deployment, testing, reporting, and routine administrative tasks.'
          },
          {
            title: 'Tools',
            content: 'Custom scripts, Azure Logic Apps, PowerShell, Bash, Python, and various API integrations.'
          }
        ]
      }
    },
    
    // Certificates
    { 
      id: 'az104', 
      name: 'AZ-104', 
      icon: Award, 
      x: 350, 
      y: 500, 
      connections: [], 
      type: 'certificate',
      description: 'Azure Administrator Associate',
      devOpsNotes: 'Microsoft certification for Azure administration',
      color: '#0EA5E9', // Sky Blue
      status: 'completed',
      detailedInfo: {
        status: 'Completed',
        metrics: {
          dateAchieved: 'June 2023',
          validUntil: 'June 2026',
          examScore: '850/1000'
        },
        sections: [
          {
            title: 'Skills Validated',
            content: 'Managing Azure identities and governance, implementing and managing storage, deploying and managing Azure compute resources, configuring and managing virtual networking, and monitoring and backing up Azure resources.'
          },
          {
            title: 'Applied Knowledge',
            content: 'Applied in day-to-day administration of Azure resources, designing robust and secure cloud environments, and implementing best practices for resource management.'
          }
        ]
      }
    },
    { 
      id: 'az500', 
      name: 'AZ-500', 
      icon: Award, 
      x: 450, 
      y: 500, 
      connections: [], 
      type: 'certificate',
      description: 'Azure Security Engineer Associate',
      devOpsNotes: 'Microsoft certification for Azure security',
      color: '#14B8A6', // Teal
      status: 'completed',
      detailedInfo: {
        status: 'Completed',
        metrics: {
          dateAchieved: 'September 2023',
          validUntil: 'September 2026',
          examScore: '870/1000'
        },
        sections: [
          {
            title: 'Skills Validated',
            content: 'Managing identity and access, implementing platform protection, managing security operations, and securing data and applications in Azure.'
          },
          {
            title: 'Applied Knowledge',
            content: 'Implemented comprehensive security controls for cloud environments, identity protection measures, and security monitoring and response procedures.'
          }
        ]
      }
    },
    { 
      id: 'az700', 
      name: 'AZ-700', 
      icon: Award, 
      x: 550, 
      y: 500, 
      connections: [], 
      type: 'certificate',
      description: 'Azure Network Engineer Associate',
      devOpsNotes: 'Microsoft certification for Azure networking',
      color: '#64748B', // Slate
      status: 'completed',
      detailedInfo: {
        status: 'Completed',
        metrics: {
          dateAchieved: 'November 2023',
          validUntil: 'November 2026',
          examScore: '830/1000'
        },
        sections: [
          {
            title: 'Skills Validated',
            content: 'Designing, implementing, and managing hybrid networking, routing, private access to Azure services, load balancing, network monitoring, and network security.'
          },
          {
            title: 'Applied Knowledge',
            content: 'Designed hub-and-spoke network topologies, implemented secure connectivity solutions, and established robust network security controls.'
          }
        ]
      }
    },
    { 
      id: 'sc100', 
      name: 'SC-100', 
      icon: Award, 
      x: 650, 
      y: 500, 
      connections: [], 
      type: 'certificate',
      description: 'Microsoft Cybersecurity Architect',
      devOpsNotes: 'Expert-level security certification',
      color: '#14B8A6', // Teal
      status: 'completed',
      detailedInfo: {
        status: 'Completed',
        metrics: {
          dateAchieved: 'January 2024',
          validUntil: 'January 2027',
          examScore: '880/1000'
        },
        sections: [
          {
            title: 'Skills Validated',
            content: 'Designing security strategy and architecture, evaluating governance risk compliance, designing security for infrastructure, designing security for hybrid and multi-cloud environments, and evaluating security posture and tools.'
          },
          {
            title: 'Applied Knowledge',
            content: 'Implemented comprehensive security architectures across cloud environments, established security governance frameworks, and designed Zero Trust security models.'
          }
        ]
      }
    },
    { 
      id: 'aws-saa', 
      name: 'AWS Solutions Architect', 
      icon: Award, 
      x: 250, 
      y: 500, 
      connections: [], 
      type: 'certificate',
      description: 'AWS Solutions Architect Associate',
      devOpsNotes: 'AWS certification for architecture design',
      color: '#F59E0B', // Amber
      status: 'completed',
      detailedInfo: {
        status: 'Completed',
        metrics: {
          dateAchieved: 'March 2023',
          validUntil: 'March 2026',
          examScore: '790/1000'
        },
        sections: [
          {
            title: 'Skills Validated',
            content: 'Designing resilient, high-performing, secure, and cost-optimized architectures on AWS, implementing and deploying applications, and migrating existing workloads.'
          },
          {
            title: 'Applied Knowledge',
            content: 'Designed and implemented AWS-based solutions, established well-architected frameworks, and optimized cloud resource usage.'
          }
        ]
      }
    },
    
    // Experience
    { 
      id: 'exp-azure', 
      name: 'Azure DevOps Engineer', 
      icon: Briefcase, 
      x: 150, 
      y: 450, 
      connections: ['azure', 'cicd', 'iac', 'security'], 
      type: 'experience',
      description: 'Current role - 1 year 8 months',
      devOpsNotes: 'Lead DevOps engineer for cloud initiatives',
      color: '#0EA5E9', // Sky Blue
      status: 'current',
      detailedInfo: {
        status: 'Current',
        metrics: {
          duration: '1 year 8 months',
          projectsCompleted: '5+',
          teamsSupported: '3'
        },
        sections: [
          {
            title: 'Responsibilities',
            content: 'Managing multi-cloud infrastructure with Azure as primary platform, implementing IaC with Terraform and ARM templates, designing and maintaining CI/CD pipelines in Azure DevOps, and implementing security controls based on AZ-500 and SC-100 knowledge.'
          },
          {
            title: 'Achievements',
            content: 'Reduced deployment time by 65%, implemented comprehensive security controls, and established automated infrastructure provisioning.'
          }
        ]
      }
    },
    { 
      id: 'exp-aws', 
      name: 'AWS DevOps', 
      icon: Briefcase, 
      x: 250, 
      y: 550, 
      connections: ['aws', 'cicd', 'iac'], 
      type: 'experience',
      description: 'Previous role - 1 year 3 months',
      devOpsNotes: 'AWS and on-premises infrastructure management',
      color: '#F59E0B', // Amber
      status: 'past',
      detailedInfo: {
        status: 'Past',
        metrics: {
          duration: '1 year 3 months',
          projectsCompleted: '4',
          environmentsManaged: '3'
        },
        sections: [
          {
            title: 'Responsibilities',
            content: 'Managed hybrid cloud environments with AWS and on-premises infrastructure, implemented containerized workloads and CI/CD pipelines, and automated infrastructure provisioning and configuration management.'
          },
          {
            title: 'Achievements',
            content: 'Established hybrid cloud connectivity, migrated legacy applications to containerized environments, and implemented automated deployment processes.'
          }
        ]
      }
    },
    { 
      id: 'exp-openshift', 
      name: 'OpenShift Administrator', 
      icon: Briefcase, 
      x: 450, 
      y: 550, 
      connections: ['openshift', 'kubernetes'], 
      type: 'experience',
      description: 'Previous role - 11 months',
      devOpsNotes: 'OpenShift on-premises management',
      color: '#EF4444', // Red
      status: 'past',
      detailedInfo: {
        status: 'Past',
        metrics: {
          duration: '11 months',
          clustersManaged: '2',
          applicationsSupported: '15+'
        },
        sections: [
          {
            title: 'Responsibilities',
            content: 'Managed on-premises OpenShift cluster and containerized applications, implemented CI/CD workflows for development teams, and automated deployment and scaling of containerized workloads.'
          },
          {
            title: 'Achievements',
            content: 'Established container orchestration practices, implemented automation for routine operations, and increased deployment frequency.'
          }
        ]
      }
    },
    { 
      id: 'exp-python', 
      name: 'Python Developer', 
      icon: Briefcase, 
      x: 350, 
      y: 600, 
      connections: ['python'], 
      type: 'experience',
      description: 'Startup role - 1 year',
      devOpsNotes: 'Python and Angular development',
      color: '#3B82F6', // Blue
      status: 'past',
      detailedInfo: {
        status: 'Past',
        metrics: {
          duration: '1 year',
          applicationsBuilt: '3',
          technologiesUsed: '5+'
        },
        sections: [
          {
            title: 'Responsibilities',
            content: 'Developed backend services with Python, created frontend interfaces with Angular, and collaborated in an agile development environment.'
          },
          {
            title: 'Achievements',
            content: 'Delivered core product features, implemented RESTful APIs, and contributed to continuous integration practices.'
          }
        ]
      }
    }
  ];
  
  export default competenciesData;