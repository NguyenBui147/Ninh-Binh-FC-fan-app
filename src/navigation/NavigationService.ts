import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './NavigationTypes'; // Đảm bảo đường dẫn này đúng

/**
 * Tạo một tham chiếu (ref) cho NavigationContainer.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Hàm điều hướng đến một màn hình bất kỳ trong RootStackParamList.
 * @param name Tên màn hình (ví dụ: 'AuthStack', 'MainTabs')
 * @param params Các tham số tùy chọn
 */
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  // Kiểm tra xem NavigationContainer đã sẵn sàng chưa
  if (navigationRef.isReady()) {
    
    // --- ĐÂY LÀ PHẦN ĐÃ SỬA LỖI ---
    // Chúng ta không ép kiểu (as string) nữa.
    // Chúng ta kiểm tra xem params có tồn tại hay không và gọi đúng overload.
    
    if (params !== undefined) {
      // @ts-ignore - Bỏ qua lỗi TS ở đây vì name và params
      // đã được định kiểu chung (generic) ở trên, nhưng TS vẫn
      // không thể khớp chính xác overload.
      navigationRef.navigate(name, params);
    } else {
      // @ts-ignore - Bỏ qua lỗi TS
      navigationRef.navigate(name);
    }
  } else {
    console.warn(
      "[NavigationService] Cố gắng điều hướng trước khi NavigationContainer sẵn sàng."
    );
  }
}

/**
 * Hàm quay lại (pop) màn hình hiện tại ra khỏi Stack.
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn("[NavigationService] Không thể quay lại (goBack).");
  }
}

/**
 * Hàm reset toàn bộ Stack và đặt một màn hình mới làm gốc.
 */
export function resetRoot(routeName: keyof RootStackParamList) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: routeName }],
        });
    }
}