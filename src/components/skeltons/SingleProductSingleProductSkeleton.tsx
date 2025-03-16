export default function SingleProductSkeleton() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {/* Product Images Skeleton */}
            <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-200"/>
                <div className="grid grid-cols-4 gap-4">
                    {Array(4).fill(0).map((_, index) => (
                        <div key={index}
                             className="aspect-square relative overflow-hidden rounded-lg bg-gray-200"/>
                    ))}
                </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
                <div>
                    <div className="h-8 w-3/4 bg-gray-200 rounded"/>
                    <div className="h-6 w-1/2 bg-gray-200 rounded mt-2"/>
                </div>

                <div>
                    <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"/>
                    <div className="grid grid-cols-5 gap-2">
                        {Array(5).fill(0).map((_, index) => (
                            <div key={index} className="h-10 bg-gray-200 rounded"/>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"/>
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gray-200 rounded-full"/>
                        <div className="h-6 w-10 bg-gray-200 rounded"/>
                        <div className="h-10 w-10 bg-gray-200 rounded-full"/>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1 h-12 bg-gray-200 rounded-full"/>
                </div>

                <div>
                    <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"/>
                    <div className="h-20 bg-gray-200 rounded"/>
                </div>
            </div>
        </div>

    );
}