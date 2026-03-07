import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer group"
        >
            <div className="cursor-pointer relative bg-chai-100 rounded-2xl w-full h-52 flex items-center justify-center overflow-hidden border border-chai-200 transition-all duration-300 group-hover:chai-shadow-lg group-hover:border-chai-300">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full chai-shadow hover:bg-white transition">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate text-chai-800">{product.name}</p>
            <p className="w-full text-xs text-chai-500 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs text-chai-600">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium text-chai-800">{currency}{product.offerPrice}</p>
                <button className="max-sm:hidden px-4 py-1.5 text-chai-600 border border-chai-300 rounded-full text-xs hover:bg-chai-50 hover:border-chai-400 transition">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard