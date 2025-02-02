# Digger App

This project is a full-stack application with a FastAPI backend and a TypeScript frontend. It allows users to load data from a PostgreSQL database, filter tables, and display results in a user-friendly interface.


## Project Structure

```
digger/


├── backend
│   ├── main.py              # Entry point of the FastAPI application
│   ├── models.py            # Data models for request validation
│   ├── database.py          # Database connection logic
│   └── routers
│       ├── __init__.py      # Initializes routers for modular route management
│       └── example.py       # Example router for handling API requests
│   ├── requirements.txt     # Lists backend dependencies
│   └── README.md            # Documentation for the 
backend



├── frontend
│   ├── public
│   │   └── index.html       # HTML template for the React application
│   ├── src
│   │   ├── App.tsx          # Main component of the React application
│   │   ├── index.tsx        # Entry point for the React application
│   │   ├── index.css        # Global CSS for the React application
│   │   ├── components
│   │   │   ├── DatabaseViewer.tsx  # Component to display database data
│   │   │   └── EmptyTab.tsx        # Placeholder component
│   │   ├── services
│   │   │   └── api.ts       # Functions for making API calls to the backend
│   │   └── types
│   │       └── index.ts     # TypeScript interfaces for data models
│   ├── package.json          # Configuration file for npm
│   ├── tsconfig.json         # Configuration file for TypeScript
│   └── README.md             # Documentation for the frontend
├── .gitignore                # Specifies files to ignore by Git
└── README.md                 # Documentation for the entire project
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Create a Python virtual environment:
   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install the necessary Node.js packages:
   ```sh
   npm install
   ```

## Usage

Once both the backend and frontend are set up, you can run the FastAPI application and the React application to start using the software. Follow the respective README files in the backend and frontend directories for more detailed usage instructions.

### Running the Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Start the FastAPI application:
   ```sh
   uvicorn main:app --reload
   ```

### Running the Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Start the React application:
   ```sh
   npm start
   ```

## Architecture of the Project

![Architecture](images/architecture_project.png)
