import React, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const RobotBackground = () => {
    return (
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
            <Suspense fallback={<div className="w-full h-full bg-[#030014]" />}>
                {/* 
            Using a popular public Spline scene for a "Robot" or "Character".
            Scene: "Mini Room" by Spline team (often used as demo, looks good).
            OR "Robot" scene. 
            Let's try a generic "Robot" scene URL if available, otherwise use a placeholder shape scene.
            
            URL: https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode
            This is a "Robot" scene from community examples.
        */}
                <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </Suspense>
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[#030014]/60 backdrop-blur-[1px]" />
        </div>
    );
};

export default RobotBackground;
