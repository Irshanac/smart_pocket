"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchProviderCount } from '../../../redux/slices/studentsSlice';
import { AppDispatch, RootState } from '@/redux/store';

const JobPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { providerCounts,loading,error } = useSelector((state: RootState) => state.student);
  useEffect(() => {
    dispatch(fetchProviderCount());
  }, [dispatch]);
  if(loading)
    return <h1>loading.....</h1>
  if(error)
    return <h1>err</h1>
  return (
    <div>
     

      <h1>Provider Counts</h1>
      {providerCounts.length === 0 ? (
        <p>Loading provider counts...</p> 
      ) : (
        <ul>
          {providerCounts.map((provider) => (
            <li key={provider.name }>
              {provider.name} ({provider.description})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobPage;
