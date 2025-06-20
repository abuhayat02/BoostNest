export default function ServicesCardSection() {
  const services = [
    {
      icon: "⏱️",
      title: "Monetize with Watch Time",
      description: "Achieve 4000+ hours with high-retention and targeted watch campaigns.",
    },
    {
      icon: "👥",
      title: "Grow Subscribers",
      description: "Gain niche-relevant and engaging subscribers for long-term growth.",
    },
    {
      icon: "🚀",
      title: "Increase Views",
      description: "Boost your videos with real and organic views from active audiences.",
    },

    {
      icon: "🎯",
      title: "SEO Optimization",
      description: "Optimize your titles, tags, and metadata for maximum reach.",
    },
  ];

  return (
    <section className=" text-white py-28 bg-black/20 px-4 sm:px-8">
      <h2 className="text-3xl sm:text-4xl animate-float1 font-bold text-center mb-12">
        <span className="text-red-500 ">
          YouTube
        </span> Services Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#111] hover:bg-[#1a1a1a]  transition-colors  p-6 shadow-lg hover:shadow-red-600/40"
          >
            <div className="text-4xl animate-float1  mb-4">{service.icon}</div>
            <h3 className="text-xl animate-float1  font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
