import * as THREE from 'three'
import React, {useRef, useMemo} from 'react';
import {MeshReflectorMaterial, useTexture} from '@react-three/drei';
//import {useAppStore, useCameraStore, useUserInteractionStore} from './store';
import {useThree, useFrame} from '@react-three/fiber';
import {useSpring, animated, useSpringRef, a} from '@react-spring/three';
//import {aniconfig} from './configs';
const Floor = React.memo(() => {
  const texturePath = useMemo(() => import.meta.env.VITE_BASE_URL + `/normal_floor_512.jpg`);
  const normal = useTexture(texturePath);
  const aniconfig = {mass: 1, friction: 10, tension: 30};
  const api = useSpringRef();
  const {position, opacity} = useSpring({
    ref: api,
    position: [0, 0, 0],
    opacity: 1,
    config: aniconfig,
  });

  api.start({
    position:  [0, 0.0, 0],
    config: aniconfig,
  });

  return (
    <animated.mesh position={position} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
      <animated.planeGeometry args={[50, 100]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={100}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#181111"
        metalness={0.8}
        roughness={1}
        debug={0}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
});

Floor.displayName = 'Floor';
export default Floor;
