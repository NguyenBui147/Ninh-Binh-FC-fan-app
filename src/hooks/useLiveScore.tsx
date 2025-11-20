import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  FirebaseFirestoreTypes,
  where,
  limit
} from '@react-native-firebase/firestore';

// Kiểu dữ liệu thô từ Firestore
interface ScoreBoardData {
  status: 'live' | 'upcoming' | 'finished';
  awayTeam: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamScore: number;
  awayTeamScore: number;
  matchDateTime: string;
  stadium: string;
  time:string;
  formattedTime: FirebaseFirestoreTypes.Timestamp; // Thời gian bắt đầu trận đấu
}

// Kiểu dữ liệu đã xử lý để component sử dụng
export interface LiveScoreItem {
  id: string;
  status: 'live' | 'upcoming' | 'finished';
  awayTeam: string;
  homeTeam: string;
  awayTeamLogo: string;
  homeTeamLogo: string;
  score: string; 
  stadium: string;
  startTime: Date; 
}


export const useLiveScore = () => {
  const [match, setMatch] = useState<LiveScoreItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayTime, setDisplayTime] = useState('');
  useEffect(() => {
    const db = getFirestore();
    const scoreBoardRef = collection(db, 'matches2');

    const q = query(
      scoreBoardRef,
      where('status', '!=', 'finished'), 
      orderBy('status', 'desc'), 
      orderBy('time', 'asc'), 
      limit(1) 
    );

    const subscriber = onSnapshot(
      q,
      (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<ScoreBoardData>) => {
        if (querySnapshot.empty) {
          setMatch(null);
          setIsLoading(false);
          return;
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        const boardData: LiveScoreItem = {
          id: doc.id,
          status: data.status,
          awayTeam: data.awayTeam,
          homeTeam: data.homeTeam,
          awayTeamLogo: data.awayTeamLogo,
          homeTeamLogo: data.homeTeamLogo,
          score: data.status ==='upcoming'
            ? '|'
            : `${data.homeTeamScore} - ${data.awayTeamScore}`,
          stadium: data.stadium,
          
          startTime: data.formattedTime?.toDate(),
        };
        
        setMatch(boardData);
        setIsLoading(false);
      },
      (error: Error) => {
        console.error("Lỗi tải Live Score Board: ", error);
        setIsLoading(false);
      }
    );

    return () => subscriber();
  }, []);
  useEffect(() => {

    if (!match) {
      setDisplayTime(''); 
      return;
    }
    if (match.status === 'upcoming') {
      const date = match.startTime;
      const timeString =
      `${String(date.getDate())}/${String(date.getMonth())} | ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      setDisplayTime(`Trận đấu tiếp theo\n ${timeString}`);
      return; 
    }
    if (match.status === 'finished') {
      setDisplayTime('KẾT THÚC');
      return;
    }

    // Nếu trận đấu ĐANG DIỄN RA (LIVE)
    if (match.status === 'live') {
      const calculateMatchTime = () => {
        const startTimeMs = match.startTime.getTime();
        const nowMs = new Date().getTime();
        const elapsedMinutes = Math.floor((nowMs - startTimeMs) / 60000);

        if (elapsedMinutes <= 45) {
          setDisplayTime(`${elapsedMinutes}'`);
        } else if (elapsedMinutes > 45 && elapsedMinutes <= 60) {
          // Giả sử nghỉ 15 phút giữa hiệp
          setDisplayTime('HT'); // Half Time
        } else if (elapsedMinutes > 60 && elapsedMinutes <= 105) {
          // Hiệp 2 (45 phút + 15 phút nghỉ)
          setDisplayTime(`${elapsedMinutes - 15}'`);
        } else {
          // Bù giờ hoặc hết 90 phút
          setDisplayTime("90+'");
        }
      };

      // Chạy ngay lần đầu
      calculateMatchTime();

      // Cập nhật thời gian mỗi 10 giây
      const timer = setInterval(calculateMatchTime, 10000); 

      // Dọn dẹp interval khi component unmount
      return () => clearInterval(timer);
    }
    
  }, [match]); 
  return { match, isLoading, displayTime };
};