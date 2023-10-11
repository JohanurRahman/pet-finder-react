import { QueryStatus, useQuery } from '@tanstack/react-query';
import fetchBreedList from '../fetchApi/fetchBreedList';
import { Animal } from '../APIResponsesTypes';
import { useGetBreedsQuery, useGetPetQuery } from '../petApiService';

function useBreedList(animal: Animal) {
  const { isLoading, data: breeds } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) {
    return [[], 'loaded'];
  }

  return [breeds ?? [], isLoading ? 'loading' : 'loaded'] as [
    string[],
    QueryStatus
  ];
}

export default useBreedList;
