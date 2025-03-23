import React from 'react';
import { 
  BarChart, 
  Shield, 
  Settings, 
  GitBranch, 
  PieChart, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  AlignLeft, 
  Workflow, 
  Zap,
  Terminal
} from 'lucide-react';

const DevOpsDashboardView = ({ devOpsMetrics, pipelineEvents }) => {
  return (
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
              {pipelineEvents.map((event) => (
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
      
      {/* Key DevOps Insights */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap size={20} className="mr-2 text-indigo-600" />
          Key DevOps Insights
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle size={20} className="text-green-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-green-800">Deployment Velocity Improved</h4>
                <p className="mt-1 text-sm text-green-700">
                  CI/CD pipeline optimizations have reduced deployment time by 65% compared to last quarter.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle size={20} className="text-amber-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-amber-800">API Performance Monitoring</h4>
                <p className="mt-1 text-sm text-amber-700">
                  API service response times show occasional spikes during peak hours. Consider implementing caching or load balancing improvements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Terminal size={20} className="text-blue-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-blue-800">Automation Opportunity</h4>
                <p className="mt-1 text-sm text-blue-700">
                  Environment creation still requires manual steps. Automating this process could save approximately 5 hours per week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsDashboardView;