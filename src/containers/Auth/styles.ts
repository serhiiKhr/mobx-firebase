import {makeStyles, Theme} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        width: 500,
        margin: '0 auto auto'
    },
    social: {
        textAlign: 'center'
    },
    socialButton: {

    }
}));

export const a11yProps = (index: any) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});