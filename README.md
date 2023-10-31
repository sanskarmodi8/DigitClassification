# Digit Classification Web App

This web application allows users to draw a digit and use a pre-trained machine learning model to predict the drawn digit.

![Digit Classifier](ss.png)

## Features

- Draw a digit using a drawing canvas.
- Clear the canvas.
- Predict the drawn digit.
- Display the predicted digit.

## Technologies Used

- React for the front-end.
- Flask for the back-end.
- TensorFlow/Keras for the machine learning model.
- Chakra UI for styling.

## Usage

1. Clone the repository to your local machine using the following command:

```bash
git clone <repository_url>
```

2. Navigate to the project directory:

```bash
cd DigitClassifier
```

3. Navigate to the server folder

```bash
cd server
```

4. Install the required dependencies using pip:

```bash
pip install -r requirements.txt
```

5. Run the Flask application:

```bash
python application.py
```

5. Navigate back from the server folder

```bash
cd ..
```

6. Install React scipts

```bash
npm install
```

7. Start the web app

```bash
npm start
```

You will be directed to the web page where you can draw input and model will predict the digit
