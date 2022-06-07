import React, { useRef, useState } from 'react';
import "./App.scss"
// NOTE: useFrame has to be used in its own component.
import { Canvas, useFrame } from "@react-three/fiber"
import { softShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei"

import { useSpring, a } from '@react-spring/three'

softShadows()

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  //
  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand ? [ 1.4, 1.4, 1.4 ] : [ 1, 1, 1 ]
  })

  return (
    // "a." turns the mesh property into an animation and allow us to use useSpring hook
    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
      {/* args always passed in an array: height, width, depth (i.e. X, Y, Z) */}
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={.6} />
    </a.mesh>
  )
}

function App() {
  return (
    <>
      {/* set fov to adjust field of view (client will perceive an object large and small based on distance) */}
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        {/* ambient light never has shadows */}
        <ambientLight intensity={.1} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1025}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={.2} />
          </mesh>

          {/* set args values to adjust mesh size */}
          <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue' speed={2} />
          <SpinningMesh position={[-2, 1, -5]} color='pink' speed={6} />
          <SpinningMesh position={[5, 1, -2]} colo='green' speed={6} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;