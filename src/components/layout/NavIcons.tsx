import { Layers, Map, Image, Boxes } from "lucide-react";

const iconStyle =
  "text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition";

export default function NavIcons() {
  return (
    <>
      <Layers className={iconStyle} size={26} />
      <Map className={iconStyle} size={26} />
      <Image className={iconStyle} size={26} />
      <Boxes className={iconStyle} size={26} />
    </>
  );
}
