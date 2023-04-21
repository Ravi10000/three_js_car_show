import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

function Rings() {
  const itemsRef = useRef([]);
  useFrame((state) => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5;
      mesh.position.set(0, 0, -z);

      let dist = Math.abs(z);
      let s = 1 - dist * 0.04;
      mesh.scale.set(s, s, s);

      if (i % 2 === 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(0.5);
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(0.5);
      }
    }
  });
  return (
    <>
      {Array(16)
        .fill()
        .map((v, i) => {
          return (
            <mesh
              castShadow
              receiveShadow
              position={[0, 0, 0]}
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <torusGeometry args={[3.35, 0.05, 16, 100]} />
              <meshStandardMaterial
                emissive={[0.5, 0.5, 0.5]}
                color={[0, 0, 0]}
              />
            </mesh>
          );
        })}
    </>
  );
}

export default Rings;
