import React from "react";

class Subscribe extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted to API nhá!");
    }

    render() {
        return (
            <div className="subscribe-us w-full h-[400px] bg-[#ffffff] flex flex-col justify-center items-center">
                <div className="justify-center items-center px-6 xs:px-0 mb-6 flex">
                    <div className="w-8 h-px bg-pinky-200"></div>
                    <div className="uppercase mx-4 tracking-widest text-pinky-400 font-bold text-[13px] text-center">
                        SIGN UP AND GET MORE NOTIFICATION
                    </div>
                    <div className="w-8 h-px bg-pinky-200"></div>
                </div>

                <div className="text-4xl mb-6 text-pinky-600">
                    MELANIE FASHION
                </div>

                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-3"> 
                        <div className="form-item border-2 border-pinky-600 text-pinky-600 hover:border-pinky-400 duration-500 focus:border-pinky-400">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="py-4 px-4 w-[350px] max-w-[250px] xs:max-w-full mx-auto bg-inherit outline-none leading-5
                                placeholder:uppercase placeholder:text-xs placeholder:tracking-widest placeholder:font-semibold"
                            />
                        </div>

                        <div className="form-item">
                            <button type="submit" className="button bg-pinky-600 text-white w-max max-h-[54px]">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Subscribe;
