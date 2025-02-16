# 🚀 React + TypeScript + Vite Project

## 🛠 Project Information
- **Node Version:** 18.20.6  
- **npm Version:** 10.8.2  
- **React Version:** 19.0.0  

---

## 📖 How to Run the Project

### 1 Clone the Repository in a folder that you want
  ```
    git clone 'la url del proyecto' 
  ```

### 2 Navigate to it :
  ```
    cd technical-test-inditex
  ```
   
### 3 execute  :
  ```
    npm i
  ```
    
### 4 create a file .env in the proyect root folder with correct variables :
  ```
    VITE_API_URL : the url api
    
    VITE_API_KEY : the api key for the request
  ```

### 5  try to run :
  ```
    npm run dev
  ```

### 5  If all is correct, yo can enter in http://localhost:5173/ (or similar, depends of your configuration) and navigate in the app 

### 6(optional)  you can run test if you like with:
 ```
    npm run test
  ```


## Proyect structure
![image](https://github.com/user-attachments/assets/1b241911-8f5d-4f2e-bcf4-496f161d8b6d)

-api : functions for return all the mobiles, a specific mobile or filter with seach.

-assets: images and logos for the app

-components: Reusable components, for example the card div of products in the listView

-config: config file with connection to the API

-context: context for the cart

-test: files with the tests

-types: types for the differents objects types

-views: the three views required in the technical test : listView,ProductView and cartView

-utils: extra functions (like helpers) for a better organization and reusability

-index.css : file with styles for the app

-router.tsx: file with the correct routes for a good navigation between pages

-main.tsx: file that render the principal app

![image](https://github.com/user-attachments/assets/4d96aad7-2591-45a9-a236-60f912737e0a)

### Otros archivos importantes

- **package.json**: Contains the project's dependencies, execution scripts, and general configuration.

- **vite.config.js**: Configuration file for Vite. Vite is the bundler and development server used for this project, and its configuration can be found in this file.

- **tsconfig.json**: TypeScript configuration (if used). It defines the compilation options and the types of files to include in the project.

- **vitest.config.js**: Specific configuration file for Vitest. Here you can customize options for unit tests, such as the test environment and the inclusion of test files.


## Summary of what is the app and  how works


  

