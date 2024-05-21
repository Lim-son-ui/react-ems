import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

const Three_background = () => {
  const threeContainer = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;

    const init = async () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.zoom = 0.4;
      camera.updateProjectionMatrix();
      camera.position.set(7, 15, 20);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.shadowMap.enabled = true;
      threeContainer.current.appendChild(renderer.domElement);

      const sphereGeometry = new THREE.SphereGeometry(50, 30, 30);
      const hdriPath = 'https://storage.googleapis.com/umas_public_assets/michaelBay/day19/model/Warehouse-with-lights.jpg';
      const texture = await new THREE.TextureLoader().loadAsync(hdriPath);
      const sphereMaterial = new THREE.MeshStandardMaterial({ side: THREE.BackSide, color: 0xcceeff, map: texture });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);

      const addAmbientLight = () => {
        const light = new THREE.AmbientLight(0xffffff, 3);
        scene.add(light);
      };

      const addPointLight = (x, y, z) => {
        const pointLight = new THREE.PointLight(0xffffff, 1);
        scene.add(pointLight);
        pointLight.position.set(x, y, z);
        pointLight.castShadow = true;
        const lightHelper = new THREE.PointLightHelper(pointLight, 10, 0xffff00);
        lightHelper.update();
      };

      const control = new OrbitControls(camera, renderer.domElement);
      control.target.set(0, 2, 3);
      control.update();

      addAmbientLight();
      addPointLight(10, 18, -10);
      addPointLight(10, 18, 10);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      // Clean up Three.js scene
      // Dispose geometries, materials, etc. to free up memory
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      }

      // Dispose renderer
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={threeContainer} />;
};

export default Three_background;
