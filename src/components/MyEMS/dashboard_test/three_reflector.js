import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

const Three_reflector = () => {
  const rendererContainer = useRef(null);
  let scene, camera, renderer, orbitControls, dragControls, boxHelper, mixer, modelGroup, modelDragBox;
  let modelReady = false;

  useEffect(() => {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0.8, 1.4, 1.0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    rendererContainer.current.appendChild(renderer.domElement);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.target.set(0, 1, 0);

    dragControls = new DragControls([], camera, renderer.domElement);
    dragControls.addEventListener('hoveron', () => {
      boxHelper.visible = true;
      orbitControls.enabled = false;
    });
    dragControls.addEventListener('hoveroff', () => {
      boxHelper.visible = false;
      orbitControls.enabled = true;
    });
    dragControls.addEventListener('drag', (event) => {
      event.object.position.y = 0;
    });
    dragControls.addEventListener('dragstart', () => {
      boxHelper.visible = true;
      orbitControls.enabled = false;
    });
    dragControls.addEventListener('dragend', () => {
      boxHelper.visible = false;
      orbitControls.enabled = true;
    });

    const light1 = new THREE.PointLight(0xffffff, 100);
    light1.position.set(2.5, 2.5, 2.5);
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 100);
    light2.position.set(-2.5, 2.5, 2.5);
    light2.castShadow = true;
    scene.add(light2);

    const planeGeometry = new THREE.PlaneGeometry(25, 25);
    const texture = new THREE.TextureLoader().load('img/grid.png');
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }));
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    scene.add(plane);

    boxHelper = new THREE.BoxHelper();
    scene.add(boxHelper);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      'models/eve@punching.glb',
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child instanceof THREE.Group) {
            modelGroup = child;
          }
          if (child.isMesh) {
            child.castShadow = true;
            child.frustumCulled = false;
            child.geometry.computeVertexNormals();
          }
        });

        mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();

        modelDragBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 1.3, 0.5),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        );
        modelDragBox.geometry.translate(0, 0.65, 0);
        scene.add(modelDragBox);
        dragControls.setObjects([modelDragBox]);

        boxHelper.setFromObject(modelDragBox);

        scene.add(gltf.scene);
        modelReady = true;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log(error);
      }
    );

    const mirrorBack1 = new Reflector(new THREE.PlaneGeometry(2, 2), {
      color: new THREE.Color(0x7f7f7f),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    mirrorBack1.position.set(0, 1, -1);
    scene.add(mirrorBack1);

    const mirrorBack2 = new Reflector(new THREE.PlaneGeometry(2, 2), {
      color: new THREE.Color(0x7f7f7f),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    mirrorBack2.position.set(0, 1, -2);
    scene.add(mirrorBack2);

    const mirrorFront1 = new Reflector(new THREE.PlaneGeometry(2, 2), {
      color: new THREE.Color(0x7f7f7f),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    mirrorFront1.position.set(0, 1, 1);
    mirrorFront1.rotateY(Math.PI);
    scene.add(mirrorFront1);

    const mirrorFront2 = new Reflector(new THREE.PlaneGeometry(2, 2), {
      color: new THREE.Color(0x7f7f7f),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    mirrorFront2.position.set(0, 1, 2);
    mirrorFront2.rotateY(Math.PI);
    scene.add(mirrorFront2);

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelReady) {
        mixer.update(clock.getDelta());
        modelGroup.position.copy(modelDragBox.position);
        boxHelper.update();
      }

      renderer.render(scene, camera);
      stats.update();
    };

    animate();

    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return <div ref={rendererContainer} />;
};

export default Three_reflector;
