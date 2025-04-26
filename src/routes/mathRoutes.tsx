
import { RouteObject } from 'react-router-dom';

// Math Pages
import ArithmeticPage from '@/pages/math/ArithmeticPage';
import AlgebraPage from '@/pages/math/AlgebraPage';
import GeometryPage from '@/pages/math/GeometryPage';
import CalculusPage from '@/pages/math/CalculusPage';
import StatisticsPage from '@/pages/math/StatisticsPage';
import ProblemSolvingPage from '@/pages/math/ProblemSolvingPage'; // Added import

export const mathRoutes: RouteObject[] = [
  { path: '/math/arithmetic', element: <ArithmeticPage /> },
  { path: '/math/algebra', element: <AlgebraPage /> },
  { path: '/math/geometry', element: <GeometryPage /> },
  { path: '/math/calculus', element: <CalculusPage /> },
  { path: '/math/statistics', element: <StatisticsPage /> },
  { path: '/math/problem-solving', element: <ProblemSolvingPage /> } // Added route
];
