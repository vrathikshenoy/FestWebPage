'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { Experience } from './GamingExperience';
import { useAtom } from 'jotai';
import { themeAtom, THEMES, UI } from './GamingUI';
import Link from "next/link";

export default function GamingPage() {
  const [theme] = useAtom(themeAtom);

  return (
    <>
        <div style={{width: '100%', height: '100vh'}}>
            <div className="fixed top-4 right-4 z-10">
                <Link
                    href="/"
                    className="bg-blue-500 text-black px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
            <Leva/>
            <UI/>
            <Loader/>
            <Canvas shadows camera={{position: [0, 1, 5], fov: 50}}>
                <color attach="background" args={[THEMES[theme].skyColor]}/>
                <fog attach="fog" args={[THEMES[theme].skyColor, 12, 20]}/>
                <Suspense fallback={null}>
                    <Experience/>
                </Suspense>
            </Canvas>
        </div>

    </>
  );
}
