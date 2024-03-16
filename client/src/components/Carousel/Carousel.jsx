import AliceCarousel from "react-alice-carousel";
import React from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import CarouselStyle from './Carousel.module.scss';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";


const Carousel = (
    {
        responsive,
        items,
        isInfosDisplay,
        isDotsDisplay,
        autoPlayInterval = 3000,
        paddingRight = 0,
        paddingLeft = 0
    }
) => {
    const renderDotsItem = () => {
        return <></>
    }

    const handleInfo = (e) => {
        return <div className={CarouselStyle.numberItems}>
            <span>{e.item}</span>
            <div className={CarouselStyle.trait} />
            <span>{e.itemsCount}</span>
        </div>
    }

    const prevButton = () => {
        return <div className={`${CarouselStyle.containerButton} ${CarouselStyle.left}`}>
            <MdChevronLeft size={40} />
        </div>
    }
    const nextButton = () => {
        return <div className={`${CarouselStyle.containerButton} ${CarouselStyle.right}`}>
            <MdChevronRight size={40} />
        </div>
    }

    return <AliceCarousel
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        responsive={responsive}
        autoPlay
        disableSlideInfo={!isInfosDisplay}
        renderSlideInfo={handleInfo}
        autoPlayDirection={"ltr"}
        autoPlayInterval={autoPlayInterval}
        mouseTracking
        items={items}
        disableDotsControls={isDotsDisplay}
        renderDotsItem={renderDotsItem}
        infinite
        renderPrevButton={prevButton}
        renderNextButton={nextButton}
    />
}

export default Carousel;
