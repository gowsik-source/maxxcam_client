import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import style from './first_section_style.module.css'
// import data from '../../../data.json'
import Axios from '../../../API/Axios'
import CartButton from '../../../components/CartButton'
import QuickView from '../../../components/QuickView'
import { useCart } from '../../../context/CartContext'
import { FaGreaterThan } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";

const FirstSection = () => {

  const { addToCart } = useCart();

  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log(filteredProducts[0].productName.length, "filtered products")
  const cartIsEmpty = filteredProducts.length === 0;

  const [browseByHeading, setBrowseByHeading] = useState('All Products');
  const [isCategoryForUrl, setIsCategoryForUrl] = useState('all_products');
  // console.log(isCategoryForUrl,'category url from shop')
  const [isRangeInputOpen, setIsRangeInputOpen] = useState(false);
  const [isSelect, setIsSelect] = useState('Recommended');
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const sortByRef = useRef(null);

  //mobile responsive

  const [isMobileFilterSortByOpen, setIsMobileFilterSortByOpen] = useState(false);
  const [isMobileSortByOpen, setIsMobileSortByOpen] = useState(true);
  const [isMobilePriceFilterOpen, setIsMobilePriceFilterOpen] = useState(false);
  const [isMobileCustomFilterOpen, setIsMobileCustomFilterOpen] = useState(false);
  // const [isCustomSelectedCategory, setIsCustomSelectedCategory] = useState([]);

  // input type = range (logic)
  const MIN = 100;
  const MAX = 2000;
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const minPercent = (minPrice / MAX) * 100;
  const maxPercent = (maxPrice / MAX) * 100;

  // sort by
  const optionValues = ["Recommended", "Newest", "Price (low to high)", "Price (high to low)", "Name (A to Z)", "Name (Z to A)"]
  const sortKeyMap = {
    "Recommended": "recommended",
    "Newest": "newest",
    "Price (low to high)": "price_low_to_high",
    "Price (high to low)": "price_high_to_low",
    "Name (A to Z)": "name_a_z",
    "Name (Z to A)": "name_z_a",
  };

  // fetch all products
  const fetchAllProducts = async () => {
    try {
      const allProductsResponse = await Axios.get('/api/product/all-products');
      const allProductsData = allProductsResponse.data.data;
      // console.log(allProductsData, "all products data from shop")
      setFilteredProducts(allProductsData);
    } catch (error) {
      console.log(error ? error.message : "Error fetching all products");
    }
  }

  // fetch lenses & accessories products
  const fetchLensesAccessoriesProducts = async () => {
    try {
      const productsResponse = await Axios.get('/api/product/lenses-and-accessories');
      const allProductsData = productsResponse.data.data;
      // console.log(allProductsData, "all products data from shop")
      setFilteredProducts(allProductsData);
    } catch (error) {
      console.log(error ? error.message : "Error fetching Lenses & Accessories products");
    }
  }

  // always show all products
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // close sort by (click outside)
  useEffect(() => {
    const sortByHandleClickOutside = (event) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target)) {
        setIsSortByOpen(false);
      }
    };

    document.addEventListener("mousedown", sortByHandleClickOutside);

    return () => {
      document.removeEventListener("mousedown", sortByHandleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (!category || category === "all_products") {
  //     setFilteredProducts(data);
  //     setBrowseByHeading("All Products");
  //     setIsCategoryForUrl("all_products");
  //   } else {
  //     const filtered = data.filter(
  //       product => product.category === category
  //     );

  //     setFilteredProducts(filtered);
  //     setBrowseByHeading("Lenses & Accessories");
  //     setIsCategoryForUrl(category);
  //   }
  // }, [category]);

  // onclick function for all products
  const allProducts = () => {
    fetchAllProducts();
    setIsSelect('Recommended');
    setBrowseByHeading('All Products');
    setIsCategoryForUrl('');
  }

  // onclick function for lenses & accessories
  const lensesAccessories = () => {
    // const productFound = data.filter(product => (product.category === 'lenses_accessories'))
    fetchLensesAccessoriesProducts();
    setIsSelect('Recommended');
    setBrowseByHeading('Lenses & Accessories');
    setIsCategoryForUrl('lenses_accessories');
  }

  // to handle display (range) input
  const priceInputHandler = () => {
    setIsRangeInputOpen(prev => !prev)
  }

  // filter by price (range)
  useEffect(() => {
    const allProductsPriceFilterHandler = async () => {
      try {
        const allProductsResponse = await Axios.get('/api/product/all-products');
        const fetchedProducts = allProductsResponse.data.data;
        const productFound = fetchedProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        setFilteredProducts(productFound);
      } catch (error) {
        console.log(error ? error.message : "Error fetching all products for price filter");
      }
    }
    allProductsPriceFilterHandler();
    setIsSelect('Recommended');
  }, [minPrice, maxPrice]);

  // clear price filter
  const clearPriceFilter = () => {
    setMinPrice(MIN);
    setMaxPrice(MAX);
  }

  // to handle display (range) input
  const sortByDisplayHandler = () => {
    setIsSortByOpen(prev => !prev)
  }

  // sort by logic handler
  const sortByLogicHandler = (isSelect) => {
    const sortedProducts = [...filteredProducts]

    switch (isSelect) {
      case "price_low_to_high":
        sortedProducts.sort((a, b) => a.price - b.price)
        break;
      case "price_high_to_low":
        sortedProducts.sort((a, b) => b.price - a.price)
        break;
      case "name_a_z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break;
      case "name_z_a":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break;

      default:
        break
    }
    setFilteredProducts(sortedProducts)
  }

  const selectFunctionHandler = (option) => {
    setIsSelect(option)
    sortByDisplayHandler();
    sortByLogicHandler(sortKeyMap[option])
  }

  // clear all filter
  const clearAllFilter = () => {
    fetchAllProducts();
    setIsSelect('Recommended');
    setBrowseByHeading('All Products');
    setMinPrice(MIN);
    setMaxPrice(MAX);
  }

  const quickViewHandler = (products) => {
    setSelectedProducts(products);
  }

  // remove quick view product,
  // to handle quick view component display (visiblity)
  const removeQuickViewProductHandler = () => {
    setSelectedProducts(null);
  };

  // mobile responsive

  const mobileResponsiveSortByDisplayHandler = () => {
    setIsMobileSortByOpen(prev => !prev)
  }

  const mobileResponsivePriceFilterDisplayHandler = () => {
    setIsMobilePriceFilterOpen(prev => !prev)
  }

  const mobileResponsiveCustomFilterDisplayHandler = () => {
    setIsMobileCustomFilterOpen(prev => !prev)
  }

  const mobileResponsiveSortByFilterDisplayHandler = () => {
    setIsMobileFilterSortByOpen(prev => !prev)
    isMobileFilterSortByOpen ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden';
  }

  const allProductsFilterForMobileHandler = () => {
    fetchAllProducts();
    setBrowseByHeading('All Products');
    setIsCategoryForUrl('');
  }

  const lensesAccessoriesFilterForMobileHandler = () => {
    // const productFound = data.filter(product => (product.category === 'lenses_accessories'))
    fetchLensesAccessoriesProducts();
    setBrowseByHeading('Lenses & Accessories');
    setIsCategoryForUrl('lenses_accessories');
  }

  return (
    <div>
      {/* mobile responsive */}
      <div className={isMobileFilterSortByOpen ? style.mobile_responsive_parent_container_filter_sort : style.mobile_responsive_parent_container_filter_sort_hidden}>
        <div className={style.mobile_responsive_container_filter_sort}>
          <div className={style.mobile_responsive_filter_sort_header}>
            <div className={style.mobile_responsive_sort_popup_header_display}>
              <div className={style.filter_sort_heading__and_products_count}>
                <div className={style.filter_sort_heading}>
                  <h3>Filter & Sort</h3>
                </div>
                <div className={style.products_count_mobile_responsive_popup}>
                  <p>({filteredProducts.length} products)</p>
                </div>
              </div>
              <div className={style.mobile_responsive__popup_close_button}>
                <button className='default_btn' onClick={mobileResponsiveSortByFilterDisplayHandler}><RiCloseLargeLine /></button>
              </div>
            </div>
            <div className={style.mobile_responsive_sort_popup_header_divider}>
              <hr />
            </div>
          </div>
          <div className={style.mobile_responsive_sort_popup_body}>
            {!cartIsEmpty && <div className={style.mobile_responsive_sort_by}>
              <button className={`default_btn ${style.mobile_responsive_sort_by_button}`} onClick={mobileResponsiveSortByDisplayHandler}>
                <span>
                  <h4>Sort by:</h4>
                </span>
                <span>{isMobileSortByOpen ? <FaMinus /> : <IoMdAdd />}</span>
              </button>
            </div>}
            {isMobileSortByOpen && !cartIsEmpty && <div className={style.mobile_responsive_sort_by_container}>
              {optionValues.map((option) => (
                <div className={style.mobile_responsive_sort_option} key={option}>
                  <input type="radio" id={sortKeyMap[option]} name='sortByMobileSelect' onClick={() => selectFunctionHandler(option)} />
                  <label htmlFor={sortKeyMap[option]}>{option}</label>
                </div>
              ))}
            </div>}
            <div className={style.mobile_responsive_sort_popup_body_divider}>
              <hr />
            </div>
            <div className={style.mobile_responsive_price_filter}>
              <button className={`default_btn ${style.mobile_responsive_price_filter_button}`} onClick={mobileResponsivePriceFilterDisplayHandler}>
                <span>
                  <h4>Price: (₨:{minPrice} - ₨:{maxPrice})</h4>
                </span>
                <span>{isMobilePriceFilterOpen ? <FaMinus /> : <IoMdAdd />}</span>
              </button>
            </div>
            {isMobilePriceFilterOpen && <div className={style.mobile_responsive_price_range_input_container}>
              <div className={style.price_range_wrapper}>
                <div className={style.track}></div>
                <div className={style.range} style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
                <input type="range" min={MIN} max={MAX} value={minPrice} className={style.range_input} step={100} onChange={(e) => { const v = Number(e.target.value); if (v < maxPrice) setMinPrice(v); }} />
                <input type="range" min={MIN} max={MAX} value={maxPrice} className={style.range_input} step={100} onChange={(e) => { const v = Number(e.target.value); if (v > minPrice) setMaxPrice(v); }} />
              </div>
              <div className={style.input_range_price_container}>
                <div>
                  ₹ {minPrice}
                </div>
                <div>
                  ₹ {maxPrice}
                </div>
              </div>
            </div>}
            <div className={style.mobile_responsive_sort_popup_body_divider}>
              <hr />
            </div>
            <div className={style.mobile_responsive_custom_filter}>
              <button className={`default_btn ${style.mobile_responsive_custom_filter_button}`} onClick={mobileResponsiveCustomFilterDisplayHandler}>
                <span>
                  <h4>Custom Filter:</h4>
                </span>
                <span>{isMobileCustomFilterOpen ? <FaMinus /> : <IoMdAdd />}</span>
              </button>
            </div>
            {isMobileCustomFilterOpen && <div className={style.custom_filter_container}>
              <div className={style.browse_by_items_for_mobile_responsive}>
                <button className='default_btn' onClick={allProductsFilterForMobileHandler}>All Products</button>
              </div>
              <div className={style.browse_by_items_for_mobile_responsive}>
                <button className='default_btn' onClick={lensesAccessoriesFilterForMobileHandler}>Lenses & Accessories</button>
              </div>
            </div>}
          </div>
        </div>
      </div>
      {/* web version */}
      <div className={style.parent_container}>
        <div className={style.page_route_display}>
          <div className={style.page_route_home}>
            <button className='default_btn'><a href="/">Home</a></button>
          </div>
          <div className={style.page_route_arrow}>
            <FaGreaterThan />
          </div>
          <div>
            <p>{browseByHeading}</p>
          </div>
        </div>
        <div className={style.container}>
          <div className={`section_heading ${style.custom_heading_style}`}>
            <h2>{browseByHeading}</h2>
          </div>
          <div className={style.page_container}>
            {/* --------------left section------------------ */}
            <div className={style.browse}>
              <div className={style.browse_heading}>
                <h3>browse by</h3>
              </div>
              <hr className={style.divider_line} />
              <div className={style.browse_by_items}>
                <button className='default_btn' onClick={allProducts}>All Products</button>
              </div>
              <div className={style.browse_by_items}>
                <button className='default_btn' onClick={lensesAccessories}>Lenses & Accessories</button>
              </div>
              <div className={style.filter_heading}>
                <h3>Filter by</h3>
              </div>
              <hr className={style.divider_line} />
              <div className={style.filter_by_price_button_div}>
                <button className={`default_btn ${style.filter_by_price_button}`} onClick={priceInputHandler}>
                  <span>Price</span>
                  <span className={style.inline_container_for_price_icons}>
                    <span className={isRangeInputOpen ? style.price_plus_icon_hidden : style.price_plus_icon}><IoMdAdd /></span>
                    <span className={isRangeInputOpen ? style.price_minus_icon : style.price_minus_icon_hidden}><FaMinus /></span>
                  </span>
                </button>
              </div>
              <div className={isRangeInputOpen ? style.price_range_input_container : style.price_range_input_container_hidden}>
                <div className={style.price_range_wrapper}>
                  <div className={style.track}></div>
                  <div className={style.range} style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
                  <input type="range" min={MIN} max={MAX} value={minPrice} className={style.range_input} step={100} onChange={(e) => { const v = Number(e.target.value); if (v < maxPrice) setMinPrice(v); }} />
                  <input type="range" min={MIN} max={MAX} value={maxPrice} className={style.range_input} step={100} onChange={(e) => { const v = Number(e.target.value); if (v > minPrice) setMaxPrice(v); }} />
                </div>
                <div className={style.input_range_price_container}>
                  <div>
                    ₹ {minPrice}
                  </div>
                  <div>
                    ₹ {maxPrice}
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------right section------------- */}
            <div className={style.browsed_products}>
              <div className={minPrice > MIN || maxPrice < MAX ? style.container_for_price_range_and_clear_filter : style.container_for_price_range_and_clear_filter_hidden}>
                <div className={style.clear_price_filter}>
                  <div className={style.inline_clear_price_filter_container}>
                    <div>
                      ₹ {minPrice}
                    </div>
                    <div>
                      -
                    </div>
                    <div>
                      ₹ {maxPrice}
                    </div>
                  </div>
                  <div className={style.price_filter_cancel_button}>
                    <button className='default_btn' onClick={clearPriceFilter}>
                      <RiCloseLargeLine />
                    </button>
                  </div>
                </div>
                <div className={style.clear_all_filter_button}>
                  <button className='default_btn' onClick={clearAllFilter}>Clear All</button>
                </div>
              </div>
              <div className={style.product_count_sort_by}>
                <div className={style.product_count}>
                  <span>{filteredProducts.length}</span>
                  <h4>products</h4>
                </div>
                {/* mobile responsive sort by button */}
                <div className={style.mobile_responsive_sort_by_button_container}>
                  <button className={`default_btn ${style.mobile_responsive_sort_by_filter_button}`} onClick={mobileResponsiveSortByFilterDisplayHandler}>Filter & Sort</button>
                </div>
                <div className={style.sort_by} ref={sortByRef}>
                  <button className={`default_btn ${style.sort_by_button}`} onClick={sortByDisplayHandler}>
                    <span>
                      <h4>Sort by:</h4>
                    </span>
                    <span>
                      <p>{isSelect}</p>
                    </span>
                    <span className={isSortByOpen ? style.dropdown_close_icon_hidden : style.dropdown_close_icon}>
                      <RiArrowDropDownLine />
                    </span>
                    <span className={isSortByOpen ? style.dropdown_open_icon : style.dropdown_open_icon_hidden}>
                      <RiArrowDropDownLine />
                    </span>
                  </button>
                  <ul className={isSortByOpen ? style.sort_by_popup : style.sort_by_popup_hidden}>
                    {optionValues.map((option) => (
                      <li key={option} onClick={() => selectFunctionHandler(option)} className={isSelect === option ? style.selected_option : ''}>{option}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={style.parent_container_for_maped_items}>
                <div className={style.container_for_maped_items}>
                  {filteredProducts.map((products, index) => (
                    <div key={index} className={style.child_container}>
                      <div className={style.parent_image_container}>
                        <div className={style.image_container}>
                          <Link to={`/category/${isCategoryForUrl}/product/${products._id}`}>
                            <img src={products.images[0]} alt={products.productName} />
                          </Link>
                        </div>
                        <div className={style.quickview_container}>
                          <button className='default_btn' onClick={() => quickViewHandler(products)}>Quick View</button>
                        </div>
                      </div>
                      <div className={style.product_name}>
                        <Link to={`/category/${isCategoryForUrl}/product/${products._id}`} className={products.productName.length > 20 ? style.product_name_long : style.product_name_short}>{products.productName}</Link>
                      </div>
                      <div className={style.product_price}>
                        <p>₨: {products.price}</p>
                      </div>
                      <div className={style.add_to_cart}>
                        <CartButton name='Add to Cart' click={() => addToCart(products)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cartIsEmpty ? style.empty_message_container : style.empty_message_container_hidden}>
                <div>
                  <h2>We couldn't find any matches</h2>
                </div>
                <div>
                  <p>Try different filters or another category.</p>
                </div>
                <div className={style.clear_all_filter_button}>
                  <button className='default_btn' onClick={clearAllFilter}>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* quick view component */}
      {selectedProducts &&
        <div className={style.overlay_for_quick_view_component} onClick={removeQuickViewProductHandler}>
          <QuickView products={selectedProducts} closeQuickViewAfterAddToCart={removeQuickViewProductHandler} />
        </div>
      }
    </div>
  )
}

export default FirstSection
