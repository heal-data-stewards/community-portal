import React from "react"
import Markdown from "react-markdown"

export default function Topics({ data }) {
  // add error handling
  return (
    <>
      <main className="container pb-12 ">
        <h2 className="text-4xl text-purple font-bold mb-4 mt-14">
          {data.title}
        </h2>
        <h3 className="text-1xl mb-14">{data.subtitle}</h3>
        <div className="flex-wrap flex">
          {data.topic.map((topic, i) => {
            return (
              <div
                className={"mb-8 odd:pr-10"}
                style={{ width: "50%" }}
                key={topic.title + i}
              >
                <h4 className="text-2xl text-magenta font-bold mb-4">
                  {topic.title}
                </h4>
                <Markdown linkTarget="_blank">{topic.body}</Markdown>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}