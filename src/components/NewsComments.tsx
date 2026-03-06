import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import Colors from '../assets/colors/colors';

interface Comment {
    id: string;
    text: string;
    userId: string;
    userName: string;
    createdAt: any;
}

interface NewsCommentsProps {
    newsId: string;
}

const NewsComments: React.FC<NewsCommentsProps> = ({ newsId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [inputText, setInputText] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const commentsRef = firestore()
            .collection('news')
            .doc(newsId)
            .collection('comments')
            .orderBy('createdAt', 'desc');

        const unsubscribe = commentsRef.onSnapshot(snapshot => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Comment[];

            setComments(msgs);
        });

        return () => unsubscribe();
    }, [newsId]);

    const handleSend = async () => {
        if (!inputText.trim() || !user) return;

        setSending(true);
        try {
            await firestore()
                .collection('news')
                .doc(newsId)
                .collection('comments')
                .add({
                    text: inputText.trim(),
                    userId: user.uid,
                    userName: user.displayName || 'Người hâm mộ',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

            setInputText('');
        } catch (error) {
            console.error('Lỗi gửi bình luận:', error);
        } finally {
            setSending(false);
        }
    };

    const renderComment = (item: Comment) => {
        const date = item.createdAt ? item.createdAt.toDate().toLocaleString('vi-VN') : 'Mới đây';

        return (
            <View key={item.id} style={styles.commentContainer}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                        {item.userName.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Bình luận ({comments.length})</Text>

            <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder={user ? 'Viết bình luận của bạn...' : 'Đăng nhập để bình luận'}
                        editable={!!user}
                        placeholderTextColor="#999"
                        multiline
                    />
                    <Pressable
                        style={[
                            styles.sendButton,
                            (!inputText || !user) && styles.disabledBtn,
                        ]}
                        onPress={handleSend}
                        disabled={!inputText || !user || sending}
                    >
                        {sending ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <MaterialCommunityIcons
                                name="send"
                                size={20}
                                color="white"
                            />
                        )}
                    </Pressable>
                </View>
            </View>

            <View style={styles.commentsList}>
                {comments.map(renderComment)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    inputSection: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        color: '#333',
        paddingTop: 10,
        paddingBottom: 10,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.primaryColor || '#d32f2f',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        marginLeft: 10,
    },
    disabledBtn: {
        backgroundColor: '#ccc',
    },
    commentsList: {
        gap: 15,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    commentContent: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    userName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    dateText: {
        fontSize: 11,
        color: '#888',
    },
    commentText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});

export default NewsComments;
