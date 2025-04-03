Overview

logoritma is a mobile application built with React Native and Expo that allows users to generate custom logos. The app provides a seamless interface for users to input prompts, select logo styles, and receive generated logos in real-time. It leverages Firebase for backend services, including Firestore for data storage and Firebase Functions for processing logo generation requests.

Features

- Input Screen:
  
Prompt Input: Users can enter descriptive text to generate a logo based on their specifications
Surprise Me: Button that provides random creative prompts for inspiration
Logo Style Selection: Horizontal scrollable list of style options (Neo, Abstract, Mascot, etc.)
Create Button: Initiates the logo generation process with a visually appealing gradient design

- Status Tracking:
  
-> Real-time Status Updates: Shows the current status of logo generation (processing, done, error)
-> Status Chip: Dynamic component that displays:
-> Processing status with loading indicator
-> Error status with warning icon and retry option
-> Done status with a small preview of the generated logo
-> Interactive States: Click to view completed logos or retry failed generations

- Output Screen:
  
Logo Preview: Displays the generated logo in high quality
Prompt Output: Shows the original prompt text with the ability to copy it
Logo Style Tag: Visual indicator of the style used for the generation
Close Button: Allows users to return to the input screen
Error Handling: Proper display for failed logo generations with retry options

- Navigation Flow:
  
-> Seamless transition between input and output screens
-> Proper state management when navigating between screens
-> Reset functionality when returning to input screen

Structure & Arc: 

-> React Native & Expo: Cross-platform mobile development framework
-> TypeScript: Type-safe code implementation
-> Navigation: React Navigation for screen management
-> UI Components: Custom-built reusable components with consistent styling

-> Firebase Firestore: Real-time database for storing logo requests and results
-> Firebase Functions: Serverless functions that process logo generation requests

Real-time Updates:

* Uses Firestore onSnapshot listeners to detect changes in logo generation status
* Updates UI immediately when backend processes are complete

Error Handling:

* Comprehensive error states for failed generations
* User-friendly error messages with retry options
* Debug logging for troubleshooting issues

Installation
-> Clone the repository
-> Install dependencies: npm install or yarn install

Set up Firebase:
* Create a Firebase project
* Add Firestore database
* Set up Firebase Functions
* Add Firebase configuration to the project

--> Start the development server: expo start

Development
Local Testing: Use Expo Go app on physical devices
Debugging: Console logging for tracking state changes
Mock Mode: Enables testing without actual AI backend integration
