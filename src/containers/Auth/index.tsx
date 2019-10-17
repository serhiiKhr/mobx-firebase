import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Material UI Components
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

// Types
import { AuthPageTabType, IUserForm, ITabPanelProps, ISocialNetworks, IUserFormValue, IAuthPage, IAuthPageView } from '../../types/Auth';

// Styles
import { useStyles, a11yProps } from './styles';
import {FirebaseUser} from "../../firebase/types";


const SignInTabPanel: React.FC<ITabPanelProps> = ({ index, value, ...rest }: ITabPanelProps) => (
    <Typography
        component="section"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}>
        <UserForm {...rest} />
    </Typography>
);

const UserForm: React.FC<IUserForm> = ({ user, onSubmit, setEmail, setPassword }: IUserForm) => {
    const submit = ($event: React.SyntheticEvent) => {
        $event.preventDefault();
        onSubmit(user);
    };

    return (
        <Box component="form" onSubmit={submit} mt={1} mb={1}>
            <TextField
                required
                label="Email"
                placeholder="Enter email"
                fullWidth
                margin="dense"
                type="email"
                variant="outlined"
                value={user.email}
                onChange={($event: React.SyntheticEvent) => {
                    setEmail(($event.target as any).value);
                }}
            />
            <TextField
                required
                label="Password"
                placeholder="Enter password"
                fullWidth
                margin="dense"
                type="password"
                variant="outlined"
                value={user.password}
                onChange={($event: React.SyntheticEvent) => {
                    setPassword(($event.target as any).value);
                }}
            />
            <Box component="div" mt={2} ml="auto">
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Submit
                </Button>
            </Box>
        </Box>
    )
};

const SocialNetworksButtons: React.FC<ISocialNetworks> = ({ signInWithGoogle, className, buttonClassName }: ISocialNetworks) => (
    <Box component="section" mt={2} className={className}>
        <Button variant="contained" color="primary" onClick={signInWithGoogle} className={buttonClassName}>
            Sign In with google
        </Button>
    </Box>
);

export const AuthPageView: React.FC<IAuthPageView> = ({ match, history, loginWithEmail, loginWithGoogle, createUser, checkUser }) => {
    const classes = useStyles();
    const activeTabKey = ['sign-in', 'sign-up'].includes((match.params as any).type) ? (match.params as any).type : 'sign-in';
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const signIn = (user: IUserFormValue) => {
        console.log('sign in user', user);
        loginWithEmail(user).then((user: FirebaseUser) => {
            checkUser(user);
            // history.push('/');
        });
    };
    const signUp = (user: IUserFormValue) => {
        console.log('sign up user', user);
        createUser(user).then((user: FirebaseUser) => {
            checkUser(user);
            // history.push('/');
        })
    };
    const signInWithGoogle = () => {
        loginWithGoogle().then((user: FirebaseUser) => {
            checkUser(user);
            // history.push('/');
            console.log('sign in with google');
        });

    };

    const handleChange = (event: React.ChangeEvent<{}>, value: AuthPageTabType) => {
        if (activeTabKey !== value) {
            history.push(`/auth/${value}`);
        }
    };

    return (
        <section className={classes.root}>
            <Tabs value={activeTabKey} onChange={handleChange}>
                <Tab label="Sign In" value={'sign-in'} {...a11yProps('sign-in')} />
                <Tab label="Sign Up" value={'sign-up'} {...a11yProps('sign-up')} />
            </Tabs>
            <SignInTabPanel value={activeTabKey} index={'sign-in'} user={{ email, password }} setPassword={setPassword} setEmail={setEmail} onSubmit={signIn} />
            <SignInTabPanel value={activeTabKey} index={'sign-up'} user={{ email, password }} setPassword={setPassword} setEmail={setEmail} onSubmit={signUp} />
            <Divider />
            <SocialNetworksButtons signInWithGoogle={signInWithGoogle} className={classes.social} buttonClassName={classes.socialButton} />
        </section>
    )
};

const AuthPage: React.FC<IAuthPage> = (props: IAuthPage) => {
    const storeProps = useRootData(store => ({
        loading: store.auth.loading,
        error: store.auth.error,
        loginWithEmail: store.auth.loginWithEmail,
        createUser: store.auth.createUser,
        loginWithGoogle: store.auth.loginWithGoogle,
        checkUser: store.profile.checkUser
    }));
    const combinedProps: IAuthPageView = {
        ...props,
        ...storeProps
    };

    return <AuthPageView {...combinedProps} />;
};


export default AuthPage;
