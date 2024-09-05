import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from './AirplaneInterface.module.css';
import { ReloadIcon, ZoomInIcon, ZoomOutIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const cargoData = [
  { id: 'AR', percentage: 98 },
  { id: 'BR', percentage: 88 },
  { id: 'CR', percentage: 75 },
  { id: 'DR', percentage: 56 },
  { id: 'ER', percentage: 79 },
  { id: 'FR', percentage: 26 },
  { id: 'GR', percentage: 42 },
  { id: 'HR', percentage: 36 },
  { id: 'JR', percentage: 67 },
  { id: 'KR', percentage: 73 },
  { id: 'AL', percentage: 87 },
  { id: 'BL', percentage: 92 },
  { id: 'CL', percentage: 65 },
  { id: 'DL', percentage: 64 },
];

const AircraftDiagram: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="relative w-full h-full bg-zinc-900/50 overflow-y-auto custom-scrollbar overflow-x-hidden">
      <div className="sticky top-[30vh] left-4 flex flex-col z-[2]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="icon" size="icon" onClick={() => { setZoom(1) }} className="mb-2 bg-accent rounded-full">
              <ReloadIcon className="text-white size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="border bg-card text-foreground"
            side="right"
          >
            Reset
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="icon" size="icon" onClick={handleZoomIn} className="mb-2 bg-accent rounded-full">
              <ZoomInIcon className="text-white size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="border bg-card text-foreground"
            side="right"
          >
            Zoom In
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="icon" size="icon" onClick={handleZoomOut} className="bg-accent rounded-full">
              <ZoomOutIcon className="text-white size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="border bg-card text-foreground"
            side="right"
          >
            Zoom Out
          </TooltipContent>
        </Tooltip>
      </div>

      <div className={styles.airplaneContainer} style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
        <div className="absolute top-[5vh] transform rotate-90 z-[1]">
          <svg width="71" height="137" viewBox="0 0 71 137" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70.5857 135.481L70.5857 136.947L53.4372 136.947C47.8273 136.947 27.6826 128.976 13.594 110.1L12.7015 108.888L31.6987 108.888L31.89 109.207C45.4685 127.382 65.2945 135.481 70.5857 135.481ZM15.6977 110.355C29.2125 127.701 48.2735 135.417 53.4372 135.417L64.1471 135.417C55.5409 132.356 41.5799 124.385 31.0613 110.355L15.6977 110.355Z" fill="url(#paint0_linear_1_15298)"/>
            <path d="M30.2964 31.0249L29.5315 32.1727C22.3916 43.1412 18.7579 55.5126 18.7579 68.9681C18.7579 82.4236 22.3916 94.7952 29.5315 105.764L30.2964 106.911L11.3629 106.911L11.1717 106.593C3.84055 95.3689 0.143126 82.7425 0.143126 68.9681C0.143125 55.1937 3.84055 42.5673 11.1717 31.3437L11.3629 31.0249L30.2964 31.0249ZM17.2916 68.9681C17.2916 55.7039 20.7341 43.3962 27.5552 32.4915L12.1917 32.4915C5.1793 43.3325 1.60933 55.6401 1.60933 68.9681C1.60933 82.2961 5.1793 94.54 12.1917 105.445L27.5552 105.445C20.7341 94.4762 17.2916 82.2323 17.2916 68.9681Z" fill="url(#paint1_linear_1_15298)"/>
            <path d="M70.5858 0.925292L70.5858 2.39188C65.3584 2.39188 45.4687 10.4909 31.9539 28.6654L31.7626 28.9842L12.7654 28.9842L13.6579 27.7725C27.6827 8.89652 47.8274 0.925293 53.5011 0.925293L70.5858 0.925292ZM30.9976 27.5174C41.58 13.4879 55.4773 5.51669 64.0834 2.45571L53.3736 2.45572C48.2099 2.45572 29.1489 10.1719 15.6341 27.5174L30.9976 27.5174Z" fill="url(#paint2_linear_1_15298)"/>
            <defs>
            <linearGradient id="paint0_linear_1_15298" x1="41.6404" y1="136.947" x2="41.6404" y2="108.89" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_15298" x1="15.207" y1="106.896" x2="15.207" y2="30.9962" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1_15298" x1="41.6405" y1="29.0014" x2="41.6405" y2="0.945063" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white"/>
            </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`${styles.airplaneHead} w-[250px] h-[600px] border-b-0 bg-[#4D4D4D] flex justify-center pt-48`}>          
        </div>
        
        <div className="absolute -left-[225px] top-[45vh]">
          <svg width="315" height="224" viewBox="0 0 315 224" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 172L314.5 1V204L1 223V172Z" fill="#303030"/>
          </svg>
        </div>

        <div className="p-4 w-[250px] border-y-0 bg-[#4D4D4D] z-[1] -mt-[280px] -mb-2">
          <div className="grid grid-cols-2 gap-2">
            {cargoData.map((block, index) => (
              <div key={index} className={`flex flex-col items-center rounded-md justify-center aspect-video bg-button-primary`}>
                <div className="font-bold text-base">{block.id}</div>
                <div className="font-bold text-sm">{block.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -right-[225px] top-[45vh]">
          <svg width="315" height="224" viewBox="0 0 315 224" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M314.5 172L1 1V204L314.5 223V172Z" fill="#303030"/>
          </svg>
        </div>
        
        <svg width="270" height="auto" viewBox="0 200 131 433" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_82_5040)">
          <path d="M91.6483 -318.496C82.2144 -339.296 70.2853 -344.163 65.5 -343.996C60.7147 -344.163 48.7856 -339.296 39.3517 -318.496C27.5593 -292.496 5 -248 5 -207.997L5.00001 206.335C5.00001 208.104 5.23464 209.865 5.69776 211.572L62.6047 421.328C63.4057 424.281 67.5943 424.281 68.3953 421.328L125.302 211.572C125.765 209.865 126 208.247 126 206.478L126 -207.997C126 -246.5 103.441 -292.496 91.6483 -318.496Z" fill="#4D4D4D"/>
          <path d="M91.6483 -318.496C82.2144 -339.296 70.2853 -344.163 65.5 -343.996C60.7147 -344.163 48.7856 -339.296 39.3517 -318.496C27.5593 -292.496 5 -248 5 -207.997L5.00001 206.335C5.00001 208.104 5.23464 209.865 5.69776 211.572L62.6047 421.328C63.4057 424.281 67.5943 424.281 68.3953 421.328L125.302 211.572C125.765 209.865 126 208.247 126 206.478L126 -207.997C126 -246.5 103.441 -292.496 91.6483 -318.496Z"/>
          </g>
          <defs>
          <filter id="filter0_d_82_5040" x="0.5" y="-344.5" width="130" height="776.542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_82_5040"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_82_5040" result="shape"/>
          </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AircraftDiagram;