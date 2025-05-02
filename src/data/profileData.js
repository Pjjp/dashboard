export const devOpsEngineerProfile = {
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
  
  // Removed devOpsMetrics export
  
  // Removed initialPipelineEvents export 