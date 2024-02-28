import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReloadAndNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const reloadNeeded = localStorage.getItem('reloadNeeded');

    if (reloadNeeded) {
      localStorage.removeItem('reloadNeeded');

      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default ReloadAndNavigate;
