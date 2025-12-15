import { useState,useEffect } from "react";
import { getFirestore , FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

interface useCollectionOptions{
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    limit?: number;
    where?: {
        field: string;
        operator: FirebaseFirestoreTypes.WhereFilterOp;
        value:any
    };

}

export const useCollection=<T>(
    collectionName: string,
    options?: useCollectionOptions
) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        let   q  :FirebaseFirestoreTypes.Query = getFirestore().collection(collectionName);
        if (options?.where) {
            q = q.where(
                options.where.field,
                options.where.operator,
                options.where.value
            );
        }
        if (options?.orderByField) {
            q=q.orderBy(
                options.orderByField,
                options.orderDirection || 'asc'
            );
        }
        if (options?.limit) {
            q=q.limit(options.limit);
        }
        const unsubcribe = q.onSnapshot(
            (snapshot) => {
                const list : T[] = [];
                snapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data()} as T);
                });
                setData(list);
                setLoading(false);
            },
            (err) => {
                console.log('error: ' , err)
                setError(err);
                setLoading(false);
            }
        );
        return () => unsubcribe();
    }, [collectionName, options]);

    return { data, loading, error };
}