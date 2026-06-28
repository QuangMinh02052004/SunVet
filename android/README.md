# SunVet — App Android (WebView)

App native gói website SunVet (`https://thuysunvet.vercel.app`) thành ứng dụng Android cài được trên điện thoại.

## Build APK

Yêu cầu: **JDK 17** và **Android SDK** (platform `android-34`, build-tools `34.0.0`).

1. Tạo file `local.properties` trong thư mục này, trỏ tới Android SDK của bạn:
   ```
   sdk.dir=/Users/<ten-ban>/Library/Android/sdk
   ```
2. Build:
   ```bash
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
   ./gradlew assembleDebug
   ```
3. File APK nằm ở:
   ```
   app/build/outputs/apk/debug/app-debug.apk
   ```

## Đổi URL / tên app
- URL mở: sửa hằng `URL` trong `app/src/main/java/com/sunvet/app/MainActivity.java`.
- Tên app: sửa `app_name` trong `app/src/main/res/values/strings.xml`.
- Icon: thay các file `app/src/main/res/mipmap-*/ic_launcher.png`.

## Ghi chú
- APK build kiểu `assembleDebug` ký bằng **debug key** — cài trực tiếp cho cá nhân OK.
- Muốn lên Google Play thì cần `assembleRelease` + keystore riêng.
