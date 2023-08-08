import {
  Box, OrbitControls, PerspectiveCamera, useKeyboardControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  React, useEffect, useRef,
} from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import deg from '../utils/deg';

function MyElement3D() {
  const refMesh = useRef();
  const refWireMesh = useRef();

  // const {
  //   xSize, ySize, zSize, xSegments, ySegments, zSegments, radius,
  // } = useControls({
  //   xSize: {
  //     value: 1, min: 0.1, max: 5, step: 0.01,
  //   },
  //   ySize: {
  //     value: 1, min: 0.1, max: 5, step: 0.01,
  //   },
  //   zSize: {
  //     value: 1, min: 0.1, max: 5, step: 0.01,
  //   },
  //   xSegments: {
  //     value: 1, min: 1, max: 10, step: 1,
  //   },
  //   ySegments: {
  //     value: 1, min: 1, max: 10, step: 1,
  //   },
  //   zSegments: {
  //     value: 1, min: 1, max: 10, step: 1,
  //   },
  // });

  // const {
  //  radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength,
  // } = useControls({
  //   radius: {
  //     value: 1, min: 0.1, max: 5, step: 0.01,
  //   },
  //   widthSegments: {
  //     value: 32, min: 1, max: 256, step: 1,
  //   },
  //   heightSegments: {
  //     value: 32, min: 1, max: 256, step: 1,
  //   },
  //   phiStart: {
  //     value: 0, min: 0, max: 360, step: 0.1,
  //   },
  //   phiLength: {
  //     value: 360, min: 0, max: 360, step: 0.1,
  //   },
  //   thetaStart: {
  //     value: 0, min: 0, max: 180, step: 0.1,
  //   },
  //   thetaLength: {
  //     value: 180, min: 0, max: 180, step: 0.1,
  //   },

  // });

  const {
    radius, tube, radialSegments, tubularSegments, arc,
  } = useControls({
    radius: {
      value: 1, min: 0.1, max: 5, step: 0.01,
    },
    tube: {
      value: 0.4, min: 0.4, max: 5, step: 0.01,
    },
    radialSegments: {
      value: 12, min: 12, max: 5, step: 0.01,
    },
    tubularSegments: {
      value: 48, min: 48, max: 256, step: 1,
    },
    heightSegments: {
      value: 180, min: 0, max: 180, step: 0.1,
    },

  });

  useEffect(() => {
    // console.log(refWireMesh.current.geometry);
    // refWireMesh.current.geometry = refMesh.current.geometry;
    // }, [topRadius, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]);
  }, [radius, tube, radialSegments, tubularSegments, arc]);
  // }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  return (
    <Canvas>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <axesHelper scale={10} />

      <mesh ref={refMesh}>
        {/* <boxGeometry args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]} /> */}
        {/* <sphereGeometry args={[radius, widthSegments, heightSegments, phiStart * Math.PI / 180, phiLength * Math.PI / 180, thetaStart * Math.PI / 180, thetaLength * Math.PI / 180]} /> */}
        {/* <cylinderGeometry args={[topRadius, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart * Math.PI / 180, thetaLength * Math.PI / 180]} /> */}
        <torusGeometry args={[radius, tube, radialSegments, tubularSegments, arc]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" color="red" wireframe />
      </mesh>
    </Canvas>
  );
}

export default MyElement3D;
