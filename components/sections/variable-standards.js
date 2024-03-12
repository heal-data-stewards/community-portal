import React, { useState, useEffect } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import CircleIcon from "@mui/icons-material/Circle"
import WarningIcon from "@mui/icons-material/Warning"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Checkbox from "@mui/material/Checkbox"
import TripOriginIcon from "@mui/icons-material/TripOrigin"
import { fetchAPI } from "utils/api"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Markdown from "../elements/markdown"
import { CSVLink, CSVDownload } from "react-csv"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

const Block = ({
  title,
  onMouseEnter,
  choice,
  setCompareList,
  compareList,
}) => {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event) => {
    if (checked == false) {
      setCompareList([...compareList, choice])
    } else {
      let filteredList = compareList.filter((item) => {
        return item != choice
      })
      setCompareList([...filteredList])
    }
    setChecked(event.target.checked)
  }
  return (
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "start",
        marginBottom: "15px",
        padding: "15px",
        minHeight: "75px",
        background:
          "linear-gradient(315deg, transparent 17px, rgb(229, 224, 231) 0)",
        color: "rgba(83, 37, 101, 1)",
        maxWidth: "300px",
        display: "block",
        width: "-webkit-fill-available",
      }}
      // className={"sensitive-data-blocks"}
      onClick={onMouseEnter}
    >
      <div style={{ display: "flex" }}>
        <Checkbox
          disableRipple
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          icon={<TripOriginIcon />}
          checkedIcon={<CircleIcon />}
        />
        <div>
          <div>{title}</div>
          <div style={{ fontWeight: "500", fontSize: "9px" }}>
            {choice.subtext}
          </div>
        </div>
      </div>
    </div>
  )
}

const RequiredBlock = ({
  title,
  onMouseEnter,
  choice,
  setCompareList,
  compareList,
}) => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    if (checked == false) {
      setCompareList([...compareList, choice])
    } else {
      let filteredList = compareList.filter((item) => {
        return item != choice
      })
      setCompareList([...filteredList])
    }
    setChecked(event.target.checked)
  }
  return (
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "start",
        marginBottom: "15px",
        padding: "15px",
        minHeight: "75px",
        background: "linear-gradient(315deg, transparent 17px, #982568 0)",
        color: "white",
        maxWidth: "300px",
        display: "block",
        width: "-webkit-fill-available",
      }}
      // className={"sensitive-data-blocks"}
      onClick={onMouseEnter}
    >
      <div style={{ display: "flex" }}>
        <Checkbox
          disableRipple
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          icon={<WarningIcon style={{ color: "white" }} />}
          checkedIcon={<WarningIcon />}
        />
        <div>
          <div>{title}</div>
          <div style={{ fontWeight: "500", fontSize: "9px" }}>
            {choice.subtext}
          </div>
        </div>
      </div>
    </div>
  )
}

const RecommendedBlock = ({
  title,
  onMouseEnter,
  choice,
  setCompareList,
  compareList,
}) => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    if (checked == false) {
      setCompareList([...compareList, choice])
    } else {
      let filteredList = compareList.filter((item) => {
        return item != choice
      })
      setCompareList([...filteredList])
    }
    setChecked(event.target.checked)
  }
  return (
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "start",
        marginBottom: "15px",
        padding: "15px",
        minHeight: "75px",
        background:
          "linear-gradient(315deg, transparent 17px, rgba(83, 37, 101, 1) 0)",
        color: "white",
        maxWidth: "300px",
        display: "block",
        width: "-webkit-fill-available",
      }}
      // className={"sensitive-data-blocks"}
      onClick={onMouseEnter}
    >
      <div style={{ display: "flex" }}>
        <Checkbox
          disableRipple
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          icon={<TripOriginIcon style={{ color: "#982568" }} />}
          checkedIcon={<CircleIcon style={{ color: "#982568" }} />}
        />
        <div>
          <div>{title}</div>
          <div style={{ fontWeight: "500", fontSize: "9px" }}>
            {choice.subtext}
          </div>
        </div>
      </div>
    </div>
  )
}

const VariableStandards = ({ data }) => {
  const [compareList, setCompareList] = useState([])
  const [cardList, setCardList] = useState([])
  const [recommendedList, setRecommendedList] = useState([])
  const [requiredList, setRequiredList] = useState([])
  const [questionList, setQuestionList] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [value, setValue] = useState("")

  useEffect(() => {
    // let dropDownQuestions = data.dropdown_vs.map((q) => {
    //   const [answer, setAnswer] = useState('');

    //   const handleChange = (event) => {
    //     setAnswer(event.target.value);
    //   };

    //   return (
    //     <div>
    //       <div style={{ fontWeight: "bold", marginBottom: "7px" }}>
    //         {q.question}
    //       </div>
    //       <div style={{ fontWeight: "400", marginBottom: "10px" }}>
    //         {q.more_info}
    //       </div>
    //       <Box sx={{ minWidth: 120 }}>
    //         <FormControl fullWidth>
    //           <InputLabel id="demo-simple-select-label">Select one below</InputLabel>
    //           <Select
    //             labelId="demo-simple-select-label"
    //             id="demo-simple-select"
    //             value={answer}
    //             label="Age"
    //             onChange={handleChange}
    //           >
    //             {q.answer_list.map(a => {
    //               return <MenuItem value={a.responses}>{a.responses}</MenuItem>
    //             })}
    //           </Select>
    //         </FormControl>
    //       </Box>
    //     </div>
    //   )
    // })

    setQuestionList([...data.dropdown_vs, ...data.single])
    fetchAPI("/vlmds").then((res) => {
      setCardList(res)
      setRecommendedList(res)
      setRequiredList(res)
    })
  }, [data.single, data.dropdown_vs])
  // console.log(questionList)

  const handleChange = (event) => {
    if (
      (currentStep === 1 && event.target.value === "Yes") ||
      (currentStep === 1 && event.target.value === "yes")
    ) {
      setCurrentStep(2)
      setValue(event.target.value)
    } else if (
      (currentStep === 1 && event.target.value === "No") ||
      (currentStep === 1 && event.target.value === "no")
    ) {
      setCurrentStep(1)
      setValue(event.target.value)
    } else {
      setValue(event.target.value)
    }
  }

  return (
    <div className="container pb-4 mt-20">
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "35%",
            paddingRight: "7px",
            borderRight: "2px solid #532665",
          }}
        >
          {questionList
            .filter((q) => {
              return q.step == currentStep
            })
            .map((q) => {
              return (
                <div key={q.question}>
                  <div style={{ fontWeight: "bold", marginBottom: "7px" }}>
                    {q.question}
                  </div>
                  <Markdown>{q.more_info}</Markdown>
                  <br></br>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={value}
                      onChange={handleChange}
                      name="radio-buttons-group"
                    >
                      {q.list_of_answers.map((answer) => {
                        return (
                          <FormControlLabel
                            key={answer.response}
                            value={answer.response}
                            control={<Radio />}
                            label={answer.response}
                          />
                        )
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>
              )
            })}
          {currentStep > 1 && (
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-evenly",
                color: "#532665",
              }}
            >
              {" "}
              <button onClick={() => setCurrentStep(currentStep - 1)}>
                {"< back"}
              </button>{" "}
              <button onClick={() => setCurrentStep(currentStep + 1)}>
                {"next >"}
              </button>{" "}
            </div>
          )}
        </div>
        <div style={{ width: "65%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              fontWeight: "bold",
              // top: "-76px",
              position: "relative",
              padding: "0 15px 15px",
              // borderRight: "2px solid #532666"
            }}
          >
            <div style={{ width: "100%", textAlign: "end" }}>
              <CircleIcon style={{ fill: "#992569" }} />{" "}
              <span>Recommended Resources</span>
            </div>
            <div style={{ width: "100%", textAlign: "end" }}>
              <WarningIcon style={{ fill: "rgb(83 38 101)" }} />{" "}
              <span>Required Resources</span>
            </div>
          </div>
          {compareList.length > 0 && (
            <Button
              style={{
                left: "calc(50% - 71px)",
                marginBottom: "10px",
              }}
              variant="contained"
            >
              <CSVLink data={compareList}>Download CSV</CSVLink>
            </Button>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-evenly",
              // marginTop: "-24px"
            }}
          >
            {cardList.map((choice, i) => {
              if (false) {
                return (
                  <RequiredBlock
                    key={i}
                    title={choice.title}
                    setCompareList={setCompareList}
                    compareList={compareList}
                    choice={choice}
                  />
                )
              } else if (false) {
                return (
                  <RecommendedBlock
                    key={i}
                    title={choice.title}
                    setCompareList={setCompareList}
                    compareList={compareList}
                    choice={choice}
                  />
                )
              } else {
                return (
                  <Block
                    // onMouseEnter={(e) => onHover(choice)}
                    key={i}
                    title={choice.title}
                    setCompareList={setCompareList}
                    compareList={compareList}
                    choice={choice}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariableStandards
