import React, { useState, useEffect } from 'react'
import style from './fourth_section.module.css'
import { Link } from 'react-router-dom'
import Axios from '../../../API/Axios'
// import data from '../../../data.json'
import Slider from 'react-slick'
import CartButton from '../../../components/CartButton'
import NextArrow from '../../../components/NextArrow'
import PrevArrow from '../../../components/PrevArrow'
import { useCart } from '../../../context/CartContext'
import QuickView from '../../../components/QuickView'

const FourthSection = () => {

    const { addToCart } = useCart(); // cart context
    const [isCategoryFilteredProducts, setIsCategoryFilteredProducts] = useState([]) // maped items
    const [quickViewProduct, setQuickViewProduct] = useState(null); // quick view product

    // const categoryFilter = data.filter(products => (products.category === 'lenses_accessories'))

    useEffect(() => {
        const getProducts = async () => {
            try {
                const getProductsResponse = await Axios.get('/api/product/lenses-and-accessories');
                // console.log(response.data);
                const apiFetchedProducts = getProductsResponse.data.data;
                setIsCategoryFilteredProducts(apiFetchedProducts);
            } catch (error) {
                console.log(error ? error.message : 'An error occurred while fetching products.');
            }
        }
        getProducts();
    }, []);

    const sliderFunction = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    const quickViewHandler = (products) => {
        setQuickViewProduct(products);
    }

    // remove quick view product,
    // to handle quick view component display (visiblity)
    const removeQuickViewProductHandler = () => {
        setQuickViewProduct(null);
    };

    return (
        <div>
            <div className={`section_heading ${style.modified_heading}`}>
                <h1>Lenses & Accessories</h1>
            </div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <Slider {...sliderFunction}>
                        {isCategoryFilteredProducts.map((products, index) => (
                            <div key={index} className={style.child_container}>
                                <div className={style.parent_image_container}>
                                    <div className={style.image_container}>
                                        <Link to={`/product/${products._id}`} className={products.productName.length > 20 ? style.product_name_long : style.product_name_short}>
                                            <img src={products.images[0]} alt={products.name} />
                                        </Link>
                                    </div>
                                    <div className={style.quickview_container}>
                                        <button className='default_btn' onClick={() => quickViewHandler(products)}>Quick View</button>
                                    </div>
                                </div>
                                <div className={style.product_name}>
                                    <Link to={`/product/${products._id}`}>{products.productName}</Link>
                                </div>
                                <div className={style.product_price}>
                                    <p>₨: {products.price}</p>
                                </div>
                                <div className={style.add_to_cart}>
                                    <CartButton name='Add to Cart' click={() => addToCart(products)} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            {/* quick view component */}
            {quickViewProduct &&
                <div className={style.overlay_for_quick_view_component} onClick={removeQuickViewProductHandler}>
                    <QuickView products={quickViewProduct} closeQuickView={removeQuickViewProductHandler} />
                </div>
            }
        </div>
    )
}

export default FourthSection
