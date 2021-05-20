import React, {useState, useEffect} from 'react'
import { ButtonGroup, makeStyles } from '@material-ui/core'
import { GlobalContext } from '../contexts/GlobalContext';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom'
import countapi from 'countapi-js';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        page: {
            width: '100%',
            padding: theme.spacing(3),
            marginTop: '4%'
        },
        appBar: {
            width: '100%'
        },
        toolbar: theme.mixins.toolbar
    }
})

export default function Layout({ children }) {

    const classes = useStyles()
    const history = useHistory()

    const [open, setOpen] = useState(true);
    const [visits, setVisits] = useState(0)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGit = () => {
        window.open('https://github.com/vinayannam/leetcode_todo', "_blank")
    }

    useEffect(()=>{
        countapi.visits('global').then((result) => {
            setVisits(result.value)
        })
        }, [])

    return (
        <GlobalContext.Consumer>
            {(context) => {
                return  (
                    <div className={classes.root}>
                        <AppBar 
                        position="fixed" 
                        className={classes.appBar}
                        elevation={1}>
                            <Toolbar>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" onClick={() => history.push('/')}>
                                            LEETCODE TODO
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ButtonGroup color='inherit'>
                                            <Button
                                                disabled
                                                color='inherit'
                                                startIcon={<VisibilityIcon />}
                                            >
                                                {visits}
                                            </Button>
                                            <Button aria-controls="todolist-menu" aria-haspopup="true" onClick={context.handleClickMenuItem}>
                                                TODO LISTS
                                            </Button>
                                            <Menu
                                            id="todolist-menu"
                                            anchorEl={context.anchorMenuEl}
                                            keepMounted
                                            open={Boolean(context.anchorMenuEl)}
                                            onClose={context.handleTodoClose}>
                                                <MenuItem onClick={(event) => {context.handleLanding(event); history.push('/')}}>Landing</MenuItem>
                                                {
                                                    context.todoLists.map((item, index) => (
                                                        <MenuItem key={index} onClick={(event) => {context.handleTodoClick(event, index); history.push('/list')}}>{item.charAt(0).toUpperCase() + item.slice(1)}</MenuItem>
                                                    ))
                                                }
                                            </Menu>
                                            <Button onClick={handleClickOpen}>
                                                TUTORIAL/SUPPORT
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">Thank You for visiting </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    This application allows you to write notes for all the leetcode questions and allows for quick review. If you like what you see please visit my <Link href="https://vinayannam.github.io" color='secondary' target='_blank' onClick={(event) => event.preventDefault()}>
                                                        Portfolio
                                                    </Link> and <Link href="https://www.linkedin.com/in/vinayannam" color='secondary' target='_blank' onClick={(event) => event.preventDefault()}>
                                                        Linkedin
                                                    </Link> to support me.
                                                </DialogContentText>
                                                <hr></hr>
                                                <DialogContentText>
                                                    <Typography variant='caption'>Note: Double click on comment column for any row to edit the comment and press enter to save the comment</Typography>
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Chip
                                                        icon={<EmailIcon />}
                                                        label="vinayannam97@gmail.com"
                                                        variant="outlined"
                                                />
                                                <Chip
                                                    icon={<PhoneIcon />}
                                                    label="+1 (480) 370-7965"
                                                    variant="outlined"
                                                />
                                                <Button onClick={handleGit} variant='outlined' color="inherit" startIcon={<GitHubIcon />} autoFocus>
                                                    Github
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="overline">
                                            {context.prefersDarkMode? 'DARK' : 'LIGHT'} 
                                        </Typography>
                                        <Switch
                                            checked={context.prefersDarkMode}
                                            onChange={context.toggleDarkMode}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.page}>
                            <div className={classes.toolbar}>
                                { children }
                            </div>
                        </div>
                    </div>
                )
            }}
        </GlobalContext.Consumer>
    );
}


