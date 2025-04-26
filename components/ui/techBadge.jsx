import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Server,
  Globe,
  Palette,
  Code,
  AppWindow,
  Terminal,
  Hand,
} from "lucide-react";
const SupabaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 109 113" fill="none">
    <path
      d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
      fill="url(#paint1_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
      fill="#3ECF8E"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="53.9738"
        y1="54.974"
        x2="94.1635"
        y2="71.8295"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#249361" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="36.1558"
        y1="30.578"
        x2="54.4844"
        y2="65.0806"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
const techConfig = {
  AI: {
    color: "bg-blue-100/80 hover:bg-blue-200/80 text-blue-700",
    icon: "/icons/bot-svgrepo-com.svg",
    type: "svg",
  },
  "Next.js": {
    color: "bg-black/10 hover:bg-black/20 text-black",
    icon: "/icons/next-js-svgrepo-com.svg",
    type: "svg",
  },
  React: {
    color: "bg-blue-100/80 hover:bg-blue-200/80 text-sky-500",
    icon: "/icons/react-svgrepo-com.svg",
    type: "svg",
  },
  ReactNative: {
    color: "bg-blue-100/80 hover:bg-blue-200/80 text-sky-500",
    icon: "/icons/react-svgrepo-com.svg",
    type: "svg",
  },
  "Tailwind CSS": {
    color: "bg-cyan-100/80 hover:bg-cyan-200/80 text-cyan-700",
    icon: "/icons/tailwind-css-svgrepo-com.svg",
    type: "svg",
  },
  Prisma: {
    color: "bg-gray-100/80 hover:bg-gray-200/80 text-black",
    icon: "/icons/prisma-svgrepo-com.svg",
    type: "svg",
  },
  "Node.js": {
    color: "bg-green-100/80 hover:bg-green-200/80 text-green-700",
    icon: "/icons/nodejs-icon-svgrepo-com.svg",
    type: "svg",
  },
  "Express.js": {
    color: "bg-gray-100/80 hover:bg-gray-200/80 text-gray-700",
    icon: "/icons/express-svgrepo-com.svg",
    type: "svg",
  },
  Nginx: {
    color: "bg-green-100/80 hover:bg-green-200/80 text-green-700",
    icon: "/icons/nginx-svgrepo-com.svg",
    type: "svg",
  },
  Figma: {
    color: "bg-pink-100/80 hover:bg-pink-200/80 text-pink-700",
    icon: "/icons/figma-svgrepo-com.svg",
    type: "svg",
  },
  Expo: {
    color: "bg-gray-100/80 hover:bg-gray-200/80 text-black-700",
    icon: "/icons/expo-svgrepo-com.svg",
    type: "svg",
  },
  "RESTful APIs": {
    color: "bg-orange-100/80 hover:bg-orange-200/80 text-orange-700",
    icon: Code,
    type: "lucide",
  },
  Paymob: {
    color: "bg-sky-100/80 hover:bg-sky-200/80 text-sky-700",
    icon: "/icons/money-receive-svgrepo-com.svg",
    type: "svg",
  },
  "Google Auth": {
    color: "bg-red-100/80 hover:bg-red-200/80 text-red-700",
    icon: AppWindow,
    type: "lucide",
  },
  "PDF Generation": {
    color: "bg-rose-100/80 hover:bg-rose-200/80 text-rose-700",
    icon: "/icons/pdf-svgrepo-com.svg",
    type: "svg",
  },
  "Framer Motion": {
    color: "bg-purple-100/80 hover:bg-purple-200/80 text-purple-700",
    icon: Hand,
    type: "lucide",
  },
  "UI/UX": {
    color: "bg-indigo-100/80 hover:bg-indigo-200/80 text-indigo-700",
    icon: Palette,
    type: "lucide",
  },
  "WhatsApp API": {
    color: "bg-green-100/80 hover:bg-green-200/80 text-green-700",
    icon: Globe,
    type: "lucide",
  },
  Prototyping: {
    color: "bg-violet-100/80 hover:bg-violet-200/80 text-violet-700",
    icon: Code,
    type: "lucide",
  },
  SSG: {
    color: "bg-amber-100/80 hover:bg-amber-200/80 text-amber-700",
    icon: Server,
    type: "lucide",
  },
  DevOps: {
    color: "bg-blue-100/80 hover:bg-blue-200/80 text-blue-700",
    icon: Terminal,
    type: "lucide",
  },
  PM2: {
    color: "bg-teal-100/80 hover:bg-teal-200/80 text-teal-700",
    icon: Terminal,
    type: "lucide",
  },
  Supabase: {
    color: "bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-700",
    icon: SupabaseIcon,
    type: "custom",
  },
};

export const TechBadge = ({ tech, className }) => {
  const config = techConfig[tech] || {
    color: "bg-gray-100/80 hover:bg-gray-200/80 text-gray-700",
    icon: Code,
    type: "lucide",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1 transition-colors",
        config.color,
        className,
      )}
    >
      {config.type === "svg" ? (
        <Image
          src={config.icon}
          alt={tech}
          width={16}
          height={16}
          className="object-contain"
        />
      ) : (
        <config.icon className="w-4 h-4" />
      )}
      {tech}
    </Badge>
  );
};

export const SkillCard = ({ skill }) => {
  const config = techConfig[skill] || {
    color: "bg-gray-100/80 hover:bg-gray-200/80 text-gray-700",
    icon: Code,
    type: "lucide",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-lg transition-colors flex-col sm:flex-row",
        config.color,
      )}
    >
      {config.type === "svg" ? (
        <Image
          src={config.icon}
          alt={skill}
          width={24}
          height={24}
          className="object-contain"
        />
      ) : (
        <config.icon className="w-6 h-6" />
      )}
      <span className="font-medium text-center text-sm">{skill}</span>
    </div>
  );
};

export default TechBadge;
