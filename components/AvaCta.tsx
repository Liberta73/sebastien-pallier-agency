"use client";

import { openAvaWidget } from "@/components/AvaWidget";

type AvaCtaProps = {
  label?: string;
  className?: string;
};

export default function AvaCta({ label = "Parler à AVA", className = "" }: AvaCtaProps) {
  return (
    <button
      type="button"
      onClick={openAvaWidget}
      className={className}
    >
      {label}
    </button>
  );
}
