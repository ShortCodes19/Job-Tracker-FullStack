import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Job Tracker Pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Organize, track, and manage your job applications effortlessly
          </p>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            Keep all your job opportunities in one place. Track application
            status, interview progress, and never miss an opportunity again.
          </p>

          {/* CTA Button */}
          <Link
            to="/jobs"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
