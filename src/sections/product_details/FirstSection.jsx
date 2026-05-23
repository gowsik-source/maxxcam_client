import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import style from './first_section.module.css'
import AddToCartButton from '../../components/CartButton'
import { useCart } from '../../context/CartContext'
import ImageViewer from '../../components/ImageViewer'
import Axios from '../../API/Axios'

// slider imports
import Slider from "react-slick";
import PrevArrow from '../../components/PrevArrow'
import NextArrow from '../../components/NextArrow'

import { FaGreaterThan } from "react-icons/fa6"; // page route icon
import { FaMinus } from "react-icons/fa6"; // to decrease quantity and toggle product info and return policy
import { IoMdAdd } from "react-icons/io"; // to increase quantity and toggle product info and return policy

// social media icons
import { CiFacebook } from "react-icons/ci";
import { TiSocialPinterest } from "react-icons/ti";
import { BiLogoWhatsapp } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const ProductDetails = () => {

  const returnPolicyNotes = 'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.';
  const socialMediaIcons = [
    {
      name: 'facebook',
      icon: CiFacebook,
      link: 'https://www.facebook.com/'
    },
    {
      name: 'pinterest',
      icon: TiSocialPinterest,
      link: 'https://www.pinterest.com/'
    },
    {
      name: 'whatsapp',
      icon: BiLogoWhatsapp,
      link: 'https://www.whatsapp.com/'
    },
    {
      name: 'twitter',
      icon: FaXTwitter,
      link: 'https://x.com/'
    }
  ]

  const { category, _id } = useParams(); // to get the (id) from url
  // console.log(id, 'id from params')
  const [productDetails, setProductDetails] = useState(null); // to store the details of the product which user clicked on
  const [isPageRouteCategory, setIsPageRouteCategory] = useState('');
  const [isProductThumbnails, setIsProductThumbnails] = useState([]); // to store the product images in an array for slider
  const [isSelectedImage, setIsSelectedImage] = useState(''); // to change the main product image on click of thumbnail
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false); // to toggle image viewer component
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(true); // to toggle product info section
  const [isreturnPolicyOpen, setIsreturnPolicyOpen] = useState(true); // to toggle return policy section
  const [quantity, setQuantity] = useState(1); // to store the quantity selected by user for the product
  // const location = useLocation(); to get state on product listing page
  const navigate = useNavigate(); // to navigate to next and previous product
  // console.log(isPageRouteCategory,"category")
  // console.log(productDetails, "productDetails")
  // console.log(isProductThumbnails, "isProductThumbnails")

  // const activeProducts = location.state?.categorizedProduct || location.state?.sectionProducts || [];

  // const IndexValueOfUserClickedProduct = activeProducts.findIndex((productIndex) => productIndex.id == Number(id)); To match the index value from params (url) and page's useState
  // const userClickedProduct = activeProducts[IndexValueOfUserClickedProduct]; pick the exact product which is user clicked
  // const prevProduct = activeProducts[IndexValueOfUserClickedProduct - 1] here we need the previous product's id only
  // const nextProduct = activeProducts[IndexValueOfUserClickedProduct + 1] here also we need the next product's id only

  const { addToCartFromProductDetailsPageHandler } = useCart()

  // console.log(activeProducts, "activeProducts")
  // console.log("Index:", IndexValueOfUserClickedProduct);
  // console.log("Array length:", activeProducts.length);
  // console.log("Next index:", IndexValueOfUserClickedProduct + 1);
  // console.log("user click product:", userClickedProduct);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await Axios.get(`/api/product/${_id}`);
        console.log(response.data.data, 'response data');
        const apiFetchedProducts = response.data.data;
        setProductDetails(apiFetchedProducts);
      } catch (error) {
        console.log(error ? error.message : 'An error occurred while fetching products.');
      }
    }
    getProductDetails();
  }, [_id]);

  const slidesToShowLogic = Math.min(productDetails?.images?.length || 0, 5); // Math.min((userClickedProduct?.images?.length = 2),4) → 2 Or Math.min(userClickedProduct?.images?.length = 6),4) → 4
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShowLogic,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // useEffect(() => {
  //   if (!productDetails) {
  //     navigate('/')
  //   }
  // }, [])

  useEffect(() => {
    if (!category || category === "all_products") {
      setIsPageRouteCategory("All Products");
    }
    else if (category === "lenses_accessories") {
      setIsPageRouteCategory("Lenses & Accessories");
    }
  }, [category])

  useEffect(() => {
    setIsSelectedImage(productDetails?.images[0]); // always show first image of the product
    setIsProductThumbnails(productDetails?.images); // store all product images for image viewer component
  }, [productDetails])

  if (!productDetails) {
   return <div className={style.loading}><h1>Loading...</h1></div>;
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const toggleProductInfo = () => {
    setIsProductInfoOpen(prev => !prev);
  }

  const toggleReturnPolicy = () => {
    setIsreturnPolicyOpen(prev => !prev);
  }

  const openImageViwer = () => {
    setIsImageViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling on the main page when the image viewer is open
  }

  const closeImageViwer = () => {
    setIsImageViewerOpen(false);
    document.body.style.overflow = 'auto'; // enable scrolling on the main page when the image viewer is closed
  }

  return (
    <div>
      <div className={style.parent_container}>
        <div className={style.container_for_page_route_and_prev_next}>
          <div className={style.mobile_responsive_page_route_display}>
            {!category && <div>
              <Link to="/" className={style.mobile_responsive_home_route}>
                <span className={style.mobile_responsive_page_route_icon}><FaGreaterThan /></span>
                <span>Back to Home</span>
              </Link>
            </div>}
            {category && <div>
              <button className={`default_btn ${style.mobile_responsive_page_route_button}`} onClick={() => navigate('/shop')}>
                <span className={style.mobile_responsive_page_route_icon}><FaGreaterThan /></span>
                <span>Back to {isPageRouteCategory}</span>
              </button>
            </div>}
          </div>
          {/* page route */}
          <div className={style.page_route_display}>
            <div className={style.page_route_home}>
              <Link to="/">Home</Link>
            </div>
            <div className={style.page_route_arrow}>
              /
            </div>
            {category && <div className={style.page_route_product_category}>
              <button className='default_btn' onClick={() => navigate('/shop')}>{isPageRouteCategory}</button>
            </div>}
            {category && <div className={style.page_route_arrow}>
              /
            </div>}
            <div className={style.page_route_product_name_div}>
              <p className={productDetails?.productName?.length > 9 ? style.page_route_product_name_long : style.page_route_product_name_short}>{productDetails?.productName}</p>
            </div>
          </div>
          {/* next | prev button */}
          {/* <div className={style.prev_next_display}>
            <div className={style.prev}>
              <button className={`default_btn ${prevProduct ? style.prev_button_active : style.prev_button_inactive}`} disabled={!prevProduct} onClick={() => {
                if (category) {
                  navigate(`/category/${category}/product/${prevProduct.id}`,
                    { state: { categorizedProduct: activeProducts } }
                  )
                } else {
                  navigate(`/product/${prevProduct.id}`,
                    { state: { categorizedProduct: activeProducts } }
                  )
                }
              }}>
                <span className={style.prev_button_icon}><FaGreaterThan /></span>
                <span>Prev</span>
              </button>
            </div>
            <div className={style.prev_next_divider}>
              |
            </div>
            <div className={style.Next}>
              <button className={`default_btn ${nextProduct ? style.next_button_active : style.next_button_inactive}`} disabled={!nextProduct} onClick={() => {
                if (category) {
                  navigate(`/category/${category}/product/${nextProduct.id}`,
                    { state: { categorizedProduct: activeProducts } }
                  )
                } else {
                  navigate(`/product/${nextProduct.id}`,
                    { state: { categorizedProduct: activeProducts } }
                  )
                }
              }}>
                <span>Next</span>
                <span className={style.next_button_icon}><FaGreaterThan /></span>
              </button>
            </div>
          </div> */}
        </div>
        <div className={style.container}>
          {/* left section */}
          <div className={style.display_left}>
            <div className={style.main_product_image}>
              <img src={isSelectedImage} alt={productDetails?.productName} onClick={openImageViwer} />
            </div>
            <div className={style.product_image_selector}>
              <Slider {...settings}>
                {isProductThumbnails?.map((imageSelector, index) => (
                  <button className={`default_btn ${style.product_image_selector_item}`} key={index} onClick={() => setIsSelectedImage(imageSelector)}><img src={imageSelector} alt="" /></button>
                ))}
              </Slider>
            </div>
            <div className={style.product_short_description}>
              <p>{productDetails?.shortDescription}</p>
            </div>
          </div>
          {/* right section */}
          <div className={style.display_right}>
            <div className={style.product_name}>
              <h2>{productDetails?.productName}</h2>
            </div>
            <div className={style.product_price}>
              <p>₨: {productDetails?.price}</p>
            </div>
            <div className={style.quantity_text}>
              <p>Quantity*:</p>
            </div>
            {/* product quantity */}
            <div className={style.quantity_container}>
              <div>
                <button className={`default_btn ${quantity === 1 ? style.minus_disabled : ''}`} onClick={decreaseQuantity}>
                  <FaMinus />
                </button>
              </div>
              <div className={style.quantity_number}>
                <p>{quantity}</p>
              </div>
              <div>
                <button className={"default_btn"} onClick={increaseQuantity}>
                  <IoMdAdd />
                </button>
              </div>
            </div>
            <div className={style.add_to_cart_button}>
              <AddToCartButton name='Add to Cart' click={() => addToCartFromProductDetailsPageHandler(productDetails, quantity)} />
            </div>
            <div className={style.buy_now_button}>
              <button onClick={() => alert('We are currently not accepting orders at the moment')}>Buy Now</button>
            </div>
            <div className={style.product_info_button}>
              <button className='default_btn' onClick={toggleProductInfo}>
                <span>
                  <h3>PRODUCT INFO</h3>
                </span>
                <span className={isProductInfoOpen ? style.product_info_open : style.product_info_closed}>
                  <FaMinus />
                </span>
                <span className={isProductInfoOpen ? style.product_info_closed : style.product_info_open}>
                  <IoMdAdd />
                </span>
              </button>
            </div>
            <div className={style.product_info_content}>
              {isProductInfoOpen && <p>{productDetails?.description}</p>}
            </div>
            <div className={style.divider}>
              <hr />
            </div>
            <div className={style.return_policy_button}>
              <button className='default_btn' onClick={toggleReturnPolicy}>
                <span>
                  <h3>REFUND AND RETURN POLICY</h3>
                </span>
                <span className={isreturnPolicyOpen ? style.return_policy_open : style.return_policy_closed}>
                  <FaMinus />
                </span>
                <span className={isreturnPolicyOpen ? style.return_policy_closed : style.return_policy_open}>
                  <IoMdAdd />
                </span>
              </button>
            </div>
            <div className={style.return_policy_content}>
              {isreturnPolicyOpen && <p>{returnPolicyNotes}</p>}
            </div>
            {/* social media icons */}
            <div className={style.social_media_icons_container}>
              {socialMediaIcons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                  <div className={style.social_media_icon} key={index}>
                    <a href={icon.link} target="_blank" rel="noopener noreferrer"><IconComponent /></a>
                    <span className={style.tooltip_name}>{icon.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* product image viewer */}
      {isImageViewerOpen &&
        <div className={style.image_viewer_component}>
          <ImageViewer productImages={isProductThumbnails} closeComponent={closeImageViwer} />
        </div>}
    </div>
  )
}

export default ProductDetails
