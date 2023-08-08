import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  React, useEffect, useRef, useState,
} from 'react';
import * as THREE from 'three';

import deg from '../utils/deg';

function MyBox(props) {
  const geo = new THREE.BoxGeometry();

  return <mesh {...props} geometry={geo} />;
}

function MyElement3D() {
  const refMesh = useRef();
  const refWireMesh = useRef();
  const [refAllocated, setRefAllocated] = useState(false);

  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, []);

  return (
    <Canvas>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <axesHelper scale={10} />

      <mesh ref={refMesh}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" color="red" wireframe />
      </mesh>
    </Canvas>
  );
}

export default MyElement3D;

//  {/* <Box position={[1, 2, 0]}>
//         <meshStandardMaterial color="blue" />
//       </Box>

//       <MyBox position={[2, 2, 0]}>
//         <meshStandardMaterial color="green" />
//       </MyBox> */}
