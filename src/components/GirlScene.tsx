import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, DRACOLoader } from "three-stdlib";

export default function GirlScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const rect  = mount.getBoundingClientRect();
    const W = rect.width  || 400;
    const H = rect.height || 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const keyLight = new THREE.DirectionalLight(0xc7a9ff, 2.2);
    keyLight.position.set(-2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa0c4ff, 0.8);
    fillLight.position.set(3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.4);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    const groundLight = new THREE.PointLight(0x8b5cf6, 1.8, 6, 2);
    groundLight.position.set(0, -1, 1);
    scene.add(groundLight);

    const loader = new GLTFLoader();
    const draco  = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);

    let model: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer  | null = null;
    const clock = new THREE.Clock();

    loader.load(
      "/models/girl.glb",
      (gltf) => {
        model = gltf.scene;

        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        const scale  = 2.2 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(centre.multiplyScalar(scale));
        model.position.y -= 0.2;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = true;
            mesh.receiveShadow = true;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat?.isMeshStandardMaterial) mat.envMapIntensity = 1.2;
          }
        });

        scene.add(model);

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();
        }

        draco.dispose();
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth)  * 2 - 1) * 0.3;
      targetY = ((e.clientY / window.innerHeight) * 2 - 1) * 0.15;
    };
    window.addEventListener("mousemove", onMouseMove);

    let floatTime = 0;
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      floatTime += delta;
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      if (model) {
        model.position.y  = -0.2 + Math.sin(floatTime * 0.9) * 0.04;
        model.rotation.y  = currentX;
        model.rotation.x  = -currentY * 0.5;
      }
      if (mixer) mixer.update(delta);
      groundLight.intensity = 1.8 + Math.sin(floatTime * 1.4) * 0.4;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const r = mount.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      width: "100%",
      height: "clamp(320px, 45vw, 540px)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", bottom: "8%", left: "50%",
        transform: "translateX(-50%)",
        width: "60%", height: "40px",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.45) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(8px)",
      }}/>
    </div>
  );
}