import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  return <h1>ID: {id}</h1>;
};

export default Details;
