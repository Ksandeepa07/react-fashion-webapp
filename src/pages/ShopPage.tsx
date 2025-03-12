import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {ChevronDown, Filter} from 'lucide-react';
import {FilterState} from '../types';
import axios from "axios";

// const products = Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   name: `Fashion Product ${i + 1}`,
//   price: 99.99 + i * 10,
//   image: `https://images.unsplash.com/photo-${
//       i % 4 === 0 ? '1515886657613-9f3515b0c78f' :
//           i % 4 === 1 ? '1496747611176-843db0904432' :
//               i % 4 === 2 ? '1552374196-1ab2a1c593e9' :
//                   '1549298916-b41d501d3772'
//   }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
//   category: i % 3 === 0 ? 'Women' : i % 3 === 1 ? 'Men' : 'Accessories',
//   colors: ['Black', 'White', 'Blue'],
//   sizes: ['S', 'M', 'L', 'XL']
// }));

export default function ShopPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        colors: [],
        sizes: [],
        priceRange: [0, 1000],
        category: ''
    });
    const [products, setProductData] = useState([]);

    //load data
    useEffect(() => {
        axios.get("http://localhost:3003/api/v1/products/all").then((response) => {
            console.log(response.data)
            setProductData(response.data);
        });
    }, []);


    const categories = ['All', 'Women', 'Men', 'Accessories'];
    const availableColors = ['Black', 'White', 'Blue', 'Red', 'Green'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

    const toggleFilter = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            if (type === 'category') {
                return {...prev, [type]: value === 'All' ? '' : value};
            }

            const array = prev[type] as string[];
            return {
                ...prev,
                [type]: array.includes(value)
                    ? array.filter(item => item !== value)
                    : [...array, value]
            };
        });
    };

    const filteredProducts = products.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.colors.length && !filters.colors.some(color => product.colors.includes(color))) return false;
        if (filters.sizes.length && !filters.sizes.some(size => product.sizes.includes(size))) return false;
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
        return true;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters - Desktop */}
                <div className="hidden md:block w-64 space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => toggleFilter('category', category)}
                                    className={`block w-full text-left px-4 py-2 rounded ${
                                        filters.category === (category === 'All' ? '' : category)
                                            ? 'bg-black text-white'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Colors</h3>
                        <div className="space-y-2">
                            {availableColors.map(color => (
                                <label key={color} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.colors.includes(color)}
                                        onChange={() => toggleFilter('colors', color)}
                                        className="rounded"
                                    />
                                    <span>{color}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Sizes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => toggleFilter('sizes', size)}
                                    className={`px-4 py-2 border rounded ${
                                        filters.sizes.includes(size)
                                            ? 'bg-black text-white border-black'
                                            : 'border-gray-200 hover:border-black'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Price Range</h3>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [0, parseInt(e.target.value)]
                            }))}
                            className="w-full"
                        />
                        <div className="flex justify-between mt-2">
                            <span>$0</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden flex items-center justify-center space-x-2 w-full py-2 border rounded"
                >
                    <Filter size={20}/>
                    <span>Filters</span>
                    <ChevronDown size={20}
                                 className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}/>
                </button>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                whileHover={{y: -10}}
                                className="group"
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    {/*<p className="text-gray-600">${product.price.toFixed(2)}</p>*/}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}