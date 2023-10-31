from flask import Flask, request, jsonify
import os
import base64
from PIL import Image, ImageOps
from tensorflow.keras.models import load_model
from flask_cors import CORS
import numpy as np

application = Flask(__name__)

app = application

CORS(app)
cors = CORS(app, resource={
    r"/*": {
        "origins": "*"
    }
})

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        data = request.get_json()
        image = data['image']
        print("Image -- \n\n", image)
        image = image.split(',')[1]
        image = base64.b64decode(image)
        with open('image.jpg', 'wb') as f:
            f.write(image)
        im = Image.open('image.jpg')
        im = im.convert('L')  # Convert to grayscale
        im_invert = ImageOps.invert(im)
        im_invert.save('image.jpg', quality=95)

        model = load_model('model.h5')

        # Load and preprocess the image
        image = Image.open('image.jpg')
        image = image.resize((28, 28))  # Resize to match the model's input shape
        image = np.array(image)
        image = image.astype('float32') / 255.0
        image = image.reshape(1, 28, 28, 1)  # Reshape for the model

        # Make predictions
        predictions = model.predict(image)

        # Find the predicted class
        predicted_class = np.argmax(predictions)

        # Use the predicted class as needed
        return jsonify({'prediction': str(predicted_class)})

    else:
        return 'server running'

if __name__ == '__main__':
    app.run(debug=True)
