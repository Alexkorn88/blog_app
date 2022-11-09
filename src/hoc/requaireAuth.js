import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function RequaireAuth({ children }) {
  const location = useLocation();
  const signUpData = useSelector((state) => state.signUp);

  if (!signUpData.isLogin) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
}

export default RequaireAuth;
