import React from 'react';
import {
  Terminal,
  Briefcase,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
  User,
  Cloud
} from 'lucide-react';

const ProfessionalProfileView = ({ devOpsEngineerProfile }) => {
  return (
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
              Passionate Cloud DevOps Engineer with expertise in Azure, AWS, and on-premises environments. Combining technical knowledge from cybersecurity background with practical DevOps experience to deliver secure, automated, and efficient cloud infrastructure.
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
                {devOpsEngineerProfile.certifications.slice(0, 6).map((cert, i) => (
                  <div key={`cert-display-${i}`} className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className={i < 4 ? "font-medium" : ""}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional Skills and Information */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <User size={20} className="mr-2 text-indigo-600" />
              Personal Development
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">Continuous Learning</h4>
                <p className="text-gray-600 mt-1">
                  Actively pursuing advanced certifications in cloud security and DevOps practices to stay at the forefront of industry developments.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">Community Involvement</h4>
                <p className="text-gray-600 mt-1">
                  Contributing to open-source projects and actively participating in cloud and DevOps community forums and events.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">Mentorship</h4>
                <p className="text-gray-600 mt-1">
                  Mentoring junior engineers and sharing knowledge through internal workshops and documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileView;