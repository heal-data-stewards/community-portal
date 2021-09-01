import React, { useState, useEffect, useCallback } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import { useRecursiveTimeout } from "./carousel/useRecursiveTimeout"
import Image from "next/image"

const AUTOPLAY_INTERVAL = 6000

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
    style={{ width: "20px" }}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
)

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
    style={{ width: "35px" }}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
)

export const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const autoplay = useCallback(() => {
    if (!embla) return
    if (embla.canScrollNext()) {
      embla.scrollNext()
    } else {
      embla.scrollTo(0)
    }
  }, [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  const { play, stop } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL)

  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
  }, [embla, onSelect])

  useEffect(() => {
    play()
  }, [play])

  return (
    <div
      className="embla"
      ref={viewportRef}
      style={{
        color: "#373a3c",
        marginTop: "44px",
        background: "rgb(229 224 230 / 28%)",
      }}
    >
      <div className="embla__container">
        <div className="embla__slide">
          <section className="container flex flex-col md:flex-row items-center justify-between pt-12">
            {/* Left column for content */}
            <div className="flex-1 sm:pr-8">
              <br></br>
              {/* Big title */}
              <h1 className="title mt-2 sm:mt-0 mb-4 sm:mb-2">
                Resources coming soon!
              </h1>
              <br></br>
              {/* Description paragraph */}
              <p className="text-xl mb-6">
                The Data Stewards are here to help with data management and
                making data FAIR. We understand that each study has unique needs
                and is at different stages of conducting investigation. We will
                be publishing a{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://staging.healdatafair.org/resources"
                  rel="noreferrer"
                >
                  series of general recommendations
                </a>{" "}
                this Fall that are intended to provide support to HEAL studies
                as they move through their own data lifecycle.
              </p>
            </div>
            {/* Right column for the image */}
            <div className="flex-shrink-0 w-full md:w-6/12 mt-6 md:mt-0 ">
              <a
                href="https://healdata.org/"
                target="_blank"
                rel="noreferrer"
                className="img-fix"
              >
                <Image
                  width="800px"
                  height="500px"
                  layout="intrinsic"
                  src={
                    "https://heal-community-portal-api.s3.amazonaws.com/small_carousel2_c0d502c422.jpeg"
                  }
                  alt="img"
                />
              </a>
            </div>
          </section>
        </div>
        <div className="embla__slide">
          <section className="container flex flex-col md:flex-row items-center justify-between pt-12">
            {/* Left column for content */}
            <div className="flex-1 sm:pr-8">
              {/* label */}
              <p className="uppercase tracking-wide font-semibold text-magenta">
                Webinar Series launches on Sept. 16
              </p>
              <br></br>
              {/* Big title */}
              <h1
                className="title mt-2 sm:mt-0 mb-4 sm:mb-2"
                // style={{ maxWidth: "200px" }}
              >
                Webinar Series
              </h1>
              <br></br>
              {/* Description paragraph */}
              <div className="text-xl mb-6">
                <p>
                  Making data FAIR (findable, accessible, interoperable, and
                  reusable) is an important step in advancing science, but
                  there’s no one-size-fits-all path to getting there. Join the
                  HEAL Stewards in monthly explorations into best practices,
                  tips and tricks, and step-by-step guides for making the most
                  of your data by making it FAIR.
                </p>
                <br></br>
                <p>
                  The first webinar in the series,{" "}
                  <i>SPARCing a conversation about FAIR data sharing,</i>, will
                  be held on Thursday, Sept. 16 from 1:00-2:00 p.m. Eastern
                  Time.{" "}
                  <a
                    target="_blank"
                    href="https://renci.zoom.us/webinar/register/WN_ffYZ4HgmR2Koz6kq9Ov8Hg"
                    style={{ color: "blue" }}
                    rel="noreferrer"
                  >
                    REGISTER HERE.
                  </a>
                </p>
              </div>
            </div>
            {/* Right column for the image */}
            <div className="flex-shrink-0 w-full md:w-6/12 mt-6 md:mt-0 img-fix">
              {/* {test} */}
              <Image
                width="800px"
                height="500px"
                layout="intrinsic"
                src={
                  "https://heal-community-portal-api.s3.amazonaws.com/small_3slide_d5a412f975.jpeg"
                }
                alt="img"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="container flex justify-between pb-12">
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  )
}
