import React, { useState } from 'react';
import { 
  Network,
  GitBranch,
  User,
  Cloud,
  BrainCircuit,
  Layout
} from 'lucide-react';

// Import child components
import CloudInfrastructureView from './CloudInfrastructureView';
import DevOpsDashboardView from './DevOpsDashboardView';
import ProfessionalProfileView from './ProfessionalProfileView';
import ApplicationsView from './ApplicationsView';
import CompetenceMindmapView from './CompetenceMindmapView';

const CloudDevOpsDashboard = () => {
  const [activeTab, setActiveTab] = useState('competence');

  // Custom DevOps engineer profile based on your background
  const devOpsEngineerProfile = {
    name: "Piotr Paszko",
    title: "Cloud Security Engineer",
    avatar: `${process.env.PUBLIC_URL}/images/profile.jpeg`,
    certifications: ["AZ-104", "AZ-500", "SC-100", "AZ-700", "Certificate of Cloud Security Knowledge v.5", "AWS Solutions Architect Associate", "Cisco Certified"],
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

  // Pipeline events state
  const [pipelineEvents, setPipelineEvents] = useState([
    { id: 1, type: 'success', message: 'Azure Function App CI/CD Pipeline completed successfully', time: '37 minutes ago', env: 'Production' },
    { id: 2, type: 'info', message: 'Kubernetes manifest updated for microservice-auth', time: '2 hours ago', env: 'Staging' },
    { id: 3, type: 'warning', message: 'High CPU utilization detected in API cluster', time: '4 hours ago', env: 'Production', resolved: true },
    { id: 4, type: 'info', message: 'Terraform plan executed for network infrastructure', time: '1 day ago', env: 'Dev' },
  ]);

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
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="w-full mb-6">
        <div className="flex flex-wrap border-b border-gray-200">
            <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'profile' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('profile')}
            >
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              Professional Profile
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'competence' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('competence')}
          >
            <div className="flex items-center">
              <BrainCircuit size={18} className="mr-2" />
              Competence Mindmap
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-t-lg ${activeTab === 'applications' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-indigo-500'}`}
            onClick={() => setActiveTab('applications')}
          >
            <div className="flex items-center">
              <Layout size={18} className="mr-2" />
              Applications
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
         
        </div>
      </div>

      {/* Render the appropriate component based on active tab */}
      {activeTab === 'competence' && (
        <CompetenceMindmapView 
          devOpsEngineerProfile={devOpsEngineerProfile} 
          devOpsMetrics={devOpsMetrics} 
          pipelineEvents={pipelineEvents}
        />
      )}
      
      {/* Applications Dashboard */}
      {activeTab === 'applications' && (
        <ApplicationsView 
          devOpsEngineerProfile={devOpsEngineerProfile} 
          devOpsMetrics={devOpsMetrics} 
          pipelineEvents={pipelineEvents}
        />
      )}

      {activeTab === 'devops' && (
        <DevOpsDashboardView 
          devOpsMetrics={devOpsMetrics} 
          pipelineEvents={pipelineEvents}
        />
      )}

      {activeTab === 'profile' && (
        <ProfessionalProfileView 
          devOpsEngineerProfile={devOpsEngineerProfile}
        />
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