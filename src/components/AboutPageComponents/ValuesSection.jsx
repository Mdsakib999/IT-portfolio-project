import React from "react";
import { Briefcase, Users, MessageCircle, ExternalLink } from "lucide-react";
import { Bar } from "../Shared/Bar";

export const ValuesSection = () => {
  return (
    <section className="md:py-16 px-4 md:px-20 bg-white text-gray-800 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="flex flex-col items-start justify-start">
          <Bar />
          <h2 className="text-4xl font-semibold">Values</h2>
        </div>
        <p className="text-lg font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent mt-2 md:mt-0 max-w-md">
          Software or hardware, we excel in executing projects, enhancing
          processes, and products through innovative technology at company name
        </p>
      </div>
      <hr className="mb-12 border-gray-300" />

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Value Card */}
        <ValueCard
          icon={<Briefcase className="w-8 h-8 text-purple-600" />}
          title="Experience"
          description="At Exabyting, we curate unparalleled experiences, blending technical expertise with creative solutions. Our commitment to crafting exceptional user experiences defines our approach, driving innovation and client satisfaction."
        />

        <ValueCard
          icon={<Users className="w-8 h-8 text-purple-600" />}
          title="Collaboration"
          description="Collaboration is the heartbeat of Exabyting. We foster a culture that thrives on teamwork, uniting diverse talents to deliver seamless software solutions and enriching educational experiences for our clients and learners."
        />

        <ValueCard
          icon={<MessageCircle className="w-8 h-8 text-purple-600" />}
          title="Communication"
          description="Clear and effective communication is foundational at Exabyting. We prioritize transparent and open dialogue, ensuring understanding and alignment within our team, with clients, and throughout our educational programs."
        />

        <ValueCard
          icon={<ExternalLink className="w-8 h-8 text-purple-600" />}
          title="Openness"
          description="Openness is ingrained in our culture at Exabyting. We embrace diverse perspectives, encourage curiosity, and foster an environment where ideas flow freely. It's the key to our innovative approach and continuous growth."
        />
      </div>
    </section>
  );
};

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
