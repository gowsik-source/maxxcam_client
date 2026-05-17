import React, { useState } from 'react'
import style from './destination_popup.module.css'
// import axios from 'axios';
import { Country, State } from 'country-state-city';
import { RiCloseLargeLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md"

const DestinationPopup = ({ closePopup, setCartData }) => {

    const countryList = Country.getAllCountries();
    const stateList = State.getAllStates("IN");
    // console.log(stateList, 'state list');

    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [filteredCountries, setfilteredCountries] = useState([]);
    const [filteredStates, setfilteredStates] = useState([]);
    // console.log(filteredCountries, 'country')
    // console.log(isCountryOpen,"visibileity")
    const [destinationData, setDestinationData] = useState({
        country: '',
        state: '',
        city: '',
        address: '',
        pinCode: ''
    });
    // console.log(destinationData, 'destination data')
    const [isError, setIsError] = useState({}); // to store validation error

    const dropDownCountryVisibilityHandler = () => {
        setIsCountryOpen(prev => !prev);
        setfilteredCountries(countryList);
    }

    const dropDownStateVisibilityHandler = () => {
        setIsStateOpen(prev => !prev);
        setfilteredStates(stateList);
    }

    const countryLiHandler = (country) => {
        setDestinationData(prev => ({ ...prev, country: country.name }));
        setIsCountryOpen(false);
    };

    const stateLiHandler = (state) => {
        setDestinationData(prev => ({ ...prev, state: state.name }));
        setIsStateOpen(false);
    };

    const validationHandler = (event) => {
        const { name, value } = event.target;
        let localError = {};
        if (name === 'select_country') {
            setDestinationData(prev => ({ ...prev, country: value }));
            if (!value.trim()) {
                localError.country = "Select your country.";
            }
            else if (value) {
                const lowerCasedUserValue = value.toLowerCase().trim();
                // const lowerCasedCountryNames = countryList.map(country => country.name.toLowerCase().trim());
                // const searchWords = lowerCasedUserValue.trim().split(/\s+/);
                // const isMatchFound = lowerCasedUserValue.every(word => word === lowerCasedCountryNames);
                // const isValid = lowerCasedCountryNames.some(countryName => countryName === lowerCasedUserValue);
                // if (!isValid) {
                //     localError.country = "Select a valid country from the dropdown.";
                // }

                // const filtered = value ? lowerCasedCountryNames.filter(countryName => countryName.includes(lowerCasedUserValue)) : countryList;
                const filtered = value ? countryList.filter(country => country.name.toLowerCase().trim().includes(lowerCasedUserValue)) : countryList;
                setfilteredCountries(filtered);
            }
        }
        if (name === 'select_state') {
            setDestinationData(prev => ({ ...prev, state: value }));
            if (!value.trim()) {
                localError.country = "Select your state.";
            }
            else if (value) {
                const lowerCasedUserValue = value.toLowerCase().trim();
                const filtered = value ? stateList.filter(state => state.name.toLowerCase().trim().includes(lowerCasedUserValue)) : stateList;
                setfilteredStates(filtered);
            }
        }
        if (name === 'city_input') {
            setDestinationData(prev => ({ ...prev, city: value }));
            if (!value.trim()) {
                localError.city = "Enter your city / village.";
            }
        }
        if (name === 'address_input') {
            setDestinationData(prev => ({ ...prev, address: value }));
            if (!value.trim()) {
                localError.address = "Enter your address.";
            }
        }
        if (name === 'pincode_input') {
            setDestinationData(prev => ({ ...prev, pinCode: value }));
            if (!value.trim()) {
                localError.pinCode = "Enter your pincode.";
            }
            else if (/[a-zA-Z]/.test(value)) {
                localError.pinCode = "Pincode should not contain letters.";
            }
            else if (!/^[0-9]{6}$/.test(value)) {
                localError.pinCode = "Enter a valid 6-digit pincode.";
            }
        }
        setIsError(localError);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const localError = {};
        if (!destinationData.country.trim()) {
            localError.country = "Select your country.";
        }
        if (!destinationData.state.trim()) {
            localError.state = "Select your state.";
        }
        if (!destinationData.city.trim()) {
            localError.city = "Enter your city / village.";
        }
        if (!destinationData.address.trim()) {
            localError.address = "Enter your address.";
        }
        if (!destinationData.pinCode.trim()) {
            localError.pinCode = "Enter your pincode.";
        }
        setIsError(localError);
        if (Object.keys(localError).length > 0) return;
        // try {
        //     const response = await axios.post('https://jsonplaceholder.typicode.com/posts', destinationData);
        // } catch (error) {
        //     console.log(error || 'API error or network error');
        // }
        // const addressData = {
        //     'country': destinationData.country,
        //     'state': destinationData.state
        // }
        setCartData((prev) => ({
            ...prev,
            destination: {
                ...prev.destination,
                ...destinationData
            }
        }));
        closePopup();
    }

    return (
        <div>
            <div className={style.overlay} onClick={closePopup}></div>
            <div className={style.container}>
                <div className={style.outer_layout}>
                    <button className='default_btn' onClick={closePopup}><RiCloseLargeLine /></button>
                </div>
                <div className={style.heading}>
                    <h2>Select your destination</h2>
                </div>
                <div className={style.content_layout}>
                    <form onSubmit={submitHandler}>
                        <div className={style.country_label}>
                            <label htmlFor="enter_country">Country: *</label>
                        </div>
                        <div className={style.country_input_dropdown_container}>
                            <div className={isError.country ? style.country_input_div_error : style.country_input_div}>
                                <input id="enter_country" className={`default_input_style ${isError.country ? style.input_validation_error : ''}`} value={destinationData.country} name="select_country" onFocus={() => { setIsCountryOpen(true); setfilteredCountries(countryList); }} onChange={validationHandler} autoFocus />
                                <button className={`default_btn ${isCountryOpen ? style.dropdown_icon_active : style.dropdown_icon_inactive}`} onClick={dropDownCountryVisibilityHandler}><RiArrowDropDownLine /></button>
                            </div>
                            {isCountryOpen && <div className={style.country_dropdown_popup}>
                                <ul className={filteredCountries.length < 4 ? style.country_ul_lessthan_four : style.country_ul}>
                                    {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country) => {
                                            const formattedName = country?.name ? country.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "";
                                            return (
                                                <li key={country} onClick={() => countryLiHandler(country)} className={style.country_li}>{formattedName}</li>
                                            );
                                        })
                                    ) : (<li className={style.country_not_found_li}>No countries found</li>
                                    )}
                                </ul>
                            </div>}
                        </div>
                        {isError.country && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.country}</p>
                            </div>
                        </div>}
                        <div className={style.state_label}>
                            <label htmlFor="enter_state">State: *</label>
                        </div>
                        <div className={style.state_input_dropdown_container}>
                            <div className={isError.state ? style.state_input_div_error : style.state_input_div}>
                                <input id="enter_state" className={`default_input_style ${isError.state ? style.input_validation_error : ''}`} value={destinationData.state} name="select_state" onFocus={() => { setIsStateOpen(true); setfilteredStates(stateList); }} onChange={validationHandler} />
                                <button className={`default_btn ${isStateOpen ? style.dropdown_icon_active : style.dropdown_icon_inactive}`} onClick={dropDownStateVisibilityHandler}><RiArrowDropDownLine /></button>
                            </div>
                            {isStateOpen && <div className={style.state_dropdown_popup}>
                                <ul className={filteredStates.length < 4 ? style.state_ul_lessthan_four : style.state_ul}>
                                    {filteredStates.length > 0 ? (
                                        filteredStates.map((state) => {
                                            const formattedName = state?.name ? state.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "";
                                            return (
                                                <li key={state} onClick={() => stateLiHandler(state)} className={style.state_li}>{formattedName}</li>
                                            );
                                        })
                                    ) : (<li className={style.state_not_found_li}>No countries found</li>
                                    )}
                                </ul>
                            </div>}
                        </div>
                        {isError.state && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.state}</p>
                            </div>
                        </div>}
                        <div className={style.city_label}>
                            <label htmlFor="enter_city">City / Village *</label>
                        </div>
                        <div>
                            <input type="text" id="enter_city" className={`default_input_style ${isError.city ? style.input_validation_error : ''}`} name="city_input" onChange={validationHandler} />
                        </div>
                        {isError.city && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.city}</p>
                            </div>
                        </div>}
                        <div className={style.address_label}>
                            <label htmlFor="enter_addres">Address: *</label>
                        </div>
                        <div>
                            <textarea className={`default_input_style ${style.textarea_input}`} id="enter_addres" name="address_input" onChange={validationHandler}></textarea>
                        </div>
                        {isError.address && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.address}</p>
                            </div>
                        </div>}
                        <div className={style.pincode_label}>
                            <label htmlFor="postal_code">Pin Code: *</label>
                        </div>
                        <div>
                            <input type="text" className='default_input_style' id="postal_code" pattern='[0-9]*' maxLength={6} inputMode='numeric' name="pincode_input" onChange={validationHandler} />
                        </div>
                        {isError.pinCode && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.pinCode}</p>
                            </div>
                        </div>}
                        <div className={style.update_button}>
                            <button type='submit' className={style.update_btn}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DestinationPopup
