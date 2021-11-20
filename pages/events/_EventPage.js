import Layout from "@/components/layout"
import Seo from "@/components/elements/seo"
import { getEvent } from "utils/msft-graph-api"
import React, { useState, useEffect } from "react"
import Divider from "@mui/material/Divider"
import { makeEasternTime } from "utils/helper-functions"

// Creates an Event page from the outlook calendar

function EventPage({ global, event, pageContext, metadata }) {
  // Render event page...
  const [data, dataSet] = useState(event.event)
  useEffect(() => {
    async function fetchMyAPI() {
      let eventData2 = await getEvent(pageContext.token, pageContext.url)
      dataSet(eventData2)
      // console.log(eventData2.start.dateTime)
    }
    fetchMyAPI()
  }, [pageContext.token, pageContext.url])

  let date = new Date(Date.parse(data.start.dateTime))
  let endDate = new Date(Date.parse(data.end.dateTime))
  let sTime = date.toLocaleTimeString()
  let eTime = endDate.toLocaleTimeString()
  let startTime = makeEasternTime(sTime)
  let endTime = makeEasternTime(eTime)

  return (
    <Layout global={global} pageContext={pageContext}>
      <Seo metadata={metadata} />
      <div className="container pt-10 pb-10">
        {/* Page header section */}
        <section className="">
          <h1 className="text-5xl pb-4 font-black text-purple">
            {data.subject}
          </h1>
          <Divider />
          <h2 className="pt-4 font-black text-magenta">
            {data.location.displayName}
          </h2>
          <p
            className="bg-magenta text-white mt-4"
            style={{
              display: "inline-block",
              padding: "5px 16px",
              clipPath: "polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%)",
            }}
          >
            {`${date.toDateString()} ${startTime} - ${endTime} ${
              data.originalEndTimeZone
            }`}
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-black pb-2 pt-8 text-magenta">
            About this event
          </h3>
          <Divider />
          <div
            className="event-html"
            dangerouslySetInnerHTML={{ __html: data.body.content }}
          ></div>
        </section>
      </div>
    </Layout>
  )
}

export default EventPage