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
  time: string;
  formattedTime: FirebaseFirestoreTypes.Timestamp;
}

// Kiểu dữ liệu đã xử lý
export interface LiveScoreItem {
  id: string;
  // statusFirestore: Trạng thái gốc từ DB để check 'finished'
  statusFirestore: 'live' | 'upcoming' | 'finished'; 
  // derivedStatus: Trạng thái do client tự tính toán (để hiển thị UI)
  derivedStatus: 'live' | 'upcoming' | 'finished';
  awayTeam: string;
  homeTeam: string;
  awayTeamLogo: string;
  homeTeamLogo: string;
  score: string; 
  stadium: string;
  startTime: Date; 
}