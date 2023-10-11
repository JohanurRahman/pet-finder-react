import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchPet from './fetchApi/fetchPet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import { lazy, useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import { useDispatch } from 'react-redux';
import { adopt } from './adoptedPetSlice';

const Modal = lazy(() => import('./Modal'));

const Details = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    throw new Error('no id provided to details');
  }

  const results = useQuery(['details', id], fetchPet);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const dispatch = useDispatch();

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error('pet not found');
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      dispatch(adopt(pet));
                      navigate('/');
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
