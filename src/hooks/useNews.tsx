import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  FirebaseFirestoreTypes, 
} from '@react-native-firebase/firestore';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: FirebaseFirestoreTypes.Timestamp;
  source: string;
}

export const useNews = (pageSize = 10) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // 2. Dùng useRef thay vì useState cho lastDoc để tránh re-render loop
  const lastDocRef = useRef<FirebaseFirestoreTypes.QueryDocumentSnapshot | null>(null);

  // 3. Bao bọc fetchNews bằng useCallback
  const fetchNews = useCallback(async (isLoadMore = false) => {
    const db = getFirestore();
    const newsRef = collection(db, 'news');
    
    try {
      let q;

      // Logic Query
      if (isLoadMore && lastDocRef.current) {
        q = query(
          newsRef,
          orderBy('publishedAt', 'asc'),
          startAfter(lastDocRef.current), 
          limit(pageSize)
        );
      } else {
        q = query(
          newsRef,
          orderBy('publishedAt', 'asc'),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const fetchedNews=snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsItem[];
        if (isLoadMore) {
          setNews(prev => [...prev, ...fetchedNews]);
        } else {
          setNews(fetchedNews);
        }
        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
        if (snapshot.docs.length < pageSize) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        if (!isLoadMore) {
           setNews([]);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi fetch news:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  }, [pageSize]); 
  
  useEffect(() => {
    fetchNews(false);
  }, [fetchNews]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setHasMore(true);
    lastDocRef.current = null;
    fetchNews(false);
  }, [fetchNews]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || loading) return;
    setIsLoadingMore(true);
    fetchNews(true);
  }, [isLoadingMore, hasMore, loading, fetchNews]);

  return { 
    news, 
    loading, 
    isRefreshing, 
    isLoadingMore, 
    onRefresh, 
    loadMore,
    hasMore 
  };
};