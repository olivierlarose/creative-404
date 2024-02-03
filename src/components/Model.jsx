import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { viewport } = useThree()
    const { nodes } = useGLTF('/medias/shards.glb')
    
    return (
            <group scale={viewport.width / 2.75} >
                {
                    nodes.Scene.children.map( (mesh, i) => {
                        return <Mesh data={mesh} key={i}/>
                    })
                }
                <Text />
                <Background />
            </group>
    )
}

function Text() {
    const font = '/fonts/PPNeueMontreal-Bold.otf'
    const textOption = {
        color: "white",
        anchorX: "center",
        anchorY: "middle"
    }
    return (
        <group>
            <Text font={font} position={[0, 0, -.1]} fontSize={0.75} {...textOption}>
            404
            </Text>
            <Text font={font} position={[0, -.275, -.1]} fontSize={0.04} {...textOption}>
            The link is broken
            </Text>
        </group>
    )
}

function Background() {
    return (
        <mesh position={[0, .05, -1]}>
            <planeGeometry args={[3, 3, 20, 20]}/>
            <meshStandardMaterial color="black"/>
        </mesh>
    )
}

function Mesh({data}) {

    const materialProps = useControls({
        thickness: { value: 0.14, min: 0, max: 20, step: 0.01 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 0.99, min: 0, max: 1, step: 0.01},
        ior: { value: 1.5, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.75, min: 0, max: 1},
        backside: { value: false}
    })

    return (
        <Float>
            <mesh {...data} receiveShadow={true} castShadow={true}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </Float>
    )
}