import { LOD } from 'three';
import { useMemo } from 'react';
import * as THREE from 'three';

const FloorLOD = ({ material, size, maxSize }) => {
  const lod = useMemo(() => {
    const lod = new LOD();
    
    const highDetailGeometry = new THREE.PlaneGeometry(size, maxSize, 128, 128);
    const mediumDetailGeometry = new THREE.PlaneGeometry(size, maxSize, 64, 64);
    const lowDetailGeometry = new THREE.PlaneGeometry(size, maxSize, 32, 32);
    
    lod.addLevel(new THREE.Mesh(highDetailGeometry, material), 0);
    lod.addLevel(new THREE.Mesh(mediumDetailGeometry, material), 50);
    lod.addLevel(new THREE.Mesh(lowDetailGeometry, material), 100);
    
    return lod;
  }, [material, size, maxSize]);

  return <primitive object={lod} />;
};

export default FloorLOD;