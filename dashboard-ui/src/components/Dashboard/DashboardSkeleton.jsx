// src/components/Dashboard/DashboardSkeleton.tsx
const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <section className="w-full h-full flex gap-8 flex-col">
      <div className="grid grid-cols-2 gap-8">
        <SkeletonBox className="h-80" />
        <SkeletonBox className="h-80" />
        <SkeletonBox className="h-80 col-span-2" />
      </div>
      <div className="grid grid-cols-3 gap-8 pb-6">
        <SkeletonBox className="h-48" />
        <SkeletonBox className="h-48" />
        <SkeletonBox className="h-48" />
      </div>
    </section>
  );
};

export default DashboardSkeleton;
