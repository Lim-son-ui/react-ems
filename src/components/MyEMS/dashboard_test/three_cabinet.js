import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

// import { MeshReflectorMaterial } from 'three/examples/jsm/objects/Reflector'
// import { Reflector } from 'three/examples/jsm/objects/Reflector'
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei'


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
const CustomReflector = () => {
  // const { scene } = useThree();

  // // Create mirror
  // const mirrorGeometry = new THREE.PlaneBufferGeometry(100, 1000, 100, 1000);
  // const mirror = new THREE.Reflector(mirrorGeometry, {
  //   clipBias: 0.01,
  //   textureWidth: window.innerWidth * window.devicePixelRatio,
  //   textureHeight: window.innerHeight * window.devicePixelRatio,
  //   color: 0x777777,
  //   opacity: 0.5,
  // });
  // mirror.position.y = 0;
  // mirror.rotateX(-Math.PI / 2);
  // scene.add(mirror);

  // Create mask plane
  // const maskGeometry = new THREE.PlaneBufferGeometry(300, 300, 300, 50);
  // const maskMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
  // const maskPlane = new THREE.Mesh(maskGeometry, maskMaterial);
  // maskPlane.rotation.x = Math.PI / 2;
  // maskPlane.position.x = 0.1;
  // scene.add(maskPlane);

  return null;
};
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const Three_cabinet = () => {
  const threeContainer = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, cabinet, mirror;

    const init = async () => {
      // 第一步驟  建立場景 --------------------------------------------
      scene = new THREE.Scene();
      // 第三步驟  建立相機 --------------------------------------------
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.zoom = 0.4;
      camera.updateProjectionMatrix();
      camera.position.set(7, 15, 20);
      // 第二步驟  建立渲染器 --------------------------------------------
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.shadowMap.enabled = true;
      threeContainer.current.appendChild(renderer.domElement);

      //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      // const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
      // mirror = new Reflector(geometry);
      // mirror.position.set(0, 0, -20);
      // scene.add(mirror);
      //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      // 第五步驟   建立物體(object) --------------------------------------------
      const addCube = (w, h, d, color, side) => {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({ color: color, side: side });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        return mesh;
      };

      const room = addCube(60, 20, 60, 0x111111, THREE.BackSide);
      room.translateY(9.9);

      const column1 = addCube(4, 50, 4, 0x222222, THREE.FrontSide);
      column1.position.set(-10, 0, -20);
      const column2 = addCube(4, 50, 4, 0x222222, THREE.FrontSide);
      column2.position.set(10, 0, -20);
      const column3 = addCube(4, 50, 4, 0x222222, THREE.FrontSide);
      column3.position.set(10, 0, 20);
      const column4 = addCube(4, 50, 4, 0x222222, THREE.FrontSide);
      column4.position.set(-10, 0, 20);

      const addCabinetRow = () => {
        return new Array(12).fill(0).map((o, i) => {
          const clone = cabinet.clone();
          const gap = Math.floor(i / 4);
          clone.position.set(0, 0, i * (4) + gap * 5 + 2);
          scene.add(clone);
          return clone;
        });
      };

      const addCabinetColumn = (count) => {
        const row = addCabinetRow();
        row.forEach((cabinet) => {
          const gap = Math.floor(count / 2) * 10;
          cabinet.translateX(6 * count + gap - 25);
          cabinet.translateZ(-30);
          const lookPX = count % 2 === 0;
          if (lookPX) {
            cabinet.rotateY(Math.PI);
          }
        });
      };

      const gltfLoader = new GLTFLoader();
      const path = 'https://storage.googleapis.com/umas_public_assets/michaelBay/day20/cabinet_mapping.gltf';
      const gltf = await new Promise((resolve, reject) => {
        gltfLoader.load(path, resolve, undefined, reject);
      });
      cabinet = gltf.scene;
      gltf.scene.traverse((object) => {
        if (object.isMesh) {
          object.material.map = null;
          object.material.normalMap = null;
        }
      });
      // cabinet.scale.set(0.35, 0.35, 0.35);
      cabinet.scale.set(0.5, 0.5, 0.5);

      new Array(6).fill(0).map((o, count) => {
        addCabinetColumn(count);
      });

      const sphereGeometry = new THREE.SphereGeometry(50, 30, 30);
      const hdriPath = 'https://storage.googleapis.com/umas_public_assets/michaelBay/day19/model/Warehouse-with-lights.jpg';
      const texture = await new THREE.TextureLoader().loadAsync(hdriPath);
      const sphereMaterial = new THREE.MeshStandardMaterial({ side: THREE.BackSide, color: 0xcceeff, map: texture });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);

      const addAmbientLight = () => {
        // const light = new THREE.AmbientLight(0xffffff, 0.1);
        // const light = new THREE.AmbientLight(0xffffff, 3);
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
      };
      // 第四步驟   建立光源 --------------------------------------------
      const addPointLight = (x, y, z) => {
        const pointLight = new THREE.PointLight(0xffffff, 1);
        scene.add(pointLight);
        pointLight.position.set(x, y, z);
        pointLight.castShadow = true;
        const lightHelper = new THREE.PointLightHelper(pointLight, 10, 0xffff00);
        lightHelper.update();
      };

      addAmbientLight();
      addPointLight(10, 18, -10);
      addPointLight(10, 18, 10);

      const control = new OrbitControls(camera, renderer.domElement);
      control.target.set(0, 2, 3);
      control.update();

      // const animate = () => {
      //   requestAnimationFrame(animate);
      //   renderer.render(scene, camera);
      
      // 第六步驟   建立動畫 --------------------------------------------
      //   if (cabinet) {
      //     cabinet.rotation.y += 0.01;
      //   }
      // };

      // 第六步驟   建立動畫 --------------------------------------------
      // 第七步驟   渲染場景 --------------------------------------------
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();

      // const geometry = new Reflector(geometry)
      // let mirror = new Reflector(geometry)
      // mirror.position.set(0,0,-20)
      // scene.add(mirror);

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

export default Three_cabinet;
