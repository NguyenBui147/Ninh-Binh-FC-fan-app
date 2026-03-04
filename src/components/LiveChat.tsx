import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import Colors from '../assets/colors/colors';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: any;
}

interface LiveChatProps {
  matchId: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ matchId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const messagesRef = firestore()
      .collection('matches')
      .doc(matchId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50);

    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [matchId]);

  const handleSend = async () => {
    if (!inputText.trim() || !user) return;

    setSending(true);
    try {
      await firestore()
        .collection('matches')
        .doc(matchId)
        .collection('messages')
        .add({
          text: inputText.trim(),
          userId: user.uid,
          userName: user.displayName || 'Live Chat trận đấu',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setInputText('');
    } catch (error) {
      console.error('Lỗi gửi tin nhắn:', error);
    } finally {
      setSending(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.userId === user?.uid;

    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.myMessageRow : styles.theirMessageRow,
        ]}
      >
        {!isMe && (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.userName.charAt(0)}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.bubble,
            isMe ? styles.myBubble : styles.theirBubble,
          ]}
        >
          {!isMe && (
            <Text style={styles.userName}>{item.userName}</Text>
          )}
          <Text
            style={[
              styles.messageText,
              isMe && styles.myMessageText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bình luận trực tiếp</Text>
        <View style={styles.liveBadge}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={user ? 'Viết bình luận...' : 'Đăng nhập để chat'}
          editable={!!user}
          placeholderTextColor="#999"
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    marginRight: 4,
  },
  liveText: {
    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
  },

  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
  },
  myBubble: {
    backgroundColor: Colors.primaryColor || '#d32f2f',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  myMessageText: {
    color: 'white',
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    color: '#333',
    height: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryColor || '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
});

export default LiveChat;
