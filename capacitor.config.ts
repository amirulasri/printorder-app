import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amirulasri.app',
  appName: 'Print Order',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // ...
    SplashScreen: {
      launchAutoHide: false,
      androidSplashResourceName: 'launch_splash',
    },
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
