import * as THREE from 'three';

class Firework {
	constructor({ x, y }) {
		const count = 1000 + Math.floor(Math.random() * 5000);
		const velocity = 10 + Math.random() * 10;

		const particleGeometry = new THREE.BufferGeometry();

		this.particles = [];

		for (let i = 0; i < count; i += 1) {
			const particle = new THREE.Vector3(x, y, 0);

			// particle.deltaX = THREE.MathUtils.randFloatSpread(velocity);

			// particle.deltaY = THREE.MathUtils.randFloatSpread(velocity);

			// particle.deltaZ = THREE.MathUtils.randFloatSpread(velocity);

			// particle.theta = Math.random() * Math.PI * 2;

			// particle.deltaX = velocity * Math.cos(particle.theta);
			// particle.deltaY = velocity * Math.sin(particle.theta);
			// particle.deltaZ = 0;

			particle.theta = Math.random() * Math.PI * 2;
			particle.phi = Math.random() * Math.PI * 2;

			particle.deltaX =
				velocity * Math.sin(particle.theta) * Math.cos(particle.phi);
			particle.deltaY =
				velocity * Math.sin(particle.theta) * Math.sin(particle.phi);
			particle.deltaZ = velocity * Math.cos(particle.theta);

			this.particles.push(particle);
		}

		particleGeometry.setFromPoints(this.particles);

		const textureLoader = new THREE.TextureLoader();

		const texture = textureLoader.load('./assets/texture/particle.png');

		const particleMaterial = new THREE.PointsMaterial({
			size: 1,
			alphaMap: texture,
			transparent: true,
			depthWrite: false,
			color: new THREE.Color(Math.random(), Math.random(), Math.random()),
			blending: THREE.AdditiveBlending,
		});

		const points = new THREE.Points(particleGeometry, particleMaterial);

		this.points = points;
	}

	update() {
		const { position } = this.points.geometry.attributes;

		for (let i = 0; i < this.particles.length; i += 1) {
			const x = position.getX(i);
			const y = position.getY(i);
			const z = position.getZ(i);

			position.setX(i, x + this.particles[i].deltaX);

			position.setY(i, y + this.particles[i].deltaY);

			position.setZ(i, z + this.particles[i].deltaZ);
		}

		position.needsUpdate = true;
	}
}

export default Firework;
