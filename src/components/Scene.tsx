'use client'

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthTexture = new THREE.TextureLoader().load(
			"/earth.jpg",
		);
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsVertices = []
    for (let i = 0; i < 6000; i++) {
      starsVertices.push(Math.random() * 100 - 50)
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const starsMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      earth.rotation.y += 0.001
      stars.rotation.y += 0.0001

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
	}, []);

	return <div ref={containerRef} className="w-full h-full" />;
}
