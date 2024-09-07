import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Environment, PerformanceMonitor,AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import Floor from './Floor';
import {Perf} from 'r3f-perf';

const Scene = () => {
  const debug = true;
  const boxRef = useRef();
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.02;
    boxRef.current.rotation.x += 0.02;
    boxRef.current.rotation.z += 0.04;
  });

  return (
    <>
    {debug && <Perf position="bottom-left" showGraph={true} minimal={false} />}
    {debug && <PerformanceMonitor />}
      <color attach="background" args={['#181111']} />
      <fog attach="fog" args={['#181111', 0, 15]} />
      <ambientLight intensity={0.05} />
      <directionalLight castShadow intensity={1} position={[1, 16, 4]} shadow-mapSize={[1024, 1024]} />
      
      <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.15, 0, 0]} position={[0, 0.92, 0]} castShadow >
        <meshNormalMaterial />
      </Box>

      <Floor />
      <Environment preset="night" />
    </>
  );
};

const App = () => {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <OrbitControls />
      <axesHelper args={[1.5]} />
      <Scene />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
};

export default App;
