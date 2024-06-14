# bp-react-native-1

## Table of Contents
  * [Getting Started](#getting-started)
    +  [Prerequisites](#prerequisites)
    +  [Troubleshooting](#troubleshooting)
  * [Local Setup](#local-setup)
  * [Testing](#testing)
  * [Build](#build)
  * [Deployment](#deployment)

# Getting Started
## Prerequisites

| Package  | Version |
| ------------- | ------------- |
| Node js  | [18.19.0](https://nodejs.org/download/release/v18.19.0/)  |
| npm  | 10.2.3  |
| Java | [17](https://docs.oracle.com/en/java/javase/17/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A) |
| Xcode | [14.1](https://download.developer.apple.com/Developer_Tools/Xcode_14.1/Xcode_14.1.xip) |
| Android Studio | [2023.3.1](https://developer.android.com/studio/archive?_gl=1*1te5zjp*_up*MQ..&gclid=Cj0KCQiAw6yuBhDrARIsACf94RUKCIylOdaF-nQPBZFZ-kjz1j2n1fyUYH31x8n9mJYCvHudAsHMJs0aAg6QEALw_wcB&gclsrc=aw.ds) |

Then complete the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions.
>**Note**: Please follow the React native CLI setup from the environment setup documentation of react native

# Local Setup

## Step 1: Clone the repository

To clone the project to your local machine, execute the following command in your root directory.

 `git clone https://github.com/dikshit-n/bp-react-native-1.git `

If you have done the ssh setup, use

`git clone git@github.com:dikshit-n/bp-react-native-1.git `

Once the project is successfully cloned, run the following command in your terminal 

 `npm install `

Then, if you intend to run iOS app locally, navigate to iOS folder and run,

`pod install`

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run and modified your React Native App.

# Troubleshooting
* If you have problem with running android and iOS build in local using the following commands
	* `npm run android`
	* `npm run iOS`

* Then try running it with the metro bundler command
  * Run `npm start`
	* Press `i` to start iOS app
	* Press `a` to start android app

<!-- # Icons
* Any icon from [this](https://oblador.github.io/react-native-vector-icons/) page will work. -->

# Testing

# Build

|Script|Description|Output|
|--|--|--|
|`npm run build:android`|Creates an `apk` build with `.env.dev`|`android/app/build/outputs/apk/dev/debug/app-dev-debug.apk`|
|`npm run build:android:dev`|Creates an `apk` build with `.env.dev`|`android/app/build/outputs/apk/dev/debug/app-dev-debug.apk`|
|`npm run build:android:apk:dev`|Creates an `apk` build with `.env.dev`|`android/app/build/outputs/apk/dev/debug/app-dev-debug.apk`|
|`npm run build:android:aab:dev`| Creates an `aab` build with `.env.dev`|`android/app/build/outputs/bundle/devDebug/app-dev-debug.aab`|
|`npm run build:android:qa`|Creates an `apk` build with `.env.qa`|`android/app/build/outputs/apk/qa/debug/app-qa-debug.apk`|
|`nm run build:android:apk:qa`|Creates an `apk` build with `.env.qa`|`android/app/build/outputs/apk/qa/debug/app-qa-debug.apk`|
|`npm run build:android:aab:qa`|Creates an `aab` build with `.env.qa`|`android/app/build/outputs/bundle/qaDebug/app-qa-debug.aab`|
|`npm run build:android:prod`|Creates an `aab` build with `.env.prod`|`android/app/build/outputs/bundle/prodDebug/app-prod-debug.aab`|
|`npm run build:android:apk:prod`|Creates an `apk` build with `.env.prod`|`android/app/build/outputs/apk/prod/debug/app-prod-debug.apk`|
|`npm run build:android:aab:prod`|Creates an `aab` build with `.env.prod`|`android/app/build/outputs/bundle/prodDebug/app-prod-debug.aab`|

# Deployment
> [!NOTE]
> Before deployment, check `package.json` for version upgrade scripts and update your app version accordingly
## Android
* Download and install `2023.3.1` version of Android Studio
* Open the android folder from your react-native app
* Then from menu bar **Build -> Generate Signed App Bundle / APK**

<img width="791" alt="Screenshot 2024-06-07 at 1 10 23 PM" src="https://github.com/AveonInfotech/ap-warehouse/assets/62920150/fac2d80d-d996-4bf9-859d-34d62bd77553">

* Select Android App Bundle
* Key store path - for the file `android -> app -> ap-warehouse-upload-key.keystore`, use `Copy path` option to get the path to paste in this textbox
<img width="635" alt="Screenshot 2024-06-07 at 1 12 29 PM" src="https://github.com/AveonInfotech/ap-warehouse/assets/62920150/2116083d-07e8-4f09-a12a-88afd6d0b0fe">

* Key store password - get it from your admin
* Key alias - `ap-warehouse-prod`
* Key password - get it from your admin

> [!NOTE]
> If there is no existing keystore file, please create a new one with the `Create New` option


<img width="534" alt="Screenshot 2024-06-07 at 1 15 11 PM" src="https://github.com/AveonInfotech/ap-warehouse/assets/62920150/caf1a55c-2657-4b67-a3ce-f42cf065ab31">


* Choose `prodRelease` as build variant

	
<img width="525" alt="Screenshot 2024-06-07 at 1 15 46 PM" src="https://github.com/AveonInfotech/ap-warehouse/assets/62920150/4a2d4ab1-f654-4235-aac2-b583878d69bd">


* Note the Destination folder. That's where your build will get stored
* Now click on create
* :tada: You got the build ready to be updated in play store
