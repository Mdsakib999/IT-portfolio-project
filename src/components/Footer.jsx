import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Career", href: "#" },
  { label: "Our Team", href: "#" },
];

const quickLinks = [
  { label: "Case Studies", href: "#" },
  { label: "Terms & Condition", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact us", href: "#" },
];

const contactDetails = [
  {
    icon: <Mail className="w-4 h-4 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />,
    text: "itcompany@gmail.com",
  },
  {
    icon: <Phone className="w-4 h-4 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />,
    text: "+923183561921",
  },
  {
    icon: (
      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
    ),
    text: (
      <>
        Nasirabad Properties Road 1,
        <br />
        Chittagong, Bangladesh.
      </>
    ),
  },
];

const socialLinks = [
  {
    icon: <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600" />,
    href: "#",
  },
  {
    icon: <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-600" />,
    href: "#",
  },
  {
    icon: <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-400" />,
    href: "#",
  },
  {
    icon: <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-700" />,
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">
                Exabyting
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your partner in digital success! Web development, e-commerce, and
              custom IT solutions to boost your business.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Contact */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Address</h3>
            <div className="space-y-3">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start">
                  {item.icon}
                  <span className="text-gray-600 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 py-6 text-center">
          <p className="text-gray-500 text-sm">
            ©{" "}
            <span className="font-sans font-bold">
              {new Date().getFullYear()}
            </span>{" "}
            Copyright by{" "}
            <span className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent font-medium">
              SM IT Developers
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
