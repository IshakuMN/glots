import { FaLinkedin, FaTwitter, FaTiktok, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="max-w-screen-lg mx-auto mb-6">
      <div className="h-[0.3px] bg-gray-300 mb-2"></div>
      <div className="flex justify-between m-4">
        <p>Copyright © 2023 glots™ | All Rights Reserved | Privacy | Terms</p>
        <div className="flex gap-x-4">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
