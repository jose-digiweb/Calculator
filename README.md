# Calculator project

### This project was created using the fllowing technologies:
* HTML,
* CSS,
* Javascript

### This project uses Parcel js to build and bundle all the HTML, CSS and Javascript code.
#### Descriptions:
- In production, Parcel minifies the CSS code by default using **cssnano**, i only needed to set up the **autoprefixer** plugin manualy using the **postcss** config file for cross-browser support, and added the **browserslistrc** config file for extra support setups.
- Parcel also compiles and transpile the javascript code by default for the most basic usecases.
## How to use the App
#### Everything that is needed for this app to work is listed inside the package.json file, just follow the steps bellow:
1. Open the terminal on the project **root directory**,
2. Run the script: **npm install**,
3. Run the script: **npm start**,
4. The App will be ready to use on **localhost** using the **port** provided by Parcel (usually "1234") that will be logged into the terminal after the build process finishes.
* **Note:** In production, change the script: **npm start** to **npm build** for a better performance.

### Code formatting and documentation
 * First of all, I did my best to write the most self-documented code possible, as it should be.
 * Besides that, I used **inline comments** where was needed, so I can provide a more clear understanding of the purpose of every snipped as well as **methods**, the **inputs**, and what **output** they should produce.
 * All the code was formatted automatically by the **Prettier** VsCode extension. 
