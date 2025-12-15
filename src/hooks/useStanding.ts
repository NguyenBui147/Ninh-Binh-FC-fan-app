import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export interface TeamStats {
  played: number;
  win : number;
  draw : number;
  lose : number;
  gd : string;
  points: number;
}
export interface TeamStanding {
  id: string; 
  rank: number;
  name: string;
  logo: string;
  form: string[]; 
  stats: TeamStats; 
}

export const useStanding = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('standings')
      .orderBy('rank', 'asc')
      .onSnapshot(
        (querySnapshot) => {
          const list: TeamStanding[] = []; 
          querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data() as Omit <TeamStanding, 'id'>;           
            list.push({
              id: documentSnapshot.id,
              ...data,
            });
          });
          setStandings(list);
          setLoading(false);
        },
        (err) => {
          console.error('Lỗi,không lấy được BXH:', err);
          setError(err);
          setLoading(false);
        }
      );

    return () => subscriber();
  }, []);

  return { standings, loading, error };
};