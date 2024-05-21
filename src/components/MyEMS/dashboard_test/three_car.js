import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const Three_car = () => {
  const threeContainer = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, orbitControls, agv, agvLight, cabinet;
    let time = 0;

    const init = async () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.position.set(7, 15, 20);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      threeContainer.current.appendChild(renderer.domElement);

      //增加背景
      const sphereGeometry = new THREE.SphereGeometry(150, 130, 130);
      const hdriPath = 'https://storage.googleapis.com/umas_public_assets/michaelBay/day19/model/Warehouse-with-lights.jpg';
      const texture = await new THREE.TextureLoader().loadAsync(hdriPath);
      const sphereMaterial = new THREE.MeshStandardMaterial({ side: THREE.BackSide, color: 0xcceeff, map: texture });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);


      // OrbitControls
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.target.set(0, 2, 3);
      orbitControls.update();

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const pointLight1 = new THREE.PointLight(0xffffff, 500);
      pointLight1.position.set(10, 18, -10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 500);
      pointLight2.position.set(10, 18, 10);
      scene.add(pointLight2);

      // AGV Light
      agvLight = new THREE.PointLight(0xffff00, 500, 50);
      agvLight.visible = false;

      // Load AGV Model
      const agvLoader = new GLTFLoader();
      const agvData = await agvLoader.loadAsync('https://storage.googleapis.com/umas_public_assets/michaelBay/day21/scene.gltf');
      agv = agvData.scene;
      agv.traverse(object => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      agv.scale.set(0.04, 0.04, 0.04);
      agvLight.position.set(0, 10 / 0.04, 4 / 0.04);
      agv.add(agvLight);
      scene.add(agv);

      // Load Cabinets
      const cabinetLoader = new GLTFLoader();
      const cabinetData = await cabinetLoader.loadAsync('https://storage.googleapis.com/umas_public_assets/michaelBay/day20/cabinet_mapping.gltf');
      const cabinetScene = cabinetData.scene;

      const createCabinetRow = (scene) => {
        return new Array(18).fill(0).map((_, i) => {
          const gap = Math.floor(i / 6);
          const position = new THREE.Vector3(0, 0, i * 4.2 + gap * 15 + 2);
          const clone = scene.clone();
          clone.position.copy(position);
          return clone;
        });
      };

      const createCabinetColumn = (scene, count) => {
        const row = createCabinetRow(scene);
        return row.map((cabinet, index) => {
          const gap = Math.floor(count / 2) * 15;
          const translateX = 6 * count + gap - 45;
          const translateZ = -50;
          const lookPX = count % 2 === 0;
          const rotationY = lookPX ? Math.PI : 0;
          cabinet.position.add(new THREE.Vector3(translateX, 0, translateZ));
          cabinet.rotation.y = rotationY;
          return cabinet;
        });
      };

      const cabinetGroup = new THREE.Group();
      new Array(8).fill(0).forEach((_, count) => {
        createCabinetColumn(cabinetScene, count).forEach(cabinet => {
          cabinetGroup.add(cabinet);
        });
      });
      scene.add(cabinetGroup);

      // Create planes
      const createPlane = (width, height, position, rotation) => {
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshStandardMaterial({ color: 'gray' });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(...position);
        plane.rotation.set(...rotation);
        scene.add(plane);
      };

      createPlane(120, 120, [0, 0, 0], [-Math.PI * 0.5, 0, 0]);
      createPlane(120, 30, [0, 15, -59], [0, 0, 0]);
      createPlane(120, 30, [0, 15, 59], [0, Math.PI, 0]);
      createPlane(120, 30, [-59, 15, 0], [0, Math.PI * 0.5, 0]);
      createPlane(120, 30, [59, 15, 0], [0, -Math.PI * 0.5, 0]);

      // Mouse interaction
      const mouseOnNdc = new THREE.Vector3(0, 0, 0);
      const idealTarget = new THREE.Vector3(0, 0, 0);
      const lerpingTarget = new THREE.Vector3(0, 0, 0);

      const onMouseMove = event => {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        const w = renderer.domElement.width;
        const h = renderer.domElement.height;
        mouseOnNdc.setX(mouseX / w - 0.5);
        mouseOnNdc.setY(-mouseY / h + 0.5);
      };
      renderer.domElement.addEventListener('mousemove', onMouseMove);

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        // Update AGV position
        const zRoute = Math.cos(time) * 30;
        agv.position.set(0, 0, zRoute);

        // // Follow camera
        const length = agv.position.distanceTo(camera.position);
        if (length > 20) {
        //   const distance = new THREE.Vector3().subVectors(camera.position, agv.position).normalize().multiplyScalar(20).add(agv.position);
        //   distance.y = 15;
        //   distance.add(new THREE.Vector3(1, 0, 2));
        //   camera.position.lerp(distance, 0.1);
        }

        // // Light flicker
        agvLight.visible = (time % 1 < 0.5);

        // // Mouse follow
        const mouseOnWorld = mouseOnNdc.clone().unproject(camera);
        const mouseOnWorldToCamera = new THREE.Vector3().subVectors(mouseOnWorld, camera.position).normalize();
        idealTarget.addVectors(mouseOnWorldToCamera.multiplyScalar(10), agv.position);
        lerpingTarget.lerp(idealTarget, 0.1);
        orbitControls.target.copy(lerpingTarget);

        orbitControls.update();
        renderer.render(scene, camera);
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        if (cabinet) {
            cabinet.rotation.y += 0.01;
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        time += 0.01;
      };
      animate();
    };

    init();

    return () => {
      // Cleanup
    //   renderer.domElement.removeEventListener('mousemove', onMouseMove);

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

  return <div ref={threeContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Three_car;

