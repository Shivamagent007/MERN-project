import React from "react";
import "./Footer.css"

const Footer = ()=>{
    return (
        // <footer id="footer">
        //     <div className="leftFooter">
        //         <h4>Download Our app</h4>
        //         <p>Download Our app for Android and IOS mobile phone</p>
        //         {/* <img src={playstore} alt="playStore" /> */}
        //         {/* <img src={appSotre} alt="appStore" /> */}
        //     </div>

        //     <div className="midFooter">
        //         <h1>Ecommerce</h1>
        //         <p>High Quality is our first priority</p>
        //         <p>Copyrights 2023 &copy; Shivam </p>
        //     </div>

        //     <div className="rightfooter">
        //         <h4>Follow Us</h4>
        //         <a href="http://youtube.com/meShivam">Youtube</a>
        //         <a href="http://instagram.com/meShivam">Instagram</a>
        //         <a href="http://instagram.com/meShivam">Facebook</a>
        //     </div>
            
        // </footer>

        // <!-- This is an example component -->

        <div className=" bg-gray-900">
            <div className="max-w-2xl mx-auto text-white py-10">
                <div className="text-center">
                    <h3 className="text-3xl mb-3"> Download our fitness app </h3>
                    <p> Stay fit. All day, every day. </p>
                    <div className="flex justify-center my-10">
                        <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8"></img>
                            <div className="text-left ml-3">
                                <p className='text-xs text-gray-200'>Download on </p>
                                <p className="text-sm md:text-base"> Google Play Store </p>
                            </div>
                        </div>
                        <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8"></img>
                            <div className="text-left ml-3">
                                <p className='text-xs text-gray-200'>Download on </p>
                                <p className="text-sm md:text-base"> Apple Store </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; Beautiful Footer, 2021. </p>
                    <div className="order-1 md:order-2">
                        <span className="px-2">About us</span>
                        <span className="px-2 border-l">Contact us</span>
                        <span className="px-2 border-l">Privacy Policy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;