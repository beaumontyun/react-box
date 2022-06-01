import React, { useRef } from 'react';
import "./App.scss"
// NOTE: useFrame has to be used in its own component.
import { Canvas, useFrame } from "@react-three/fiber"

// import { Box } from "@react-three/drei"

const SpinningMesh = ({position, args, color}) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh position={position} ref={mesh}>
      {/* args always passed in an array: height, width, depth (i.e. X, Y, Z) */}
      <boxBufferGeometry attach='geometry' args={args} />
      <meshStandardMaterial attach='material' color={color} />
    </mesh>
  )
}

function App() {
  return (
    <>
      <Canvas camera={{position: [-5, 2, 10], fov: 30}}>
        {/* ambient light never has shadows */}
        <ambientLight intensity={.1} />
        <pointLight position={[-10, 0, -20]} intensity={.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue'/>
        <SpinningMesh position={[-2, 1, -5]} color='pink' />
        <SpinningMesh position={[5, 1, -2]} colo='green' />
      </Canvas>
    </>
  );
}

export default App;