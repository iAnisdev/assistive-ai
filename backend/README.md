# Assistive AI Backend

This is the backend for the Assistive AI project. It is built using FastAPI and includes dependencies for machine learning and natural language processing.

## About the Project
This project was developed as part of the Machine Learning course in the Master of Science in Artificial Intelligence program. The goal is to create an accessible and efficient assistive technology that helps visually impaired users understand their surroundings through advanced AI-powered object detection and real-time audio feedback.

### Academic Context
- **Institution**: National College of Ireland
- **Program**: MS in Artificial Intelligence
- **Course**: Machine Learning
- **Semester**: Spring 2024

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup Instructions
1. **Create a Virtual Environment**  
   Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**  
   Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Backend**  
   Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
    The server will be available at `http://127.0.0.1:8000` and the API documentation can be accessed at `http://127.0.0.1:8000/docs`

## Project Structure
- `core/`: Core functionalities and configurations.
- `models/`: AI models setup, training and endpoints for inference.
- `routes/`: API routes for handling requests.
- `utils/`: Utility functions and helpers.
- `main.py`: Entry point for the FastAPI application.
- `requirements.txt`: List of Python dependencies.


## License

This project is licensed under the MIT License.
