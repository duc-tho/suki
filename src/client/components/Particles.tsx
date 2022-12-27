import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine, Container } from "tsparticles-engine"
import { loadFull } from "tsparticles";
import { ParticlesConfig } from "../core/config/ParticleConfig";
import classes from '../assets/scss/modules/Particles.module.scss';
import clsx from "clsx";

function Particle() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // await console.log(container);
    }, []);

    return (<Particles className={clsx(classes.particle)} options={ParticlesConfig} init={particlesInit} loaded={particlesLoaded} />);
}

export default Particle;
