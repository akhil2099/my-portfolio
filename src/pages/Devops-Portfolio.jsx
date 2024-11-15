import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Star,
  Code,
  Trophy,
  Briefcase,
  GraduationCap,
  Award,
  Check,
} from "lucide-react";
import MarqueeR from "../components/Marquee/MarqueeR";
import MarqueeL from "../components/Marquee/MarqueeL";

// const iconsArray = [Github, Linkedin, Mail, Star, Code];


const PortfolioSection = ({
  title,
  content,
  isLeft,
  index,
  details,
  icon: Icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`section-${index}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [index]);

  return (
    <div
      id={`section-${index}`}
      className={`flex items-center mb-24 ${
        isLeft ? "flex-row-reverse" : "flex-row"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : "20px"})`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full sm:w-1/2 p-6 mr-8 ml-8">
        <div
          className={`bg-gray-900/60 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-gray-800 
      transform transition-all duration-1000 ease-in-out flex flex-col items-center
      ${isHovered ? "scale-105 border-blue-500/50 shadow-blue-500/40" : ""}
      `}
          style={{ minHeight: isHovered ? "auto" : "5rem" }}
        >
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-blue-400">{title}</h2>
          </div>

          <div
            className={`overflow-hidden transition-all duration-1000 ease-in-out ${
              isHovered ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-400 hover:text-white transition-colors duration-1000 ease-in-out mb-4">
              {content}
            </p>

            {details && (
              <div className="space-y-3 mt-6">
                {details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm text-gray-500 hover:text-blue-400 transition-all duration-300"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <Check className="w-4 h-4 text-blue-500 mr-3" />
                    {detail}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center ml-10 mr-10">
        <div className="p-3 rounded-lg bg-blue-500/10 mr-4">
          <Icon className={`w-6 h-6 text-blue-400 transition-all duration-1000 ${isHovered ? "w-12 h-12" : ""}`} />
        </div>
      </div>
    </div>
  );
};

const SocialLinks = () => {
    const navigate = useNavigate(); // Declare navigate here, inside the component
  
    return (
      <div className="fixed top-4 right-4 flex gap-4 backdrop-blur-lg bg-gray-900/30 p-3 rounded-full">
        <a
          href="https://github.com/akhil2099"
          className="text-blue-500 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/akhil2099"
          className="text-blue-500 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          onClick={() => navigate('/Contact')}
          className="text-blue-500 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform cursor-pointer"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    );
  };

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/30 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const Background = () => (
  <div className="fixed inset-0 z-[-1]">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
    <div className="absolute inset-0 opacity-30">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
      <div
        className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  </div>
);

const DevopsPortfolio = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "Hello I'm Akhil! I'm a Motivated DevOps Engineer with hands-on experience as a System Admin and  Devops Methedology seeking to deliver exceptional solutions.",
      details: [
        "DevOps Enthusiast",
        "System Administrator",
        "Problem Solver",
        "Frontend Developer",
      ],
      icon: Star,
    },
    {
      title: "Professional Experience",
      content: "1+ years of hands on experience in Devops Methedologies.",
      details: [
        "Intern System Administrator with DevOps at Techvantage Systems (2024-Present)",
        "Intern DevOps Engineer at Synneffo Solutions(2023-2024)",
      ],
      icon: Briefcase,
    },
    {
      title: "Key Skills",
      content: "Comprehensive technical expertise across multiple domains",
      details: [
        "Cloud Platforms: AWS,Azure",
        "CI/CD: Jenkins, GitHub Actions",
        "Scripting & Programming: Bash, Python, Batch",
        "Operating Systems: Linux, Windows, MacOs",
        "Monitoring: Prometheus, Grafana, Kubeshark, NodeExporter, BlackboxExporter",
        "Version Control: Git, GitHub",
        "Infrastructure as Code: Terraform, Ansible",
      ],
      icon: Code,
    },
    {
      title: "Notable Projects",
      content: "Led and contributed to various high-impact projects",
      details: [
        "Automating Infrastructure and Continuous Integration on AWS",
        "JMeter Automation using GitHub Actions with Perfaction",
        "SonarQube Automation with Jenkins for Code Quality Checks",
        "Automated Deployment of Scalable Web Application Infrastructure",
        "React Frontend Deployment for Photography Website"
      ],
      icon: Trophy,
    },
    {
      title: "Education",
      content: "Strong academic foundation in Computer Applications",
      details: [
        "Bachelor in Computer Application, IHRD College of Applied Science",
        "Holy Angels EMHSS Adoor - 11th and 12th",
        "Kendriya Vidyalaya Chenneerkara - 10th"
      ],
      icon: GraduationCap,
    },
    {
      title: "Certifications & Training",
      content: "Internships & Training",
      details: [
        "DevOps Course: 7-month course with internship at Synnefo Solutions",
        "System Administrator Training and Internship at Techvantage Analytics"
      ],
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen text-white font-mono p-8 relative">
      <Background />
      <ScrollProgress />
      <SocialLinks />
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 font-mono text-blue-500">
        DevOps Portfolio
      </h1>
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent transform -translate-x-1/2" />
        {sections.map((section, index) => (
          <PortfolioSection
            key={index}
            {...section}
            isLeft={index % 2 === 0}
            index={index}
          />
        ))}
      </div>
      <MarqueeR />
      <MarqueeL />
    </div>
  );
};

export default DevopsPortfolio;