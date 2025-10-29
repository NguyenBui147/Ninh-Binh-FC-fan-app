import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


export type RootStackParamList = {
    AuthStack : undefined;
    MainTabs: undefined;
}

export type RootStackScreensProps
<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
    Splash:undefined;
    Login: undefined;
    Otp: { confirmationResult: FirebaseAuthTypes.ConfirmationResult };
    Main : undefined;
    Register:undefined;

}
export type AuthStackScreensProps
<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabParamList = {
    Home: undefined;
    Main:undefined;
    News: undefined;
    Shop: undefined;
    Profile: undefined;
    Match:undefined;
    User:undefined;
}
export type MainTabScreensProps
<T extends keyof MainTabParamList> = BottomTabScreenProps<MainTabParamList, T>;


