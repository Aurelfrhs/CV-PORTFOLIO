import { useEffect, useRef } from 'react';

// SVG Icon Components
const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716H8.858l.24 2.573h6.347l-.366 3.523-2.91.804-2.956-.81-.188-2.11H6.415l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

const BootstrapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 0v24H0V0h24zM8.537 6.731v10.538h4.26c2.606 0 4.396-1.428 4.396-3.774 0-1.266-.57-2.314-1.543-2.853.422-.422.5-1.37.5-1.37s.422-1.291-.844-2.291c0 0-.632-.632-2.631-.632H8.537v.382z"/>
  </svg>
);

const JavascriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const LaravelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.04-.027.011-.008.022-.01.033-.018L9.56.762a.375.375 0 01.375 0L18.97 5.93c.01.008.022.01.033.018.015.009.028.017.04.027.013.014.02.03.033.045.008.011.02.02.023.033.01.019.02.041.023.058.005.012.01.021.014.032.009.032.014.065.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.007-.013.015-.027.024-.04.015-.01.03-.017.042-.028.014-.01.026-.023.041-.03L23.67 4.85a.375.375 0 01.375 0l4.996 2.884c.015.007.027.02.041.03.012.011.027.018.042.027.01.014.017.028.024.041.007.013.018.021.025.033.01.02.017.04.024.059.004.012.01.022.013.032.01.032.013.065.013.098zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.02-.028-.033v-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23 6.179v10.093l2.18-1.225V4.954zm8.956-3.657L18.424 5.4 23.76 2.974l-4.336-2.5zm-1.464.845L8.49 5.944l4.231 2.44 4.334-2.505zm-.006 15.192l2.143-1.225 4.324-2.489-4.325-2.503-2.142 1.23z"/>
  </svg>
);

const PhpIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.13 1.279-.39.297-.261.445-.633.445-1.116 0-.306-.086-.542-.257-.708-.172-.166-.415-.25-.728-.25-.156 0-.287.022-.394.066zm2.953.481c0 .484-.097.916-.292 1.296s-.464.684-.808.912c-.345.228-.741.342-1.187.342h-.989l-.292 1.503H5.13l1.256-6.456h1.94c.57 0 1.054.109 1.451.327.397.218.595.602.595 1.076zm6.212-.481h-.943l-.516 2.648h.838c.557 0 .983-.13 1.28-.39.296-.261.444-.633.444-1.116 0-.306-.086-.542-.257-.708-.171-.166-.414-.25-.727-.25-.156 0-.287.022-.394.066zm2.953.481c0 .484-.097.916-.292 1.296-.194.38-.464.684-.808.912-.344.228-.741.342-1.187.342h-.988l-.292 1.503h-1.265l1.256-6.456h1.94c.57 0 1.054.109 1.451.327.397.218.595.602.595 1.076zM12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z"/>
  </svg>
);

const MysqlIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-white">
    <path fill="currentColor" d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.151zM18.79 1.5c-.18.003-.31.016-.43.05-3.503.906-5.704 2.79-7.077 5.417-.199.38-.336.808-.336 1.284.013.016.02.031.039.047.32-.013.63-.06.91-.06.42-.013.81-.066 1.23-.066.42 0 .84.066 1.26.066.12 0 .24.013.36.039 0-.13 0-.26.06-.38.24-.81.63-1.56 1.08-2.31.45-.75.96-1.56 1.35-2.4.33-.72.42-1.530.42-2.310-.06-.12-.12-.24-.21-.36-.09-.12-.210-.24-.36-.24-.12 0-.24.06-.36.15-.09.09-.15.21-.15.36 0 .15.06.3.15.42.09.12.21.24.36.24.06 0 .12-.03.18-.06 0 .18-.03.36-.09.54-.06.18-.15.36-.24.54-.24.48-.66.96-1.08 1.35-.42.39-.93.69-1.44.75-.51.06-1.02-.12-1.35-.48-.33-.36-.39-.87-.39-1.38 0-.51.06-1.02.24-1.5.18-.48.45-.93.81-1.26.36-.33.78-.54 1.26-.54.48 0 .96.21 1.26.54.3.33.33.81.33 1.26 0 .45-.03.93-.15 1.35-.12.42-.36.78-.72.99-.36.21-.78.24-1.2.12-.42-.12-.78-.42-.93-.84-.15-.42-.06-.93.21-1.26.27-.33.72-.42 1.08-.24.36.18.54.66.36 1.02-.18.36-.66.54-1.02.36-.36-.18-.54-.66-.36-1.02.18-.36.66-.54 1.02-.36.36.18.54.66.36 1.02-.18.36-.66.54-1.02.36-.36-.18-.54-.66-.36-1.02.18-.36.66-.54 1.02-.36z"/>
  </svg>
);

const SKILLS_DATA = {
  frontend: [
    { name: "HTML", icon: HtmlIcon, color: "from-orange-500 to-red-400" },
    { name: "CSS", icon: CssIcon, color: "from-blue-500 to-cyan-400" },
    { name: "Bootstrap", icon: BootstrapIcon, color: "from-purple-600 to-purple-400" },
    { name: "JavaScript", icon: JavascriptIcon, color: "from-yellow-500 to-orange-400" },
    { name: "TailwindCSS", icon: TailwindIcon, color: "from-teal-500 to-cyan-400" },
  ],
  backend: [
    { name: "Laravel", icon: LaravelIcon, color: "from-red-600 to-red-400" },
    { name: "PHP", icon: PhpIcon, color: "from-purple-700 to-purple-500" },
    { name: "MySQL", icon: MysqlIcon, color: "from-blue-600 to-blue-400" },
  ]
};

const SkillItem = ({ skill }) => {
  const IconComponent = skill.icon;
  
  return (
    <div className="flex-shrink-0 mx-6 md:mx-10 group cursor-pointer">
      <div className="flex flex-col items-center space-y-3 transition-transform duration-500 hover:scale-110">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-6`}>
          <IconComponent />
        </div>
        <span className="text-base md:text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    </div>
  );
};

const Skills = () => {
  const frontendMarqueeRef = useRef(null);
  const backendMarqueeRef = useRef(null);

  useEffect(() => {
    if (frontendMarqueeRef.current) {
      frontendMarqueeRef.current.style.animation = 'marquee-right 80s linear infinite';
    }
    if (backendMarqueeRef.current) {
      backendMarqueeRef.current.style.animation = 'marquee-left 70s linear infinite';
    }
  }, []);

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + i * 15}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Header Section */}
        <div className="text-center mb-2 relative">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="font-big font-bold">
              SKILLS
            </span>
          </h2>
          
          <p className="font-work text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            I have skills in using various technologies that support web development effectively and efficiently, from design to database management and dynamic web application development.
          </p>
        </div>

        {/* Frontend Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            <div className="px-8">
              <h3 className=" text-3xl md:text-4xl font-bold">
                Frontend Development
              </h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            <div className="relative flex whitespace-nowrap">
              <div ref={frontendMarqueeRef} className="flex">
                {[...Array(15)].map((_, setIndex) => 
                  SKILLS_DATA.frontend.map((skill, index) => (
                    <SkillItem key={`frontend-${setIndex}-${index}`} skill={skill} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Backend Section */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
            <div className="px-8">
              <h3 className=" text-3xl md:text-4xl font-bold">
                Backend Development
              </h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-red-500/5"></div>
            <div className="relative flex whitespace-nowrap">
              <div ref={backendMarqueeRef} className="flex">
                {[...Array(20)].map((_, setIndex) => 
                  SKILLS_DATA.backend.map((skill, index) => (
                    <SkillItem key={`backend-${setIndex}-${index}`} skill={skill} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;