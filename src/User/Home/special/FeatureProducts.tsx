import React from "react";

interface Product {
  id: number;
  name: string;
  url: string;
  price: number;
  onSale?: boolean;
  priceOnSale: number;
}

interface State {
  products: Product[];
}

class Products extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: "Image 1",
          url: "https://i.pinimg.com/736x/d1/ee/47/d1ee47c364a111307180b4d0b2a26d43.jpg",
          price: 60.0,
          onSale: true,
          priceOnSale: 70.0,
        },
        {
          id: 2,
          name: "Image 2",
          url: "https://i.pinimg.com/564x/b8/e4/d3/b8e4d39117ed6ec32f56836cf0a54291.jpg",
          price: 50.0,
          onSale: false,
          priceOnSale: 0,
        },
        {
          id: 3,
          name: "Image 3",
          url: "https://i.pinimg.com/564x/55/35/4c/55354c1c29c65abbfde03bc38b85f1ad.jpg",
          price: 50.0,
          onSale: false,
          priceOnSale: 0,
        },
        {
          id: 4,
          name: "Image 4",
          url: "https://i.pinimg.com/564x/21/42/03/2142033b6863429b7ef4fff201c9611c.jpg",
          price: 80.0,
          onSale: true,
          priceOnSale: 70.0,
        },
      ],
    };
  }

  render() {
    const { products } = this.state;
    return (
      <>
        {/* SUB HEADLINE */}
        <div className="subheadline flex">
          <div className="subheadline-deco-line"></div>
          <div className="subheadline-label">FEATUREs Products</div>
          <div className="subheadline-deco-line"></div>
        </div>
        {/* END SUB HEADLINE */}

        {/* MORE PRODUCTS */}
        <div className="feature-mugs w-[100%] lg:w-[80%] mx-auto mb-24">
          <div className="w-full h-[580px] rounded-3xl flex flex-col lg:flex-row justify-center items-center">
            <div className="basis-1/4 w-[100%] h-full bg-[#FFD1D1] rounded-xl lg:rounded-tl-3xl lg:rounded-tr-3xl lg:rounded-br-[0px] lg:rounded-bl-3xl text-center relative">
              <div
                className="absolute top-2 lg:top-8 left-3 lg:left-2 lg:right-4
              text-center w-[95%] lg:w-[90%] h-[90%] rounded-3xl
              bg-[url('https://i.pinimg.com/736x/d1/ee/47/d1ee47c364a111307180b4d0b2a26d43.jpg')] xs:bg-center bg-cover bg-no-repeat"
              ></div>
            </div>

            <div className="basis-2/4 h-[580px] flex flex-col justify-center items-center gap-4">
              <div className="basis-1 lg:basis-1/4 flex flex-col justify-end items-center w-full h-full rounded-bl-3xl rounded-br-3xl lg:shadow-md py-10">
                <div className="buttonBuyNow flex justify-center items-center w-auto text-2xl font-bold text-[#D94B4B] px-5 h-[50px] border-2 border-pinky-600 hover:bg-pinky-600 hover:text-white rounded-3xl hover:border-white mb-5">
                  Mua hàng ngay!
                </div>
                <div className="buttonBuyNow flex justify-center items-center w-auto text-2xl font-bold bg-pinky-600 text-white px-5 py-10 h-[50px] rounded-3xl">
                  Các bộ sưu tập khác
                </div>
              </div>
              <div className="lg:basis-3/4 hidden lg:block w-full h-[600px] rounded-tl-3xl rounded-tr-3xl bg-[#FFD1D1] relative">
                <div className=" absolute top-[30px] right-[25px] w-[90%] h-[80%] bg-[url('https://i.pinimg.com/564x/55/35/4c/55354c1c29c65abbfde03bc38b85f1ad.jpg')] rounded-3xl bg-cover bg-center bg-no-repeat"></div>
              </div>
            </div>

            <div className="basis-1/4 w-[100%] h-full bg-[#FFD1D1] rounded-xl lg:rounded-tl-3xl lg:rounded-tr-3xl lg:rounded-bl-[0px] lg:rounded-br-3xl text-center relative">
              <div
                className="absolute top-2 lg:top-8 left-3 lg:right-2
              text-center lg:bg-center w-[95%] lg:w-[90%] h-[90%] rounded-3xl
              bg-[url('https://i.pinimg.com/564x/21/42/03/2142033b6863429b7ef4fff201c9611c.jpg')] bg-center bg-cover bg-no-repeat"
              ></div>
            </div>
          </div>
        </div>
        {/* END MORE PRODUCTS */}
      </>
    );
  }
}

export default Products;
