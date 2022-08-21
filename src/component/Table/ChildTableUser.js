import React, { useState, useContext } from 'react'

import { UserContext } from "../../context/User";
import { TableCell, TableRow, Button, makeStyles } from '@material-ui/core'
import { DonationPopUp } from 'src/component/Bundelscard1'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 320,
  },
  table: {
    border: '1px solid #0f1069',
    '& th': {
      border: '1px solid #0f1069',
    },
    '& td': {
      border: '1px solid #0f1069',
    },
  },
  createButton: {
    color: '#fff',
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    margin: '0px 10px',
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
    },
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
  },
  cell: {
    color: "#000",
    background: "#fff",
  },
  cellImg: {
    background: "#fff!important",
    padding: "10px!important",
  },
}))
export default function ChildTableUser({ row, index, auth }) {
  const classes = useStyles()
  const [openDonation, setOpenDonation] = useState(false);
  const user = useContext(UserContext);
  const history = useHistory();
  const [t, i18n] = useTranslation();
  return (
    <>
      <TableRow className={classes.tbody} key={row.coinName}>
        <TableCell
          className={classes.cell}
          align="Center"
          component="th"
          scope="row"
        >
          {index + 1}
        </TableCell>
        <TableCell className={classes.cellImg} align="Center" >
          <img src={
            user.userData && user.userData.profilePic
              ? user.userData.profilePic
              : `https://avatars.dicebear.com/api/miniavs/${user?.userData?._id}.svg`
          } style={{ width: "60px", height: "60px", borderRadius: "50%", }} />
        </TableCell>
        <TableCell
          style={{ color: '#8484ff', cursor: 'pointer' }}
          className={classes.cell}
          align="Center"
          onClick={() =>
            history.push({
              pathname: '/user-profile',
              search: row?._id,
            })
          }
        >
          {row?.ethAccount?.address
            ? row?.ethAccount?.address
            : row?.walletAddress
              ? row?.walletAddress
              : '0xc90325ff827f6e436bbd8bdf4251c0aea8a39be4'}
        </TableCell>

        <TableCell className={classes.cell} align="Center">
          {row?.name ? row?.name : row?.userName ? row?.userName : 'N/A'}
        </TableCell>
        <TableCell className={classes.cell} align="Center">
          {row?.userType ? row?.userType : 'N/A'}
        </TableCell>
        <TableCell className={classes.cell} align="Center">
          <Button
            className={classes.createButton}
            onClick={() => {
              if (auth?.userData?._id) {
                if (auth?.userData?._id !== row?._id) {
                  setOpenDonation(true)
                } else {
                  toast.error(`You can't transfer to your own account`)
                }
              } else {
                toast.error('Please login first!')
              }
            }}
            disabled={row?.userType === 'User'}
          >
            {t("users.transferFunds")}
          </Button>
        </TableCell>
      </TableRow>

      {openDonation && (
        <DonationPopUp
          open={openDonation}
          handleClose={() => setOpenDonation(false)}
          userData={row}
        />
      )}
    </>
  )
}
