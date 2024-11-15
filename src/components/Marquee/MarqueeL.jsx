import React, { useState } from 'react';
import '../../index.css';

const ToolIcon = ({ name, iconPath }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center mx-4 transition-all duration-300 transform hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <img 
          src={iconPath} 
          alt={name} 
          className="w-full h-full object-contain shadow-white" 
        />
      </div>
      <span
        className={`mt-2 text-xs text-blue-300 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {name}
      </span>
    </div>
  );
};


const MarqueeL = () => {
  const tools = [
    { name: "Anaconda", iconPath: "/images/skills/anaconda.svg" },
    { name: "Docker", iconPath: "/images/skills/docker.svg" },
    { name: "Figma", iconPath: "/images/skills/figma.svg" },
    { name: "Javascript", iconPath: "/images/skills/javascript.svg" },
    { name: "Jenkins", iconPath: "/images/skills/jenkins.svg" },
    { name: "Json", iconPath: "/images/skills/json.svg" },
    { name: "Kubernetes", iconPath: "/images/skills/kubernetes.svg" },
    { name: "Latex", iconPath: "/images/skills/latex.svg" },
    { name: "Linux", iconPath: "/images/skills/linux.svg" },
    { name: "Mariadb", iconPath: "/images/skills/mariadb.svg" },
    { name: "IIS", iconPath: "/images/skills/microsoftiis.svg" },
    { name: "Mongodb", iconPath: "/images/skills/mongodb.svg" },
    { name: "Mssql", iconPath: "/images/skills/mssql.svg" },
    { name: "Mysql", iconPath: "/images/skills/mysql.svg" },
    { name: "Nginx", iconPath: "/images/skills/nginx.svg" },
    { name: "Ngrok", iconPath: "/images/skills/ngrok.svg" },
    { name: "HTML", iconPath: "/images/skills/nodejs.svg" },
    { name: "Obsidian", iconPath: "/images/skills/obsidian.svg" },
    { name: "Powershell", iconPath: "/images/skills/powershell.svg" },
    { name: "Putty", iconPath: "/images/skills/putty.svg" },
    { name: "Stackoverflow", iconPath: "/images/skills/stackoverflow.svg" },
    { name: "TailwindCSS", iconPath: "/images/skills/tailwindcss.svg" },
    { name: "Vscode", iconPath: "/images/skills/vscode.svg" },
  ];

  // Duplicate the array for a seamless scrolling effect
  const marqueeTools = [...tools, ...tools];

  return (
    <div className="py-8 overflow-hidden relative">
      <div className="relative w-full overflow-hidden">
        {/* Single left-moving marquee */}
        <div className="flex animate-marqueeLeft whitespace-nowrap">
          {marqueeTools.map((tool, index) => (
            <ToolIcon key={index} name={tool.name} iconPath={tool.iconPath} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeL;
