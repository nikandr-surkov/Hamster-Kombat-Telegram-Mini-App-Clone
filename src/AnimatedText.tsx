import React from 'react';
import { Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const AnimatedText = () => {
  const props = useSpring({
    to: { opacity: 1, transform: 'scale(1.1)' },
    from: { opacity: 0, transform: 'scale(0.9)' },
    config: { tension: 200, friction: 10 },
    loop: { reverse: true },
  });

  return (
    <animated.div style={props}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Comic Sans MS", cursive, sans-serif', // Example font type
          fontSize: '1rem', // Example font size
          background: 'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)', // Gradient background
          WebkitBackgroundClip: 'text', // Ensures the gradient clips to the text
          WebkitTextFillColor: 'transparent', // Makes the text transparent to reveal the gradient
        }}
      >
        TAP BIRD APP
      </Typography>
    </animated.div>
  );
};

export default AnimatedText;
