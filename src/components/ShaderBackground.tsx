import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  #define PI 3.14159265359
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 6; i++) {
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.5 + 0.5;
    
    float time = uTime * 0.15;
    
    vec2 q = vec2(0.0);
    q.x = fbm(uv + time * 0.3);
    q.y = fbm(uv + vec2(1.0));
    
    vec2 r = vec2(0.0);
    r.x = fbm(uv + q + vec2(1.7, 9.2) + time * 0.2);
    r.y = fbm(uv + q + vec2(8.3, 2.8) + time * 0.3);
    
    float f = fbm(uv + r);
    
    vec3 color1 = vec3(0.04, 0.04, 0.06);
    vec3 color2 = vec3(0.39, 0.4, 0.95);
    vec3 color3 = vec3(0.55, 0.36, 0.96);
    vec3 color4 = vec3(0.93, 0.29, 0.6);
    
    vec3 color = mix(color1, color2, clamp(f * f * 2.0, 0.0, 1.0));
    color = mix(color, color3, clamp(length(q) * 0.5, 0.0, 1.0));
    color = mix(color, color4, clamp(length(r.x) * 0.3, 0.0, 1.0));
    
    float mouseDist = distance(uv, mouse);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * 0.3;
    color += vec3(0.39, 0.4, 0.95) * mouseGlow;
    
    float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.2);
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  const handlePointerMove = (e: { point: { x: number; y: number } }) => {
    mouseRef.current.x = e.point.x;
    mouseRef.current.y = e.point.y;
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
