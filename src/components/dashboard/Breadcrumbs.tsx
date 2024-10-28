import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center ${
              theme === 'dark'
                ? 'text-bolt-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'
            } transition-colors`}
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={name}>
              <li>
                <ChevronRight className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-bolt-gray-600' : 'text-gray-400'
                }`} />
              </li>
              <li>
                {isLast ? (
                  <span className={
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className={`${
                      theme === 'dark'
                        ? 'text-bolt-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    } transition-colors`}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;