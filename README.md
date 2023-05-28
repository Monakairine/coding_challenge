# My Application

This is a web application that displays data related to legislators and bills, allowing you to analyze vote statistics and download CSV files.

## Questions Answered by the Application

The application answers the following questions:

1. **Question 1:** How many supported and opposed bills does each legislator have?
2. **Question 2:** How many supporters and opposers does each bill have?

## Getting Started

To run the application locally, follow the steps below:

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Monakairine/coding_challenge.git
   ```
2. Navigate to the project directory:
   ```shell
   cd challenge
   ```
3. Use the correct Node.js version specified in the .nvmrc file:
    ```shell
    nvm use
    ```
4. Install the dependencies:
     ```shell
    npm install
    ```

### Running the Application

To start the application, use the following command:

```shell
    npm run start
```

The application will be running at http://localhost:3000. Open this URL in your web browser to access the application.


## Discussion

I chose to develop the application in React and TypeScript. However, since it is a front-end example without backend involvement or a database, data retrieval (reading CSV files) and operations had to be performed entirely on the client-side. 

Without a backend, the data is exposed and accessible directly from the front-end, which raises concerns about data protection. In a production environment, it is recommended to have a backend in place to handle data retrieval, processing, and provide necessary security measures. This separation of concerns allows for better control over data access and ensures that sensitive information is not exposed to unauthorized users.

### Aplication changes:

To account for future columns such as "Bill Voted On Date" or "Co-Sponsors," the solution would require the following updates:

- Data Structure: Update the interfaces or data models to include the new columns, aligning the data structure with the expanded dataset.

- Data Retrieval: the data retrieval process would remain the same.

- Data Processing: Modify the calculations and statistics logic to incorporate the new columns. 

- User Interface: Update the UI components to display the new columns.


### Time spent

I dedicated an afternoon and a morning to complete this project. The majority of my time was spent on reading the CSV files and performing the necessary calculations. As I had not previously worked with CSV files directly in frontend applications, this presented a challenge 
### Alternative solutions:

If this were a time-constrained project with the sole objective of generating a CSV file with the answers, Python would be a suitable choice. Python, along with libraries like Pandas, provides efficient data processing capabilities and simplifies tasks such as reading CSV files, performing operations, and generating the desired output.

Additionally, if the data was available in BigQuery, leveraging its SQL querying capabilities would be beneficial. By loading the data into BigQuery tables and using SQL queries, it would be possible to extract the required information and present the results in Looker Studio, a powerful data visualization and exploration tool.




