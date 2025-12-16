import { BiLogoFacebook } from "react-icons/bi";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
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
  { href: "/collections", name: "Collections" },
  { href: "/about", name: "About us" },
  { href: "/service", name: "Service" },
  { href: "/contact", name: "Contact" },
];

export const navSocialIcons = [
  { href: "facebook.com", icon: BiLogoFacebook },
  { href: "instagram.com", icon: AiOutlineInstagram },
  { href: "youtube.com", icon: AiOutlineYoutube },
];

export const collectionCategories = [
  {
    src: "/our-collection-1.jpg",
    name: "Hand-made Carpets",
    slug: "hand-made-carpets",
    translationKey: "category1",
    description:
      "Discover our exquisite collection of hand-made carpets, meticulously crafted by skilled artisans. Each piece is a unique work of art that brings elegance and tradition to your space.",
    metaImage: "/our-collection-1.jpg",
  },
  {
    src: "/our-collection-2.jpg",
    name: "Machine-made Carpets",
    slug: "machine-made-carpets",
    translationKey: "category2",
    description:
      "Explore our modern machine-made carpets that combine precision engineering with stunning designs. Perfect for contemporary homes seeking durability and style.",
    metaImage: "/our-collection-2.jpg",
  },
  {
    src: "/our-collection-3.jpg",
    name: "Mosque Carpets",
    slug: "mosque-carpets",
    translationKey: "category3",
    description:
      "Browse our specialized mosque carpets designed for sacred spaces. High-quality materials and traditional patterns that honor spiritual environments.",
    metaImage: "/our-collection-3.jpg",
  },
];

export const count = [
  {
    title: "Expert",
    total: new Date().getFullYear() - 1995,
    subtitle: "Years of Expertise",
    showPlus: true,
  },
  {
    title: "Showrooms",
    total: 10,
    subtitle: "Showrooms Across indonesia",
    showPlus: true,
  },
  {
    title: "Collections",
    total: 10000,
    subtitle: "Curated Collections",
    showPlus: true,
  },
  {
    title: "Customers",
    total: 5000,
    subtitle: "Satisfied Customers",
    showPlus: true,
  },
];

export const uniqueSellingPoints = [
  {
    icon: VscWorkspaceTrusted,
    translationKey: "point1",
  },
  {
    icon: HiOutlineBuildingStorefront,
    translationKey: "point2",
  },
  {
    icon: PiRug,
    translationKey: "point3",
  },
  {
    icon: FaRegSmileBeam,
    translationKey: "point4",
  },
  {
    icon: FaGem,
    translationKey: "point5",
  },
  {
    icon: FaRegHandshake,
    translationKey: "point6",
  },
];

export const aboutParagraphs = [
  "Al-Jabbar carpets is a retail carpet business which dates back to its originating date being **March 1994**. From the start we have been dedicated to providing the best quality carpets.",
  "Al-Jabbar carpets we specializes in **Hand-Made Carpets** which come from different countries such as Iran, Pakistan, Afghanistan and Kashmir, machine-made carpets and mosque rugs from Iran and Turkey and wall to wall carpets from Europe and the United States of America.",
  "Our collection can be viewed in any of our showrooms but also, we offer the service of bringing the carpets directly to your house without any charge and match the carpets with your interior.",
  "We have a complete collection ranging from traditional rugs to modern rugs we have it all. We have been dedicated to not only providing the best quality carpets from day one but also truly focus on customer service and we assure you the experience you get in our showrooms will be one of a kind.",
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

export const galleryLookBook = [
  { src: "/gallery/gallery-1.jpg" },
  { src: "/gallery/gallery-2.jpg" },
  { src: "/gallery/gallery-3.jpg" },
  { src: "/gallery/gallery-4.jpg" },
  { src: "/gallery/gallery-5.jpg" },
  { src: "/gallery/gallery-6.jpg" },
];

export const faqs = [
  { translationKey: "one" },
  { translationKey: "two" },
  { translationKey: "three" },
  { translationKey: "four" },
  { translationKey: "five" },
];

export const branches = [
  {
    city: "Jakarta",
    store: [
      {
        name: "Al-Jabbar Carpets Kemang",
        address: "Jl. Kemang Raya No. 69 Jakarta Selatan",
        dial: "021-7197770",
      },
      {
        name: "Nosherwan Carpets",
        address: "Jl. Kemang Selatan Raya No. 14C Jakarta Selatan",
        dial: "021-7180486, 7182556",
      },
      {
        name: "Al Kabir Carpet",
        address: "Jl. Benda Raya No. 38 A Jakarta Selatan",
        dial: "021-7819010",
      },
    ],
  },
  {
    city: "Bekasi",
    store: [
      {
        name: "Al-Jabbar Carpet",
        address:
          "Grand Galaxy City Jl. Boulevard Raya Rukan Blok RGG No 32 Bekasi",
        dial: "",
      },
    ],
  },
  {
    city: "Surabaya",
    store: [
      {
        name: "Al-Jabbar Carpet",
        address: "Jl. H. Muhammad No. 395 Surabaya",
        dial: "031-99020388",
      },
      {
        name: "Al-Jabbar Carpet",
        address: "Jl. Raya Kertajaya No. 182 Gubeng Surabaya",
        dial: "031-5018623",
      },
    ],
  },
  {
    city: "Banten",
    store: [
      {
        name: "Al Matah Carpets",
        address: "Jl. Serpong Raya No. 94 BSD City Serpong Tangerang",
        dial: "021-22232554",
      },
    ],
  },
  {
    city: "Garut",
    store: [
      {
        name: "Al Jabbar Carpets",
        address: "Jl. Ahmad Yani No. 231 Kel. Ciwalen Kec. Garut Kota Garut",
      },
    ],
  },
  {
    city: "Tasikmalaya",
    store: [
      {
        name: "Al Jabbar Carpets",
        address:
          "Jl. Gunung Sabeulah No. 51 Kec. Cihideung Kel. Argasari Tasikmalaya",
      },
    ],
  },
  {
    city: "Gorontalo",
    store: [
      {
        name: "Al-Jabbar Carpet",
        address:
          "Jl. HB Yassin 786 Kel. Tomulabutao Kec. Dungingi Kota Gorontalo",
      },
    ],
  },
];

export const whatsappContacts = {
  kebayoranBaru:
    "https://api.whatsapp.com/send/?phone=6285763894908&text&type=phone_number&app_absent=0",
  kemang:
    "https://api.whatsapp.com/send/?phone=6281319849981&text&type=phone_number&app_absent=0",
};
