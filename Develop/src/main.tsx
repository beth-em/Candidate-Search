import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Import components
import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// Creat a browser router to manage routes for the app
const router = createBrowserRouter([
  {
    path: '/',          // Root route
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch />,      // Function to load the candidate search page
      },
      {
        path: '/saved-candidates',
        element: <SavedCandidates />,      // Function to load saved candidates page
      },
    ],
  },
]);

// Function to render the React app into the root DOM element
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />);
}
