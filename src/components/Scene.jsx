'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import { Environment, CameraControls } from '@react-three/drei'
export default function Scene() {

    return (
        <Canvas orthographic style={{background: "#DDDBDA"}} camera={{position: [0, 0, 1], zoom: 800}}>
            <Model />
            {/* <CameraControls /> */}
            <directionalLight intensity={3} position={[0, 0.1, 1]} />
            <Environment preset="city"/>
        </Canvas>
    )
}
