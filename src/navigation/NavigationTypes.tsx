import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


// ROOT STACK
export type RootStackParamList = {
    AuthStack: { screen?: keyof AuthStackParamList; params?: any };
    MainTabs: undefined;
    Splash: undefined;
}

export type RootStackScreensProps<T extends keyof RootStackParamList> = 
    NativeStackScreenProps<RootStackParamList, T>;


// AUTH STACK
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    Otp: { confirmationResult: FirebaseAuthTypes.ConfirmationResult };
    ForgotPassword: undefined;
}

export type AuthStackScreensProps<T extends keyof AuthStackParamList> = 
    NativeStackScreenProps<AuthStackParamList, T>;


// MAIN TAB (Custom tab navigator)
export type MainTabParamList = {
    news: undefined;
    shop: undefined;
    home: undefined;
    matches: undefined;
    social: undefined;
    profile: undefined;
}

export type MainTabScreensProps<T extends keyof MainTabParamList> = 
    BottomTabScreenProps<MainTabParamList, T>;


// HOME STACK
export type HomeStackParamList = {
    Home: undefined;
    LiveChat: undefined;
}

export type HomeStackScreensProps<T extends keyof HomeStackParamList> = 
    NativeStackScreenProps<HomeStackParamList, T>;


// NEWS STACK
export type NewsStackParamList = {
    News: undefined;
    DetailedNews:{id : string} ;
}

export type NewsStackScreensProps<T extends keyof NewsStackParamList> = 
    NativeStackScreenProps<NewsStackParamList, T>;


// SHOP STACK
export type ShopStackParamList = {
    Products: undefined;
    DetailedProducts: undefined;
    Ticket: undefined;
    DetailedTicket: undefined;
    CheckOut: undefined;
}

export type ShopStackScreensProps<T extends keyof ShopStackParamList> = 
    NativeStackScreenProps<ShopStackParamList, T>;


// SCHEDULE STACK
export type ScheduleStackParamList = {
    Matches: undefined;
    LeaderBoard: undefined;
}

export type ScheduleStackScreensProps<T extends keyof ScheduleStackParamList> = 
    NativeStackScreenProps<ScheduleStackParamList, T>;


// PROFILE STACK
export type ProfileStackParamList = {
    Profile: undefined;
}

export type ProfileStackScreensProps<T extends keyof ProfileStackParamList> = 
    NativeStackScreenProps<ProfileStackParamList, T>;


// MODAL STACK
export type ModalStackParamList = {
    Modal: undefined;
}

export type ModalStackScreensProps<T extends keyof ModalStackParamList> = 
    NativeStackScreenProps<ModalStackParamList, T>;


// SUB STACK (For modal/overlay navigation from MainTabs)
export type SubStackParamList = {
    Profile: undefined;
    Default: undefined;
}

export type SubStackScreensProps<T extends keyof SubStackParamList> = 
    NativeStackScreenProps<SubStackParamList, T>;


