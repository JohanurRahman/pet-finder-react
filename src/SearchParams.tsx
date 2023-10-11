import React, { useContext, useState } from 'react';
import Results from './Results';
import useBreedList from './hooks/useBreedList';
import fetchSearch from './fetchApi/fetchSearch';
import { useQuery } from '@tanstack/react-query';
import { Animal, Pet } from './APIResponsesTypes';
import { useDispatch, useSelector } from 'react-redux';
import { all } from './searchParamsSlice';
import { useSearchQuery } from './petApiService';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [animal, setAnimal] = useState('' as Animal);
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();
  const adoptedPet = useSelector(
    (state: { adoptedPet: { value: Pet } }) => state.adoptedPet.value
  );
  const searchParams = useSelector((state: any) => state.searchParams.value);

  let { isLoading, data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: (formData.get('animal')?.toString() as Animal) ?? ('' as Animal),
      breed: formData.get('breed')?.toString() ?? '',
      location: formData.get('location')?.toString() ?? '',
    };
    dispatch(all(obj));
  }

  return (
    <div className="search-params">
      <form onSubmit={(e) => handleSubmit(e)}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        <Results pets={pets} />
      )}
    </div>
  );
};

export default SearchParams;
