import { motion } from "framer-motion";
import CommercialesNavbar from "./components/CommercialesNavbar";

const BusinessCentral = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <CommercialesNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-x-hidden">
        {/* Grid Background Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 120, 212, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-18 px-6 lg:px-16">
          <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            {/* Left Side Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.92, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3 bg-white rounded-lg p-8 lg:p-12 shadow-sm border border-blue-100/50 hover:shadow-xl hover:border-blue-200/60 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-cyan-100 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-7 h-7 stroke-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-medium text-slate-800 mb-3 tracking-tight">
                Financial Management
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Complete visibility into your financial operations with
                real-time reporting and analytics
              </p>
            </motion.div>

            {/* Center Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-lg p-12 lg:p-20 shadow-2xl relative overflow-hidden"
            >
              {/* Floating Orbs */}
              <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xs uppercase tracking-widest text-blue-200/70 mb-6 font-medium"
                >
                  ERP Solution
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-5xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight"
                >
                  Business Central
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg lg:text-xl text-blue-50/85 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                >
                  Unified business management for growing companies. Connect
                  your financials, sales, service, and operations.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-10 py-4 bg-white text-blue-600 rounded font-medium text-sm hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.92, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 bg-white rounded-lg p-8 lg:p-12 shadow-sm border border-blue-100/50 hover:shadow-xl hover:border-blue-200/60 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-cyan-100 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-7 h-7 stroke-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-medium text-slate-800 mb-3 tracking-tight">
                Supply Chain
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Optimize inventory, streamline procurement, and manage your
                entire supply chain efficiently
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400"
          >
            <span className="text-xs tracking-widest">EXPLORE</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 px-6 lg:px-16" id="features">
          <div className="max-w-[1600px] mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="text-xs uppercase tracking-widest text-blue-600 mb-4 font-medium">
                Comprehensive Capabilities
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-slate-800 mb-5 tracking-tight">
                Everything you need to run your business
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Business Central brings together all your core business
                functions in one intelligent, cloud-based platform designed for
                growing enterprises
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h18v18H3z M9 3v18 M15 3v18 M3 9h18 M3 15h18"
                    />
                  ),
                  title: "Sales & Service",
                  desc: "Manage your entire customer lifecycle from quote to cash with integrated CRM capabilities and service management",
                },
                {
                  icon: (
                    <g>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </g>
                  ),
                  title: "Project Management",
                  desc: "Plan, track, and deliver projects on time and on budget with resource allocation and time tracking",
                },
                {
                  icon: (
                    <g>
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </g>
                  ),
                  title: "Manufacturing",
                  desc: "Streamline production planning, shop floor control, and capacity management with real-time insights",
                },
                {
                  icon: (
                    <g>
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </g>
                  ),
                  title: "Business Intelligence",
                  desc: "Make data-driven decisions with built-in Power BI dashboards and advanced analytics capabilities",
                },
                {
                  icon: (
                    <g>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </g>
                  ),
                  title: "Human Resources",
                  desc: "Manage your workforce efficiently with employee records, absence tracking, and performance management",
                },
                {
                  icon: (
                    <g>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </g>
                  ),
                  title: "Security & Compliance",
                  desc: "Enterprise-grade security with role-based access control and compliance with global standards",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white rounded-lg p-10 lg:p-12 shadow-sm border border-blue-100/50 hover:shadow-2xl hover:border-blue-200/60 hover:-translate-y-1.5 transition-all duration-350 cursor-pointer group"
                >
                  <div className="w-16 h-16 mb-7 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-cyan-100 group-hover:scale-110 transition-all duration-350">
                    <svg
                      className="w-8 h-8 stroke-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-slate-900 text-white py-20 px-6 lg:px-16 mt-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-light mb-4 tracking-tight">
                  Business Central
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-light">
                  Comprehensive business management for modern enterprises. Part
                  of Microsoft Dynamics 365.
                </p>
              </div>

              {/* Footer Links */}
              {[
                {
                  title: "Products",
                  links: [
                    "Business Central",
                    "Finance",
                    "Sales",
                    "Supply Chain",
                  ],
                },
                {
                  title: "Resources",
                  links: [
                    "Documentation",
                    "Learning Paths",
                    "Community",
                    "Support",
                  ],
                },
                {
                  title: "Company",
                  links: ["About Microsoft", "Partners", "Careers", "News"],
                },
              ].map((column, i) => (
                <div key={i}>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-6 font-medium">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href="#"
                          className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-light"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer Bottom */}
            <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <div>© 2026 Microsoft Corporation. All rights reserved.</div>
              <div>Dynamics 365 Business Central</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BusinessCentral;
