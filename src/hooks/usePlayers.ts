import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
// import { chunkArray } from '../utils/chunkArray';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string; 
  image: string;
  dob: string;      
  nationality: string;
  team: string;
}
export type PlayerPair = (Player | null)[];
export interface PlayerSection {
  title: string;
  data: Player[];
}

export const usePlayers = () => {
  const [sections, setSections] = useState<PlayerSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('players') 
      .orderBy('number', 'asc') 
      .onSnapshot((querySnapshot) => {
        const players: Player[] = [];
        querySnapshot.forEach((doc) => {
          players.push({
            id: doc.id,
            ...doc.data(),
          } as Player);
        });
        const positionOrder = ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'];
        
        const grouped: PlayerSection[] = positionOrder.map(pos => ({
          title: pos,
          data: players.filter(p => p.position.includes(pos)) 
        })).filter(section => section.data.length > 0); 

        const others = players.filter(p => !positionOrder.some(pos => p.position.includes(pos)));
        if (others.length > 0) {
          grouped.push({ title: 'Ban huấn luyện', data: others });
        }
        setSections(grouped);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  return { sections, loading };
};