import { classNames } from "@/utils/helpers";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface CardProps {
  active?: boolean;
  icon: string;
  heading: string;
  content: string;
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Card({
  icon,
  heading,
  content,
  active = false,
  onClick
}: CardProps) {
  return (
    <div
      className={classNames(
        "relative cursor-pointer flex flex-col justify-center border gap-y-2 items-center rounded-lg text-center p-4 pb-[30px] hover:bg-hover ",
        active ? "bg-active fg-solid-border" : "fg-border"
      )}
      onClick={onClick}
    >
      {active && (
        <div className="absolute -top-2.5 -right-2.5 p-0.5 rounded-full bg-white">
          <Image src="/icons/check.svg" width={20} height={20} alt="1 icon" />
        </div>
      )}
      <Image src={icon} width={28} height={36} alt="1 icon" />

      <p className="subtitle-1 fg-text-contrast">{heading}</p>
      <p className="text-left caption-medium fg-text">{content}</p>
    </div>
  );
}
