export default function VisionMissionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 flex-1 ">
      <h3 className="font-poppins text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-white font-medium">
        {title}
      </h3>
      <div className="space-y-4 flex flex-col justify-center">
        <span className="bg-white block h-px w-32 md:w-36 lg:w-60 self-center-safe md:self-baseline" />
        <p className="font-poppins font-normal text-base sm:text-lg md:text-base text-white capitalize">
          {description}
        </p>
      </div>
    </div>
  );
}
