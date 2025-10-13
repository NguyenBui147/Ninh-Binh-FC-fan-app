import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';




export type RootStackParamList = {
    Splash: undefined;
    AuthStack : undefined;
    MainTabs: undefined;
}

export type RootStackScreensProps
<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
    Login: undefined;
    Otp: undefined;
}
export type AuthStackScreensProps
<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabParamList = {
    MainTab : undefined;
    ShopTab: undefined;
    NewsTab: undefined;
    UserTab: undefined;

}
export type MainTabScreensProps
<T extends keyof MainTabParamList> = BottomTabScreenProps<MainTabParamList, T>;


