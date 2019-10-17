import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

// Types
import { IHeader, IDesktopMenu, IMobileMenu } from '../../types/Layout';

// Styles
import { useHeaderStyles } from './styles';

const DesktopMenu: React.FC<IDesktopMenu> = ({ anchorEl, menuId, isMenuOpen, handleLogoutClick, handleProfileClick, handleMenuClose }: IDesktopMenu) => (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
);

const MobileMenu: React.FC<IMobileMenu> = ({ anchorEl, menuId, isMenuOpen, handleMessagesClick, handleNotificationsClick, handleMenuClose, pathname, handleProfileMenuOpen }: IMobileMenu) => (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMessagesClick} disabled={pathname === '/messages'}>
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClick} disabled={pathname === '/notifications'}>
            <IconButton color="inherit">
                <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <p>Profile</p>
        </MenuItem>
    </Menu>
);


const Header: React.FC<IHeader> = ({ history, location, isLoggedIn, logout, clearProfileInfo }: IHeader) => {
    const [desktopAnchorEl, setDesktopAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileAnchorEl, setMobileAnchorEl] = React.useState<null | HTMLElement>(null);
    const desktopMenuId: string = 'desktop-menu';
    const mobileMenuId: string = 'mobile-menu';
    const isDesktopMenuOpen: boolean = !!desktopAnchorEl;
    const isMobileMenuOpen: boolean = !!mobileAnchorEl;
    const classes = useHeaderStyles();

    const goTo = (path: string): void => {
        if (location.pathname !== path) {
            history.push(path);
            handleDesktopMenuClose();
        }
    };

    const handleLogoutClick = async (): Promise<void> => {
        await logout();
        clearProfileInfo();
        handleDesktopMenuClose();
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setDesktopAnchorEl(event.currentTarget);
    };

    const handleDesktopMenuClose = () => {
        setDesktopAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileAnchorEl(null);
    };

    const desktopMenuProps: IDesktopMenu = {
        anchorEl: desktopAnchorEl,
        menuId: desktopMenuId,
        isMenuOpen: isDesktopMenuOpen,
        handleMessagesClick: () => { goTo('/messages') },
        handleNotificationsClick: () => { goTo('/notifications') },
        handleLogoutClick: handleLogoutClick,
        handleProfileClick: () => { goTo('/profile') },
        handleMenuClose: handleDesktopMenuClose,
    };
    const mobileMenuProps: IMobileMenu = {
        ...desktopMenuProps,
        anchorEl: mobileAnchorEl,
        menuId: mobileMenuId,
        isMenuOpen: isMobileMenuOpen,
        pathname: location.pathname,
        handleMenuClose: handleMobileMenuClose,
        handleProfileMenuOpen: handleProfileMenuOpen
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap onClick={() => { isLoggedIn && goTo('/') }}>
                        Firebase Mobx
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" onClick={() => { goTo('/messages')}} disabled={location.pathname === '/messages'}>
                            <Badge badgeContent={0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => { goTo('/notifications')}} disabled={location.pathname === '/notifications'}>
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={desktopMenuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    {
                        isLoggedIn && (
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
            <MobileMenu
                {...mobileMenuProps}
            />
            <DesktopMenu
                {...desktopMenuProps}
            />
        </div>
    )
};

export default Header;
