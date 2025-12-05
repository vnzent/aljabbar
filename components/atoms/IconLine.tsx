import Image from "next/image";

export default function IconLine() {

    return (
        <div className="flex gap-8 w-full items-center">
            <span className="bg-primary/20 h-0.5 w-full" />
            <Image src="/icon-aljabbar.svg" alt="Aljabbar Icon" width={100} height={100} className="object-cover overflow-hidden aspect-square" />
            <span className="bg-primary/20 h-0.5 w-full" />
        </div>
    )
}