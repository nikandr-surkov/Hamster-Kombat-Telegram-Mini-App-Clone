// src/components/ExampleComponent.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ExampleComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/your-endpoint/'); // Adjust endpoint
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div> // Adjust according to your data structure
      ))}
    </div>
  );
};

export default ExampleComponent;
