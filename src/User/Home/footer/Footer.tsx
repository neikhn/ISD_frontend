/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Footer extends React.Component {
    render ( ) {
        return (
            <>
            <footer className=" w-full px-20 py-10 bg-pinky-600 text-white text-sm">
                <div className="flex flex-col md:flex-row text-center md:text-left gap-12 md:gap-8">
                    <div className="basis-2/6">
                        <div className="font-bold text-xl mb-4 text-white uppercase"> Melanie FASHION. </div>
                        <div className="mb-8 md:mb-20"> Delivering the best fashion life since 2024. </div>
                        <div className="text-white hover:text-pinky-400"> Melina fash. ©2024 </div>
                    </div>
                    <div className="basis-1/6">
                        <div className="uppercase font-semibold tracking-wider text-white mb-4">Menu</div>
                        <div className="flex flex-col gap-3">
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">HOME</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">PRODUCTS</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">BLOG</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">ABOUT</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">CONTACT</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">STYLEGUIDE</a></div>
                        </div>
                    </div>
                    <div className="basis-1/6">
                        <div className="uppercase font-semibold tracking-wider text-white mb-4">Follow us</div>
                        <div className="flex flex-col gap-3">
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">Facebook</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">Instagram</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">Pinterest</a></div>
                            <div className=""> <a href="#" className="text-white hover:text-slate-600">Twitter</a></div>
                        </div>
                    </div>
                    <div className="basis-2/6">
                        <div className="uppercase font-semibold tracking-wider text-white mb-8 md:mb-4">Contact us</div>
                        <div className="mb-4 text-white text-[22px] tracking-wide">We&apos; re Always Happy to Help</div>
                        <div className="mb-16"><a href="mailto:leminhtu17062003@gmail.com" className="hover:text-white">leminhtu17062003@gmail.com</a></div>
                    </div>
                </div>
            </footer>
            </>
        )
    }
}

export default Footer;