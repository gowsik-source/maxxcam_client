import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './third_section.module.css'
// import data from '../../../data.json'
import Axios from '../../../API/Axios'
import Slider from 'react-slick'
import CartButton from '../../../components/CartButton'
import NextArrow from '../../../components/NextArrow'
import PrevArrow from '../../../components/PrevArrow'
import { useCart } from '../../../context/CartContext'
import QuickView from '../../../components/QuickView'

const ThirdSection = () => {

  const { addToCart } = useCart();
  const [isCategoryFilteredProducts, setIsCategoryFilteredProducts] = useState([]) // maped items
  const [selectedProducts, setSelectedProducts] = useState(null); // quick view
  // console.log(isCategoryFilteredProducts, 'isCategoryFilteredProducts');

  useEffect(() => {
    // setIsCategoryFilteredProducts(data.filter(products => (products.category === 'digital_cameras')))
    const getProducts = async () => {
      try {
        const response = await Axios.get('/api/product/all-products');
        // console.log(response.data.data);
        const apiFetchedProducts = response.data.data;
        setIsCategoryFilteredProducts(apiFetchedProducts);
      } catch (error) {
        console.log(error ? error.message : 'An error occurred while fetching products.');
      }
    }
    getProducts();
  }, []);
  // const categoryFilter = data.filter(products => (products.category === 'digital_cameras'))

  const sliderFunction = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // mobileFirst: false,
    // adaptiveHeight: true,
    // variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  }

  const quickViewHandler = (products) => {
    setSelectedProducts(products);
  }

  // remove quick view product,
  // to handle quick view component display (visiblity)
  const removeQuickViewProductHandler = () => {
    setSelectedProducts(null);
  };

  return (
    <div>
      <div className={`section_heading ${style.section_heading_modification}`}>
        <h1>Digital Cameras</h1>
      </div>
      <div className={style.parent_container}>
        <div className={style.container}>
          <Slider {...sliderFunction}>
            {isCategoryFilteredProducts.map((products, index) => (
              <div key={index} className={style.child_container}>
                <div className={style.product_card}>
                  <div className={style.parent_image_container}>
                    <div className={style.image_container}>
                      <Link to={`/product/${products._id}`}>
                        <img src={products.images[0]} alt={products.productName} />
                      </Link>
                    </div>
                    <div className={style.quickview_container}>
                      <button className='default_btn' onClick={() => quickViewHandler(products)}>Quick View</button>
                    </div>
                  </div>
                  <div className={style.product_name}>
                    <Link to={`/product/${products._id}`} className={products.productName.length > 20 ? style.product_name_long : style.product_name_short}>{products.productName}</Link>
                  </div>
                  <div className={style.product_price}>
                    <p>₨: {products.price}</p>
                  </div>
                  <div className={style.add_to_cart}>
                    <CartButton name='Add to Cart' click={() => addToCart(products)} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* quick view component */}
      {selectedProducts &&
        <div className={style.overlay_for_quick_view_component} onClick={removeQuickViewProductHandler}>
          <QuickView products={selectedProducts} closeQuickView={removeQuickViewProductHandler} />
        </div>
      }
    </div>
  )
}

export default ThirdSection