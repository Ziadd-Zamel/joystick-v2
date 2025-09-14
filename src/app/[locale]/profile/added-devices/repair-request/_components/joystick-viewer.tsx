/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  Suspense,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas, useThree, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa6";
import { LuTriangle } from "react-icons/lu";
import { FaRegSquare } from "react-icons/fa";
import React from "react";
import { PartDialog } from "./part-dialog";

type Part3D = {
  id: number;
  key: string;
  name: string;
  is3D: boolean;
  images?: string[];
};

type CameraConfig = {
  position: [number, number, number];
  target: [number, number, number];
};

type PartToMeshMap = {
  [key: number]: string | string[];
};

type MeshToPartIdMap = {
  [meshName: string]: number;
};

type PartCameraPositions = {
  [partId: number]: CameraConfig;
};

interface JoystickViewerProps {
  selectedParts?: number[];
  togglePart: (id: number) => void;
}

interface SceneRef {
  moveCameraToPartPosition: (partId: number) => void;
}

interface SceneProps {
  selectedParts: number[];
  togglePart: (id: number) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export default function JoystickViewer({ selectedParts = [], togglePart }: JoystickViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef>(null);

  // Prevent scroll events from propagating outside the canvas
  const handleCanvasWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  // Define the parts
  const parts3D: Part3D[] = [
    { id: 1, key: "right-analog", name: "Right Analog", is3D: true },
    { id: 2, key: "left-analog", name: "Left Analog", is3D: true },
    { id: 3, key: "R1", name: "R1", is3D: true },
    { id: 4, key: "R2", name: "R2", is3D: true },
    { id: 5, key: "L1", name: "L1", is3D: true },
    { id: 6, key: "L2", name: "L2", is3D: true },
    { id: 7, key: "d-pad", name: "D-Pad", is3D: true },
    { id: 8, key: "buttons", name: "Action Buttons", is3D: true },
    { id: 9, key: "microphone", name: "Microphone", is3D: true },
    { id: 10, key: "speakers", name: "Speakers", is3D: true },
    { id: 11, key: "ps-button", name: "PS Button", is3D: true },
    { id: 12, key: "socket", name: "Charging Port", is3D: true },
    { id: 13, key: "aux", name: "AUX", is3D: true },
    {
      id: 14,
      key: "analog-right",
      name: "Right Internal Analog",
      is3D: false,
      images: [],
    },
    {
      id: 15,
      key: "analog-left",
      name: "Left Internal Analog",
      is3D: false,
      images: [],
    },
    {
      id: 16,
      key: "battery",
      name: "Battery",
      is3D: false,
      images: ["/assets/images/parts/battery.png"],
    },
  ];

  const handlePartClick = (part: Part3D) => {
    togglePart(part.id);
    // Move camera using the Scene component's method
    if (sceneRef.current?.moveCameraToPartPosition) {
      sceneRef.current.moveCameraToPartPosition(part.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {parts3D.map((part) =>
          part.is3D ? (
            <Button
              type="button"
              key={part.id}
              variant={selectedParts.includes(part.id) ? "default" : "outline"}
              onClick={() => handlePartClick(part)}
              className="flex items-center gap-1 px-4 py-2"
            >
              {part.name === "action-buttons" ? <ActionsButtons /> : part.name}
              {selectedParts?.includes(part.id) && <Check size={16} />}
            </Button>
          ) : (
            <PartDialog key={part.id} images={part.images || []}>
              <Button
                type="button"
                key={part.id}
                variant={selectedParts.includes(part.id) ? "default" : "outline"}
                onClick={() => handlePartClick(part)}
                className="flex items-center gap-1 px-4 py-2"
              >
                {part.name === "Action buttons" ? <ActionsButtons /> : part.name}
                {selectedParts.includes(part.id) && <Check size={16} />}
              </Button>
            </PartDialog>
          ),
        )}
      </div>
      <div className="h-[600px] w-full rounded-xl border" ref={canvasRef}>
        <Canvas
          camera={{ position: [15, 10, 15], fov: 60 }}
          gl={{ antialias: true }}
          style={{ background: "#f0f0f0" }}
          onWheel={handleCanvasWheel}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={3.0} />
          <Suspense fallback={<LoadingFallback />}>
            <Scene
              ref={sceneRef}
              selectedParts={selectedParts.filter((id) => +id <= 21)}
              togglePart={togglePart}
              canvasRef={canvasRef as any}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

// Separate the scene into its own component to better manage the Three.js context
const Scene = forwardRef<SceneRef, SceneProps>(({ selectedParts, togglePart, canvasRef }, ref) => {
  const controlsRef = useRef<any>(null);
  const { scene, error } = useGLTF("/models/joystick.gltf") as {
    scene: THREE.Group;
    error?: Error;
  };
  const three = useThree();
  const { camera, gl } = three;
  const [isControlsEnabled, setIsControlsEnabled] = useState<boolean>(true);
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);

  // Handle GLTF loading error
  useEffect(() => {
    if (error) {
      console.error("Error loading GLTF model:", error);
    }
    if (scene) {
      setIsSceneReady(true);
    }
  }, [scene, error]);

  // Only map parts that actually exist in the 3D model
  const partToMeshMap: PartToMeshMap = {
    1: "Cap_1", // أنالوج يمين
    2: "Cap_2", // أنالوج شمال
    3: "R", // R1
    4: "2", // R2
    5: "L1", // L1
    6: "2", // L2
    7: "اسهم_جوه", // أسهم التحريك
    8: ["S", "O", "N", "Y"], // زراير اللعب
    9: "الميكروفون", // الميكروفون
    // Parts 10-16 don't exist in the model, so they're not included here
  };

  const meshToPartIdMap: MeshToPartIdMap = Object.entries(partToMeshMap).reduce(
    (acc, [id, meshName]) => {
      const names = Array.isArray(meshName) ? meshName : [meshName];
      names.forEach((name) => (acc[name] = Number(id)));
      return acc;
    },
    {} as MeshToPartIdMap,
  );

  // Camera positions for all parts (both 3D and non-3D)
  const partCameraPositions: PartCameraPositions = {
    1: { position: [2.004, 1.5, 0.517], target: [1.08, 1.706, -0.707] }, // أنالوج يمين
    2: { position: [1.988, 1.848, 0.655], target: [0.506, 1.41, 0.73] }, // أنالوج شمال
    3: { position: [1.264, 3.011, -1.221], target: [1.152, -0.252, -0.521] }, // R1
    4: { position: [0.547, 2.215, -1.638], target: [1.543, 1.787, -0.423] }, // R2
    5: { position: [0.237, 2.908, 0.758], target: [0.718, 1.546, 0.489] }, // L1
    6: { position: [-0.477, 2.16, 0.745], target: [0.538, 1.917, 0.294] }, // L2
    7: { position: [1.437, 2.374, 1.676], target: [0.287, 1.526, 0.278] }, // أسهم التحريك
    8: { position: [2.275, 2.412, -0.556], target: [1.08, 1.705, -0.707] }, // زراير اللعب
    9: { position: [1.7, 1.228, 0.276], target: [0.189, 1.43, 0.014] }, // الميكروفون
    10: { position: [1.689, 2.032, 0.461], target: [0.767, 1.779, -0.042] }, // السماعات
    11: { position: [1.637, 1.329, 0.403], target: [0.809, 2.082, -0.022] }, // زر PS
    12: { position: [0.307, 2.645, -0.038], target: [0.809, 2.082, -0.022] }, // المنفذ
    13: { position: [1.372, 0.943, 0.224], target: [0.673, 1.937, -0.113] }, // AUX
    // Camera positions for non-3D parts
    14: { position: [2.5, 1.8, 1.2], target: [1.2, 1.5, 0.5] }, // انالوج داخلي يمين
    15: { position: [1.5, 1.8, 1.5], target: [0.5, 1.4, 0.8] }, // انالوج داخلي شمال
    16: { position: [1.0, 0.5, 2.0], target: [0.8, 1.2, 0.2] }, // البطارية
  };

  // Function to check if a part exists in the 3D model
  const partExistsInModel = (partId: number): boolean => {
    return partToMeshMap.hasOwnProperty(partId);
  };

  // Function to move camera to a part's position
  const moveCameraToPosition = useCallback(
    (partId: number) => {
      // Check if all required objects are available
      if (!camera || !controlsRef.current || !isSceneReady) {
        console.warn("Camera, controls, or scene not ready yet");
        return;
      }

      const cameraConfig = partCameraPositions[partId];
      if (!cameraConfig) {
        console.warn(`No camera position defined for partId: ${partId}`);
        return;
      }

      const { position, target } = cameraConfig;

      try {
        // Animate camera position
        gsap.to(camera.position, {
          duration: 1.2,
          x: position[0],
          y: position[1],
          z: position[2],
          onUpdate: () => {
            if (controlsRef.current) {
              controlsRef.current.update();
            }
          },
        });

        // Animate camera target
        gsap.to(controlsRef.current.target, {
          duration: 1.2,
          x: target[0],
          y: target[1],
          z: target[2],
          onUpdate: () => {
            if (controlsRef.current) {
              controlsRef.current.update();
            }
          },
        });
      } catch (error) {
        console.error("Error moving camera:", error);
      }
    },
    [camera, partCameraPositions, isSceneReady],
  );

  // Setup materials
  useEffect(() => {
    if (!scene || !isSceneReady) return;

    try {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (!(child.material instanceof THREE.MeshStandardMaterial)) {
            child.material = new THREE.MeshStandardMaterial({
              color:
                child.material instanceof THREE.Material && "color" in child.material
                  ? (child.material as any).color || 0xffffff
                  : 0xffffff,
              map:
                child.material instanceof THREE.Material && "map" in child.material
                  ? (child.material as any).map || null
                  : null,
              emissive: 0x000000,
              emissiveIntensity: 0,
            });
          }
        }
      });
    } catch (error) {
      console.error("Error setting up materials:", error);
    }
  }, [scene, isSceneReady]);

  // Move camera when a part is selected
  useEffect(() => {
    if (selectedParts.length === 0 || !isSceneReady) return;
    const partId = selectedParts[selectedParts.length - 1];
    moveCameraToPosition(partId);
  }, [selectedParts, moveCameraToPosition, isSceneReady]);

  // Highlight selected parts (only for parts that exist in the model)
  useEffect(() => {
    if (!scene || !isSceneReady) return;

    try {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          const isSelected = selectedParts.some((partId) => {
            // Only check for highlighting if the part exists in the model
            if (!partExistsInModel(partId)) return false;

            const meshNames = partToMeshMap[partId];
            const names = Array.isArray(meshNames) ? meshNames : [meshNames];
            return names.includes(child.name);
          });

          child.material.emissive.set(isSelected ? 0x00ff00 : 0x000000);
          child.material.emissiveIntensity = isSelected ? 2.0 : 0;
        }
      });
    } catch (error) {
      console.error("Error highlighting parts:", error);
    }
  }, [selectedParts, scene, partToMeshMap, isSceneReady]);

  // Handle clicks on 3D model
  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (!gl || !camera || !scene || !isSceneReady) return;

      try {
        event.stopPropagation();

        const mouse = new THREE.Vector2(
          (event.clientX / gl.domElement.clientWidth) * 2 - 1,
          -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          const clickedMesh = intersects[0].object;
          const partId = meshToPartIdMap[clickedMesh.name];

          if (partId) {
            moveCameraToPosition(partId);
            togglePart(partId);
          }
        }
      } catch (error) {
        console.error("Error handling click:", error);
      }
    },
    [gl, camera, scene, togglePart, meshToPartIdMap, moveCameraToPosition, isSceneReady],
  );

  // Handle mouse events to control OrbitControls behavior
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const handleMouseDown = (event: MouseEvent) => {
      if (!canvas.contains(event.target as Node)) {
        setIsControlsEnabled(false);
      } else {
        setIsControlsEnabled(true);
      }
    };

    const handleMouseUp = () => {
      setIsControlsEnabled(true);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasRef]);

  // Expose camera movement method to parent
  useImperativeHandle(ref, () => ({
    moveCameraToPartPosition: moveCameraToPosition,
  }));

  // Don't render if scene is not ready or there's an error
  if (error) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    );
  }

  if (!scene || !isSceneReady) {
    return <LoadingFallback />;
  }

  return (
    <>
      <primitive object={scene} scale={[1.0, 1.0, 1.0]} onClick={handleClick} />
      <OrbitControls
        ref={controlsRef}
        enablePan={isControlsEnabled}
        enableZoom={isControlsEnabled}
        enableRotate={isControlsEnabled}
      />
    </>
  );
});

Scene.displayName = "Scene";

const ActionsButtons = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <CgClose />
      <FaRegCircle className="h-8 w-8" />
      <LuTriangle />
      <FaRegSquare />
    </div>
  );
};
