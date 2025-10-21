import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

import ImgBanner1 from "/src/assets/img/casino-banner1.jpg";
import ImgBanner2 from "/src/assets/img/casino-banner2.jpg";
import ImgBanner3 from "/src/assets/img/casino-banner3.png";
import ImgBanner4 from "/src/assets/img/casino-banner4.jpg";
import ImgBanner5 from "/src/assets/img/casino-banner5.jpg";
import ImgBanner6 from "/src/assets/img/casino-banner6.jpg";
import ImgBanner7 from "/src/assets/img/casino-banner7.png";
import ImgBanner8 from "/src/assets/img/casino-banner8.jpg";
import ImgBanner9 from "/src/assets/img/casino-banner9.png";
import ImgBanner10 from "/src/assets/img/casino-banner10.jpg";
import ImgBanner11 from "/src/assets/img/casino-banner11.jpg";
import ImgBanner12 from "/src/assets/img/casino-banner12.jpg";
import ImgBanner13 from "/src/assets/img/casino-banner13.jpg";
import ImgBanner14 from "/src/assets/img/casino-banner14.jpg";
import ImgBanner15 from "/src/assets/img/casino-banner15.jpg";
import ImgBanner16 from "/src/assets/img/casino-banner16.jpg";
import ImgBanner17 from "/src/assets/img/casino-banner17.jpg";

const Slideshow = () => {
    const slides = [
        {
            id: 1,
            image: ImgBanner1
        },
        {
            id: 2,
            image: ImgBanner2
        },
        {
            id: 3,
            image: ImgBanner3
        },
        {
            id: 4,
            image: ImgBanner4
        },
        {
            id: 5,
            image: ImgBanner5
        },
        {
            id: 6,
            image: ImgBanner6
        },
        {
            id: 7,
            image: ImgBanner7
        },
        {
            id: 8,
            image: ImgBanner8
        },
        {
            id: 9,
            image: ImgBanner9
        },
        {
            id: 10,
            image: ImgBanner10
        },
        {
            id: 11,
            image: ImgBanner11
        },
        {
            id: 12,
            image: ImgBanner12
        },
        {
            id: 13,
            image: ImgBanner13
        },
        {
            id: 14,
            image: ImgBanner14
        },
        {
            id: 15,
            image: ImgBanner15
        },
        {
            id: 16,
            image: ImgBanner16
        },
        {
            id: 17,
            image: ImgBanner17
        },
    ];

    return (
        <section className="slots-slider">
            <Swiper
                modules={[ Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="swiper-container"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <a href="javascript:void(0)" className="slots-slider__item">
                            <div
                                className="slots-slider__img"
                                style={{
                                    backgroundImage: `url(${slide.image})`
                                }}
                            ></div>
                            <div className="slots-slider__description"></div>
                        </a>
                    </SwiperSlide>
                ))}
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </Swiper>
        </section>
    );
}

export default Slideshow;
