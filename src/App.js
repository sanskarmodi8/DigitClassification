import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState('____');

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  const startDrawing = e => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
  };

  const draw = e => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const predictDigit = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/jpg');

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataURL }),
    })
    .then(res => res.json())
    .then(data => {
      setResult(data.prediction);
    })
    .catch(err => console.log(err));
  };

  return (
    <ChakraProvider>
      <Box w={'100vw'} h={'100vh'} bgColor={'white'}>
        <VStack mx={'auto'} mt={'25vh'}>
          <Heading mb={'10px'} color={'blackAlpha.800'}>
            Draw Your Digit below
          </Heading>
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            style={{
              backgroundColor: 'white',
              border: '1px dashed black',
              borderRadius: '10px',
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
          <HStack>
            <Button
              onClick={clearCanvas}
              my={'10px'}
              colorScheme="teal"
              size="md"
            >
              Clear
            </Button>
            <Button onClick={predictDigit} colorScheme="teal" size="md">
              Predict
            </Button>
          </HStack>
          <Text mt={'10px'} fontSize={'lg'} color={'blackAlpha.900'}>
            Predicted Digit : {result}
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
