import React, { useState } from 'react';
import { 
  Grid, 
  PanelTop, 
  Server, 
  BarChart3, 
  Layers,
  Network,
  Monitor,
  ArrowRight
} from 'lucide-react';
import CloudInfrastructureView from './CloudInfrastructureView';

const ApplicationsView = ({ devOpsEngineerProfile, devOpsMetrics, pipelineEvents }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  // List of applications
  const applications = [
    {
      id: 'cloud-infrastructure',
      name: 'Cloud Infrastructure Dashboard',
      description: 'Interactive visualization of cloud resources and their relationships',
      icon: Network,
      color: '#3B82F6'
    },
    {
      id: 'resource-monitoring',
      name: 'Resource Monitoring',
      description: 'Real-time monitoring of cloud resource utilization and performance',
      icon: Monitor,
      color: '#10B981'
    },
    {
      id: 'cost-analysis',
      name: 'Cost Analysis',
      description: 'Detailed breakdown and visualization of cloud costs and optimization opportunities',
      icon: BarChart3,
      color: '#F59E0B'
    },
    {
      id: 'microservices-map',
      name: 'Microservices Map',
      description: 'Visual representation of microservices and their dependencies',
      icon: Grid,
      color: '#8B5CF6'
    },
    {
      id: 'deployment-pipeline',
      name: 'Deployment Pipeline',
      description: 'CI/CD pipeline monitoring and management interface',
      icon: Layers,
      color: '#EC4899'
    },
    {
      id: 'compliance-dashboard',
      name: 'Compliance Dashboard',
      description: 'Security and compliance status across cloud environments',
      icon: Server,
      color: '#14B8A6'
    }
  ];

  // Return to applications list
  const handleBackToList = () => {
    setSelectedApp(null);
  };

  return (
    <div className="w-full">
      {selectedApp ? (
        <div>
          <button 
            onClick={handleBackToList}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowRight className="mr-1 rotate-180" size={16} />
            <span>Back to Applications</span>
          </button>

          {selectedApp === 'cloud-infrastructure' && (
            <CloudInfrastructureView 
              devOpsEngineerProfile={devOpsEngineerProfile}
              devOpsMetrics={devOpsMetrics}
              pipelineEvents={pipelineEvents}
            />
          )}

          {selectedApp !== 'cloud-infrastructure' && (
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">{applications.find(app => app.id === selectedApp)?.name}</h2>
              <p className="text-gray-600 mb-6">This application is under development. Check back soon!</p>
              <div className="p-12 bg-gray-100 rounded-lg inline-block">
                {React.createElement(applications.find(app => app.id === selectedApp)?.icon, {
                  size: 64,
                  className: "mx-auto text-gray-400"
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-6">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedApp(app.id)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${app.color}15` }}
                    >
                      {React.createElement(app.icon, {
                        size: 24,
                        color: app.color
                      })}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{app.name}</h3>
                  </div>
                  <p className="text-gray-600">{app.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm text-indigo-600 flex items-center">
                      Open Application
                      <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsView;