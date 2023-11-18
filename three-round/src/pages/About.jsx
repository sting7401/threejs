import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import Loader from '../components/Loader';
import Fox from '../models/Fox';

function About() {
	const formRef = useRef();
	const [loading, setLoading] = useState(false);
	const [currentAnimation, setCurrentAnimation] = useState('idle');

	const handleFocus = () => setCurrentAnimation('walk');
	const handleBlur = () => setCurrentAnimation('idle');

	return (
		<section className="relative flex lg:flex-row flex-col max-container">
			<div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
				<Canvas
					camera={{
						position: [0, 0, 5],
						fov: 75,
						near: 0.1,
						far: 1000,
					}}
				>
					<directionalLight position={[0, 0, 1]} intensity={2.5} />
					<ambientLight intensity={1} />
					<pointLight position={[5, 10, 0]} intensity={2} />
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						intensity={2}
					/>

					<Suspense fallback={<Loader />}>
						<Fox
							currentAnimation={currentAnimation}
							position={[0.5, 0.35, 0]}
							rotation={[12.629, -0.6, 0]}
							scale={[0.5, 0.5, 0.5]}
						/>
					</Suspense>
				</Canvas>
			</div>
		</section>
	);
}

export default About;
