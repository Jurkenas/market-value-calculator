# Solution


## Tools required

- [Tomcat Server (10.0.16+)](https://tomcat.apache.org/download-10.cgi)
- [Node.JS (v17.4.0+)](https://nodejs.org/en/download/current/)
- [Java (OpenJDK 17.0.2+)](https://jdk.java.net/17/)
- [Maven (3.8.1+)](https://maven.apache.org/download.cgi)

*(Older versions may also work)*

# Run Locally

## Clone the project

Clone with

```bash
git clone https://github.com/Jurkenas
```

Go to the project directory

```bash
cd solution
```


## To make a production front-end build
Navigate to front-end folder

```bash
cd front-end
```
Install dependencies
```bash
npm install
```
Build the front-end part of a project
```bash
npm run build
```


## To make a production back-end build
**At this step, front-end needs to be already built**

Navigate to project's root directory (if you were still on a front-end directory)
```bash
cd ..
```

Build the back-end part of a project
```bash
mvn clean package
```

## Deploy artifact

Freshly built and ready to be deployed artifact will be located at:

- *solution/solution-app/target/ROOT.war*

Deploy it to your Tomcat Server and that's it!



# TL;DR

Front-end scripts
```bash
npm install             - install dependencies
npm run dev             - launch project in dev environment
npm run build           - production build
npm run test            - run tests
npm run test:watch      - start watching tests
```

Back-end scripts
```bash
mvn clean package       - production build
```