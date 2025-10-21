import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center h-64 w-64 bg-gray-200 m-auto flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>

          <Link to="/" className="hover:text-blue-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;
