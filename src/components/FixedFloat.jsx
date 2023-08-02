import { autocompleteClasses } from '@mui/material'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles(theme => ({
  fixedFloat: {
    flexDirection: 'column',
    display: 'flex',
    width: '40%',
    margin: 'auto',

    '@media screen and (max-width: 768px)': {
      margin: '0 auto',
      width: '100%',
    },
  },
  img: {
    borderRadius: '5px',
    overflow: 'hidden',
  },
  titleIFrame: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '15px',
  },
  IFrame: {
    minHeight: '474px',
    width: '100%',
    border: 'none',
  },
}))

const FixedFloat = props => {
    const classes = useStyles()
    return (
        <div className={classes.fixedFloat + ' main-info-of-product'} style={{textAlign: "center"}}>
            <span className={classes.titleIFrame}>
                <iframe
                    className={classes.IFrame}
                    src="https://widget.fixedfloat.com/?to=BTCLN&amp;ref=4fg6te1a&amp;lockReceive=true&amp;lockType=true&amp;hideType=true&amp;lockAmount=true&amp;toAmount=0.001"
                    allowtransparency="true"
                ></iframe>
                <br />
            </span>
            <span><a href="https://lightningnetworkstores.com/wallets">Bitcoin wallets (I recommend Wallet of Satoshi or Muun)</a></span>
        </div>
    )
  }
  
  export default FixedFloat