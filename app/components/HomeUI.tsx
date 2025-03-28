"use client"
import Aurora from "./Aurora"
import PixelCard from "./PixelCard"
import { useState, useEffect } from "react"
import Image from "next/image"
import FadeContent from './FadeContent'

interface BookExcerpt {
    excerpt: string;
    title: string;
    author: string;
}

interface HomeUIProps {
    data: BookExcerpt[];
}


export default function HomeUI({ data }: HomeUIProps) {
    const [para, setPara] = useState(0)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [subtitle, setSubtitle] = useState("Imagine what the author is trying to picture..\n (Kindly wait for a few seconds for the image to generate)")

    const handleGenerate = () => {
        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: data[para].excerpt,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.image) {
                    setGeneratedImage(data.image)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleNext = () => {
        // use random number
        const random = Math.floor(Math.random() * data.length)
        setPara(random)
    }

    useEffect(() => {
        if (generatedImage) {
            setSubtitle("Click on Image to go back")
        } else {
            setSubtitle("Imagine what the author is trying to picture..\n (Kindly wait for a few seconds for the image to generate)")
        }
    }, [generatedImage])

    return (
        <div className="relative">
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={1}
                amplitude={1.0}
                speed={2}
            />
            <div className="absolute inset-0">
                <h1 className="text-[20px] sm:text-[40px] font-bold justify-center text-center pt-20">
                    AI Based Book Excerpt Visualisation
                </h1>
                <h2 className="text-[10px] sm:text-[25px] font-extralight justify-center text-center">
                    {subtitle}
                </h2>
                <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
                    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                        {generatedImage ?

                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                                <div className="bg-black flex items-center justify-center p-4">
                                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                                        <Image
                                            onClick={() => {
                                                setGeneratedImage(null)
                                                setSubtitle("Imagine what the author is trying to picture..\n (Kindly wait for a few seconds for the image to generate)")
                                            }}
                                            src={generatedImage}
                                            alt="Generated Image"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-contain"
                                        />
                                    </FadeContent>
                                </div>
                            </div>

                            :

                            <PixelCard variant="pink">
                                <div className="absolute inset-0 text-[10px] sm:text-[20px]">
                                    <div className="font-bold justify-center text-center pt-10 pl-10 pr-10 pb-10">
                                        {data[para].excerpt}
                                        <br />
                                        - {data[para].title} by {data[para].author}
                                    </div>
                                    <div className="flex items-center justify-center space-x-10">
                                        <button onClick={handleNext} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                                            Next
                                        </button>
                                        <button onClick={handleGenerate} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                                            Generate Image
                                        </button>
                                    </div>
                                </div>
                            </PixelCard>
                        }


                    </main>
                </div>
            </div>
        </div>
    );
}