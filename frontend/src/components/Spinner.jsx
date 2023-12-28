import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="h-100 row justify-content-center align-content-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
