import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { TextGenerateEffect } from "@lib/components/ui/TextGenerateEffect"
import { ThreeDCardDemo } from "@lib/components/ThreeDCardDemo"
import Grid from "@lib/components/Grid"
import MagicButton from "@lib/components/MagicButton"
import { WobbleCardDemo } from "@lib/components/WobbleCard"
import { StickyScrollRevealDemo } from "@lib/components/Stickyscrollreveal"
import Clients from "@lib/components/Clients";
import { DirectionAwareHoverDemo } from "@lib/components/DirectionAwareHover"

import dynamic from 'next/dynamic';
const YourComponent = dynamic(() => import("@lib/components/AboutPage"), { ssr: false });

const Hero = () => {

  return (
    <div>
      {/* <Grid /> */}
      {/*  <WobbleCardDemo /> */}
      <YourComponent />
      {/*       <StickyScrollRevealDemo />
      <DirectionAwareHoverDemo />
      <ThreeDCardDemo /> */}
      <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />
          <span>
            <Heading
              level="h1"
              className="text-3xl leading-10 text-ui-fg-base font-normal"
            >
              Ecommerce Starter Template
            </Heading>
            <Heading
              level="h2"
              className="text-3xl leading-10 text-ui-fg-subtle font-normal"
            >
              Powered by Medusa and Next.js
            </Heading>
          </span>
          <a
            href="https://github.com/medusajs/nextjs-starter-medusa"
            target="_blank"
          >
            <Button variant="secondary">
              View on GitHub
              <Github />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
