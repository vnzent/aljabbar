import Image from "next/image";

export default function IconLine() {

    return (
        <div className="flex gap-8 w-full items-center">
            <span className="bg-[#D9D9D9] h-0.5 w-full" />
            <Image src="/icon-aljabbar.svg" alt="Aljabbar Icon" width={180} height={180} className="object-cover overflow-hidden aspect-square" />
            <span className="bg-[#D9D9D9] h-0.5 w-full" />
        </div>
    )
}