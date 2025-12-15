import { useState, useEffect } from 'react'; 
import  { getFirestore } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';

export interface Match {
  id: string;
  status: 'live' | 'upcoming' | 'finished' | string;
  awayTeam: string;
  homeTeam: string;
  awayTeamLogo: string;
  homeTeamLogo: string;
  homeTeamScore: number; // Lưu ý: Check kỹ trên firebase là số hay chuỗi
  homeTeamScorer: string; // Tên cầu thủ thường là string, bạn đang để number?
  awayTeamScore: number;
  awayTeamScorer: string;
  league: string;
  score: string;
  stadium: string;
  timeStamp: number;
  timeStr: string;
}

export const useMatches = () => {
  const [match, setMatch] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getFirestore()
      .collection(('matches'))
      .orderBy('timeStamp', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const matchesData: Match[] = [];
          getApp
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            matchesData.push({
              id: doc.id, 
              status: data.status || '',
              awayTeam: data.awayName || data.awayTeam || '', 
              homeTeam: data.homeName || data.homeTeam || '',
              awayTeamLogo: data.awayLogo || data.awayTeamLogo || '',
              homeTeamLogo: data.homeLogo || data.homeTeamLogo || '',
              homeTeamScore: data.homeScore || 0,
              homeTeamScorer: data.homeScorers || '', 
              awayTeamScore: data.awayScore || 0,
              awayTeamScorer: data.awayScorers || '',
              league: data.league || '',
              score: data.score || '',
              stadium: data.stadium || '',
              timeStamp: data.timeStamp || 0,
              timeStr: data.timeStr || '',
            } as Match);
          });

          setMatch(matchesData);
          setLoading(false);
        },
        (err) => {
          console.error("Lỗi lấy dữ liệu: ", err);
          setError('Không thể tải lịch sử đấu');
          setLoading(false);
        }
      );


    return () => unsubscribe(); 
  }, []); 

  return { match, loading, error };
};