import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineInstagram, AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { PiRug } from "react-icons/pi";
import { FaRegSmileBeam } from "react-icons/fa";
import { FaGem } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";
import { BiPhoneCall } from "react-icons/bi";
import { SiGooglemaps } from "react-icons/si";

export const navMenus = [
  { href: "/collections", name: "collections" },
  { href: "/about", name: "about us" },
  { href: "/service", name: "service" },
  { href: "/contact", name: "contact" },
];

export const navSocialIcons = [
    { href: "facebook.com", icon: BiLogoFacebook },
    { href: "instagram.com", icon: AiOutlineInstagram },
    { href: "youtube.com", icon: AiOutlineYoutube }
];

export const collections = [
  { src: "/our-collection-1.jpg", name: "Hand Made Carpet"},
  { src: "/our-collection-2.jpg", name: "Hand Made Carpet"},
  { src: "/our-collection-3.jpg", name: "Hand Made Carpet"},
]

export const count = [
  { title: "Expert", total: 26, subtitle: "Years Of Expertise", showPlus: true },
  { title: "Showrooms", total: 9, subtitle: "Showrooms Across Indonesia", showPlus: false },
  { title: "Collections", total: 10000, subtitle: "Curated Collections", showPlus: true },
  { title: "Customers", total: 5000, subtitle: "Satisfied Customers", showPlus: true },
];

export const uniqueSellingPoints = [
  {
    icon: VscWorkspaceTrusted,
    point: "26+ Years of Expertise",
    subpoint:
      "A generational legacy in crafting and curating premium carpets.",
  },
  {
    icon: HiOutlineBuildingStorefront,
    point: "9 Branches Across Indonesia",
    subpoint:
      "Providing a seamless shopping experience wherever you are.",
  },
  {
    icon: PiRug,
    point: "10,000+ Rugs Curated",
    subpoint:
      "A diverse and carefully selected collection for every interior style.",
  },
  {
    icon: FaRegSmileBeam,
    point: "5,090+ Happy Customers",
    subpoint:
      "A proven track record of quality and satisfaction.",
  },
  {
    icon: FaGem,
    point: "Premium Quality",
    subpoint:
      "We offer only the finest materials and designs to elevate your living space.",
  },
  {
    icon: FaRegHandshake,
    point: "Approachable & Trusted",
    subpoint:
      "Fast, friendly assistance and decades of reliability you can count on.",
  },

];

export const ourProducts = [
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
  {
    src: "/our-products.png",
    name: "Afghan Chobi hand-made carpet 16AA2230",
    description: "Afghanistan, Hand-made Carpets",
  },
];

export const contactInfo = [
  { icon: BiPhoneCall, name: "(021) 7197770" },
  { icon: AiOutlineMail, name: "sales@aljabbarcarpets.com" },
  { icon: AiOutlineWhatsApp, name: "+6281-319-849-981" },
  { icon: SiGooglemaps, name: "Jl. Kemang Raya No. 69 Jakarta Selatan" },
];

