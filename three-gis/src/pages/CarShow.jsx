import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, Canvas } from '@react-three/fiber';
import { React, useRef } from 'react';

import deg from '../utils/deg';

function CarShow() {
  return (
    <Canvas>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault position={[1, 1, 1]} />

      <axesHelper scale={10} />

      <mesh
        position={[0, 2, 0]}
        rotation={[0, 0, deg(45)]}
        scale={[2, 1, 1]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  );
}

export default CarShow;
