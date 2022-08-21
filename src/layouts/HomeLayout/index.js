import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Footer from './Footer'
import TopBar from './TopBar'

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "#441682",
    position: "relative",
    // minHeight: '650px',
  },
  childHeight: {
    // background: "#441682",
    minHeight: '850px',
    position: "relative",
    zIndex: "1"
  },
  img: {
    width: "100%",
    height: "100%",
    backgroundImage: "url('./images/hero-background.png')",
    position: "absolute",
    zIndex: "0",
  },
}))

const MainLayout = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className={classes.root}>
      <div className={classes.img}></div>
      <TopBar />
      <div className={classes.childHeight}>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
