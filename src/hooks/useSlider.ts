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

export interface LiveScoreItem {
  id: string;
  statusFirestore: 'live' | 'upcoming' | 'finished'; 
  derivedStatus: 'live' | 'upcoming' | 'finished';
  awayTeam: string;
  homeTeam: string;
  awayTeamLogo: string;
  homeTeamLogo: string;
  score: string; 
  stadium: string;
  startTime: Date; 
}