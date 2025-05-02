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
          {/* Add max-width wrapper and center */}
          <div className="max-w-6xl mx-auto"> 
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
            
            {/* Work Experience - Use Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase size={20} className="mr-2 text-indigo-600" />
                Experience
              </h3>
              
              {/* Dynamically render experience from the experience array */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
                {devOpsEngineerProfile.experience.map((job, index) => (
                  <div key={`exp-${index}`} className="border-l-2 border-indigo-200 pl-4">
                    <div className="text-lg font-medium">{job.title}</div>
                    <div className="text-sm font-semibold text-gray-700">{job.company}</div>
                    <div className="text-sm text-gray-500 mb-1">{job.duration} {job.location ? `• ${job.location}` : ''}</div>
                    {job.details && job.details.length > 0 && (
                      <ul className="mt-2 text-gray-700 space-y-1 text-sm list-disc list-inside">
                        {job.details.map((detail, i) => (
                          <li key={`detail-${index}-${i}`}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
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
            
            {/* Projects Section - NEW */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                {/* Optional: Add an icon like Code */}
                {/* <Code size={20} className="mr-2 text-indigo-600" /> */}
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check if projects exist before mapping */}
                {devOpsEngineerProfile.projects && devOpsEngineerProfile.projects.map((project, i) => (
                  <div key={`project-${i}`} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <h4 className="font-semibold text-lg mb-1">{project.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    <p className="text-xs text-gray-500 italic">{project.contribution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Combined Education, Certs, and Personal Development Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            {/* Use a 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
              {/* Column 1: Education */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen size={20} className="mr-2 text-indigo-600" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{devOpsEngineerProfile.education.masters}</h4>
                    <p className="text-sm text-gray-500">Master's Degree</p>
                    <p className="text-xs text-gray-400">{devOpsEngineerProfile.education.school}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{devOpsEngineerProfile.education.engineering}</h4>
                    <p className="text-sm text-gray-500">Engineering Degree</p>
                    <p className="text-xs text-gray-400">{devOpsEngineerProfile.education.school}</p>
                  </div>
                </div>
              </div>

              {/* Column 2: Certifications */}
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
              
              {/* Column 3: Personal Development (Existing Content) */}
              <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <User size={20} className="mr-2 text-indigo-600" />
                    Personal Development
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800">Continuous Learning</h4>
                      <p className="text-gray-600 mt-1 text-sm"> {/* Adjusted text size */}
                        Actively pursuing advanced certifications in cloud security and DevOps practices to stay at the forefront of industry developments.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Community Involvement</h4>
                      <p className="text-gray-600 mt-1 text-sm"> {/* Adjusted text size */}
                        Contributing to open-source projects and actively participating in cloud and DevOps community forums and events.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Mentorship</h4>
                      <p className="text-gray-600 mt-1 text-sm"> {/* Adjusted text size */}
                        Mentoring junior engineers and sharing knowledge through internal workshops and documentation.
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          {/* End of max-width wrapper */}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileView;