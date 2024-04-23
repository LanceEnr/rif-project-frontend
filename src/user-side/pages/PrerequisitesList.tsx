import React, { useEffect, useState } from 'react';

// Define a TypeScript interface for the Prerequisite data
interface Prerequisite {
  id: number;
  unit: string;
  internalStakeholders: Stakeholder[];
  externalStakeholders: Stakeholder[];
}

interface Stakeholder {
  id: number;
  name: string;
}

const PrerequisitesList: React.FC = () => {
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrerequisites = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/prerequisites');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Prerequisite[] = await response.json();
        setPrerequisites(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch prerequisites:', error);
        setIsLoading(false);
      }
    };

    fetchPrerequisites();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Prerequisites</h1>
      {prerequisites.length > 0 ? (
        <ul>
          {prerequisites.map(prerequisite => (
            <li key={prerequisite.id}>
              <strong>Unit:</strong> {prerequisite.unit}
              <div>
                <strong>Internal Stakeholders:</strong>
                <ul>
                  {prerequisite.internalStakeholders.map(stakeholder => (
                    <li key={stakeholder.id}>{stakeholder.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>External Stakeholders:</strong>
                <ul>
                  {prerequisite.externalStakeholders.map(stakeholder => (
                    <li key={stakeholder.id}>{stakeholder.name}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No prerequisites found.</div>
      )}
    </div>
  );
};

export default PrerequisitesList;
