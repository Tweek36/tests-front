import React, { useRef, useEffect, useState } from 'react';
import './ScrollableContainer.css';


interface ScrollableContainerProps {
    className?: string;
    children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children, className }) => {
    const scrollContentRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContentRef.current) {
            const scrollAmount = scrollContentRef.current.offsetWidth;
            const currentScrollLeft = scrollContentRef.current.scrollLeft;


            if (direction === 'left') {
                scrollContentRef.current.scrollLeft = currentScrollLeft - scrollAmount;
            } else {
                scrollContentRef.current.scrollLeft = currentScrollLeft + scrollAmount;
            }
        }
    };

    const func = () => {
        if (!scrollContentRef.current?.scrollLeft) {
            setCanScrollLeft(false)
        } else {
            setCanScrollLeft(true)
        }
        if (scrollContentRef.current && ((scrollContentRef.current?.scrollLeft + scrollContentRef.current?.offsetWidth) >= scrollContentRef.current?.scrollWidth)) {
            setCanScrollRight(false)
        } else {
            setCanScrollRight(true)
        }

    }

    useEffect(() => {
        scrollContentRef.current?.addEventListener('scroll', func);
        // setCanScrollRight(Boolean(scrollContentRef.current && ((scrollContentRef.current?.scrollLeft + scrollContentRef.current?.offsetWidth) >= scrollContentRef.current?.scrollWidth)))
        return () => {
            scrollContentRef.current?.removeEventListener('scroll', func);
        };
    }, [scrollContentRef]);

    return (
        <div className={"scrollable-container" + (className ? ` ${className}` : '')}>
            {canScrollLeft && <button className="scroll-button left" onClick={() => handleScroll('left')}>
                &lt;
            </button>
            }
            <div className="scroll-content" ref={scrollContentRef}>
                {children}
            </div>
            {canScrollRight &&
                <button className="scroll-button right" onClick={() => handleScroll('right')}>
                    &gt;
                </button>
                }
        </div>
    );
};

export default ScrollableContainer;
