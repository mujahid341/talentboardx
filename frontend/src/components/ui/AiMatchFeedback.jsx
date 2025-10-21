import { TrendingUp, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import PropTypes from 'prop-types';

const AiMatchFeedback = ({ aiMatchScore, aiFeedback }) => {
  // Determine color based on score
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getScoreTextColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!aiFeedback) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">AI Match Analysis</h3>
      </div>

      {/* Match Score Badge & Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Match Score</span>
          <div className={`px-4 py-2 rounded-full font-bold text-lg border-2 ${getScoreColor(aiMatchScore)}`}>
            {aiFeedback.matchScoreSummary || `${aiMatchScore}/100`}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(aiMatchScore)}`}
            style={{ width: `${aiMatchScore}%` }}
          />
        </div>
      </div>

      {/* Matching Skills */}
      {aiFeedback.matchingSkills && aiFeedback.matchingSkills.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Matching Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiFeedback.matchingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {aiFeedback.missingSkills && aiFeedback.missingSkills.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-900">Missing Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiFeedback.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendation */}
      {aiFeedback.recommendation && (
        <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">AI Recommendation</h4>
              <p className="text-gray-700 text-sm italic leading-relaxed">
                {aiFeedback.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AiMatchFeedback.propTypes = {
  aiMatchScore: PropTypes.number.isRequired,
  aiFeedback: PropTypes.shape({
    matchScoreSummary: PropTypes.string,
    matchingSkills: PropTypes.arrayOf(PropTypes.string),
    missingSkills: PropTypes.arrayOf(PropTypes.string),
    recommendation: PropTypes.string,
  }),
};

export default AiMatchFeedback;
