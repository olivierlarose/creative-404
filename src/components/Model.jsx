import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { viewport } = useThree()
    const { nodes } = useGLTF('/medias/shards.glb')
    const materialProps = useControls({
        thickness: { value: 0.14, min: 0, max: 20, step: 0.01 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 0.99, min: 0, max: 1, step: 0.01},
        ior: { value: 1.5, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.75, min: 0, max: 1},
        backside: { value: false}
    })

    return (
            <group scale={viewport.width / 2.75} >
                {
                    nodes.Scene.children.map( (mesh, i) => {
                        return <Float><mesh {...mesh} key={i} receiveShadow={true} castShadow={true}>
                            <MeshTransmissionMaterial 
                                {...materialProps}
                            />
                        </mesh></Float>
                    })
                }
                <Text font='/fonts/PPNeueMontreal-Bold.otf' position={[0, 0, -.1]} fontSize={0.75} color="white" anchorX="center" anchorY="middle">
                404
                </Text>
                <Text font='/fonts/PPNeueMontreal-Regular.ttf' position={[0, -.275, -.1]} fontSize={0.04} color="white" anchorX="center" anchorY="middle">
                The link is broken
                </Text>
                <mesh position={[0, .05, -1]}>
                    <planeGeometry args={[3, 3, 20, 20]}/>
                    <meshStandardMaterial color="black"/>
                </mesh>
            </group>
    )
}

function Mesh({node}) {
    return (
        <mesh {...node}/>
    )
}