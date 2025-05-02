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

  // Custom DevOps engineer profile based on your background - UPDATED FROM LINKEDIN
  const devOpsEngineerProfile = {
    name: "Piotr Paszko",
    title: "Cloud DevOps Engineer", // Updated title based on latest role
    avatar: `${process.env.PUBLIC_URL}/images/profile.jpeg`,
    contact: {
        email: "p.j.paszko@gmail.com",
        linkedin: "www.linkedin.com/in/piotr-paszko-235b38192",
        github: "github.com/Pjjp"
    },
    // Updated Certifications from LinkedIn - ordered newest to oldest
    certifications: [
      "HashiCorp Certified: Terraform Associate (003)", // Issued Apr 2025
      "Certificate of Cloud Security Knowledge v.5", // Issued Mar 2025
      "Azure Network Engineer Associate", // Issued Feb 2025
      "Microsoft Certified: Cybersecurity Architect Expert", // Issued Dec 2024
      "Microsoft Certified: Azure Security Engineer Associate", // Issued Jun 2024
      "Microsoft Certified: Azure Administrator Associate", // Issued Mar 2024
      "AWS Academy Graduate - Cloud Architecting", // Issued Mar 2023
      "AWS Academy Graduate - Cloud Foundations" // Issued Dec 2022
    ],
    // Refined Expertise based on LinkedIn Certs/Projects/Tags and Experience
    expertise: [
      "Microsoft Azure (Administration, Security, Networking, DevOps)",
      "Infrastructure as Code (Terraform, Bicep)",
      "Kubernetes (AKS, OpenShift)",
      "DevOps & CI/CD (Azure DevOps, Jenkins)",
      "Configuration Management (Ansible)",
      "Linux Administration (RedHat)",
      "Python Scripting & Automation",
      "Cloud Security Best Practices",
      "Amazon Web Services (AWS)",
      "Docker",
      // Added from previous roles/skills section
      "PowerShell",
      "FastAPI",
      "Data Scraping",
      "Machine Learning",
      "Angular / Ngrx"
    ],
    // Updated Education Source
    education: {
      masters: "Master's degree, Computer Science",
      mastersSchool: "Warsaw School of Computer Science (Sep 2022 - Jan 2024)",
      bachelors: "Bachelor's degree, Cybersecurity",
      bachelorsSchool: "Wroclaw University of Science and Technology (Oct 2018 - Feb 2022)"
    },
    // Updated Experience from LinkedIn - Newest First
    experience: [
        {
            company: "Software Mind",
            title: "Cloud DevOps Engineer",
            duration: "July 2024 - Present", // Duration needs update based on 'Present'
            location: "Wroclaw Metropolitan Area",
            details: ["Azure", "Azure security", "Terraform", "Kubernetes (AKS)", "Azure DevOps"]
        },
        {
            company: "Accenture Poland",
            title: "Cloud DevOps Engineer",
            duration: "July 2023 - June 2024 (1 year)",
            location: "Wroclaw Metropolitan Area", // Inferred
            details: ["Cloud Migration & Imp Senior Analyst", "Azure security", "Azure", "Azure DevOps", "PowerShell", "Bicep"]
        },
        {
            company: "Capgemini",
            title: "Junior DevOps Engineer",
            duration: "August 2022 - July 2023 (1 year)",
            location: "Wrocław, Dolnośląskie, Poland",
            details: ["OpenShift (Kubernetes)", "Ansible", "RedHat", "RedHat satellite", "Jenkins", "Mapr", "Airflow"]
        },
        {
            company: "Asseco Business Solutions S.A.",
            title: "Junior Linux Admin/DevOps",
            duration: "May 2021 - July 2022 (1 year 3 months)",
            location: "Wroclaw Metropolitan Area", // Inferred
            details: ["Linux administration", "Python scripts", "FastApi", "Ansible", "CI/CD", "Kubernetes", "Docker", "AWS", "Terraform"]
        },
        {
            company: "cosphereorg",
            title: "Junior Full Stack Developer",
            duration: "September 2019 - August 2020 (1 year)",
            location: "Wroclaw Metropolitan Area", // Inferred
            details: ["Helping in startup", "Python Backend", "Data Scraping", "Machine Learning", "Angular", "Ngrx"]
        },
        {
            company: "Viessmann Research & Development Center",
            title: "Junior Developer - Intern",
            duration: "July 2019 - August 2019 (2 months)",
            location: "Wroclaw, Lower Silesian District, Poland",
            details: ["Python Backend", "Django", "Docker", "Unit Tests", "Databases, Spark"]
        }
    ],
    // Kept existing achievements
    achievements: [
      "Implemented CI/CD pipelines reducing deployment time by 65%",
      "Migrated legacy applications to containerized microservices architecture",
      "Automated infrastructure deployment with Terraform saving 15+ hours weekly"
    ],
    // Removed old projects as they seem covered by experience now
    // Kept existing focus
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
    <div className="flex flex-col items-center w-full min-h-screen py-4 mx-auto">
      {/* DevOps Engineer Profile Banner - Apply w-10/12 */}
      <div className="w-10/12 mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg mb-6 overflow-hidden">
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

      {/* Dashboard Tabs - Apply w-10/12 */}
      <div className="w-10/12 mx-auto mb-6">
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

      {/* Container for Active Tab Content - Apply w-10/12 */}
      <div className="w-10/12 mx-auto flex-grow flex flex-col items-center">
        {/* Render the appropriate component based on active tab */}
        {activeTab === 'competence' && (
          <div className="w-full h-full flex flex-col items-center">
            <CompetenceMindmapView 
              devOpsEngineerProfile={devOpsEngineerProfile} 
              devOpsMetrics={devOpsMetrics}
              pipelineEvents={pipelineEvents}
            />
          </div>
        )}
        
        {/* Applications Dashboard */}
        {activeTab === 'applications' && (
          <div className="w-full h-full flex flex-col items-center">
            <ApplicationsView 
              devOpsEngineerProfile={devOpsEngineerProfile} 
              devOpsMetrics={devOpsMetrics} 
              pipelineEvents={pipelineEvents}
            />
          </div>
        )}

        {activeTab === 'devops' && (
          <div className="w-full h-full flex flex-col items-center">
            <DevOpsDashboardView 
              devOpsMetrics={devOpsMetrics} 
              pipelineEvents={pipelineEvents}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="w-full h-full flex flex-col items-center">
            <ProfessionalProfileView
              devOpsEngineerProfile={devOpsEngineerProfile}
            />
          </div>
        )}
      </div>

      {/* Footer with DevOps Engineer Notice - Apply w-10/12 */}
      <div className="w-10/12 mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>Cloud infrastructure managed by {devOpsEngineerProfile.name}, {devOpsEngineerProfile.title}</p>
        <p className="mt-1">Last deployment: February 27, 2025 | Next scheduled maintenance: March 10, 2025</p>
      </div>
    </div>
  );
};

export default CloudDevOpsDashboard;