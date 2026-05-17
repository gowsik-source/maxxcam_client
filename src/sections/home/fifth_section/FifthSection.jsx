import React from 'react'
import style from './fifth_section.module.css'
import brand_1 from '../../../assets/brand_1.jpg'
import brand_2 from '../../../assets/brand_2.jpg'
import brand_3 from '../../../assets/brand_3.jpg'
import brand_4 from '../../../assets/brand_4.jpg'
import brand_5 from '../../../assets/brand_5.jpg'

const FifthSection = () => {
    const brands = [
        {
            name: 'Vide',
            image: brand_1
        },
        {
            name: 'Tipox',
            image: brand_2
        },
        {
            name: 'Stromboli',
            image: brand_3
        },
        {
            name: 'Robust',
            image: brand_4
        },
        {
            name: 'Polyrise',
            image: brand_5
        }
    ];
    return (
        <div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <hr className={style.divider} />
                    <div className={style.brand_container}>
                        {brands.map((brand, index) => (
                            <div className={style.brand} key={index}>
                                <img src={brand.image} alt={brand.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FifthSection
